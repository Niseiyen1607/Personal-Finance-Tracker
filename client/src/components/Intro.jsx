import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between p-8 bg-gray-50 gap-6">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800">
          {t("introHeader")}{" "}
          <span className="accent text-blue-600">{t("introAccent")}</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600">{t("introSubtext")}</p>
        <Form method="post" className="space-y-4">
          <input
            type="text"
            name="userName"
            required
            placeholder={t("placeholderName")}
            aria-label={t("placeholderName")}
            autoComplete="given-name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            type="submit"
            className="relative flex items-center w-full justify-center py-2 px-6 
            border-2 border-black bg-black text-white font-bold text-lg rounded-md 
            transition duration-200 hover:bg-gray-900 hover:text-yellow-500"
          >
            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
            <span className="relative inline-flex items-center top-1 left-1">
              {t("createAccountButton")}
              <UserPlusIcon width={20} className="ml-2" />
            </span>
          </button>
        </Form>
      </div>
      <img
        src={illustration}
        alt={t("introAccent")}
        className="w-full lg:w-1/2 mt-8 lg:mt-0 rounded-lg shadow-xl"
      />
    </div>
  );
};

export default Intro;
