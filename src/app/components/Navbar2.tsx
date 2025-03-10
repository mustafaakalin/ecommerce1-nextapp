'use client';

import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiTruck, FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const announcements = [
    { id: 1, text: "Free shipping for orders over $50! 🚚", icon: <FiTruck className="w-4 h-4" /> },
    { id: 2, text: "New Summer Collection Available Now! 🌞", icon: "🎉" },
    { id: 3, text: "Limited Time Offer: 20% off on Electronics! ⚡", icon: "💫" },
];

const categories = [
    {
        id: 1,
        name: "Electronics",
        icon: "💻",
        subCategories: [
            {
                name: "Computers",
                items: ["Laptops", "Desktop PCs", "Monitors", "Accessories"]
            },
            {
                name: "Phones & Tablets",
                items: ["Smartphones", "Tablets", "Accessories", "Wearables"]
            },
            {
                name: "Gaming",
                items: ["Consoles", "Games", "Accessories", "Virtual Reality"]
            }
        ]
    },
    {
        id: 2,
        name: "Fashion",
        icon: "👕",
        subCategories: [
            {
                name: "Men",
                items: ["Clothing", "Shoes", "Accessories", "Sportswear"]
            },
            {
                name: "Women",
                items: ["Clothing", "Shoes", "Accessories", "Beauty"]
            },
            {
                name: "Kids",
                items: ["Boys", "Girls", "Baby", "Toys"]
            }
        ]
    }
];

const Navbar2 = () => {
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentAnnouncementIndex((prev) =>
                prev === announcements.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue.trim()) {
            // Implement search functionality
            console.log('Searching for:', searchValue);
            setSearchValue(''); // Clear the search input after submission
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchValue.trim()) {
                console.log('Searching for:', searchValue);
                setSearchValue(''); // Clear the search input after Enter key
            }
        } else if (e.key === 'Escape') {
            setSearchValue(''); // Clear the search input on Escape key
        }
    };

    return (
        <div className="w-full bg-base-200 shadow-lg">
            {/* Announcement Bar */}
            <div className="bg-primary/10 text-base-content backdrop-blur-sm py-1.5  rounded-xl">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="navbar-start flex-1 flex items-center space-x-4">
                            <div className="hidden sm:flex items-center space-x-4">
                                <Link href="/track-order" className="text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1">
                                    <FiTruck className="w-4 h-4" /> Track Order
                                </Link>
                                <span className="text-base-content/30">|</span>
                                <Link href="/notifications" className="text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1">
                                    <IoNotificationsOutline className="w-4 h-4" /> Notifications
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 text-center overflow-hidden">
                            <div className="relative h-6 overflow-hidden">
                                {announcements.map((announcement, index) => (
                                    <div
                                        key={announcement.id}
                                        className={`absolute w-full transition-all duration-500 flex items-center justify-center gap-2 transform ${index === currentAnnouncementIndex
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-8 opacity-0'
                                            }`}
                                    >
                                        <span className="text-sm font-medium inline-flex items-center gap-1.5">
                                            {typeof announcement.icon === 'string' ? announcement.icon : announcement.icon}
                                            {announcement.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="navbar-end flex-1 justify-end">
                            <div className="hidden sm:flex items-center space-x-4">
                                <select className="select select-ghost select-xs">
                                    <option>🇺🇸 USD</option>
                                    <option>🇪🇺 EUR</option>
                                    <option>🇬🇧 GBP</option>
                                </select>
                                <select className="select select-ghost select-xs">
                                    <option>English</option>
                                    <option>Türkçe</option>
                                    <option>Español</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Categories Mega Menu */}
            <div className="bg-base-100/80 backdrop-blur-sm border-t">
                <div className="container mx-auto">
                    {/* Mobile Menu */}


                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8 py-2">
                        {categories.map((category) => (
                            <div key={category.id} className="dropdown dropdown-hover">
                                <button
                                    className="btn btn-ghost hover:bg-primary/10"
                                    onMouseEnter={() => setActiveMegaMenu(category.id)}
                                >
                                    <span className="mr-1">{category.icon}</span>
                                    {category.name}
                                    <MdKeyboardArrowDown className="transition-transform group-hover:rotate-180" />
                                </button>
                                <div className="dropdown-content z-[1] card card-compact w-[800px] p-4 shadow-xl bg-base-100 mt-1">
                                    <div className="card-body">
                                        <div className="grid grid-cols-3 gap-6">
                                            {category.subCategories.map((subCat, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    <h3 className="font-medium text-lg text-primary">{subCat.name}</h3>
                                                    <ul className="space-y-2">
                                                        {subCat.items.map((item, i) => (
                                                            <li key={i}>
                                                                <Link
                                                                    href={`/category/${item.toLowerCase()}`}
                                                                    className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                                                                >
                                                                    <span>{item}</span>
                                                                    <MdKeyboardArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Quick Links */}
                        <div className="flex items-center space-x-4 border-l pl-4">
                            <Link href="/deals" className="btn btn-ghost btn-sm hover:bg-primary/10">Today's Deals</Link>
                            <Link href="/new-arrivals" className="btn btn-ghost btn-sm hover:bg-primary/10">New Arrivals</Link>
                            <Link href="/trending" className="btn btn-ghost btn-sm hover:bg-primary/10">Trending</Link>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar2;
