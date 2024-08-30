import React from 'react';
import { Gift, MapPin, User, CreditCard, Calendar, Users, Heart, Briefcase, LogOut } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const SidebarItem = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <div className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 cursor-pointer">
    <Icon size={20} />
    <span>{text}</span>
  </div>
);

const Sidebar = () => (
  <div className="w-64 bg-white border-r font-geometos border-gray-200 text-black h-screen">
    <SidebarItem icon={Gift} text="Mi cuenta" />
    <SidebarItem icon={User} text="Pedidos" />
    <SidebarItem icon={MapPin} text="Direcciones de envio" />
    <SidebarItem icon={CreditCard} text="Metodos de pago" />
    <SidebarItem icon={Calendar} text="Recordatorios" />
    <div className="border-t border-gray-200 mt-4">
      <SidebarItem icon={LogOut} text="Cerrar sesión" />
    </div>
  </div>
);

const Header = ({  }) => (
  <div className="bg-white p-4 rounded-lg m-4 flex items-center space-x-4">
    <img src="/api/placeholder/50/50" alt="Profile" className="w-12 h-12 rounded-full" />
    <div>
      <h2 className="text-xl font-bold">Hey </h2>
      <p className="text-gray-600">It's nice to see you, come on in...</p>
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