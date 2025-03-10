'use client';

import { useWishlist } from "@/app/components/providers/WishlistProvider";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";

export const WishlistButton = () => {
    const { items, toggleDrawer } = useWishlist();

    return (
        <motion.button
            onClick={toggleDrawer}
            className="fixed left-4 bottom-4 z-30 btn btn-circle bg-base-100/50 hover:bg-primary/20 backdrop-blur-md border-primary/20 hover:border-primary shadow-lg group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative">
                <FaRegHeart className="w-6 h-6 text-primary transition-all duration-300 group-hover:scale-110" />
                {items.length > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-content rounded-full text-xs flex items-center justify-center">
                        {items.length}
                    </div>
                )}
            </div>
        </motion.button>
    );
};