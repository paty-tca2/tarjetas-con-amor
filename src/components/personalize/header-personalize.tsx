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
    <header className="bg-white p-4">
      <div className="container mx-auto flex flex-row-reverse md:flex-row justify-between items-center">
        <button onClick={handleExit} className="text-gray-600 hover:text-gray-800 order-2 md:order-1">
          <X size={24} />
        </button>
        <div className="flex space-x-2 md:space-x-4 order-1 md:order-2">
          <button onClick={onPreview} className="bg-[#5D60a6] hover:bg-[#04d9b2] text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-geometos flex items-center text-sm md:text-base">
            Preview
          </button>
          <button onClick={onAddToBasket} className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-geometos flex items-center text-sm md:text-base">
            Añadir al carrito
          </button>
        </div>
      </div>
    </header>
  );
};

export default PersonalizeHeader;
