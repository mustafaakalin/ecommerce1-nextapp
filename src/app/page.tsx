'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaStar, FaHeart, FaCartShopping, FaPercent, FaTruck, FaShieldHeart, FaRotateLeft } from 'react-icons/fa6';
import { useCart } from './components/providers/CartProvider';
import { useWishlist } from './components/providers/WishlistProvider';
import toast from 'react-hot-toast';
import ProductCard from './components/products/ProductCard';
import { image } from 'framer-motion/client';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist } = useWishlist();

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      {/* Hero Slider */}
      <div className="relative h-[500px] md:h-[600px] mb-12">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-base-100/90 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-xl space-y-6">
                  {slide.badge && (
                    <span className="badge badge-primary gap-2">
                      <FaPercent /> {slide.badge}
                    </span>
                  )}
                  <h1 className="text-4xl md:text-6xl font-bold">
                    {slide.title}
                  </h1>
                  <p className="text-base-content/70 text-lg">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href={slide.primaryLink} className="btn btn-primary">
                      {slide.primaryText}
                    </Link>
                    {slide.secondaryLink && (
                      <Link href={slide.secondaryLink} className="btn btn-outline">
                        {slide.secondaryText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {/* Slider Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-primary' : 'bg-base-content/30'
                }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200 hover:bg-base-300 transition-colors"
            >
              <div className="card-body items-center text-center p-4">
                {feature.icon}
                <h3 className="font-medium mt-2">{feature.title}</h3>
                <p className="text-sm text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
              <p className="text-base-content/70">
                Browse our top categories for the best deals
              </p>
            </div>
            <Link href="/categories" className="btn btn-ghost gap-2">
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="card bg-base-100 hover:shadow-lg transition-all group"
              >
                <div className="card-body items-center text-center p-6">
                  <span className="text-4xl mb-4">{category.icon}</span>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-base-content/70">
                    {category.itemCount} Items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-base-content/70">
                Our handpicked selection of must-have items
              </p>
            </div>
            <Link href="/products" className="btn btn-ghost gap-2">
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="flex justify-center w-full">
                <ProductCard
                  product={product}
                  rank={index + 1}
                  bestSelling={product.soldCount}
                  className="w-full max-w-sm"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
              <p className="text-base-content/70">
                Discover what's hot and trending
              </p>
            </div>
            <Link href="/products" className="btn btn-ghost gap-2">
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div key={product.id} className="card bg-base-100 shadow-xl">
                <figure className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-[200px] object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2">
                      <div className="badge badge-primary">-{product.discount}%</div>
                    </div>
                  )}
                  <button
                    className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost bg-base-100"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <FaHeart />
                  </button>
                </figure>
                <div className="card-body">
                  <Link
                    href={`/product/${product.slug}`}
                    className="card-title text-lg hover:text-primary transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-base-content/70">{product.category}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < product.rating ? 'text-yellow-400' : 'text-base-300'}
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-base-content/70">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-xl font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-base-content/50 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      className="btn btn-circle btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartShopping />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Brands */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Brands</h2>
              <p className="text-base-content/70">
                Shop your favorite brands
              </p>
            </div>
            <Link href="/brands" className="btn btn-ghost gap-2">
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="card bg-base-100 hover:shadow-lg transition-all"
              >
                <div className="card-body items-center text-center p-6">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-contain mb-4"
                  />
                  <h3 className="font-medium">{brand.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {specialOffers.map((offer) => (
            <div
              key={offer.id}
              className="card lg:card-side bg-base-100 shadow-xl"
            >
              <figure className="relative lg:w-1/2">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl">{offer.title}</h3>
                <p className="text-base-content/70">{offer.description}</p>
                <div className="card-actions justify-end mt-4">
                  <Link href={offer.link} className="btn btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

// Mock data - Replace with API calls
const heroSlides = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    description: 'Discover the latest trends in summer fashion with up to 50% off on selected items.',
    image: '/hero/summer.jpg',
    badge: 'Up to 50% Off',
    primaryLink: '/campaign/summer-sale',
    primaryText: 'Shop Now',
    secondaryLink: '/categories/fashion',
    secondaryText: 'Learn More'
  },
  {
    id: 2,
    title: 'Tech Week Sale',
    description: 'Upgrade your gadgets with amazing deals on the latest electronics.',
    image: '/hero/tech.jpg',
    badge: 'Special Deals',
    primaryLink: '/campaign/tech-week',
    primaryText: 'View Deals',
    secondaryLink: '/categories/electronics',
    secondaryText: 'Browse Categories'
  }
];

const features = [
  {
    icon: <FaTruck className="text-2xl text-primary" />,
    title: 'Free Shipping',
    description: 'On orders over $50'
  },
  {
    icon: <FaShieldHeart className="text-2xl text-primary" />,
    title: 'Secure Payment',
    description: '100% secure payment'
  },
  {
    icon: <FaRotateLeft className="text-2xl text-primary" />,
    title: 'Easy Returns',
    description: '30 days return policy'
  },
  {
    icon: <FaCartShopping className="text-2xl text-primary" />,
    title: '24/7 Support',
    description: 'Dedicated support'
  }
];

const featuredCategories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    icon: '💻',
    itemCount: 1250
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    icon: '👕',
    itemCount: 2800
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Premium Noise-Canceling Headphones',
    slug: 'premium-noise-canceling-headphones',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    images: [
      // '/products/headphones-1.jpg',
      // '/products/headphones-2.jpg',
      // '/products/headphones-3.jpg'
      '/assets/images/defaults/product.png',
      '/assets/images/defaults/logo.png',
      '/assets/images/defaults/category.png'
    ],
    brand: { name: 'SoundMaster', slug: 'soundmaster' },
    category: { name: 'Electronics', slug: 'electronics' },
    rating: 4.8,
    reviews: 156,
    stock: 45,
    viewCount: 1250,
    isNew: true,
    isFeatured: true,
    isFreeShipping: true,
    isActive: true,
    soldCount: 89
  },
  {
    id: '2',
    name: 'Smart Fitness Watch Pro',
    slug: 'smart-fitness-watch-pro',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    images: [
      // '/products/watch-1.jpg',
      // '/products/watch-2.jpg'
      '/assets/images/defaults/product.png'

    ],
    brand: { name: 'TechPro', slug: 'techpro' },
    category: { name: 'Electronics', slug: 'electronics' },
    rating: 4.6,
    reviews: 98,
    stock: 32,
    viewCount: 850,
    isFeatured: true,
    isDigital: true,
    isActive: true,
    soldCount: 67
  },
  {
    id: '3',
    name: 'Designer Summer Dress',
    slug: 'designer-summer-dress',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    images: [
      // '/products/dress-1.jpg',
      // '/products/dress-2.jpg',
      // '/products/dress-3.jpg'
      '/assets/images/defaults/product.png'
    ],
    brand: { name: 'Fashionista', slug: 'fashionista' },
    category: { name: 'Fashion', slug: 'fashion' },
    rating: 4.9,
    reviews: 234,
    stock: 8,
    viewCount: 1890,
    isFeatured: true,
    isFreeShipping: true,
    isActive: true,
    soldCount: 156
  },
  {
    id: '4',
    name: 'Professional Camera Kit',
    slug: 'professional-camera-kit',
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    images: [
      // '/products/camera-1.jpg',
      // '/products/camera-2.jpg'
      '/assets/images/defaults/product.png'
    ],
    brand: { name: 'TechPro', slug: 'techpro' },
    category: { name: 'Electronics', slug: 'electronics' },
    rating: 4.7,
    reviews: 67,
    stock: 5,
    viewCount: 780,
    isFeatured: true,
    isNew: true,
    isActive: true,
    soldCount: 23
  }
];

const trendingProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    category: 'Electronics',
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    // image: '/products/headphones.jpg',
    image: '/assets/images/defaults/product.png',
    rating: 4,
    reviews: 128
  }
];

const featuredBrands = [
  {
    id: 1,
    name: 'TechPro',
    slug: 'techpro',
    logo: '/brands/techpro.png'
  }
];

const specialOffers = [
  {
    id: 1,
    title: 'New Season Collection',
    description: 'Get ready for the new season with our latest collection.',
    image: '/offers/season.jpg',
    link: '/campaign/new-season'
  },
  {
    id: 2,
    title: 'Clearance Sale',
    description: 'Up to 70% off on last season items.',
    image: '/offers/clearance.jpg',
    link: '/campaign/clearance'
  }
];
