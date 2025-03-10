'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaEye, FaStar, FaTags, FaBoxOpen, FaTruck, FaCloud, FaWandSparkles, FaMicrochip, FaMemory } from 'react-icons/fa6';
import { useCart } from '@/app/components/providers/CartProvider';
import { useWishlist } from '@/app/components/providers/WishlistProvider';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import QuickView from './QuickView';

interface ProductSpec {
    name: string;
    value: string;
    icon?: React.ReactNode;
    label?: string;
    bgColor?: string;
    textColor?: string;
}

interface ProductCardProps {
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
        stock: number;
        viewCount: number;
        isNew?: boolean;
        isFeatured?: boolean;
        isDigital?: boolean;
        isFreeShipping?: boolean;
        isActive?: boolean;
        specs?: ProductSpec[];
        isOutOfStock?: boolean;
        brandLogo?: string;
        soldCount?: number;
    };
    rank?: number;
    bestSelling?: number;
    className?: string;
}

export default function ProductCard({ product, rank, bestSelling, className = '' }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { addItem: addToCart } = useCart();
    const { addItem: addToWishlist } = useWishlist();
    const [showQuickview, setShowQuickview] = useState(false);
    const [activeBadge, setActiveBadge] = useState<'new' | 'featured' | 'shipping' | 'digital' | null>(null);

    // Initialize and rotate badges
    useEffect(() => {
        const badges: ('new' | 'featured' | 'shipping' | 'digital')[] = [];
        if (product.isNew) badges.push('new');
        if (product.isFeatured) badges.push('featured');
        if (product.isFreeShipping) badges.push('shipping');
        if (product.isDigital) badges.push('digital');

        if (badges.length > 0) {
            setActiveBadge(badges[0]);

            if (badges.length > 1) {
                const interval = setInterval(() => {
                    setActiveBadge(prev => {
                        const currentIndex = badges.indexOf(prev as any);
                        return badges[(currentIndex + 1) % badges.length];
                    });
                }, 4000); // Rotate every 4 seconds

                return () => clearInterval(interval);
            }
        }
    }, [product.isNew, product.isFeatured, product.isFreeShipping, product.isDigital]);

    // Handle image error
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = '/assets/images/defaults/product.png';
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });
        toast.success('Added to cart!');
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

    // Prepare images array with fallback
    const images = product.images && product.images.length > 0
        ? product.images
        : ['/assets/images/defaults/product.png'];

    return (
        <>
            <div
                className={`group card backdrop-blur-0 hover:backdrop-blur-md shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 ease-in-out overflow-hidden isolate relative ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section */}
                <figure className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
                    {/* Sales Count Badge - Updated for better responsiveness */}
                    {product.soldCount && product.soldCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 z-[40] backdrop-blur-md"
                        >
                            <div className="relative group/badge">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg sm:rounded-xl blur-lg group-hover/badge:blur-xl transition-all duration-300"></div>
                                <div className="relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col items-center">
                                        <div className="relative">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-error group-hover/badge:text-primary transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <motion.path
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    strokeDasharray="0 1"
                                                    d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <motion.div
                                                className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-warning"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [1, 0.8, 1]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </div>
                                        <div className="tooltip tooltip-left tooltip-warning " data-tip={`${product.soldCount} items sold`}>
                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                <span className="font-bold text-xs sm:text-sm md:text-base text-base-100 group-hover/badge:text-primary-focus transition-colors">
                                                    {product.soldCount > 999
                                                        ? `${(product.soldCount / 1000).toFixed(1)}k`
                                                        : product.soldCount}
                                                </span>
                                                <motion.span
                                                    initial={{ opacity: 0.7 }}
                                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="text-[8px] sm:text-[10px] md:text-xs text-base-content/70 group-hover/badge:text-base-content/90 transition-colors hidden xs:inline"
                                                >
                                                    sold
                                                </motion.span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div className="relative w-full h-full">
                        <Swiper
                            modules={[Autoplay, Pagination, EffectFade, Zoom]}
                            slidesPerView={1}
                            centeredSlides={true}
                            pagination={{
                                clickable: true,
                                bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary',
                                bulletClass: 'swiper-pagination-bullet !bg-base-content/30 !opacity-70'
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            direction={'horizontal'}
                            loop={images.length > 1}
                            effect={'fade'}
                            fadeEffect={{
                                crossFade: true
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                    autoplay: {
                                        delay: 4000
                                    }
                                },
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                    autoplay: {
                                        delay: 3500
                                    }
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                    autoplay: {
                                        delay: 3000
                                    }
                                },
                                1024: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                    autoplay: {
                                        delay: 2500
                                    }
                                }
                            }}
                            grabCursor={true}
                            className="h-full w-full z-[30]"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index} className="w-full h-full">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image}
                                            alt={`${product.name} - Image ${index + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                            priority={rank !== undefined && rank <= 4}
                                            onError={handleImageError}
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Price Overlay - Updated for better responsiveness */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-all duration-700 ease-in-out z-[35] @media (max-width: 640px) { opacity: 100 }">
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 m</div>d:p-4 transform translate-y-4 group-hover:translate-y-0 sm:group-hover:translate-y-0 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-all duration-700 ease-out flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent pointer-events-auto @media (max-width: 640px) { transform: translate-y-0; opacity: 100 }">
                            <div className="flex flex-col gap-1 sm:gap-2">
                                {product.originalPrice && (
                                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                        <span className="text-gray-300 line-through text-xs sm:text-sm md:text-base">
                                            ${product.originalPrice.toFixed(2)}
                                        </span>
                                        <span className="badge badge-xs sm:badge-sm badge-success bg-gradient-to-r from-green-500 to-emerad-600 border-0 animate-pulse text-2xs sm:text-xs md:text-sm">
                                            Save ${(product.originalPrice - product.price).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions - Udated for mobile visibility */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5 sm:gap-2 transform translate-x-12 group-hover:translate-x-0 sm:group-hover:translate-x-0 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-all duration-500 ease-out z-[45] @media (max-width: 640px) { transform: translate-x-0; opacity: 100 }">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAddToWishlist}
                            className="btn btn-circle btn-xs sm:btn-sm md:btn-md bg-base-100/80 hover:bg-base-100 shadow-lg hover:shadow-xl backdrop-blur-md border-0 hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500 group/btn"
                        >
                            <FaHeart className="text-xs sm:text-sm md:text-base text-primary group-hover/btn:text-white transition-colors" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowQuickview(true)}
                            className="btn btn-circle btn-xs sm:btn-sm md:btn-md bg-base-100/80 hover:bg-base-100 shadow-lg hover:shadow-xl backdrop-blur-md border-0 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 group/btn"
                        >
                            <FaEye className="text-xs sm:text-sm md:text-base text-primary group-hover/btn:text-white transition-colors" />
                        </motion.button>
                    </div>

                    {/* Discount Badge - Updated for better responsiveness */}
                    {product.discount && (
                        <motion.div
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 z-[40]"
                        >
                            <div className="badge badge-sm sm:badge-md md:badge-lg gap-1 sm:gap-2 font-bold text-2xs sm:text-sm md:text-base bg-gradient-to-r from-red-500 to-pink-600 border-0 shadow-lg animate-pulse">
                                <span className="text-white">-{product.discount}%</span>
                            </div>
                        </motion.div>
                    )}
                </figure>

                {/* Content Section - Updated for better responsiveness */}
                <div className="card-body p-2 sm:p-4 md:p-6 relative  bg-gradient-to-b from-primary/10 to-secondary/10 hover:bg-transparent backdrop-blur-0  shadow-lg hover:shadow-xl">
                    {/* Brand Logo if available */}
                    {product.brandLogo && (
                        <div className="absolute -top-6 sm:-top-8 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-base-100 rounded-lg sm:rounded-xl p-1.5 sm:p-2 shadow-lg transform -translate-y-1/2">
                            <Image
                                rc={product.brandLogo}
                                alt={product.brand?.name || 'Brand'}
                                fill
                                className="object-contain p-1.5 sm:p-2"
                            />
                        </div>
                    )}

                    {/* Product Name */}
                    <motion.h2
                        className="card-title tooltip tooltip-info z-20 mb-1 sm:mb-2"
                        data-tip={product.name}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Link
                            href={`/product/${product.slug}`}
                            className="text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:text-primary transition-all duration-300 line-clamp-1 hover:bg-gradient-to-r hover:from-primary hover:to-primary-focus hover:bg-clip-text hover:text-transparent"
                        >
                            {product.name}
                        </Link>
                    </motion.h2>

                    {/* Product Badges Row - Improved Responsive Design */}
                    {(product.isNew || product.isFeatured || product.isFreeShipping || product.isDigital) && (
                        <div className="relative h-6 xs:h-7 sm:h-8  mb-1 sm:mb-2">
                            <AnimatePresence mode="wait">
                                {activeBadge === 'new' && product.isNew && (
                                    <motion.div
                                        key="new"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="absolute inset-x-0 flex items-center"
                                    >
                                        <div className="tooltip tooltip-bottom  tooltip-info w-full" data-tip="New product just arrived in our inventory">
                                            <div className="w-full badge badge-success text-[10px] xs:text-xs sm:text-sm h-6 xs:h-7 sm:h-8 truncate gap-1 xs:gap-2 px-1.5 xs:px-2 sm:px-3 font-medium">
                                                <FaWandSparkles className="animate-[spin_2s_ease-in-out_infinite] shrink-0" />
                                                <span className="truncate">New Arrival</span>
                                                {(product.isFeatured || product.isFreeShipping || product.isDigital) && (
                                                    <span className="hidden xs:inline text-[8px] xs:text-[10px] sm:text-xs opacity-75 shrink-0">• more</span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {activeBadge === 'featured' && product.isFeatured && (
                                    <motion.div
                                        key="featured"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="absolute inset-x-0 flex items-center"
                                    >
                                        <div className="tooltip tooltip-bottom  tooltip-info w-full" data-tip="Specially selected for its quality and popularity">
                                            <div className="w-full badge badge-primary text-[10px] xs:text-xs sm:text-sm h-6 xs:h-7 sm:h-8 truncate gap-1 xs:gap-2 px-1.5 xs:px-2 sm:px-3 font-medium bg-gradient-to-r from-primary to-primary-focus">
                                                <FaStar className="animate-[bounce_1s_ease-in-out_infinite] shrink-0" />
                                                <span className="truncate">Featured</span>
                                                {(product.isNew || product.isFreeShipping || product.isDigital) && (
                                                    <span className="hidden xs:inline text-[8px] xs:text-[10px] sm:text-xs opacity-75 shrink-0">• more</span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {activeBadge === 'shipping' && product.isFreeShipping && (
                                    <motion.div
                                        key="shipping"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="absolute inset-x-0 flex items-center"
                                    >
                                        <div className="tooltip tooltip-bottom tooltip-info w-full" data-tip="Ships at no additional cost with expedited delivery">
                                            <div className="w-full badge badge-warning text-[10px] xs:text-xs sm:text-sm h-6 xs:h-7 sm:h-8 truncate gap-1 xs:gap-2 px-1.5 xs:px-2 sm:px-3 font-medium">
                                                <FaTruck className="animate-[slideRight_2s_ease-in-out_infinite] shrink-0" />
                                                <span className="truncate">Free Shipping</span>
                                                {(product.isNew || product.isFeatured || product.isDigital) && (
                                                    <span className="hidden xs:inline text-[8px] xs:text-[10px] sm:text-xs opacity-75 shrink-0">• more</span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {activeBadge === 'digital' && product.isDigital && (
                                    <motion.div
                                        key="digital"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="absolute inset-x-0 flex items-center"
                                    >
                                        <div className="tooltip tooltip-bottom  tooltip-info w-full" data-tip="Download immediately after purchase">
                                            <div className="w-full badge badge-info text-[10px] xs:text-xs sm:text-sm h-6 xs:h-7 sm:h-8 truncate gap-1 xs:gap-2 px-1.5 xs:px-2 sm:px-3 font-medium">
                                                <FaCloud className="animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                                                <span className="truncate">Digital</span>
                                                {(product.isNew || product.isFeatured || product.isFreeShipping) && (
                                                    <span className="hidden xs:inline text-[8px] xs:text-[10px] sm:text-xs opacity-75 shrink-0">• more</span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Brand and Category */}
                    <div className="flex flex-wrap gap-3 justify-between mt-2 text-xs md:text-sm lg:text-base">
                        {product.brand && (
                            <Link
                                href={`/brand/${product.brand.slug}`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-200/50 hover:bg-primary/10 transition-colors duration-300 group/link"
                            >
                                <FaBoxOpen className="text-primary group-hover/link:scale-110 transition-transform" />
                                <span className="group-hover/link:text-primary transition-colors">{product.brand.name}</span>
                            </Link>
                        )}
                        {product.category && (
                            <Link
                                href={`/category/${product.category.slug}`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-200/50 hover:bg-primary/10 transition-colors duration-300 group/link"
                            >
                                <FaTags className="text-primary group-hover/link:scale-110 transition-transform" />
                                <span className="group-hover/link:text-primary transition-colors">{product.category.name}</span>
                            </Link>
                        )}
                    </div>
                    <div className="mt-4 flex justify-between items-center text-xs md:text-sm lg:text-base gap-1">
                        {product.stock > 0 ? (
                            <div className="tooltip tooltip-bottom tooltip-success" data-tip={`${product.stock} in stock`}>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${product.stock <= 10 ? 'bg-warning/10' : 'bg-success/10'}`}>
                                    <FaBoxOpen className={`${product.stock <= 10 ? 'text-warning animate-pulse' : 'text-success'}`} />
                                    <span className={`${product.stock <= 10 ? 'text-warning font-bold animate-pulse truncate ' : 'text-success font-medium'}`}>
                                        {product.stock}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error/10">
                                <FaBoxOpen className="text-error animate-pulse" />
                                <span className="text-error font-medium">Out of Stock</span>
                            </div>
                        )}
                        <div className="tooltip tooltip-info" data-tip={`${product.viewCount} views`}>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-info/10">
                                <FaEye className="text-info" />
                                <span className="text-info font-medium">{product.viewCount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Rating & Add to Cart */}
                    <div className="flex items-center justify-between gap-4 mt-4  text-xs md:text-sm lg:text-base ">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10">
                            <FaStar className="text-warning text-xs md:text-sm lg:text-base" />
                            <span className="font-bold text-warning">{product.rating.toFixed(1)}</span>
                            <div className="tooltip tooltip-info tooltip-right sm:tooltip-none" data-tip={`${product.reviews} reviews`}>
                                <span className="text-base-content/70 text-xs md:text-sm lg:text-base hidden md:block">({product.reviews})</span>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className={`btn ${product.stock === 0
                                ? 'btn-disabled bg-base-300 hover:bg-base-300'
                                : 'bg-gradient-to-r from-primary via-primary-focus to-secondary hover:shadow-lg hover:shadow-primary/30 border-0'
                                } transition-all duration-500 btn-sm xs:btn-md gap-1 xs:gap-2 text-base-100`}
                        >
                            <svg className="w-4 h-4 xs:w-5 xs:h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="hidden sm:inline text-xs md:text-sm lg:text-base">Add to Cart</span>
                        </motion.button>
                    </div>
                </div>

                {/* Active Status Indicator */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        transition: {
                            duration: 2, repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className={`absolute bottom-2 left-2 w-3 h-3 rounded-full tooltip tooltip-right z-[2] ${product.isActive
                        ? 'status status-success animate-pulse tooltip-success'
                        : 'status status-error animate-pulse tooltip-error'
                        }`}
                    data-tip={product.isActive ? 'Active' : 'Inactive'}
                />
            </div>

            <QuickView
                product={product}
                isOpen={showQuickview}
                onClose={() => setShowQuickview(false)}
            />
        </>
    );
}

// Example usage with specs
const exampleProduct = {
    // ...other product properties
    specs: [
        {
            icon: <FaMicrochip className="text-blue-500" />,
            label: "Memory",
            value: "8GB",
            bgColor: "bg-blue-100",
            textColor: "#1d4ed8"
        },
        {
            icon: <FaMemory className="text-purple-500" />,
            label: "Storage",
            value: "512GB",
            bgColor: "bg-purple-100",
            textColor: "#7e22ce"
        }
    ],
    brandLogo: "/brands/apple-logo.png",
    isOutOfStock: false
};