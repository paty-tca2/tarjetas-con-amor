import React, { useState, useRef, useEffect } from 'react';
import { CardTemplate } from '@/components/cards/card-templates';
import { ChevronLeft, ChevronRight, Type, Image, X } from 'lucide-react';
import { FileUpload } from './file-upload';
import NextImage from 'next/image';

const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];

interface CanvasProps {
  template: CardTemplate;
  selectedPage: number;
  onPageChange: (page: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ template, selectedPage, onPageChange }) => {
  const [cardText, setCardText] = useState('Hola Amigo');
  const [font, setFont] = useState('Arial');
  const [image, setImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('text');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && drawerRef.current && !drawerRef.current.contains(event.target as Node) && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen, isMobile]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardText(e.target.value);
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFont(e.target.value);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return (
          <>
            <label className="block mb-2 text-[#04d9b2] font-geometos" htmlFor="card-text">Escribe tu mensaje</label>
            <input
              type="text"
              id="card-text"
              value={cardText}
              onChange={handleTextChange}
              className="w-full p-2 text-black font-geometos border border-gray-300 rounded"
            />
            <label className="block mt-4 mb-2 text-[#04d9b2] font-geometos" htmlFor="font-select">Escoge tu tipo de letra</label>
            <select
              id="font-select"
              value={font}
              onChange={handleFontChange}
              className="w-full p-2 text-black font-geometos border border-gray-300 rounded"
            >
              {fonts.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </>
        );
      case 'photos':
        return (
          <>
            <label className="block mb-2 text-[#04d9b2] font-geometos" htmlFor="image-upload">Sube tu imagen</label>
            <FileUpload onChange={(files: File[]) => {
              if (files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = (e) => setImage(e.target?.result as string);
                reader.readAsDataURL(file);
              }
            }} />
          </>
        );
      default:
        return <p className="text-gray-500">Options for {activeTab} (placeholder)</p>;
    }
  };

  return (
    <div className="w-full">
      {/* Top bar (mobile only) */}
      {isMobile && (
        <div className="bg-white rounded-lg p-2 mb-4 flex justify-center space-x-4">
          {[
            { icon: Type, label: 'Texto', id: 'text' },
            { icon: Image, label: 'Imagenes', id: 'photos' },
          ].map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              className={`flex flex-col items-center justify-center p-2 rounded ${activeTab === id ? 'bg-gray-100' : ''}`}
              onClick={() => {
                setActiveTab(id);
                setIsDrawerOpen(true);
              }}
            >
              <Icon size={20} className={activeTab === id ? 'text-[#5D60a6]' : 'text-gray-500'} />
              <span className="text-xs mt-1 font-geometos text-[#04d9b2]">{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 aspect-[3/4] rounded-lg overflow-hidden relative mb-4 md:mb-0">
          <NextImage
            src={`/templates/TEMPLATE-${template.id}-${selectedPage}.webp`}
            alt={`Template ${template.id} - Page ${selectedPage}`}
            layout="fill"
            objectFit="contain"
          />
          {image && (
            <NextImage src={image} alt="Uploaded" layout="fill" objectFit="contain" />
          )}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-lg md:text-xl text-center" style={{ fontFamily: font }}>{cardText}</p>
          </div>
        </div>
        
        {/* Desktop sidebar */}
        {!isMobile && (
          <div className="md:w-1/3 md:ml-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-center space-x-4 mb-4">
                {[
                  { icon: Type, label: 'Texto', id: 'text' },
                  { icon: Image, label: 'Imagenes', id: 'photos' },
                ].map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    className={`flex flex-col items-center justify-center p-2 rounded ${activeTab === id ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveTab(id)}
                  >
                    <Icon size={20} className={activeTab === id ? 'text-[#5D60a6]' : 'text-gray-500'} />
                    <span className="text-xs mt-1 font-geometos text-[#04d9b2]">{label}</span>
                  </button>
                ))}
              </div>
              {renderTabContent()}
            </div>
          </div>
        )}
        
        {/* Mobile Bottom Drawer */}
        {isMobile && isDrawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsDrawerOpen(false)}>
            <div 
              ref={drawerRef}
              className="fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-in-out translate-y-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-t-2xl p-4 shadow-lg max-h-[50vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{activeTab === 'text' ? 'Texto' : 'Imagenes'}</h3>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                {renderTabContent()}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Template selector */}
      <div className="relative mt-4">
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          onClick={() => onPageChange(Math.max(1, selectedPage - 1))}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex justify-center space-x-2 overflow-x-auto py-2">
          {[1, 2, 3, 4].map((pageNum) => (
            <div
              key={pageNum}
              className={`w-16 h-16 md:w-20 md:h-20 relative cursor-pointer ${
                selectedPage === pageNum ? 'border-2 border-blue-500' : 'border border-gray-300'
              }`}
              onClick={() => onPageChange(pageNum)}
            >
              <NextImage
                src={`/templates/TEMPLATE-${template.id}-${pageNum}.webp`}
                alt={`Template ${template.id} - Page ${pageNum}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          onClick={() => onPageChange(Math.min(4, selectedPage + 1))}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Canvas;