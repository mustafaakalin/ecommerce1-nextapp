'use client';

import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('mobile-search')?.focus();
      }, 100);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="navbar bg-base-100  sticky top-0 z-50">
      <div className="navbar-start">
        {/* Logo and Site Name */}
        <div className="flex items-center gap-2">
          {/* <Link href="/" className="btn btn-ghost">
            <Image src="/next.svg" width={30} height={30} alt="Logo" />
          </Link> */}
          <Link href="/" className={`hidden sm:block ${isSearchOpen ? 'max-sm:hidden' : 'block'}`}>
            <span className={`text-lg sm:text-xl md:text-2xl font-bold truncate transition-all duration-300 ${isSearchOpen ? 'max-sm:w-0 max-sm:opacity-0' : 'w-full opacity-100'}`}>
              AKALINTECH E-Commerce
            </span>
          </Link>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <div className="navbar-center hidden sm:flex rounded-md">
        <div className="form-control">
          <div className="input-group join">
            <input
              type="text"
              placeholder="Search..."
              className="input join-item input-bordered w-full max-w-xs"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <select className="select join-item max-w-3xs">
              <option disabled defaultValue >Filter</option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <button
              className="btn btn-square join-item"
              onClick={handleSearchToggle}
            >
              <CiSearch className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        {/* Mobile Search Toggle */}
        <button
          onClick={handleSearchToggle}
          className="btn btn-ghost btn-circle sm:hidden"
        >
          <CiSearch className="h-6 w-6" />
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <IoNotificationsOutline className="h-6 w-6" />
            <span className="badge badge-sm indicator-item badge-primary">3</span>
          </div>
        </button>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Profile Menu */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src="/next.svg"
                alt="Profile"
                width={40}
                height={40}
                className="p-2"
              />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link href="/settings">Settings</Link></li>
            <li><Link href="/logout">Logout</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="sm:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={handleSearchToggle}></div>
          <div className="fixed inset-x-0 top-0 p-4 z-50 animate-slide-down">
            <div className="relative">
              <input
                id="mobile-search"
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full shadow-lg"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={handleSearchToggle}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;