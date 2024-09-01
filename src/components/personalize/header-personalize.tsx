import React from 'react';
import { X, Eye, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PersonalizeHeaderProps {
  onPreview: () => void;
  onAddToBasket: () => void;
}

const PersonalizeHeader: React.FC<PersonalizeHeaderProps> = ({ onPreview, onAddToBasket }) => {
  const router = useRouter();

  const handleExit = () => {
    router.push('/cards');
  };

  return (
    <header className="bg-white  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={handleExit} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
        <div className="flex space-x-4">
          <button onClick={onPreview} className="bg-[#5D60a6] hover:bg-[#04d9b2] text-white px-4 py-2 rounded font-geometos flex items-center">
            <Eye size={18} className="mr-2" />
            Preview
          </button>
          <button onClick={onAddToBasket} className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-4 py-2 rounded font-geometos flex items-center">
            <ShoppingCart size={18} className="mr-2" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </header>
  );
};

export default PersonalizeHeader;
