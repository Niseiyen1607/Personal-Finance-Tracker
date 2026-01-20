import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BanknotesIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import DashboardSummary from "../components/DashboardSummary";
import ExpensePieChart from "../components/ExpensePieChart";
import ExpenseBarChart from "../components/ExpenseBarChart";
import BudgetRadialChart from "../components/BudgetRadialChart";

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
      return toast.success(
        userLang === "fr"
          ? `Bienvenue, ${values.userName}`
          : `Welcome, ${values.userName}`,
      );
    } catch (e) {
      throw new Error("Problème compte.");
    }
  }
  if (_action === "createBudget") {
    try {
      await createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success(
        userLang === "fr" ? "Budget créé !" : "Budget created!",
      );
    } catch (e) {
      throw new Error("Problème budget.");
    }
  }
  if (_action === "createExpense") {
    try {
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(
        userLang === "fr" ? "Dépense créée !" : "Expense created!",
      );
    } catch (e) {
      throw new Error("Problème dépense.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      await deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success(
        userLang === "fr" ? "Dépense supprimée !" : "Expense deleted!",
      );
    } catch (e) {
      throw new Error("Problème suppression.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  const { t } = useTranslation();

  const bentoBox =
    "bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300";

  return (
    <>
      {userName ? (
        <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Bonjour,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
                  {userName}
                </span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Tableau de bord financier personnel
              </p>
            </div>
          </div>

          {budgets && budgets.length > 0 ? (
            <div className="flex flex-col gap-8">
              <DashboardSummary budgets={budgets} expenses={expenses} />

              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[340px]">
                <div className={`${bentoBox} md:col-span-2 xl:col-span-2`}>
                  <div className="h-full w-full p-2">
                    <ExpenseBarChart expenses={expenses} />
                  </div>
                </div>

                <div className={`${bentoBox} md:col-span-1 xl:col-span-1`}>
                  <div className="h-full w-full p-2">
                    <BudgetRadialChart budgets={budgets} expenses={expenses} />
                  </div>
                </div>

                <div
                  className={`${bentoBox} md:col-span-3 xl:col-span-1 xl:row-span-2 bg-white overflow-hidden`}
                >
                  <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <PlusIcon className="w-5 h-5 text-violet-500" /> Nouveau
                    </h3>
                  </div>

                  <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full custom-scrollbar">
                    <div className="bg-slate-50 p-1 rounded-2xl">
                      <AddExpenseForm budgets={budgets} />
                    </div>

                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase">
                        Ou
                      </span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <div className="bg-slate-50 p-1 rounded-2xl">
                      <AddBudgetForm />
                    </div>
                  </div>
                </div>

                <div className={`${bentoBox} md:col-span-1 xl:col-span-1`}>
                  <div className="h-full w-full p-2">
                    <ExpensePieChart budgets={budgets} expenses={expenses} />
                  </div>
                </div>

                <div
                  className={`${bentoBox} md:col-span-2 xl:col-span-2 relative`}
                >
                  <div className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-slate-800">
                      {t("existingBudgets")}
                    </h2>
                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                      {budgets.length}
                    </span>
                  </div>
                  <div className="p-6 pt-0 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    {budgets.map((budget) => (
                      <BudgetItem
                        key={budget.id}
                        budget={budget}
                        expenses={expenses}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {expenses && expenses.length > 0 && (
                <div className={`${bentoBox} p-0`}>
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <h2 className="text-lg font-bold text-slate-800">
                      {t("recentExpenses")}
                    </h2>
                    <Link
                      to="expenses"
                      className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 group"
                    >
                      Voir tout{" "}
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="p-4">
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 6)}
                      budgets={budgets}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
              <div className="bg-violet-50 p-8 rounded-full mb-6 animate-pulse">
                <BanknotesIcon className="w-20 h-20 text-violet-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                {t("personalBudgetingMessage")}
              </h2>
              <p className="text-slate-500 mb-10 max-w-lg text-lg">
                {t("createBudgetMessage")}
              </p>
              <div className="w-full max-w-md transform transition hover:scale-105 duration-300">
                <AddBudgetForm />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
