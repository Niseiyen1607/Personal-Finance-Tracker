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
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const { t } = useTranslation();

  return (
    <div
      className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6">
        <span className="text-blue-600">{budget.name}</span> {t("overview")}
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} expenses={expenses} />

        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <div className="border-b-2 border-gray-300 pb-2"></div>
          <h2 className="text-lg text-gray-600 mt-8 font-semibold">
            <span className="text-blue-600">{budget.name}</span> {t("expenses")}
          </h2>
          <Table expenses={expenses} showBudget={false} budgets={[budget]} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
