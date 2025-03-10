'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
    category: string;
}

interface WishlistContextType {
    items: WishlistItem[];
    isOpen: boolean;
    addItem: (item: WishlistItem) => void;
    removeItem: (itemId: string) => void;
    toggleDrawer: () => void;
    closeDrawer: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setItems(JSON.parse(savedWishlist));
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(items));
    }, [items]);

    const addItem = (item: WishlistItem) => {
        setItems(prev => {
            if (!prev.some(i => i.id === item.id)) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const removeItem = (itemId: string) => {
        setItems(prev => prev.filter(item => item.id !== itemId));
    };

    const toggleDrawer = () => {
        setIsOpen(prev => !prev);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    return (
        <WishlistContext.Provider value={{
            items,
            isOpen,
            addItem,
            removeItem,
            toggleDrawer,
            closeDrawer,
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};