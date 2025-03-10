'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaUserGroup, FaTags, FaBox, FaList, FaGrip, FaFilter } from 'react-icons/fa6';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function BrandPage({ params }: { params: { slug: string } }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Mock data - Replace with API call using params.slug
    const brand = {
        name: 'SoundMaster',
        description: 'SoundMaster is a leading audio equipment manufacturer known for high-quality headphones, speakers, and audio accessories. With over 20 years of experience, we deliver premium sound experiences to music enthusiasts worldwide.',
        logo: '/brands/soundmaster.png',
        coverImage: '/brands/soundmaster-cover.jpg',
        stats: {
            products: 45,
            customers: '10K+',
            rating: 4.8,
            reviews: 1250
        },
        founded: 2003,
        headquarters: 'Berlin, Germany',
        website: 'https://soundmaster.example.com',
        social: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            linkedin: '#'
        },
        categories: ['Headphones', 'Speakers', 'Earbuds', 'Accessories']
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[300px] lg:h-[400px]">
                <Image
                    src={brand.coverImage}
                    alt={brand.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent" />
            </div>

            {/* Brand Info */}
            <div className="container mx-auto px-4">
                <div className="relative -mt-20 bg-base-100 rounded-box shadow-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Logo */}
                        <div className="w-32 h-32 rounded-xl bg-base-100 p-4 shadow-lg shrink-0 -mt-16">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-4">{brand.name}</h1>
                            <p className="text-base-content/70 mb-6">{brand.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="stat bg-base-200 rounded-box p-4">
                                    <div className="stat-figure text-primary">
                                        <FaBox className="text-3xl" />
                                    </div>
                                    <div className="stat-title">Products</div>
                                    <div className="stat-value">{brand.stats.products}</div>
                                </div>
                                <div className="stat bg-base-200 rounded-box p-4">
                                    <div className="stat-figure text-primary">
                                        <FaUserGroup className="text-3xl" />
                                    </div>
                                    <div className="stat-title">Customers</div>
                                    <div className="stat-value">{brand.stats.customers}</div>
                                </div>
                                <div className="stat bg-base-200 rounded-box p-4">
                                    <div className="stat-figure text-primary">
                                        <FaStar className="text-3xl" />
                                    </div>
                                    <div className="stat-title">Rating</div>
                                    <div className="stat-value">{brand.stats.rating}</div>
                                </div>
                                <div className="stat bg-base-200 rounded-box p-4">
                                    <div className="stat-figure text-primary">
                                        <FaTags className="text-3xl" />
                                    </div>
                                    <div className="stat-title">Reviews</div>
                                    <div className="stat-value">{brand.stats.reviews}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                <div>
                                    <span className="text-sm text-base-content/70">Founded:</span>
                                    <span className="ml-2 font-medium">{brand.founded}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-base-content/70">Headquarters:</span>
                                    <span className="ml-2 font-medium">{brand.headquarters}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-base-content/70">Website:</span>
                                    <a
                                        href={brand.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-primary hover:underline"
                                    >
                                        {brand.website.replace('https://', '')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex md:flex-col gap-2">
                            <a href={brand.social.facebook} className="btn btn-circle btn-ghost">
                                <FaFacebookF />
                            </a>
                            <a href={brand.social.twitter} className="btn btn-circle btn-ghost">
                                <FaTwitter />
                            </a>
                            <a href={brand.social.instagram} className="btn btn-circle btn-ghost">
                                <FaInstagram />
                            </a>
                            <a href={brand.social.linkedin} className="btn btn-circle btn-ghost">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 my-8">
                    {brand.categories.map((category) => (
                        <button key={category} className="btn btn-outline">
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
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

                        {/* Categories */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="font-bold mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {brand.categories.map(category => (
                                        <label key={category} className="flex items-center gap-2">
                                            <input type="checkbox" className="checkbox checkbox-sm" />
                                            <span>{category}</span>
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

                        {/* Products Grid */}
                        <div className={
                            viewMode === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                        }>
                            {/* Add products here */}
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