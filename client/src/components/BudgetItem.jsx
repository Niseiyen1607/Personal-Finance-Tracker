import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const BudgetItem = ({ budget, showDelete = false, expenses = [] }) => {
  const { t } = useTranslation();

  const { id, _id, name, amount, color } = budget;
  const actualId = id || _id;
  const spent = calculateSpentByBudget(actualId, expenses);
  const progressPercentage = (spent / amount) * 100;

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-lg border-2 border-gray-200 w-full"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">
          {formatCurrency(amount)} {t("budgeted")}
        </p>
      </div>

      <div className="relative w-full h-6 rounded-lg bg-gray-200 shadow-inner overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-lg shadow-md transition-all duration-500 ease-out"
          style={{
            width: `${progressPercentage}%`,
            background: `linear-gradient(135deg, #2563eb, #2563eb90)`,
            boxShadow: `0 4px 6px #2563eb50`,
          }}
        ></div>
      </div>

      <div className="progress-text mt-3 flex justify-between">
        <small className="text-sm text-gray-600">
          {formatCurrency(spent)} {t("spent")}
        </small>
        <small className="text-sm text-gray-600">
          {formatCurrency(amount - spent)} {t("remaining")}
        </small>
      </div>

      {showDelete ? (
        <div className="flex mt-6">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm(t("deleteConfirmation"))) {
                event.preventDefault();
              }
            }}
            className="w-full"
          >
            <button
              type="submit"
              className="relative flex items-center w-full justify-center py-2 px-6 
              border-2 border-black bg-black text-white font-bold text-lg rounded-md 
              transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
            >
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
              <span className="relative inline-flex items-center top-1 left-1">
                {t("deleteBudget")}
                <TrashIcon width={20} className="ml-2" />
              </span>
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex mt-6">
          <Link
            to={`/Personal-Finance-Tracker/budget/${id}`}
            className="relative flex items-center w-full justify-center py-2 px-6 
            border-2 border-black bg-black text-white font-bold text-lg rounded-md 
            transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
          >
            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
            <span className="relative inline-flex items-center top-1 left-1">
              {t("viewDetails")}
              <BanknotesIcon width={20} className="ml-2" />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
