import React, { useState } from 'react';
import { CardTemplate } from '@/components/cards/card-templates';
import { ChevronLeft, ChevronRight, Layout, Type, Image, Sticker, Video, Mic, Edit } from 'lucide-react';
import { FileUpload } from './file-upload';

const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];

interface CanvasProps {
  template: CardTemplate;
}

const Canvas: React.FC<CanvasProps> = ({ template }) => {
  const [cardText, setCardText] = useState('Hola Amigo');
  const [font, setFont] = useState('Arial');
  const [image, setImage] = useState<string | null>(null);
  const [selectedTemplateImage, setSelectedTemplateImage] = useState(template.imageUrl);
  const [activeTab, setActiveTab] = useState('text');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardText(e.target.value);
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFont(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const templateImages = [
    template.imageUrl,
    template.imageUrl,
    template.imageUrl,
    "/fondo-1.jpeg"
  ];

  const handleTemplateImageSelect = (imageUrl: string) => {
    setSelectedTemplateImage(imageUrl);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'layout':
        return <p className="text-gray-500">Layout options (placeholder)</p>;
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
    <div className="flex w-full">
      <div className="w-20 bg-white rounded-lg p-4 flex flex-col items-center space-y-6">
        {[
         
          { icon: Type, label: 'Texto', id: 'text' },
          { icon: Image, label: 'Imagenes', id: 'photos' },
      
        ].map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            className={`flex flex-col items-center justify-center w-full p-2 rounded ${activeTab === id ? '' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={24} className={activeTab === id ? 'text-[#5D60a6]' : 'text-gray-500'} />
            <span className="text-xs mt-1 font-geometos text-[#04d9b2]">{label}</span>
          </button>
        ))}
      </div>
      <div className="flex-grow p-4">
        <div className="flex mb-4">
          <div className="w-2/3 aspect-[3/4] rounded-lg overflow-hidden relative">
            {selectedTemplateImage && (
              <img src={selectedTemplateImage} alt="Template" className="absolute inset-0 w-full h-full object-contain" />
            )}
            {image && (
              <img src={image} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xl" style={{ fontFamily: font }}>{cardText}</p>
            </div>
          </div>
          
          <div className="w-1/3 pl-4">
            {renderTabContent()}
          </div>
        </div>
        
        <div className="relative">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <div className="flex justify-center space-x-4 overflow-x-auto py-4">
            {templateImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Template 1 - Page ${index + 1}`}
                className={`w-24 h-24 object-cover border-2 rounded cursor-pointer ${
                  selectedTemplateImage === img ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => handleTemplateImageSelect(img)}
              />
            ))}
          </div>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
