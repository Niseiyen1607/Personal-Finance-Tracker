import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import Table from "../components/Table";

import { deleteItem, fetchData } from "../helpers";

export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
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
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      const successMessage =
        userLang === "fr" ? "Dépense supprimée !" : "Expense deleted!";

      return toast.success(successMessage);
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6">
        {t("all_expenses")}{" "}
        <span className="text-blue-600">{t("expenses")}</span>
      </h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2 className="text-lg text-gray-600 mt-8 font-semibold">
            {t("recentExpenses")}{" "}
            <small>
              ({expenses.length} {t("total")})
            </small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>{t("no_expenses")}</p>
      )}
    </div>
  );
};

export default ExpensesPage;
