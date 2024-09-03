"use client"
import React, { useState } from 'react';
import { MapPin, CreditCard, Calendar, LogOut, LucideIcon } from 'lucide-react';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Pedidos from '@/components/my-account/pedidos';
import DireccionesEnvio from '@/components/my-account/direcciones';
import Recordatorios from '@/components/my-account/recordatorios';
import MiCuenta from '@/components/my-account/cuenta';

const SidebarItem = ({ icon: Icon, text, onClick }: { icon: LucideIcon| React.ElementType; text: string; onClick?: () => void }) => (
  <div className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
    <Icon size={20} />
    <span>{text}</span>
  </div>
);

const Sidebar = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <div className="hidden md:block w-64 bg-white border-r font-geometos border-gray-200 text-[#5D60a6] h-screen">
    <SidebarItem icon={FaUser} text="Mi cuenta" onClick={() => setActiveTab('account')} />
    <SidebarItem icon={FaShoppingCart} text="Pedidos" onClick={() => setActiveTab('pedidos')} />
    <SidebarItem icon={MapPin} text="Direcciones de envio" onClick={() => setActiveTab('direcciones')} />
    <SidebarItem icon={CreditCard} text="Metodos de pago" />
    <SidebarItem icon={Calendar} text="Recordatorios" onClick={() => setActiveTab('recordatorios')} />
    <div className="border-t border-gray-200 mt-4">
      <SidebarItem icon={LogOut} text="Cerrar sesion" />
    </div>
  </div>
);

const MobileSelect = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => (
  <select
    value={activeTab}
    onChange={(e) => setActiveTab(e.target.value)}
    className="w-full p-2 mb-4 font-geometos text-[#5D60a6] border border-gray-200 rounded-lg md:hidden"
  >
    <option value="account">Mi cuenta</option>
    <option value="pedidos">Pedidos</option>
    <option value="direcciones">Direcciones de envio</option>
    <option value="recordatorios">Recordatorios</option>
  </select>
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
const LogoutButton = () => (
  <button className="flex items-center space-x-2 py-2 px-4 bg-gray-100 text-[#5D60a6] font-geometos cursor-pointer w-full">
    <LogOut size={20} />
    <span>Cerrar sesión</span>
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="flex flex-col md:flex-row mt-28 bg-white">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="p-4 md:hidden">
          <MobileSelect activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <Header />
        <div className="p-4 flex-grow">
          {activeTab === 'pedidos' && <Pedidos />}
          {activeTab === 'account' && <MiCuenta />}
          {activeTab === 'direcciones' && <DireccionesEnvio />}
          {activeTab === 'recordatorios' && <Recordatorios />}
        </div>
        <div className="md:hidden mt-auto">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default App;