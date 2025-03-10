'use client';

import { useWishlist } from "@/app/components/providers/WishlistProvider";
import { IoClose } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/app/hooks/useToast";

export const WishlistDrawer = () => {
    const { items, isOpen, removeItem, closeDrawer } = useWishlist();
    const { showToast } = useToast();

    const handleRemoveItem = (id: string) => {
        removeItem(id);
        showToast('Item removed from wishlist', 'success');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={closeDrawer}
            />

            {/* Drawer */}
            <div className="fixed top-0 left-0 h-screen w-full max-w-sm bg-base-100 shadow-xl z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
                {/* Header */}
                <div className="p-4 border-b bg-base-200/50 backdrop-blur sticky top-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <FaHeart className="text-primary" />
                            My Wishlist ({items.length})
                        </h2>
                        <button
                            onClick={closeDrawer}
                            className="btn btn-ghost btn-circle btn-sm"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto h-[calc(100vh-64px)]">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-4 text-center space-y-4">
                            <FaRegHeart className="w-16 h-16 text-base-content/20" />
                            <p className="text-base-content/50">Your wishlist is empty</p>
                            <Link href="/products" className="btn btn-primary btn-sm">
                                Explore Products
                            </Link>
                        </div>
                    ) : (
                        <div className="p-4 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="card card-compact card-bordered border-base-200 hover:border-primary transition-colors duration-200"
                                >
                                    <div className="flex p-4 gap-4">
                                        <div className="relative w-24 h-24">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-xs text-base-content/60 mt-1">
                                                {item.category}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-primary font-semibold">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="btn btn-ghost btn-xs text-error"
                                                    >
                                                        Remove
                                                    </button>
                                                    <button className="btn btn-primary btn-xs">
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};