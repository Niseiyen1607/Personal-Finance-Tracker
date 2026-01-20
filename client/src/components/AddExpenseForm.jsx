import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { useTranslation } from "react-i18next";

const AddExpenseForm = ({ budgets }) => {
  const { t } = useTranslation();

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div
      className="relative p-6 bg-white rounded-lg 
    shadow-lg border-2 border-gray-200 mb-6"
    >
      <div className="absolute inset-1 rounded border-2 border-dashed border-blue-500 pointer-events-none"></div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {t("addExpense")}{" "}
        <span className="text-blue-500">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
      </h2>
      <fetcher.Form method="post" className="grid gap-4" ref={formRef}>
        <div className="expense-inputs grid gap-4">
          <div className="grid gap-2">
            <label
              htmlFor="newExpense"
              className="text-sm font-medium text-gray-700"
            >
              {t("expenseName")}
            </label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="newExpenseAmount"
              className="text-sm font-medium text-gray-700"
            >
              {t("amount")}
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="grid gap-2" hidden={budgets.length === 1}>
          <label
            htmlFor="newExpenseBudget"
            className="text-sm font-medium text-gray-700"
          >
            {t("budgetCategory")}
          </label>
          <select
            name="newExpenseBudget"
            id="newExpenseBudget"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button
          type="submit"
          className="relative flex items-center w-full justify-center py-2 px-6 
          border-2 border-black bg-black text-white font-bold text-lg rounded-md 
          transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>{t("submit")}</span>
          ) : (
            <>
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
              <span className="relative inline-flex items-center top-1 left-1">
                {t("addExpense")}
                <PlusCircleIcon width={20} />
              </span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
