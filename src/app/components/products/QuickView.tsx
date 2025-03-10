'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaTimes, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/components/providers/CartProvider';
import { useWishlist } from '@/app/components/providers/WishlistProvider';
import toast from 'react-hot-toast';

interface QuickViewProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        originalPrice?: number;
        discount?: number;
        images: string[];
        brand?: { name: string; slug: string };
        category?: { name: string; slug: string };
        rating: number;
        reviews: number;
        description?: string;
        specs?: { name: string; value: string }[];
        stock: number;
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
    const { addItem: addToCart } = useCart();
    const { addItem: addToWishlist } = useWishlist();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });
        toast.success('Added to cart!');
        onClose();
    };

    const handleAddToWishlist = () => {
        addToWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            slug: product.slug,
            category: product.category?.name || 'Uncategorized'
        });
        toast.success('Added to wishlist!');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-1 xs:inset-2 sm:inset-4 md:inset-10 lg:inset-20 z-50 bg-base-100 rounded-xl sm:rounded-2xl shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-2 sm:right-4 top-2 sm:top-4 btn btn-circle btn-xs sm:btn-sm md:btn-md btn-ghost text-base sm:text-xl z-10"
                        >
                            <FaTimes />
                        </button>

                        <div className="h-full overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 md:p-6">
                                {/* Image Gallery */}
                                <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-base-200">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                                    {/* Header */}
                                    <div>
                                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                            {product.brand && (
                                                <Link
                                                    href={`/brand/${product.brand.slug}`}
                                                    className="badge badge-sm sm:badge-md badge-outline hover:bg-primary/10 text-2xs sm:text-xs md:text-sm"
                                                >
                                                    {product.brand.name}
                                                </Link>
                                            )}
                                            {product.category && (
                                                <Link
                                                    href={`/category/${product.category.slug}`}
                                                    className="badge badge-sm sm:badge-md badge-outline hover:bg-primary/10 text-2xs sm:text-xs md:text-sm"
                                                >
                                                    {product.category.name}
                                                </Link>
                                            )}
                                        </div>
                                        <h2 className="text-base sm:text-xl md:text-2xl font-bold">{product.name}</h2>
                                        <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-2">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                                            i < Math.floor(product.rating)
                                                                ? 'text-warning'
                                                                : 'text-base-300'
                                                        }`}
                                                    />
                                                ))}
                                                <span className="ml-1.5 sm:ml-2 text-2xs sm:text-xs md:text-sm text-base-content/70">
                                                    ({product.reviews})
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2 sm:gap-4">
                                        <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        {product.originalPrice && (
                                            <>
                                                <span className="text-sm sm:text-base md:text-lg line-through text-base-content/50">
                                                    ${product.originalPrice.toFixed(2)}
                                                </span>
                                                <span className="badge badge-sm sm:badge-md badge-success text-2xs sm:text-xs md:text-sm">
                                                    Save ${(product.originalPrice - product.price).toFixed(2)}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {product.description && (
                                        <div className="prose prose-sm sm:prose md:prose-lg max-w-none">
                                            <p className="text-xs sm:text-sm md:text-base text-base-content/70">{product.description}</p>
                                        </div>
                                    )}

                                    {/* Specifications */}
                                    {product.specs && product.specs.length > 0 && (
                                        <div className="rounded-lg border border-base-300">
                                            <table className="table table-zebra text-2xs sm:text-xs md:text-sm">
                                                <tbody>
                                                    {product.specs.map((spec, idx) => (
                                                        <tr key={idx}>
                                                            <th className="font-medium">{spec.name}</th>
                                                            <td>{spec.value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2 sm:gap-4">
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                            className="btn btn-xs sm:btn-sm md:btn-md btn-primary flex-1"
                                        >
                                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                        <button
                                            onClick={handleAddToWishlist}
                                            className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-primary"
                                        >
                                            <FaHeart className="text-xs sm:text-sm md:text-base" />
                                        </button>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <div className={`badge badge-sm sm:badge-md ${
                                            product.stock > 0 ? 'badge-success' : 'badge-error'
                                        } text-2xs sm:text-xs md:text-sm`}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </div>
                                        {product.stock > 0 && (
                                            <span className="text-2xs sm:text-xs md:text-sm text-base-content/70">
                                                ({product.stock} units available)
                                            </span>
                                        )}
                                    </div>

                                    {/* Full Details Link */}
                                    <div className="text-center">
                                        <Link
                                            href={`/product/${product.slug}`}
                                            className="link link-hover text-primary text-2xs sm:text-xs md:text-sm"
                                        >
                                            View Full Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>
    );
}