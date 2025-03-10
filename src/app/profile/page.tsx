'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaUser, FaBox, FaHeart, FaAddressCard, FaCreditCard, FaBell, FaGear, FaChevronRight } from 'react-icons/fa6';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data - Replace with API calls
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/avatars/default.jpg',
        joined: '2023',
        stats: {
            orders: 12,
            wishlist: 8,
            reviews: 5,
            points: 240
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-64 space-y-6">
                    {/* Profile Card */}
                    <div className="card bg-base-100 shadow">
                        <div className="card-body items-center text-center">
                            <div className="avatar">
                                <div className="w-24 h-24 rounded-full">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={96}
                                        height={96}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                            <h2 className="card-title mt-4">{user.name}</h2>
                            <p className="text-sm text-base-content/70">Member since {user.joined}</p>
                            <button className="btn btn-outline btn-sm mt-4">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="card bg-base-100 shadow">
                        <div className="card-body p-2">
                            <nav className="menu menu-md">
                                <button
                                    className={`menu-item flex items-center gap-3 px-4 py-3 ${activeTab === 'overview' ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    <FaUser /> Overview
                                </button>
                                <button
                                    className={`menu-item flex items-center gap-3 px-4 py-3 ${activeTab === 'orders' ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    <FaBox /> Orders
                                </button>
                                <button
                                    className={`menu-item flex items-center gap-3 px-4 py-3 ${activeTab === 'wishlist' ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveTab('wishlist')}
                                >
                                    <FaHeart /> Wishlist
                                </button>
                                <button
                                    className={`menu-item flex items-center gap-3 px-4 py-3 ${activeTab === 'addresses' ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveTab('addresses')}
                                >
                                    <FaAddressCard /> Addresses
                                </button>
                                <button
                                    className={`menu-item flex items-center gap-3 px-4 py-3 ${activeTab === 'payments' ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveTab('payments')}
                                >
                                    <FaCreditCard /> Payment Methods
                                </button>
                                <button
                                    className={`menu-item flex items-center gap-3 px-4 py-3 ${activeTab === 'notifications' ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveTab('notifications')}
                                >
                                    <FaBell /> Notifications
                                </button>
                                <button
                                    className={`menu-item flex items-center gap-3 px-4 py-3 ${activeTab === 'settings' ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveTab('settings')}
                                >
                                    <FaGear /> Settings
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body">
                                        <div className="stat">
                                            <div className="stat-title">Orders</div>
                                            <div className="stat-value">{user.stats.orders}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body">
                                        <div className="stat">
                                            <div className="stat-title">Wishlist</div>
                                            <div className="stat-value">{user.stats.wishlist}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body">
                                        <div className="stat">
                                            <div className="stat-title">Reviews</div>
                                            <div className="stat-value">{user.stats.reviews}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body">
                                        <div className="stat">
                                            <div className="stat-title">Points</div>
                                            <div className="stat-value">{user.stats.points}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <h2 className="card-title">Recent Orders</h2>
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentOrders.map((order) => (
                                                    <tr key={order.id}>
                                                        <td>#{order.id}</td>
                                                        <td>{order.date}</td>
                                                        <td>
                                                            <div className={`badge ${getBadgeColor(order.status)}`}>
                                                                {order.status}
                                                            </div>
                                                        </td>
                                                        <td>${order.total}</td>
                                                        <td>
                                                            <button className="btn btn-ghost btn-sm">
                                                                <FaChevronRight />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Recently Viewed */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <h2 className="card-title">Recently Viewed</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {recentlyViewed.map((product) => (
                                            <div key={product.id} className="card bg-base-200">
                                                <figure className="px-4 pt-4">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={200}
                                                        height={200}
                                                        className="rounded-xl"
                                                    />
                                                </figure>
                                                <div className="card-body p-4">
                                                    <h3 className="card-title text-sm">{product.name}</h3>
                                                    <p className="text-primary">${product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'orders' && (
                        <div className="card bg-base-100 shadow">
                            <div className="card-body">
                                <h2 className="card-title mb-6">Order History</h2>
                                {/* Add order history content */}
                            </div>
                        </div>
                    )}

                    {/* Add other tab contents */}
                </div>
            </div>
        </div>
    );
}

// Helper function for order status badges
function getBadgeColor(status: string) {
    switch (status.toLowerCase()) {
        case 'delivered':
            return 'badge-success';
        case 'processing':
            return 'badge-warning';
        case 'cancelled':
            return 'badge-error';
        default:
            return 'badge-info';
    }
}

// Mock data
const recentOrders = [
    {
        id: 'ORD001',
        date: '2024-05-01',
        status: 'Delivered',
        total: 129.99
    },
    {
        id: 'ORD002',
        date: '2024-04-28',
        status: 'Processing',
        total: 79.99
    },
    {
        id: 'ORD003',
        date: '2024-04-25',
        status: 'Cancelled',
        total: 199.99
    }
];

const recentlyViewed = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: '/products/headphones.jpg'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: '/products/watch.jpg'
    },
    {
        id: 3,
        name: 'Running Shoes',
        price: 79.99,
        image: '/products/shoes.jpg'
    },
    {
        id: 4,
        name: 'Backpack',
        price: 49.99,
        image: '/products/backpack.jpg'
    }
];