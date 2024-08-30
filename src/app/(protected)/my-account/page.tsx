import React from 'react';
import { MapPin, CreditCard, Calendar, LogOut } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';

const SidebarItem = ({ icon: Icon, text }: { icon: LucideIcon | React.ElementType; text: string }) => (
  <div className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 cursor-pointer">
    <Icon size={20} />
    <span>{text}</span>
  </div>
);

const Sidebar = () => (
  <div className="w-64 bg-white border-r font-geometos border-gray-200 text-[#5D60a6] h-screen">
    <SidebarItem icon={FaUser} text="Mi cuenta" />
    <SidebarItem icon={FaShoppingCart} text="Pedidos" />
    <SidebarItem icon={MapPin} text="Direcciones de envio" />
    <SidebarItem icon={CreditCard} text="Metodos de pago" />
    <SidebarItem icon={Calendar} text="Recordatorios" />
    <div className="border-t border-gray-200 mt-4">
      <SidebarItem icon={LogOut} text="Cerrar sesión" />
    </div>
  </div>
);

const Header = ({  }) => (
  <div className="bg-[#04d9b2] p-4 rounded-lg m-4 flex items-center space-x-4">
    <Image src="/icono-tca.png" alt="Profile" width={48} height={48} className="rounded-full" />
    <div>
      <h2 className="text-xl font-geometos">¡Hola! </h2>
      <p className="text-[#5D60a6] font-geometos">Bienvenid@ a tu cuenta</p>
    </div>
  </div>
);

const App = () => (
  <div className="flex mt-28 bg-white"> {/* Add top margin */}
    <Sidebar />
    <div className="flex-1">
      <Header />
      {/* Other content would go here */}
    </div>
  </div>
);

export default App;