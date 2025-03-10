'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaHeart, FaShare, FaTruck, FaShieldHeart, FaRotateLeft, FaMinus, FaPlus } from 'react-icons/fa6';
import { useCart } from '@/app/components/providers/CartProvider';
import { useWishlist } from '@/app/components/providers/WishlistProvider';
import toast from 'react-hot-toast';

export default function ProductPage({ params }: { params: { slug: string } }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('description');
    const { addItem: addToCart } = useCart();
    const { addItem: addToWishlist } = useWishlist();

    // Mock data - Replace with API call using params.slug
    const product = {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 199.99,
        originalPrice: 249.99,
        description: 'Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation and 30-hour battery life.',
        category: 'Electronics',
        brand: 'SoundMaster',
        sku: 'SM-WH-001',
        stock: 15,
        rating: 4.5,
        reviews: 128,
        images: [
            '/product1.jpg',
            '/product1-2.jpg',
            '/product1-3.jpg',
            '/product1-4.jpg'
        ],
        specifications: [
            { name: 'Battery Life', value: '30 hours' },
            { name: 'Bluetooth Version', value: '5.0' },
            { name: 'Noise Cancellation', value: 'Active (ANC)' },
            { name: 'Weight', value: '250g' },
            { name: 'Warranty', value: '2 years' }
        ],
        features: [
            'Active Noise Cancellation',
            'Touch Controls',
            'Voice Assistant Support',
            'Quick Charging',
            'Foldable Design'
        ]
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity
        });
        toast.success('Added to cart!');
    };

    const handleAddToWishlist = () => {
        addToWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            slug: params.slug,
            category: product.category
        });
        toast.success('Added to wishlist!');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Image Gallery */}
                <div className="lg:w-1/2 space-y-4">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, idx) => (
                            <button
                                key={idx}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-transparent'
                                    }`}
                                onClick={() => setSelectedImage(idx)}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2">
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            <p className="text-base-content/70">{product.category} • {product.brand}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-1">
                                {Array(5).fill(0).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-base-300'}
                                    />
                                ))}
                            </div>
                            <Link href="#reviews" className="text-sm hover:underline">
                                {product.reviews} Reviews
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl line-through text-base-content/50">
                                    ${product.originalPrice}
                                </span>
                            )}
                            {product.originalPrice && (
                                <span className="badge badge-success">
                                    Save ${(product.originalPrice - product.price).toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="divider"></div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="font-medium">Quantity:</span>
                            <div className="join">
                                <button
                                    className="join-item btn"
                                    onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    type="number"
                                    className="join-item w-20 input input-bordered text-center"
                                    value={quantity}
                                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                />
                                <button
                                    className="join-item btn"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                className="btn btn-primary flex-1"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="btn btn-circle btn-outline"
                                onClick={handleAddToWishlist}
                            >
                                <FaHeart />
                            </button>
                            <button className="btn btn-circle btn-outline">
                                <FaShare />
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="flex items-center gap-3">
                                <FaTruck className="text-2xl text-primary" />
                                <div>
                                    <h4 className="font-medium">Free Shipping</h4>
                                    <p className="text-sm text-base-content/70">On orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaShieldHeart className="text-2xl text-primary" />
                                <div>
                                    <h4 className="font-medium">2 Year Warranty</h4>
                                    <p className="text-sm text-base-content/70">100% Guarantee</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaRotateLeft className="text-2xl text-primary" />
                                <div>
                                    <h4 className="font-medium">30 Days Return</h4>
                                    <p className="text-sm text-base-content/70">No questions asked</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-16">
                <div className="tabs tabs-bordered">
                    <button
                        className={`tab ${selectedTab === 'description' ? 'tab-active' : ''}`}
                        onClick={() => setSelectedTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={`tab ${selectedTab === 'specifications' ? 'tab-active' : ''}`}
                        onClick={() => setSelectedTab('specifications')}
                    >
                        Specifications
                    </button>
                    <button
                        className={`tab ${selectedTab === 'reviews' ? 'tab-active' : ''}`}
                        onClick={() => setSelectedTab('reviews')}
                    >
                        Reviews
                    </button>
                </div>

                <div className="py-8">
                    {selectedTab === 'description' && (
                        <div className="prose max-w-none">
                            <p>{product.description}</p>
                            <h3>Key Features</h3>
                            <ul>
                                {product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedTab === 'specifications' && (
                        <div className="overflow-x-auto">
                            <table className="table">
                                <tbody>
                                    {product.specifications.map((spec, idx) => (
                                        <tr key={idx}>
                                            <th className="font-medium">{spec.name}</th>
                                            <td>{spec.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {selectedTab === 'reviews' && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">{product.rating}</div>
                                    <div className="flex gap-1 justify-center mb-1">
                                        {Array(5).fill(0).map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-base-300'}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        Based on {product.reviews} reviews
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {[5, 4, 3, 2, 1].map(rating => (
                                        <div key={rating} className="flex items-center gap-4">
                                            <div className="flex gap-1">
                                                {Array(rating).fill(0).map((_, i) => (
                                                    <FaStar key={i} className="text-yellow-400 text-sm" />
                                                ))}
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-base-200 rounded-full">
                                                    <div
                                                        className="h-2 bg-yellow-400 rounded-full"
                                                        style={{ width: `${Math.random() * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-base-content/70">
                                                {Math.floor(Math.random() * 100)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="btn btn-primary">Write a Review</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Add related products here */}
                </div>
            </div>
        </div>
    );
}