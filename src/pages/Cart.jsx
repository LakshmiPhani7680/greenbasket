import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { language } = useLanguage();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 p-4">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center drop-shadow-lg">
          🛒 {language === "en" ? "Your Cart" : language === "hi" ? "आपकी टोकरी" : language === "te" ? "మీ కార్ట్" : "Your Cart"}
        </h1>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium py-12">{language === "en" ? "Your cart is empty." : language === "hi" ? "आपकी टोकरी खाली है।" : language === "te" ? "మీ కార్ట్ ఖాళీగా ఉంది." : "Your cart is empty."}</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-green-100 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center p-4 gap-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center gap-4 w-full">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name[language]}
                      className="w-16 h-16 object-cover rounded-full border-4 border-lime-200 shadow-sm"
                    />
                  )}
                  <div>
                    <h2 className="font-bold text-green-700 text-lg">{item.name[language]}</h2>
                    <p className="text-orange-700 font-semibold">₹ {item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 text-sm">Qty:</span>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateQuantity(item.id, +e.target.value)}
                        className="w-16 border border-lime-300 px-2 py-1 rounded focus:ring-2 focus:ring-green-300"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-full font-semibold border border-red-200 transition-colors duration-150"
                >
                  {language === "en" ? "Remove" : language === "hi" ? "हटाएं" : language === "te" ? "తొలగించు" : "Remove"}
                </button>
              </div>
            ))}
            <div className="text-2xl font-bold text-green-800 text-right">
              {language === "en" ? "Total" : language === "hi" ? "कुल" : language === "te" ? "మొత్తం" : "Total"}: ₹ {total}
            </div>
            <button
              className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white px-6 py-3 rounded-full font-bold shadow hover:from-green-600 hover:to-lime-600 transition-colors duration-200 text-xl mt-4"
              onClick={() => {
                toast.success(
                  language === "en"
                    ? "Order placed successfully! 🛍️"
                    : language === "hi"
                    ? "ऑर्डर सफलतापूर्वक किया गया! 🛍️"
                    : language === "te"
                    ? "ఆర్డర్ విజయవంతంగా పూర్తయింది! 🛍️"
                    : "Order placed successfully! 🛍️"
                );
                clearCart();
              }}
            >
              {language === "en"
                ? "Place Order"
                : language === "hi"
                ? "ऑर्डर करें"
                : language === "te"
                ? "ఆర్డర్ చేయండి"
                : "Place Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
