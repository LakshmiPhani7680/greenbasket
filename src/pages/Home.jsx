import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed

const Home = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { language } = useLanguage(); // 'en', 'te', or 'hi'
  const { addToCart } = useCart(); // Function to add items to cart

  useEffect(() => {
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/vegetables");
      console.log("Fetched vegetables:", typeof res.data);
      let veggies = res.data.default || res.data; // Ensure we are working with an array
      setVegetables(veggies); // ✅ Correctly set the array
      setError("");
    } catch (err) {
      console.error("Error fetching vegetables:", err);
      setError("Failed to load vegetables");
    }
    setLoading(false);
  };

  const getTranslatedName = (veg) => {
    return veg.name[language] || veg.name.en;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 p-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-800 drop-shadow-lg tracking-tight">
            {language === "en"
              ? "Fresh Vegetables"
              : language === "hi"
              ? "ताज़ी सब्जियां"
              : language === "te"
              ? "తాజా కూరగాయలు"
              : "Fresh Vegetables"}
          </h1>
          <LanguageSwitcher />
        </div>
        {loading ? (
          <p className="text-center">Loading vegetables...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {vegetables.map((veg) => (
              <div
                key={veg.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-100 flex flex-col items-center p-5 relative group"
              >
                {veg.image && (
                  <img
                    src={"http://localhost:5000/"+veg.image}
                    alt={getTranslatedName(veg)}
                    className="w-32 h-32 object-cover rounded-full border-4 border-green-200 mb-3 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <h2 className="text-xl font-bold text-green-700 mb-1 text-center">
                  {getTranslatedName(veg)}
                </h2>
                <p className="text-lg text-orange-700 font-semibold mb-1">
                  ₹ {veg.price}{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    / {veg.unit || "kg"}
                  </span>
                </p>
                <p
                  className={
                    veg.available
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {language === "en"
                    ? veg.available
                      ? "Available"
                      : "Out of Stock"
                    : language === "hi"
                    ? veg.available
                      ? "उपलब्ध है"
                      : "स्टॉक में नहीं है"
                    : language === "te"
                    ? veg.available
                      ? "అందుబాటులో ఉంది"
                      : "స్టాక్ లో లేదు"
                    : veg.available
                    ? "Available"
                    : "Out of Stock"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {veg.deliveryTime}
                </p>
                <button
                  className="mt-auto px-5 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold rounded-full shadow hover:from-green-600 hover:to-lime-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  onClick={() => {
                    addToCart(veg);
                    toast.success(
                      `${veg.name[language] || veg.name.en} added to cart! 🛒`
                    );
                  }}
                  disabled={!veg.available}
                >
                  {language === "en"
                    ? "Add to Cart"
                    : language === "hi"
                    ? "कार्ट में जोड़ें"
                    : language === "te"
                    ? "కార్ట్‌కి జోడించండి"
                    : "Add to Cart"}
                </button>
                <div className="absolute top-3 right-3 bg-lime-100 text-green-700 text-xs px-2 py-1 rounded-full shadow-sm font-semibold">
                  {veg.unit || "kg"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
