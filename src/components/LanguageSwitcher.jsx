import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex gap-2 justify-end items-center p-2 bg-lime-50 rounded-full shadow-inner border border-lime-100">
      <button
        className={`px-4 py-1 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm ${
          language === "en"
            ? "bg-gradient-to-r from-green-500 to-lime-400 text-white scale-105 shadow-lg"
            : "bg-white text-green-700 hover:bg-lime-100"
        }`}
        onClick={() => changeLanguage("en")}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`px-4 py-1 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm ${
          language === "hi"
            ? "bg-gradient-to-r from-green-500 to-lime-400 text-white scale-105 shadow-lg"
            : "bg-white text-green-700 hover:bg-lime-100"
        }`}
        onClick={() => changeLanguage("hi")}
        aria-label="Switch to Hindi"
      >
        HI
      </button>
      <button
        className={`px-4 py-1 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm ${
          language === "te"
            ? "bg-gradient-to-r from-green-500 to-lime-400 text-white scale-105 shadow-lg"
            : "bg-white text-green-700 hover:bg-lime-100"
        }`}
        onClick={() => changeLanguage("te")}
        aria-label="Switch to Telugu"
      >
        TE
      </button>
    </div>
  );
};

export default LanguageSwitcher;