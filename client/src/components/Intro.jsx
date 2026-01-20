import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center p-8 bg-white gap-12 max-w-7xl mx-auto">
      <div className="lg:w-1/2 space-y-8 flex flex-col justify-center">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            {t("introHeader")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {t("introAccent")}
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            {t("introSubtext")}
          </p>
        </div>

        <Form method="post" className="space-y-4 w-full max-w-md">
          <input
            type="text"
            name="userName"
            required
            placeholder={t("placeholderName")}
            aria-label={t("placeholderName")}
            autoComplete="given-name"
            className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-lg shadow-sm"
          />
          <input type="hidden" name="_action" value="newUser" />

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-gray-900 text-white font-bold text-lg shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <span>{t("createAccountButton")}</span>
            <UserPlusIcon width={24} />
          </button>
        </Form>
      </div>

      <div className="lg:w-1/2 flex justify-center">
        <img
          src={illustration}
          alt={t("introAccent")}
          className="w-full max-w-lg object-cover rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500"
        />
      </div>
    </div>
  );
};

export default Intro;
