import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { formatCurrency } from "../helpers";

const BudgetRadialChart = ({ budgets, expenses }) => {
  const totalBudgeted = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const percentage =
    totalBudgeted > 0 ? Math.min((totalSpent / totalBudgeted) * 100, 100) : 0;

  let fill = "#10b981";
  if (percentage > 50) fill = "#f59e0b"; 
  if (percentage > 85) fill = "#ef4444";

  const data = [{ name: "Budget", value: percentage, fill: fill }];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col items-center justify-center relative overflow-hidden">
      <h3 className="absolute top-6 left-6 text-lg font-bold text-slate-800">
        Santé Globale
      </h3>

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={20}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar background clockWise dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <span className="text-3xl font-extrabold text-slate-800">
          {percentage.toFixed(0)}%
        </span>
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          Utilisé
        </span>
        <span className="mt-1 text-sm font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
          {formatCurrency(totalSpent)}
        </span>
      </div>
    </div>
  );
};

export default BudgetRadialChart;
