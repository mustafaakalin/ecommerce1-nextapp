'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

export default function BrandsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Brands</h1>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    Discover premium brands curated just for you. We partner with the best to bring you quality products.
                </p>
            </div>

            {/* Featured Brands */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {featuredBrands.map((brand) => (
                    <Link
                        key={brand.id}
                        href={`/brand/${brand.slug}`}
                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow group"
                    >
                        <figure className="relative h-40">
                            <Image
                                src={brand.coverImage}
                                alt={brand.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="btn btn-primary">View Products</span>
                            </div>
                        </figure>
                        <div className="card-body">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-base-100 p-2 shadow-lg">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="card-title">{brand.name}</h2>
                                    <p className="text-base-content/70">{brand.products} Products</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* All Brands */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold">All Brands</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {allBrands.map((brand) => (
                        <Link
                            key={brand.id}
                            href={`/brand/${brand.slug}`}
                            className="card bg-base-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="card-body items-center text-center p-4">
                                <div className="w-16 h-16 mb-2">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="font-medium">{brand.name}</h3>
                                <span className="text-sm text-base-content/70">
                                    {brand.products} Products
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Brand Categories */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {brandCategories.map((category) => (
                        <div key={category.name} className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="card-title">{category.name}</h3>
                                <ul className="space-y-2 mt-4">
                                    {category.brands.map((brand) => (
                                        <li key={brand}>
                                            <Link
                                                href={`/brand/${brand.toLowerCase().replace(' ', '-')}`}
                                                className="flex items-center gap-2 hover:text-primary transition-colors"
                                            >
                                                {brand} <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Mock data - Replace with API calls
const featuredBrands = [
    {
        id: 1,
        name: 'SoundMaster',
        slug: 'soundmaster',
        logo: '/brands/soundmaster.png',
        coverImage: '/brands/soundmaster-cover.jpg',
        products: 45
    },
    {
        id: 2,
        name: 'Fashionista',
        slug: 'fashionista',
        logo: '/brands/fashionista.png',
        coverImage: '/brands/fashionista-cover.jpg',
        products: 128
    },
    {
        id: 3,
        name: 'TechPro',
        slug: 'techpro',
        logo: '/brands/techpro.png',
        coverImage: '/brands/techpro-cover.jpg',
        products: 89
    }
];

const allBrands = [
    ...featuredBrands,
    {
        id: 4,
        name: 'SportX',
        slug: 'sportx',
        logo: '/brands/sportx.png',
        products: 64
    },
    {
        id: 5,
        name: 'HomeStyle',
        slug: 'homestyle',
        logo: '/brands/homestyle.png',
        products: 92
    },
    // Add more brands...
];

const brandCategories = [
    {
        name: 'Electronics',
        brands: ['SoundMaster', 'TechPro', 'SmartLife', 'PowerTech']
    },
    {
        name: 'Fashion',
        brands: ['Fashionista', 'StyleCo', 'Trendy', 'LuxMode']
    },
    {
        name: 'Sports',
        brands: ['SportX', 'ActiveGear', 'FitLife', 'ProSports']
    },
    {
        name: 'Home & Living',
        brands: ['HomeStyle', 'ComfortZone', 'LivingLux', 'HomeEssentials']
    }
];