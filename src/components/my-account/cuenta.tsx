import React from 'react';
import { FaUser, FaEnvelope } from "react-icons/fa";

interface UserInfo {
  name: string;
  email: string;
}

const MiCuenta: React.FC = () => {
  // Mock data - replace with actual user data fetching logic
  const userInfo: UserInfo = {
    name: "John Doe",
    email: "john.doe@example.com"
  };

  return (
    <div className="mi-cuenta-container text-black">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Mi Cuenta</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FaUser className="text-[#5D60a6]" />
          <input
            type="text"
            value={userInfo.name}
            readOnly
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-[#5D60a6]" />
          <input
            type="email"
            value={userInfo.email}
            readOnly
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MiCuenta;
