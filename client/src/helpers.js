const API_URL = "http://localhost:5000/api";

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
  const existingBudgetLength = 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = async (key) => {
  if (key === "userName") {
    return JSON.parse(localStorage.getItem("userName"));
  }

  try {
    const response = await fetch(`${API_URL}/${key}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map((item) => ({ ...item, id: item._id }));
    }
    return data;
  } catch (e) {
    throw new Error(`Impossible de récupérer ${key}`);
  }
};

export const createBudget = async ({ name, amount }) => {
  const newItem = {
    name: name,
    amount: +amount,
    color: generateRandomColor(),
  };

  try {
    const response = await fetch(`${API_URL}/budgets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    return response.json();
  } catch (e) {
    throw new Error("Erreur lors de la création du budget");
  }
};

export const createExpense = async ({ name, amount, budgetId }) => {
  const newItem = {
    name: name,
    amount: +amount,
    budgetId: budgetId,
  };

  try {
    const response = await fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    return response.json();
  } catch (e) {
    throw new Error("Erreur lors de la création de la dépense");
  }
};

export const deleteItem = async ({ key, id }) => {
  if (key === "userName") {
    return localStorage.removeItem("userName");
  }

  try {
    const response = await fetch(`${API_URL}/${key}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (e) {
    throw new Error("Erreur lors de la suppression");
  }
};

export const getAllMatchingItems = async ({ category, key, value }) => {
  const data = await fetchData(category);
  return data.filter((item) => item[key] === value);
};

export const calculateSpentByBudget = (budgetId, expenses) => {
  if (!expenses || expenses.length === 0) return 0;

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId?.toString() !== budgetId?.toString()) return acc;
    return acc + expense.amount;
  }, 0);

  return budgetSpent;
};

export const formatCurrency = (amt) => {
  return amt.toLocaleString("en-US", {
    style: "currency",
    currency: "USD", 
    currencyDisplay: "narrowSymbol", 
  });
};

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};
