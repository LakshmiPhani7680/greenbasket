import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/cart", label: "Cart", icon: "🛒" },
  { to: "/admin", label: "Admin", icon: "🛠️" },
];

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-green-600 to-lime-500 text-white px-6 py-3 rounded-b-3xl shadow-lg mb-8 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center">
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight select-none">
          <span className="text-3xl">🥬</span>
          <span className="drop-shadow-lg">GreenBasket</span>
        </div>
        <div className="flex-grow" />
        <div className="flex gap-4 items-center text-base font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-200 shadow-sm
                ${
                  location.pathname === link.to
                    ? "bg-white text-green-700 shadow-lg"
                    : "bg-green-500/30 hover:bg-white hover:text-green-700"
                }
              `}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
              {link.to === "/cart" && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 shadow font-bold animate-bounce">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
