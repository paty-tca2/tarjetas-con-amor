"use client"
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { FaSearch, FaStar, FaUser, FaShoppingCart } from "react-icons/fa";
import SideMenu from './slide-in';
import Link from 'next/link'; // Add this import

const Header: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-8 lg:p-10 bg-white shadow-md">
        <div className="absolute left-2 md:left-6 lg:left-8 z-10">
          <button onClick={toggleSideMenu}>
            <IoMenu className="text-black h-8 w-8 md:h-12 md:w-12" />
          </button>
        </div>
        <div className="flex-grow flex justify-center items-center absolute inset-x-0">
          <h1 className="text-xl md:text-6xl text-[#04d9b2] font-coneria font-bold text-center">
            compartiendo tus memorias...
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4 ml-auto z-10">
          <FaSearch className="text-black h-6 w-6 md:h-8 md:w-8 hidden md:block" />
          <FaStar className="text-black h-6 w-6 md:h-8 md:w-8 hidden md:block" />
          <Link href="/auth/sign-up">
            <FaUser className="text-black h-6 w-6 md:h-8 md:w-8 cursor-pointer" />
          </Link>
          <FaShoppingCart className="text-black h-6 w-6 md:h-8 md:w-8" />
        </div>
      </header>
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
    </>
  );
};

export default Header;