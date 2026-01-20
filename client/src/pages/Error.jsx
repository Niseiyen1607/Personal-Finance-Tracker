import { useRouteError, Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error-page min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-600">
          {error?.message || error?.statusText || "An unexpected error occurred."}
        </p>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          className="relative flex items-center justify-center py-2 px-6 
          border-2 border-black bg-black text-white font-bold text-lg rounded-md 
          transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
          onClick={() => navigate(-1)}
        >
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
          <span className="relative inline-flex items-center top-1 left-1">
            <ArrowUturnLeftIcon width={20} className="mr-2" />
            Go Back
          </span>
        </button>

        <Link
          to="/"
          className="relative flex items-center justify-center py-2 px-6 
          border-2 border-black bg-black text-white font-bold text-lg rounded-md 
          transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
        >
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
          <span className="relative inline-flex items-center top-1 left-1">
            <HomeIcon width={20} className="mr-2" />
            Go Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
