import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, useFetcher } from "react-router-dom";
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
    <div className="relative flex-1 p-6 bg-white rounded-lg  shadow-lg border-2 border-gray-200">
      <div className="absolute inset-1 rounded border-2 border-dashed border-blue-500 pointer-events-none"></div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {t("createBudget")}
      </h2>
      <fetcher.Form method="post" className="grid gap-4" ref={formRef}>
        <div className="grid gap-2">
          <label
            htmlFor="newBudget"
            className="text-sm font-medium text-gray-700"
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="newBudgetAmount"
            className="text-sm font-medium text-gray-700"
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button
          type="submit"
          className="relative flex items-center justify-center w-full py-2 px-6 border-2 border-black bg-black text-white font-bold text-lg rounded-md transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>{t("submitting")}</span>
          ) : (
            <>
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
              <span className="relative inline-flex items-center top-1 left-1">
                {t("createButton")}
                <CurrencyDollarIcon width={20} className="ml-1 inline-block" />
              </span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
