"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { cardTemplates, CardTemplate } from '@/components/cards/card-templates';
import { Heart, Eye } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';

type CardOptions = {
  type: 'ecard' | 'standard';
  quantity: number;
};

type CardSize = {
  label: string;
  description: string;
  price: string;
  bgColor: string;
};

const cardSizes: Record<CardOptions['type'], CardSize> = {
  ecard: { label: 'eCard', description: 'Envio instantaneo', price: '$99', bgColor: '#04d9b2' },
  standard: { label: 'Standard Card', description: 'Para tus seres queridos', price: '$199', bgColor: '#5D60a6' },
};

export default function CardsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cardOptions, setCardOptions] = useState<CardOptions>({ type: 'standard', quantity: 1 });
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const router = useRouter();

  const handleCardClick = (template: CardTemplate) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleAddToBasket = () => {
    console.log('Added to basket:', selectedTemplate, cardOptions);
    setShowModal(false);
  };

  const handleSizeChange = (type: CardOptions['type']) => {
    setCardOptions({ ...cardOptions, type });
  };

  const onClose = () => setShowModal(false);

  const handlePersonalize = () => {
    if (selectedTemplate) {
      router.push(`/personalize/${selectedTemplate.id}`);
    }
  };

  // Update the thumbnails array
  const thumbnails = selectedTemplate
    ? Array(4).fill(selectedTemplate.imageUrl)
    : [];

  return (
    <div className="container mx-auto pt-48 px-4 py-8">
      <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6 text-center">Tarjetas personalizadas</h1>
      
      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardTemplates.map((template) => (
          <div 
            key={template.id} 
            className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => handleCardClick(template)}
          >
            <Image 
              src={template.imageUrl} 
              alt={template.id} 
              width={300} 
              height={400} 
              className="w-full h-120 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
             
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {cardTemplates.map((template) => (
            <SwiperSlide key={template.id}>
              <div 
                className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={() => handleCardClick(template)}
              >
                <Image 
                  src={template.imageUrl} 
                  alt={template.id} 
                  width={300} 
                  height={400} 
                  className="w-full h-120 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  {/* ... existing hover content ... */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-2xl max-h-[95vh] overflow-y-auto">
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row mt-8 sm:mt-0">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <div className="relative">
                  <Image 
                    src={selectedTemplate.imageUrl} 
                    alt={selectedTemplate.id} 
                    width={300} 
                    height={400} 
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="flex mt-2 space-x-2 overflow-x-auto">
                  {thumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 flex-shrink-0 cursor-pointer ${index === selectedThumbnail ? 'border-2 border-[#04d9b2] rounded-lg' : ''}`}
                      onClick={() => setSelectedThumbnail(index)}
                    >
                      <Image
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 md:ml-4">
                <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Selecciona el tamaño</h2>
                {Object.entries(cardSizes).map(([type, { label, description, price }]) => (
                  <div 
                    key={type} 
                    className={`mb-2 p-2 border rounded cursor-pointer ${cardOptions.type === type ? 'border-[#04d9b2]' : ''}`}
                    onClick={() => handleSizeChange(type as CardOptions['type'])}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        checked={cardOptions.type === type} 
                        onChange={() => {}} 
                        className="mr-2"
                      />
                      <div>
                        <div className="font-geometos text-[#5D60a6]">{label}</div>
                        <div className="text-sm text-black font-geometos">{description}</div>
                      </div>
                      <div className="ml-auto font-geometos text-[#5D60a6]">{price}</div>
                    </div>
                  </div>
                ))}
                
                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-sm font-geometos text-[#5D60a6] mb-2">Cantidad</label>
                  <select
                    id="quantity"
                    value={cardOptions.quantity}
                    onChange={(e) => setCardOptions({ ...cardOptions, quantity: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded font-geometos text-[#5D60a6]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-4">
              <button 
                onClick={handlePersonalize}
                className="bg-[#5D60a6] hover:bg-[#04d9b2] text-white px-4 py-2 rounded font-geometos w-full md:w-auto"
              >
                Personalizar
              </button>
              <button 
                onClick={handleAddToBasket}
                className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-4 py-2 rounded font-geometos w-full md:w-auto"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
