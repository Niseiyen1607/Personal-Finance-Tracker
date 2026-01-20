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
      setTimeout(() => {
        if (focusRef.current) {
          focusRef.current.focus();
        }
      }, 0);
    }
  }, [isSubmitting]);

  return (
    <div className="h-full p-6 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-green-100 rounded-lg text-green-600">
          <PlusCircleIcon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{t("addExpense")}</h2>
      </div>

      <fetcher.Form method="post" className="grid gap-4" ref={formRef}>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <label
              htmlFor="newExpense"
              className="text-sm font-semibold text-gray-600"
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
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="newExpenseAmount"
              className="text-sm font-semibold text-gray-600"
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
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid gap-2" hidden={budgets.length === 1}>
          <label
            htmlFor="newExpenseBudget"
            className="text-sm font-semibold text-gray-600"
          >
            {t("budgetCategory")}
          </label>
          <select
            name="newExpenseBudget"
            id="newExpenseBudget"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none"
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
          disabled={isSubmitting}
          className="mt-2 w-full py-3 px-6 rounded-lg bg-gray-900 text-white font-semibold shadow-lg hover:bg-gray-800 hover:shadow-xl focus:ring-4 focus:ring-gray-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>{t("submitting")}...</span>
          ) : (
            <>
              <span>{t("addExpense")}</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
