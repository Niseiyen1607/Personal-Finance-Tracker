import ExpenseItem from "./ExpenseItem";
import { useTranslation } from "react-i18next";

const Table = ({ expenses, showBudget = true, budgets = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="min-w-full table-auto bg-white">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {[
              t("name"),
              t("amount"),
              t("date"),
              showBudget ? t("budget") : "",
              "",
            ].map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="hover:bg-gray-50/50 transition-colors duration-150"
            >
              <ExpenseItem
                expense={expense}
                showBudget={showBudget}
                budgets={budgets}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
