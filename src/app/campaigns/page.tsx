'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaTag, FaFire } from 'react-icons/fa6';

export default function CampaignsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Banner */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12">
                <Image
                    src="/campaigns/mega-sale.jpg"
                    alt="Mega Sale"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/20 flex items-center">
                    <div className="p-8 md:p-12 lg:p-16">
                        <div className="max-w-2xl space-y-6">
                            <span className="badge badge-secondary gap-2">
                                <FaFire /> Hot Deal
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Mega Summer Sale
                            </h1>
                            <p className="text-white/90 text-lg">
                                Get up to 70% off on selected items. Limited time offer!
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/products" className="btn btn-secondary">
                                    Shop Now
                                </Link>
                                <Link href="#all-campaigns" className="btn btn-outline text-white hover:text-white">
                                    View All Campaigns
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flash Sales */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">⚡ Flash Sales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {flashSales.map((sale) => (
                        <div key={sale.id} className="card bg-base-100 shadow-xl">
                            <figure className="relative h-48">
                                <Image
                                    src={sale.image}
                                    alt={sale.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Countdown Timer */}
                                <div className="absolute top-4 right-4">
                                    <div className="bg-base-100 rounded-full px-4 py-2 flex items-center gap-2">
                                        <FaClock className="text-primary" />
                                        <span className="font-mono">{sale.timeLeft}</span>
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title">{sale.title}</h3>
                                <p className="text-base-content/70">{sale.description}</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <span className="text-2xl font-bold">{sale.discount}% OFF</span>
                                    <div className="flex-1 bg-base-200 rounded-full h-2">
                                        <div
                                            className="bg-primary rounded-full h-2"
                                            style={{ width: `${sale.claimed}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-base-content/70">
                                        {sale.claimed}% Claimed
                                    </span>
                                </div>
                                <div className="card-actions mt-4">
                                    <Link href={`/campaign/${sale.slug}`} className="btn btn-primary btn-block">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Category Deals */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">🎯 Category Deals</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryDeals.map((deal) => (
                        <Link
                            key={deal.id}
                            href={`/campaign/${deal.slug}`}
                            className="card bg-base-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="card-body items-center text-center gap-4">
                                <span className="text-4xl">{deal.icon}</span>
                                <h3 className="card-title">{deal.category}</h3>
                                <div className="badge badge-primary gap-2">
                                    <FaTag />
                                    Up to {deal.discount}% Off
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* All Campaigns */}
            <section id="all-campaigns">
                <h2 className="text-3xl font-bold mb-8">📢 All Active Campaigns</h2>
                <div className="space-y-6">
                    {campaigns.map((campaign) => (
                        <Link
                            key={campaign.id}
                            href={`/campaign/${campaign.slug}`}
                            className="group block"
                        >
                            <div className="card lg:card-side bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                                <figure className="relative h-48 lg:w-72">
                                    <Image
                                        src={campaign.image}
                                        alt={campaign.title}
                                        fill
                                        className="object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h3 className="card-title text-2xl group-hover:text-primary transition-colors">
                                                {campaign.title}
                                            </h3>
                                            <p className="text-base-content/70 mt-2">
                                                {campaign.description}
                                            </p>
                                        </div>
                                        <div className="shrink-0">
                                            <div className="badge badge-lg">
                                                {campaign.dateRange}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-between items-center mt-4">
                                        <div className="flex gap-4">
                                            {campaign.tags.map((tag, index) => (
                                                <span key={index} className="badge badge-outline">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="btn btn-primary">
                                            View Details
                                        </button>
                                    </div>
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
const flashSales = [
    {
        id: 1,
        title: 'Premium Headphones',
        description: 'High-end wireless headphones with noise cancellation',
        image: '/campaigns/flash1.jpg',
        timeLeft: '02:45:30',
        discount: 40,
        claimed: 75,
        slug: 'premium-headphones-flash'
    },
    {
        id: 2,
        title: 'Smart Watches',
        description: 'Track your fitness with style',
        image: '/campaigns/flash2.jpg',
        timeLeft: '05:30:00',
        discount: 30,
        claimed: 45,
        slug: 'smart-watches-flash'
    },
    {
        id: 3,
        title: 'Designer Bags',
        description: 'Luxury bags from top brands',
        image: '/campaigns/flash3.jpg',
        timeLeft: '01:15:45',
        discount: 50,
        claimed: 85,
        slug: 'designer-bags-flash'
    }
];

const categoryDeals = [
    {
        id: 1,
        category: 'Electronics',
        icon: '💻',
        discount: 40,
        slug: 'electronics-sale'
    },
    {
        id: 2,
        category: 'Fashion',
        icon: '👕',
        discount: 50,
        slug: 'fashion-sale'
    },
    {
        id: 3,
        category: 'Home',
        icon: '🏠',
        discount: 35,
        slug: 'home-sale'
    },
    {
        id: 4,
        category: 'Sports',
        icon: '⚽',
        discount: 45,
        slug: 'sports-sale'
    }
];

const campaigns = [
    {
        id: 1,
        title: 'Summer Collection 2024',
        description: 'Get ready for summer with our latest collection. Find the perfect outfits for your vacation.',
        image: '/campaigns/summer.jpg',
        dateRange: 'Jun 1 - Aug 31',
        tags: ['Fashion', 'Summer', 'Trending'],
        slug: 'summer-2024'
    },
    {
        id: 2,
        title: 'Tech Week',
        description: 'Massive discounts on the latest gadgets and electronics. Upgrade your tech game now.',
        image: '/campaigns/tech.jpg',
        dateRange: 'May 15 - May 22',
        tags: ['Electronics', 'Gadgets', 'Smart Home'],
        slug: 'tech-week'
    },
    {
        id: 3,
        title: 'Home Makeover Sale',
        description: 'Transform your living space with amazing deals on furniture and home decor.',
        image: '/campaigns/home.jpg',
        dateRange: 'May 1 - May 31',
        tags: ['Home & Living', 'Furniture', 'Decor'],
        slug: 'home-makeover'
    }
];