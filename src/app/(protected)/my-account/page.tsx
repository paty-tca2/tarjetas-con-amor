"use client"
import React, { useState } from 'react';
import { MapPin, CreditCard, Calendar, LogOut } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Pedidos from '@/components/my-account/pedidos';
import DireccionesEnvio from '@/components/my-account/direcciones';
import Recordatorios from '@/components/my-account/recordatorios';

const SidebarItem = ({ icon: Icon, text, onClick }: { icon: LucideIcon | React.ElementType; text: string; onClick?: () => void }) => (
  <div className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
    <Icon size={20} />
    <span>{text}</span>
  </div>
);

const Sidebar = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <div className="w-64 bg-white border-r font-geometos border-gray-200 text-[#5D60a6] h-screen">
    <SidebarItem icon={FaUser} text="Mi cuenta" onClick={() => setActiveTab('account')} />
    <SidebarItem icon={FaShoppingCart} text="Pedidos" onClick={() => setActiveTab('pedidos')} />
    <SidebarItem icon={MapPin} text="Direcciones de envio" onClick={() => setActiveTab('direcciones')} />
    <SidebarItem icon={CreditCard} text="Metodos de pago" />
    <SidebarItem icon={Calendar} text="Recordatorios" onClick={() => setActiveTab('recordatorios')} />
    <div className="border-t border-gray-200 mt-4">
      <SidebarItem icon={LogOut} text="Cerrar sesión" />
    </div>
  </div>
);

const Header = () => (
  <div className="bg-[#04d9b2] p-4 rounded-lg m-4 flex items-center space-x-4">
    <Image src="/icono-tca.png" alt="Profile" width={48} height={48} className="rounded-full" />
    <div>
      <h2 className="text-xl font-geometos">¡Hola! </h2>
      <p className="text-[#5D60a6] font-geometos">Bienvenid@ a tu cuenta</p>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="flex mt-28 bg-white">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          {activeTab === 'pedidos' && <Pedidos />}
          {activeTab === 'account' && <div>Account content goes here</div>}
          {activeTab === 'direcciones' && <DireccionesEnvio />}
          {activeTab === 'recordatorios' && <Recordatorios />}
          {/* Add more conditions for other tabs */}
        </div>
      </div>
    </div>
  );
};

export default App;