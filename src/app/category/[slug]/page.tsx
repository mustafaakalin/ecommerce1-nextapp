'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFilter, FaList, FaGrip, FaChevronRight, FaHeart, FaStar } from 'react-icons/fa6';
import { useCart } from '@/app/components/providers/CartProvider';
import { useWishlist } from '@/app/components/providers/WishlistProvider';
import toast from 'react-hot-toast';

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const { addItem: addToCart } = useCart();
    const { addItem: addToWishlist } = useWishlist();

    // Mock data - Replace with API call using params.slug
    const category = {
        name: 'Electronics',
        description: 'Discover the latest electronics from top brands. From smartphones to laptops, find the perfect tech for your needs.',
        image: '/categories/electronics.jpg',
        stats: {
            products: 1250,
            brands: 45,
            lowestPrice: 9.99,
            highestPrice: 2499.99
        },
        subcategories: [
            { name: 'Smartphones', slug: 'smartphones', count: 328 },
            { name: 'Laptops', slug: 'laptops', count: 245 },
            { name: 'Audio', slug: 'audio', count: 189 },
            { name: 'Gaming', slug: 'gaming', count: 156 },
            { name: 'Cameras', slug: 'cameras', count: 112 },
            { name: 'Accessories', slug: 'accessories', count: 220 }
        ],
        brands: [
            { name: 'Apple', count: 89 },
            { name: 'Samsung', count: 76 },
            { name: 'Sony', count: 65 },
            { name: 'Dell', count: 54 },
            { name: 'LG', count: 48 }
        ],
        topRated: [
            {
                id: '1',
                name: 'Wireless Headphones',
                price: 99.99,
                image: '/products/headphones.jpg',
                rating: 4.8,
                reviews: 256
            },
            // ... more products
        ]
    };

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
            category: category.name
        });
        toast.success('Added to wishlist!');
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[300px] mb-8">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-base-100/90 to-transparent">
                    <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-2xl">
                            <nav className="text-sm mb-4 flex items-center gap-2">
                                <Link href="/" className="hover:text-primary">Home</Link>
                                <FaChevronRight className="text-xs" />
                                <Link href="/categories" className="hover:text-primary">Categories</Link>
                                <FaChevronRight className="text-xs" />
                                <span>{category.name}</span>
                            </nav>
                            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
                            <p className="text-base-content/70">{category.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Category Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="stat bg-base-200 rounded-box">
                        <div className="stat-title">Products</div>
                        <div className="stat-value text-primary">{category.stats.products}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-box">
                        <div className="stat-title">Brands</div>
                        <div className="stat-value text-primary">{category.stats.brands}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-box">
                        <div className="stat-title">Starting From</div>
                        <div className="stat-value text-primary">${category.stats.lowestPrice}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-box">
                        <div className="stat-title">Up To</div>
                        <div className="stat-value text-primary">${category.stats.highestPrice}</div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className={`w-full lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="flex lg:hidden justify-between items-center mb-4">
                            <h3 className="font-bold">Filters</h3>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => setShowFilters(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Subcategories */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="font-bold mb-4">Subcategories</h3>
                                <div className="space-y-2">
                                    {category.subcategories.map((subcat) => (
                                        <Link
                                            key={subcat.slug}
                                            href={`/category/${params.slug}/${subcat.slug}`}
                                            className="flex items-center justify-between hover:text-primary transition-colors"
                                        >
                                            <span>{subcat.name}</span>
                                            <span className="badge badge-sm">{subcat.count}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="font-bold mb-4">Brands</h3>
                                <div className="space-y-2">
                                    {category.brands.map((brand) => (
                                        <label key={brand.name} className="flex items-center gap-2">
                                            <input type="checkbox" className="checkbox checkbox-sm" />
                                            <span>{brand.name}</span>
                                            <span className="text-sm text-base-content/70">({brand.count})</span>
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
                                    <div className="flex justify-between text-sm">
                                        <span>${category.stats.lowestPrice}</span>
                                        <span>${category.stats.highestPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="font-bold mb-4">Rating</h3>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1].map((rating) => (
                                        <label key={rating} className="flex items-center gap-2">
                                            <input type="checkbox" className="checkbox checkbox-sm" />
                                            <div className="flex gap-1">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={i < rating ? 'text-yellow-400' : 'text-base-300'}
                                                        size={12}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-base-content/70">& Up</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <button
                                    className="btn btn-ghost lg:hidden"
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

                        {/* Top Rated Products */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Top Rated Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.topRated.map((product) => (
                                    <div key={product.id} className="card bg-base-100 shadow-xl">
                                        <figure className="relative">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={300}
                                                height={300}
                                                className="w-full h-[200px] object-cover"
                                            />
                                            <button
                                                className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost bg-base-100"
                                                onClick={() => handleAddToWishlist(product)}
                                            >
                                                <FaHeart />
                                            </button>
                                        </figure>
                                        <div className="card-body">
                                            <Link
                                                href={`/product/${product.id}`}
                                                className="card-title hover:text-primary transition-colors"
                                            >
                                                {product.name}
                                            </Link>
                                            <div className="flex items-center gap-2">
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
                                                <span className="text-xl font-bold">${product.price}</span>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className={
                            viewMode === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                        }>
                            {/* Add products grid/list here */}
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
        </div>
    );
}