import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

function getLanguageFromLocalStorage() {
  const language = localStorage.getItem("language");
  return language ? language : "en";
}

export async function logoutAction() {
  const userLang = getLanguageFromLocalStorage();

  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });

  const successMessage = userLang === "fr"
    ? "Votre compte a été supprimé avec succès"
    : "You've deleted your account";

  toast.success(successMessage);

  return redirect("/Personal-Finance-Tracker/");
}
