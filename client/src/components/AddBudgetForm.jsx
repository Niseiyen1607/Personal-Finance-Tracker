import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
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
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <CurrencyDollarIcon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{t("createBudget")}</h2>
      </div>

      <fetcher.Form method="post" className="grid gap-4" ref={formRef}>
        <div className="grid gap-2">
          <label
            htmlFor="newBudget"
            className="text-sm font-semibold text-gray-600"
          >
            {t("budgetName")}
          </label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder={t("placeholderBudgetName")}
            required
            ref={focusRef}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="newBudgetAmount"
            className="text-sm font-semibold text-gray-600"
          >
            {t("amount")}
          </label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder={t("placeholderAmount")}
            required
            inputMode="decimal"
            min="0"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full py-3 px-6 rounded-xl bg-violet-600 text-white font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300 focus:ring-4 focus:ring-violet-100 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span>{t("submitting")}...</span>
          ) : (
            <>
              <span>{t("createButton")}</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
