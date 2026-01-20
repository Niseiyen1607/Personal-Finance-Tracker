import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers";

export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  const budgets = await fetchData("budgets"); 
  return { expenses, budgets };
}

function getLanguageFromLocalStorage() {
  const language = localStorage.getItem("language");
  return language ? language : "en";
}

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  const userLang = getLanguageFromLocalStorage();

  if (_action === "deleteExpense") {
    try {
      await deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      const successMessage =
        userLang === "fr" ? "Dépense supprimée !" : "Expense deleted!";
      return toast.success(successMessage);
    } catch (e) {
      throw new Error("Problème lors de la suppression.");
    }
  }
}

const ExpensesPage = () => {
  const { expenses, budgets } = useLoaderData();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:mt-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          {t("all_expenses")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            {t("expenses")}
          </span>
        </h1>
        <p className="text-gray-500 mt-2">
          Historique complet de vos transactions.
        </p>
      </div>

      {expenses && expenses.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg text-gray-600 mb-6 font-semibold flex justify-between items-center">
            <span>{t("recentExpenses")}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
              {expenses.length} {t("total")}
            </span>
          </h2>
          <Table expenses={expenses} budgets={budgets} />
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500">{t("no_expenses")}</p>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
