// components/Header.tsx
import React from 'react';
import { IoMenu } from "react-icons/io5";
import { FaSearch, FaStar, FaUser, FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md relative">
      <div className="absolute left-4">
        <IoMenu className="text-black h-12 w-12" />
      </div>
      <div className="flex-grow flex justify-center">
        <h1 className="text-6xl text-[#04d9b2] font-coneria font-bold">compartiendo tus memorias...</h1>
      </div>
      <div className="flex items-center space-x-4">
        <FaSearch className="text-black h-8 w-8" />
        <FaStar className="text-black h-8 w-8" />
        <FaUser className="text-black h-8 w-8" />
        <FaShoppingCart className="text-black h-8 w-8" />
      </div>
    </header>
  );
};

export default Header;