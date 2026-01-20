import {
  BanknotesIcon,
  CreditCardIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "../helpers";

const DashboardSummary = ({ budgets, expenses }) => {
  const totalBudgeted = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  const cards = [
    {
      label: "Total Budget",
      amount: totalBudgeted,
      icon: <ScaleIcon className="w-8 h-8 text-white" />,
      gradient: "from-violet-600 to-indigo-600",
      shadow: "shadow-indigo-200",
      ring: "ring-indigo-100",
    },
    {
      label: "Dépensé",
      amount: totalSpent,
      icon: <CreditCardIcon className="w-8 h-8 text-white" />,
      gradient: "from-fuchsia-600 to-pink-600",
      shadow: "shadow-pink-200",
      ring: "ring-pink-100",
    },
    {
      label: "Restant",
      amount: totalRemaining,
      icon: <BanknotesIcon className="w-8 h-8 text-white" />,
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-200",
      ring: "ring-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded-2xl shadow-xl ${card.shadow} bg-gradient-to-br ${card.gradient} p-6 text-white transform transition hover:-translate-y-1 hover:scale-[1.02] duration-300 border border-white/10`}
        >
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <p className="text-white/80 text-sm font-bold mb-1 uppercase tracking-wider">
                {card.label}
              </p>
              <h3 className="text-3xl font-extrabold tracking-tight">
                {formatCurrency(card.amount)}
              </h3>
            </div>
            <div
              className={`p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-inner`}
            >
              {card.icon}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-0 right-1/2 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
