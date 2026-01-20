import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
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
      <td className="px-4 py-3 text-sm font-medium text-gray-700 text-center">
        {expense.name}
      </td>
      <td className="px-4 py-3 text-sm font-bold text-gray-700 text-center">
        {formatCurrency(expense.amount)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500 text-center">
        {formatDateToLocaleString(expense.createdAt)}
      </td>

      {showBudget && (
        <td className="px-4 py-3 text-center">
          {budget ? (
            <Link
              to={`/Personal-Finance-Tracker/budget/${budget.id}`}
              style={{
                "--accent": budget.color,
              }}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              {budget.name}
            </Link>
          ) : (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-400">
              Supprimé
            </span>
          )}
        </td>
      )}

      <td className="px-4 py-3 text-center">
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            aria-label={t("deleteExpenseLabel", { expenseName: expense.name })}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
