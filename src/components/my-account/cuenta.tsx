import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

interface UserInfo {
  name: string;
  email: string;
  phone?: string;
}

const MiCuenta: React.FC = () => {
  // Initial user data - replace with actual user data fetching logic
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic here to save the updated user information
    console.log("Updated user info:", userInfo);
    // You would typically send this data to your backend API
  };

  return (
    <div className="mi-cuenta-container text-black">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Mi Cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <FaUser className="text-[#5D60a6]" />
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-[#5D60a6]" />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaPhone className="text-[#5D60a6]" />
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            placeholder="Numero de telefono (opcional)"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-[#04d9b2] hover:bg-[#5D60a6] transition-colors font-geometos text-white py-2 px-4 rounded-full"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default MiCuenta;
