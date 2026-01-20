import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatDateToLocaleString } from "../helpers";
import { useTranslation } from "react-i18next";

const ExpenseItem = ({ expense, showBudget, budgets = [] }) => {
  const fetcher = useFetcher();
  const { t } = useTranslation();

  const budget = budgets.find(
    (b) => b.id === expense.budgetId || b.id === expense.budgetId?.toString(),
  );

  return (
    <>
      <td className="p-2 text-sm text-gray-800 text-center">{expense.name}</td>
      <td className="p-2 text-sm text-gray-800 text-center">
        {formatCurrency(expense.amount)}
      </td>
      <td className="p-2 text-sm text-gray-800 text-center">
        {formatDateToLocaleString(expense.createdAt)}
      </td>

      {showBudget && (
        <td className="p-2 text-center">
          {budget ? (
            <Link
              to={`/Personal-Finance-Tracker/budget/${budget.id}`}
              style={{
                "--accent": budget.color,
              }}
              className="text-sm font-medium text-blue-500 hover:text-blue-700"
            >
              {budget.name}
            </Link>
          ) : (
            <span className="text-gray-400 text-xs">Deleted</span>
          )}
        </td>
      )}

      <td className="p-2 text-center">
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="relative flex items-center w-full justify-center py-2 px-6 
              border-2 border-black bg-black text-white font-bold text-lg rounded-md 
              transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
            aria-label={t("deleteExpenseLabel", { expenseName: expense.name })}
          >
            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
            <span className="relative inline-flex items-center top-1 left-1">
              <TrashIcon width={20} />
            </span>
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default ExpenseItem;
