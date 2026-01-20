import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatDateToLocaleString } from "../helpers";

const ExpenseBarChart = ({ expenses }) => {
  const dataMap = expenses.reduce((acc, expense) => {
    const date = new Date(expense.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });

    if (!acc[date]) acc[date] = 0;
    acc[date] += expense.amount;
    return acc;
  }, {});

  const data = Object.keys(dataMap)
    .map((key) => ({
      name: key,
      montant: dataMap[key],
    }))
    .slice(-7); 

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          Dépenses Quotidiennes
        </h3>
        <p className="text-xs text-gray-500">7 derniers jours d'activité</p>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey="montant"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseBarChart;
