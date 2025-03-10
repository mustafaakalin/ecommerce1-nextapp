'use client';

import { useCart } from "@/app/components/providers/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart } from "react-icons/fa";

export const CartDrawer = () => {
    const { isOpen, toggleDrawer, items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleDrawer}
                        className="fixed inset-0 bg-black/50 z-40"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-base-100 shadow-xl z-50 flex flex-col"
                    >
                        <div className="p-4 border-b flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Shopping Cart</h2>
                            <button onClick={toggleDrawer} className="btn btn-ghost btn-sm">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full p-4 text-center text-base-content/60">
                                    <FaShoppingCart className="w-12 h-12 mb-2" />
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {items.map((item) => (
                                        <div key={item.id} className="p-4 flex gap-4">
                                            {item.image && (
                                                <div className="w-20 h-20 bg-base-200 rounded-lg overflow-hidden">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="text-sm text-base-content/70">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="btn btn-xs btn-ghost"
                                                    >
                                                        <FaMinus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="btn btn-xs btn-ghost"
                                                    >
                                                        <FaPlus className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="btn btn-xs btn-ghost text-error ml-auto"
                                                    >
                                                        <FaTrash className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="border-t p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={clearCart}
                                        className="btn btn-outline btn-error flex-1"
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        onClick={() => {/* Handle checkout */ }}
                                        className="btn btn-primary flex-1"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};