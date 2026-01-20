import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { calculateSpentByBudget, formatCurrency } from "../helpers";

const BudgetItem = ({ budget, showDelete = false, expenses = [] }) => {
  const { t } = useTranslation();

  const { id, _id, name, amount, color } = budget;
  const actualId = id || _id;
  const spent = calculateSpentByBudget(actualId, expenses);
  const progressPercentage = Math.min((spent / amount) * 100, 100);

  let progressBarColor = "bg-violet-500"; 
  if (progressPercentage > 50) progressBarColor = "bg-amber-500"; 
  if (progressPercentage > 85) progressBarColor = "bg-rose-500";

  return (
    <div
      className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-violet-100/50 transition duration-300 w-full flex flex-col h-full justify-between group"
      style={{ "--accent": color }}
    >
      <div>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            {name}
          </h3>
          <span className="text-xl font-extrabold text-violet-600 bg-violet-50 px-3 py-1 rounded-xl">
            {formatCurrency(amount)}
          </span>
        </div>

        <div className="relative w-full h-3 rounded-full bg-gray-100 overflow-hidden mb-2">
          <div
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-in-out ${progressBarColor}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 font-medium mb-6">
          <span>
            {formatCurrency(spent)} {t("spent")}
          </span>
          <span>
            {formatCurrency(amount - spent)} {t("remaining")}
          </span>
        </div>
      </div>

      {showDelete ? (
        <div className="mt-auto">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm(t("deleteConfirmation"))) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="flex items-center justify-center w-full py-3 px-4 
              bg-red-50 text-red-600 font-semibold rounded-lg border border-red-100
              hover:bg-red-600 hover:text-white hover:border-transparent
              transition duration-200"
            >
              <span>{t("deleteBudget")}</span>
              <TrashIcon width={20} className="ml-2" />
            </button>
          </Form>
        </div>
      ) : (
        <div className="mt-auto">
          <Link
            to={`/Personal-Finance-Tracker/budget/${actualId}`}
            className="flex items-center justify-center w-full py-3 px-4 
            bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-200
            hover:bg-gray-900 hover:text-white hover:border-transparent
            transition duration-200 group"
          >
            <span>{t("viewDetails")}</span>
            <BanknotesIcon
              width={20}
              className="ml-2 text-gray-400 group-hover:text-white transition"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
