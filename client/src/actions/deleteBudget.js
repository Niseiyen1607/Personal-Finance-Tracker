import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

function getLanguageFromLocalStorage() {
  const language = localStorage.getItem("language");
  return language ? language : "en";
}

export function deleteBudget({ params }) {
  const userLang = getLanguageFromLocalStorage();

  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    const successMessage =
      userLang === "fr"
        ? "Budget supprimé avec succès !"
        : "Budget deleted successfully!";

    toast.success(successMessage);
  } catch (e) {
    const errorMessage =
      userLang === "fr"
        ? "Il y a eu un problème lors de la suppression de votre budget."
        : "There was a problem deleting your budget.";

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  return redirect("/Personal-Finance-Tracker/");
}
