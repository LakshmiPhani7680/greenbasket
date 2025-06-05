import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (veg) =>{
        setCart((prev)=>{
            const exists = prev.find((item)=> item.id === veg.id);
            if(exists){
                return prev.map((item)=>
                    item.id === veg.id ? {...item, quantity: item.quantity + 1} : item
                )
            }else{
                return [...prev, {...veg, quantity: 1}]
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);