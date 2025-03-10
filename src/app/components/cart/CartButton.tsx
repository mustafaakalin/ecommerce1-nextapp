'use client';

import { useCart } from "@/app/components/providers/CartProvider";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

export const CartButton = () => {
    const { totalItems, toggleDrawer } = useCart();

    return (
        <motion.button
            onClick={toggleDrawer}
            className="fixed right-4 bottom-4 z-30 btn btn-circle bg-base-100/50 hover:bg-secondary/20 backdrop-blur-md border-secondary/20 hover:border-secondary shadow-lg group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative">
                <FaShoppingCart className="w-6 h-6 text-secondary transition-all duration-300 group-hover:scale-110" />
                {totalItems > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-secondary-content rounded-full text-xs flex items-center justify-center">
                        {totalItems}
                    </div>
                )}
            </div>
        </motion.button>
    );
};