import React, { useState, useEffect, useRef } from "react";
import { Form, NavLink } from "react-router-dom";
import { TrashIcon, Bars3Icon, XMarkIcon, WalletIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { motion, AnimatePresence } from "framer-motion";

const Nav = ({ userName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteButtonRef = useRef(null);
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteButtonRef.current && !deleteButtonRef.current.contains(event.target)) {
        setConfirmDelete(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-slate-900 text-slate-100 py-4 px-4 shadow-xl sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink
          to="/Personal-Finance-Tracker/"
          aria-label="Go to home"
          className="flex items-center gap-2 text-white hover:text-violet-400 transition duration-200"
        >
          <div className="bg-violet-600 p-2 rounded-xl shadow-lg shadow-violet-900/20">
            <WalletIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">HomeBud</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
            {["en", "fr"].map((lng) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all uppercase ${
                  i18next.language === lng
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          {userName && (
            <>
              {confirmDelete ? (
                <div className="flex items-center gap-2 animate-fadeIn">
                  <span className="text-sm text-slate-400 mr-2">
                    {t("confirmDeleteMessage")}
                  </span>
                  <Form method="post" action="logout">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-sm font-bold bg-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition border border-rose-500/30"
                    >
                      {t("confirm")}
                    </button>
                  </Form>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 transition"
                  >
                    {t("cancel")}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  ref={deleteButtonRef}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
                >
                  <span>{t("deleteUser")}</span>
                  <TrashIcon width={18} />
                </button>
              )}
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-slate-800 mt-4 rounded-xl border border-slate-700"
          >
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;