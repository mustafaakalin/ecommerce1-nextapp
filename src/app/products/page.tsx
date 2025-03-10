'use client';

import { useState } from 'react';
import { FaList, FaGrip, FaFilter, FaStar, FaHeart } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/components/providers/CartProvider';
import { useWishlist } from '@/app/components/providers/WishlistProvider';
import toast from 'react-hot-toast';

export default function ProductsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const { addItem: addToCart } = useCart();
    const { addItem: addToWishlist } = useWishlist();

    const handleAddToCart = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        toast.success('Added to cart!');
    };

    const handleAddToWishlist = (product: any) => {
        addToWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            slug: product.slug,
            category: product.category
        });
        toast.success('Added to wishlist!');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className={`w-full md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <div className="flex md:hidden justify-between items-center mb-4">
                        <h3 className="font-bold">Filters</h3>
                        <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => setShowFilters(false)}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="font-bold mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <label key={category.id} className="flex items-center gap-2">
                                        <input type="checkbox" className="checkbox checkbox-sm" />
                                        <span>{category.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="font-bold mb-4">Price Range</h3>
                            <div className="space-y-4">
                                <input type="range" className="range range-primary" />
                                <div className="flex justify-between">
                                    <span>$0</span>
                                    <span>$1000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ratings */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="font-bold mb-4">Rating</h3>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map(rating => (
                                    <label key={rating} className="flex items-center gap-2">
                                        <input type="checkbox" className="checkbox checkbox-sm" />
                                        <div className="flex gap-1">
                                            {Array(rating).fill(0).map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-sm" />
                                            ))}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                className="btn btn-ghost md:hidden"
                                onClick={() => setShowFilters(true)}
                            >
                                <FaFilter /> Filters
                            </button>
                            <select className="select select-bordered select-sm">
                                <option>Most Popular</option>
                                <option>Newest First</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-base-content/70">
                                Showing {products.length} products
                            </span>
                            <div className="btn-group">
                                <button
                                    className={`btn btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <FaGrip />
                                </button>
                                <button
                                    className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className={
                        viewMode === 'grid'
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-4"
                    }>
                        {products.map(product => (
                            <div
                                key={product.id}
                                className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow ${viewMode === 'list' ? 'flex-row' : ''
                                    }`}
                            >
                                <figure className={viewMode === 'list' ? 'w-48' : ''}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className="card-title hover:text-primary transition-colors"
                                    >
                                        {product.name}
                                    </Link>
                                    <p className="text-sm text-base-content/70">{product.category}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex gap-1">
                                            {Array(5).fill(0).map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={i < product.rating ? 'text-yellow-400' : 'text-base-300'}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-base-content/70">
                                            ({product.reviews})
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-2xl font-bold">${product.price}</span>
                                        <div className="card-actions">
                                            <button
                                                className="btn btn-circle btn-ghost"
                                                onClick={() => handleAddToWishlist(product)}
                                            >
                                                <FaHeart />
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <div className="join">
                            <button className="join-item btn">«</button>
                            <button className="join-item btn btn-active">1</button>
                            <button className="join-item btn">2</button>
                            <button className="join-item btn">3</button>
                            <button className="join-item btn">»</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Mock data - Replace with API calls
const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Home & Living' },
    { id: 4, name: 'Sports' },
    { id: 5, name: 'Books' },
];

const products = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        category: 'Electronics',
        image: '/product1.jpg',
        slug: 'wireless-headphones',
        rating: 4,
        reviews: 128
    },
    {
        id: '2',
        name: 'Cotton T-Shirt',
        price: 24.99,
        category: 'Fashion',
        image: '/product2.jpg',
        slug: 'cotton-tshirt',
        rating: 5,
        reviews: 89
    },
    // Add more products...
];