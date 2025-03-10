'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaTags, FaBoxOpen, FaStar } from 'react-icons/fa6';

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    Browse our wide selection of products across various categories. Find exactly what you're looking for with ease.
                </p>
            </div>

            {/* Main Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {mainCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all group"
                    >
                        <figure className="relative h-48">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
                                <p className="text-white/90">{category.productCount} Products</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <FaBoxOpen className="text-primary" />
                                        <span>{category.brands} Brands</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaTags className="text-primary" />
                                        <span>Up to {category.maxDiscount}% Off</span>
                                    </div>
                                </div>
                                <button className="btn btn-circle btn-primary btn-sm">
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Subcategories */}
            <div className="space-y-12">
                {mainCategories.map((category) => (
                    <section key={category.id}>
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                                <p className="text-base-content/70">Explore {category.name.toLowerCase()} subcategories</p>
                            </div>
                            <Link
                                href={`/category/${category.slug}`}
                                className="btn btn-ghost gap-2"
                            >
                                View All <FaArrowRight />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {category.subcategories.map((subcat, idx) => (
                                <Link
                                    key={idx}
                                    href={`/category/${category.slug}/${subcat.slug}`}
                                    className="card bg-base-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="card-body p-4">
                                        <div className="flex items-start gap-4">
                                            <span className="text-3xl">{subcat.icon}</span>
                                            <div>
                                                <h3 className="font-medium mb-1">{subcat.name}</h3>
                                                <span className="text-sm text-base-content/70">
                                                    {subcat.productCount} Products
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Popular Collections */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Popular Collections</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {popularCollections.map((collection) => (
                        <Link
                            key={collection.id}
                            href={collection.href}
                            className="card image-full shadow-xl hover:shadow-2xl transition-shadow group"
                        >
                            <figure>
                                <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-[200px] object-cover"
                                />
                            </figure>
                            <div className="card-body justify-end">
                                <h3 className="card-title text-white mb-2">
                                    {collection.name}
                                </h3>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <FaStar className="text-yellow-400" />
                                        <span className="text-white/90">{collection.rating} Rating</span>
                                    </div>
                                    <FaArrowRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Mock data - Replace with API calls
const mainCategories = [
    {
        id: 1,
        name: 'Electronics',
        slug: 'electronics',
        image: '/categories/electronics.jpg',
        productCount: 1250,
        brands: 45,
        maxDiscount: 50,
        subcategories: [
            { name: 'Smartphones', slug: 'smartphones', icon: '📱', productCount: 328 },
            { name: 'Laptops', slug: 'laptops', icon: '💻', productCount: 245 },
            { name: 'Audio', slug: 'audio', icon: '🎧', productCount: 189 },
            { name: 'Gaming', slug: 'gaming', icon: '🎮', productCount: 156 }
        ]
    },
    {
        id: 2,
        name: 'Fashion',
        slug: 'fashion',
        image: '/categories/fashion.jpg',
        productCount: 2800,
        brands: 128,
        maxDiscount: 70,
        subcategories: [
            { name: "Men's Wear", slug: 'mens-wear', icon: '👔', productCount: 856 },
            { name: "Women's Wear", slug: 'womens-wear', icon: '👗', productCount: 1024 },
            { name: 'Accessories', slug: 'accessories', icon: '👜', productCount: 567 },
            { name: 'Shoes', slug: 'shoes', icon: '👟', productCount: 353 }
        ]
    },
    {
        id: 3,
        name: 'Home & Living',
        slug: 'home-living',
        image: '/categories/home.jpg',
        productCount: 1800,
        brands: 75,
        maxDiscount: 60,
        subcategories: [
            { name: 'Furniture', slug: 'furniture', icon: '🪑', productCount: 452 },
            { name: 'Decor', slug: 'decor', icon: '🏡', productCount: 634 },
            { name: 'Kitchen', slug: 'kitchen', icon: '🍳', productCount: 389 },
            { name: 'Lighting', slug: 'lighting', icon: '💡', productCount: 325 }
        ]
    }
];

const popularCollections = [
    {
        id: 1,
        name: 'Gaming Essentials',
        href: '/collection/gaming-essentials',
        image: '/collections/gaming.jpg',
        rating: 4.8
    },
    {
        id: 2,
        name: 'Summer Fashion',
        href: '/collection/summer-fashion',
        image: '/collections/summer.jpg',
        rating: 4.6
    },
    {
        id: 3,
        name: 'Smart Home',
        href: '/collection/smart-home',
        image: '/collections/smart-home.jpg',
        rating: 4.7
    }
];