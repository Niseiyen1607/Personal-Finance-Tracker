import { useRouteError, Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
          <span className="text-4xl">🧐</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Oops! Problème technique.
        </h1>

        <p className="text-gray-500 mb-8 leading-relaxed">
          {error?.message ||
            error?.statusText ||
            "Une erreur inattendue s'est produite."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 
            bg-gray-900 text-white font-bold rounded-xl shadow-lg 
            hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 
            transition-all duration-200"
          >
            <ArrowUturnLeftIcon width={20} />
            <span>Retourner en arrière</span>
          </button>

          <Link
            to="/Personal-Finance-Tracker/"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 
            bg-white text-gray-700 font-bold rounded-xl border border-gray-200 
            hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 
            transition-all duration-200"
          >
            <HomeIcon width={20} />
            <span>Aller à l'accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
