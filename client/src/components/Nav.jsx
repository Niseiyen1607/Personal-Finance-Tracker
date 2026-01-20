import React, { useState, useEffect, useRef } from "react";
import { Form, NavLink } from "react-router-dom";
import { TrashIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
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
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deleteButtonRef.current && !deleteButtonRef.current.contains(event.target)) {
                setConfirmDelete(false); 
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <nav className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between relative">
            <NavLink to="/Personal-Finance-Tracker/" aria-label="Go to home" className="flex items-center">
                <span className="text-xl font-semibold tracking-wide hover:text-yellow-500 transition duration-200">
                    HomeBud
                </span>
            </NavLink>

            <div className="hidden md:flex items-center space-x-4">
                <button
                    onClick={() => changeLanguage("en")}
                    className="relative flex items-center justify-center py-2 px-2
                        border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                        transition"
                >
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                    <span className="relative inline-flex items-center duration-200 hover:text-yellow-500 top-1 left-1">
                        English
                    </span>
                </button>
                <button
                    onClick={() => changeLanguage("fr")}
                    className="relative flex items-center justify-center py-2 px-2
                        border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                        transition"
                >
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                    <span className="relative inline-flex items-center duration-200 hover:text-yellow-500 top-1 left-1">
                        Français
                    </span>
                </button>

                {userName && (
                    <>
                        {confirmDelete ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm mt-1 ps-1">{t("confirmDeleteMessage")}</span>
                                <Form method="post" action="logout" className="inline-block">
                                    <button
                                        type="submit"
                                        className="relative flex items-center justify-center py-2 px-2
                                            border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                                            transition"
                                    >
                                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-red-700"></span>
                                        <span className="relative inline-flex items-center duration-200 hover:text-yellow-500 top-1 left-1">
                                            {t("confirm")}
                                        </span>
                                    </button>
                                </Form>
                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    className="relative flex items-center justify-center py-2 px-2 
                                            border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                                            transition"
                                >
                                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                                    <span className="relative inline-flex items-center duration-200 hover:text-yellow-500 top-1 left-1">
                                        {t("cancel")}
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                className="relative flex items-center justify-center py-2 px-2 
                                    border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                                    transition"
                                ref={deleteButtonRef} // Ajout de la référence
                            >
                                <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                                <span className="relative inline-flex items-center duration-200 hover:text-yellow-500 top-1 left-1">
                                    {t("deleteUser")} <TrashIcon width={20} className="ml-2" />
                                </span>
                            </button>
                        )}
                    </>
                )}
            </div>

            <button
                className="md:hidden flex items-center"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen ? (
                    <XMarkIcon className="h-6 w-6 text-white" />
                ) : (
                    <Bars3Icon className="h-6 w-6 text-white" />
                )}
            </button>

            <AnimatePresence>
            {menuOpen && (
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    transition={{ duration: 0.3 }}
                    className="absolute top-12 left-0 w-full bg-gray-800 z-10 p-4 space-y-4 md:hidden">
                    <button
                        onClick={() => changeLanguage("en")}
                        className="relative block w-full py-2 px-4 
                            border-2 border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                            transition"
                    >
                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                        <span className="relative inline-block top-1 left-1 duration-200 hover:text-yellow-500">
                            English
                        </span>
                    </button>
                    <button
                        onClick={() => changeLanguage("fr")}
                        className="relative block w-full py-2 px-4 
                            border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                            transition"
                    >
                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                        <span className="relative inline-block top-1 left-1 duration-200 hover:text-yellow-500">
                            Français
                        </span>
                    </button>

                    {userName && (
                        <>
                            {confirmDelete ? (
                                <div className="space-y-2">
                                    <span className="block text-sm text-center">{t("confirmDeleteMessage")}</span>
                                    <Form method="post" action="logout" className="block">
                                        <button
                                            type="submit"
                                            className="relative block w-full py-2 px-4 
                                                border-2 border-black border-gray-900 bg-gray-900  text-white font-bold text-lg rounded-md 
                                                transition"
                                        >
                                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-red-700"></span>
                                            <span className="relative inline-block top-1 left-1 duration-200 hover:bg-red-800">
                                                {t("confirm")}
                                            </span>
                                        </button>
                                    </Form>
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        className="relative block w-full py-2 px-4 
                                            border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                                            transition"
                                    >
                                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                                        <span className="relative inline-block top-1 left-1 duration-200 hover:bg-gray-800">
                                            {t("cancel")}
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setConfirmDelete(true)}
                                    className="relative block w-full py-2 px-4 
                                        border-2 border-black border-gray-900 bg-gray-900 text-white font-bold text-lg rounded-md 
                                        transition"
                                >
                                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                                    <span className="relative flex items-center justify-center top-1 left-1 space-x-2 duration-200 hover:text-yellow-500">
                                        <span>{t("deleteUser")}</span>
                                        <TrashIcon width={20} />
                                    </span>
                                </button>
                            )}
                        </>
                    )}
                </motion.div>
            )}
            </AnimatePresence>
        </nav>
    );
};

export default Nav;
