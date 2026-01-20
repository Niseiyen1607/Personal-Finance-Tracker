import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("Le budget que vous essayez de trouver n'existe pas.");
  }

  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Dépense ${values.newExpense} créée !`);
    } catch (e) {
      throw new Error("Problème lors de la création de la dépense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      await deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Dépense supprimée !");
    } catch (e) {
      throw new Error("Problème lors de la suppression de la dépense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:mt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            {budget.name}
          </span>{" "}
          <span className="text-gray-400 font-light">/ {t("overview")}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        <div className="w-full">
          <BudgetItem budget={budget} showDelete={true} expenses={expenses} />
        </div>
        <div className="w-full h-full">
          <AddExpenseForm budgets={[budget]} />
        </div>
      </div>

      {expenses && expenses.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            {t("expenses")}{" "}
            <span className="text-gray-400 font-normal">({budget.name})</span>
          </h2>
          <Table expenses={expenses} showBudget={false} budgets={[budget]} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
