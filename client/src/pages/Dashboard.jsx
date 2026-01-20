import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";
import { useTranslation } from "react-i18next";

export async function dashboardLoader() {
  const userName = await fetchData("userName");
  const budgets = await fetchData("budgets");
  const expenses = await fetchData("expenses");
  return { userName, budgets, expenses };
}

function getLanguageFromLocalStorage() {
  const language = localStorage.getItem("language");
  return language ? language : "en";
}

export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  const userLang = getLanguageFromLocalStorage();

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      const successMessage =
        userLang === "fr"
          ? `Bienvenue, ${values.userName}`
          : `Welcome, ${values.userName}`;
      return toast.success(successMessage);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      await createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      const successMessage =
        userLang === "fr" ? "Budget créé !" : "Budget created!";
      return toast.success(successMessage);
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      const successMessage =
        userLang === "fr"
          ? `Dépense ${values.newExpense} créée !`
          : `Expense ${values.newExpense} created!`;
      return toast.success(successMessage);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

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
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  const { t } = useTranslation();

  return (
    <>
      {userName ? (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:mt-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6">
            {t("welcomeBack")},{" "}
            <span className="text-blue-600">{userName}</span>
          </h1>
          <div>
            {budgets && budgets.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <div className="border-b-2 border-gray-300 pb-2"></div>
                <h2 className="text-lg text-gray-600 mt-8 mb-1 font-semibold">
                  {t("existingBudgets")}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {budgets.map((budget) => (
                    <div
                      key={budget.id}
                      className="border-2 border-blue-500 rounded-lg p-1"
                    >
                      <BudgetItem budget={budget} expenses={expenses} />
                    </div>
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div>
                    <div className="border-b-2 border-gray-300 pb-2 pt-6 mb-1"></div>
                    <h2 className="text-lg text-gray-600 mt-8 font-semibold">
                      {t("recentExpenses")}
                    </h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                      budgets={budgets}
                    />
                    {expenses.length > 8 && (
                      <Link
                        to="expenses"
                        className="block mt-4 text-center text-blue-600 hover:underline"
                      >
                        {t("viewAllExpenses")}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-6">
                <p className="text-lg text-gray-600">
                  {t("personalBudgetingMessage")}
                </p>
                <p className="text-lg text-gray-600">
                  {t("createBudgetMessage")}
                </p>
                <div>
                  <AddBudgetForm />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
