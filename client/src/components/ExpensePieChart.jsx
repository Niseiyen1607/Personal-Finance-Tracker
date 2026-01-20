import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateSpentByBudget } from "../helpers";

const COLORS = [
  "#8b5cf6", 
  "#10b981", 
  "#f43f5e",
  "#f59e0b",
  "#06b6d4",
  "#ec4899",
];

const ExpensePieChart = ({ budgets, expenses }) => {
  const data = budgets
    .map((budget) => ({
        name: budget.name,
        value: calculateSpentByBudget(budget.id || budget._id, expenses),
    }))
    .filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
        <span className="text-slate-400 font-medium">Aucune donnée</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Répartition</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none" 
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                formatter={(value) => `${value.toFixed(2)}€`}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle"/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensePieChart;