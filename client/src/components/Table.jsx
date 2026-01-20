import ExpenseItem from "./ExpenseItem";
import { useTranslation } from "react-i18next";

const Table = ({ expenses, showBudget = true, budgets = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {[
              t("name"),
              t("amount"),
              t("date"),
              showBudget ? t("budget") : "",
              "",
            ].map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-center font-medium border-b-2 border-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
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
