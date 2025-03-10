'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaTag, FaPercent, FaHeart, FaStar } from 'react-icons/fa6';
import { useCart } from '@/app/components/providers/CartProvider';
import { useWishlist } from '@/app/components/providers/WishlistProvider';
import toast from 'react-hot-toast';

export default function CampaignPage({ params }: { params: { slug: string } }) {
    const [showFilters, setShowFilters] = useState(false);
    const { addItem: addToCart } = useCart();
    const { addItem: addToWishlist } = useWishlist();

    // Mock data - Replace with API call using params.slug
    const campaign = {
        title: 'Summer Collection 2024',
        description: 'Get ready for summer with our latest collection featuring trendy outfits, accessories, and more. Limited time offers with up to 50% off on selected items.',
        image: '/campaigns/summer.jpg',
        endDate: '2024-08-31',
        highlights: [
            { title: 'Up to 50% Off', icon: <FaPercent /> },
            { title: 'Free Shipping', icon: <FaTag /> },
            { title: '30-Day Returns', icon: <FaClock /> }
        ],
        categories: ['Fashion', 'Accessories', 'Footwear', 'Beachwear'],
        brands: ['StyleCo', 'Fashionista', 'TrendyWear', 'SummerVibes']
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
            category: product.category
        });
        toast.success('Added to wishlist!');
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[400px]">
                <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-base-100/90 to-transparent">
                    <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-2xl space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold">{campaign.title}</h1>
                            <p className="text-base-content/70 text-lg">{campaign.description}</p>

                            {/* Countdown Timer */}
                            <div className="flex items-center gap-4 text-primary">
                                <FaClock className="text-xl" />
                                <div className="font-mono text-lg">
                                    Ends in: <span>30d 15h 45m 20s</span>
                                </div>
                            </div>

                            {/* Campaign Highlights */}
                            <div className="flex flex-wrap gap-4">
                                {campaign.highlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-base-200 rounded-full px-4 py-2"
                                    >
                                        {highlight.icon}
                                        <span>{highlight.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Quick Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="join">
                        <button className="btn join-item btn-active">All</button>
                        {campaign.categories.map((category, index) => (
                            <button key={index} className="btn join-item">
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {campaignProducts.map((product) => (
                        <div key={product.id} className="card bg-base-100 shadow-xl">
                            <figure className="relative">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-[200px] object-cover"
                                />
                                {/* Discount Badge */}
                                <div className="absolute top-2 left-2">
                                    <div className="badge badge-primary">-{product.discount}%</div>
                                </div>
                                {/* Quick Actions */}
                                <div className="absolute top-2 right-2">
                                    <button
                                        className="btn btn-circle btn-sm btn-ghost bg-base-100"
                                        onClick={() => handleAddToWishlist(product)}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title text-lg">
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="text-sm text-base-content/70">{product.brand}</p>
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
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xl font-bold">${product.price}</span>
                                    <span className="text-base-content/50 line-through">
                                        ${product.originalPrice}
                                    </span>
                                </div>
                                <div className="card-actions mt-4">
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                    <button className="btn btn-outline">
                        Load More Products
                    </button>
                </div>

                {/* Featured Brands */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Featured Brands</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {campaign.brands.map((brand, index) => (
                            <Link
                                key={index}
                                href={`/brand/${brand.toLowerCase()}`}
                                className="card bg-base-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="card-body items-center text-center p-6">
                                    <Image
                                        src={`/brands/${brand.toLowerCase()}.png`}
                                        alt={brand}
                                        width={100}
                                        height={100}
                                        className="w-16 h-16 object-contain mb-4"
                                    />
                                    <h3 className="font-medium">{brand}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

// Mock data - Replace with API calls
const campaignProducts = [
    {
        id: '1',
        name: 'Summer Floral Dress',
        brand: 'StyleCo',
        price: 49.99,
        originalPrice: 89.99,
        discount: 44,
        image: '/products/dress1.jpg',
        slug: 'summer-floral-dress',
        rating: 4,
        reviews: 28
    },
    {
        id: '2',
        name: 'Beach Sandals',
        brand: 'SummerVibes',
        price: 29.99,
        originalPrice: 49.99,
        discount: 40,
        image: '/products/sandals1.jpg',
        slug: 'beach-sandals',
        rating: 5,
        reviews: 42
    },
    // Add more products...
];