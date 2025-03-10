'use client';

import {
    FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaTiktok, FaLinkedinIn,
    FaWhatsapp, FaTelegram, FaReddit, FaCcVisa, FaCcMastercard, FaCcPaypal,
    FaCcApplePay, FaGooglePay, FaCreditCard, FaMoneyBill, FaBuildingColumns, FaQrcode
} from 'react-icons/fa6';
import { IoMailOpenOutline, IoChevronForward, IoLocationSharp, IoCallSharp } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { useState, ReactNode } from 'react';

// Types
interface SocialLink {
    name: string;
    url: string;
    icon: ReactNode;
    hoverColor: string;
}

interface FooterLink {
    name: string;
    href: string;
}

interface FooterSection {
    title: string;
    icon: ReactNode;
    links: FooterLink[];
}

interface PaymentMethod {
    name: string;
    icon: ReactNode;
}

// Mock data - In real app, this would come from your API/backend
const socialLinks: SocialLink[] = [
    { name: 'Facebook', url: '#', icon: <FaFacebookF className="text-xl" />, hoverColor: 'hover:bg-[#1877F2]' },
    { name: 'Instagram', url: '#', icon: <FaInstagram className="text-xl" />, hoverColor: 'hover:bg-gradient-to-tr from-[#FF5C3B] via-[#C13584] to-[#833AB4]' },
    { name: 'YouTube', url: '#', icon: <FaYoutube className="text-xl" />, hoverColor: 'hover:bg-red-600' },
    { name: 'Twitter', url: '#', icon: <FaTwitter className="text-xl" />, hoverColor: 'hover:bg-black' },
    { name: 'TikTok', url: '#', icon: <FaTiktok className="text-xl" />, hoverColor: 'hover:bg-black' },
    { name: 'LinkedIn', url: '#', icon: <FaLinkedinIn className="text-xl" />, hoverColor: 'hover:bg-blue-700' },
];

const categories = [
    { name: 'Electronics', href: '/category/electronics', count: 120 },
    { name: 'Fashion', href: '/category/fashion', count: 86 },
    { name: 'Home', href: '/category/home', count: 65 },
    { name: 'Sports', href: '/category/sports', count: 43 },
    { name: 'Books', href: '/category/books', count: 92 },
];

const footerSections: FooterSection[] = [
    {
        title: 'Quick Links',
        icon: <IoChevronForward className="text-primary" />,
        links: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Blog', href: '/blog' },
        ]
    },
    {
        title: 'Legal',
        icon: <IoChevronForward className="text-primary" />,
        links: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms & Conditions', href: '/terms' },
            { name: 'Shipping Policy', href: '/shipping' },
            { name: 'Returns Policy', href: '/returns' },
        ]
    }
];

const paymentMethods: PaymentMethod[] = [
    { name: 'Visa', icon: <FaCcVisa className="text-2xl" /> },
    { name: 'Mastercard', icon: <FaCcMastercard className="text-2xl" /> },
    { name: 'PayPal', icon: <FaCcPaypal className="text-2xl" /> },
    { name: 'Apple Pay', icon: <FaCcApplePay className="text-2xl" /> },
    { name: 'Google Pay', icon: <FaGooglePay className="text-2xl" /> },
    { name: 'Credit Card', icon: <FaCreditCard className="text-2xl" /> },
    { name: 'Bank Transfer', icon: <FaBuildingColumns className="text-2xl" /> },
    { name: 'Cash', icon: <FaMoneyBill className="text-2xl" /> },
    { name: 'QR Payment', icon: <FaQrcode className="text-2xl" /> },
];

// Reusable Components
const SocialButton = ({ link }: { link: SocialLink }) => (
    <a
        href={link.url}
        className={`btn btn-ghost tooltip tooltip-info ${link.hoverColor} hover:text-white transition-all duration-300 items-center justify-center flex`}
        data-tip={link.name}
    >
        {link.icon}
    </a>
);

const FooterCategory = ({ name, href, count }: { name: string; href: string; count?: number }) => (
    <li>
        <Link href={href} className="hover:text-primary transition-colors flex items-center gap-2 group">
            <IoChevronForward className="text-xs text-base-content/50 group-hover:text-primary transition-colors" />
            <span>{name}</span>
            {count !== undefined && <span className="badge badge-sm">{count}</span>}
        </Link>
    </li>
);

const FooterSection = ({ title, icon, links }: FooterSection) => (
    <div className="space-y-4">
        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            {icon}
            {title}
        </h4>
        <ul className="space-y-3">
            {links.map((link, index) => (
                <FooterCategory key={index} name={link.name} href={link.href} />
            ))}
        </ul>
    </div>
);

const PaymentMethod = ({ method }: { method: PaymentMethod }) => (
    <div className="tooltip" data-tip={method.name}>
        <span className="opacity-50 hover:opacity-100 transition-opacity">
            {method.icon}
        </span>
    </div>
);

// Main Footer Component
const Footer = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter subscription for:', email);
        setEmail('');
    };

    return (
        <footer className="relative mt-16 backdrop-blur-sm mb-8 p-8 rounded-md bg-gradient-to-t from-primary/10 to-secondary/10">
            {/* Newsletter Section */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-8">
                <div className="backdrop-blur bg-primary/50 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <div className="flex flex-wrap sm:flex-row gap-6 items-center justify-between">
                        <div className="text-primary-content">
                            <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                                <IoMailOpenOutline className="text-2xl" />
                                Subscribe to Our Newsletter
                            </h3>
                            <p className="opacity-90">Stay updated with our latest products and offers</p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="flex-1 min-w-[280px] sm:max-w-sm">
                            <div className="join w-full">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="input input-bordered join-item w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-accent join-item">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container mx-auto pt-24">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Categories Column */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <IoChevronForward className="text-primary" />
                            Popular Categories
                        </h4>
                        <ul className="space-y-3">
                            {categories.map((category, index) => (
                                <FooterCategory
                                    key={index}
                                    name={category.name}
                                    href={category.href}
                                    count={category.count}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Footer Sections */}
                    {footerSections.map((section, index) => (
                        <FooterSection key={index} {...section} />
                    ))}

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <IoCallSharp className="text-primary" />
                            Contact Information
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <IoLocationSharp className="mt-1 text-primary text-lg" />
                                <span>123 Business Street, New York, USA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <IoCallSharp className="text-primary" />
                                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                                    +1 234 567 890
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <IoMailOpenOutline className="text-primary" />
                                <a href="mailto:info@example.com" className="hover:text-primary transition-colors">
                                    info@example.com
                                </a>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {socialLinks.map((link, index) => (
                                <SocialButton key={index} link={link} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-base-300 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Image src="/next.svg" alt="Logo" width={32} height={32} />
                            <span className="text-xl font-bold">AKALINTECH E-Commerce</span>
                        </div>

                        <div className="text-sm text-base-content/60">
                            © {new Date().getFullYear()} AKALINTECH E-Commerce. All rights reserved.
                        </div>

                        {/* Payment Methods */}
                        <div className="flex flex-wrap gap-2">
                            {paymentMethods.map((method, index) => (
                                <PaymentMethod key={index} method={method} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;