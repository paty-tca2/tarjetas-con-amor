import React, { useState, useRef, useEffect } from 'react';
import { CardTemplate } from '@/components/cards/card-templates';
import { ChevronLeft, ChevronRight, Type, Image, X, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { FileUpload } from './file-upload';
import NextImage from 'next/image';
import Draggable from 'react-draggable';

const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];

interface CanvasProps {
  template: CardTemplate;
  selectedPage: number;
  onPageChange: (page: number) => void;
}

interface CanvasElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  position: { x: number; y: number };
  font?: string;
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const Canvas: React.FC<CanvasProps> = ({ template, selectedPage, onPageChange }) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

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

  const addTextElement = () => {
    const newElement: CanvasElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'New text',
      position: { x: 50, y: 50 },
      font: 'Arial',
      size: 16,
      color: '#000000',
      align: 'left',
    };
    setElements([...elements, newElement]);
    setActiveElement(newElement.id);
  };

  const addImageElement = (imageUrl: string) => {
    const newElement: CanvasElement = {
      id: `image-${Date.now()}`,
      type: 'image',
      content: imageUrl,
      position: { x: 50, y: 50 },
    };
    setElements([...elements, newElement]);
    setActiveElement(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setActiveElement(null);
  };

  const renderEditorContent = () => (
    <div className="bg-white rounded-lg p-4">
      {activeTab === 'text' ? (
        <div>
          <button
            className="w-full p-2 mb-2 bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos rounded flex items-center justify-center rounded-full"
            onClick={addTextElement}
          >
            <Type size={20} className="mr-2" /> Añadir texto
          </button>
          {activeElement && elements.find(el => el.id === activeElement)?.type === 'text' && (
            <div className="mt-4">
              <select
                value={elements.find(el => el.id === activeElement)?.font}
                onChange={(e) => updateElement(activeElement, { font: e.target.value })}
                className="w-full p-2 mb-2 border rounded text-black"
              >
                {fonts.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <input
                type="number"
                value={elements.find(el => el.id === activeElement)?.size}
                onChange={(e) => updateElement(activeElement, { size: parseInt(e.target.value) })}
                className="w-full text-black p-2 mb-2 border rounded"
                placeholder="Font size"
              />
              <input
                type="color"
                value={elements.find(el => el.id === activeElement)?.color}
                onChange={(e) => updateElement(activeElement, { color: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="flex justify-between mb-2">
                <button onClick={() => updateElement(activeElement, { align: 'left' })}><AlignLeft size={20} /></button>
                <button onClick={() => updateElement(activeElement, { align: 'center' })}><AlignCenter size={20} /></button>
                <button onClick={() => updateElement(activeElement, { align: 'right' })}><AlignRight size={20} /></button>
              </div>
              <button
                className="w-full p-2 bg-red-500 text-white rounded flex items-center font-geometos justify-center rounded-full"
                onClick={() => removeElement(activeElement)}
              >
                <Trash2 size={20} className="mr-2" /> Quitar
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <FileUpload onChange={(files: File[]) => {
            if (files.length > 0) {
              const file = files[0];
              const reader = new FileReader();
              reader.onload = (e) => addImageElement(e.target?.result as string);
              reader.readAsDataURL(file);
            }
          }} />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile top bar */}
      {isMobile && (
        <div className="bg-white rounded-lg p-2 mb-4 flex justify-center space-x-4">
          {[
            { icon: Type, label: 'Text', id: 'text' },
            { icon: Image, label: 'Photos', id: 'image' },
          ].map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              className={`flex flex-col items-center justify-center p-2 rounded ${activeTab === id ? 'bg-gray-100' : ''}`}
              onClick={() => {
                setActiveTab(id as 'text' | 'image');
                setIsDrawerOpen(true);
              }}
            >
              <Icon size={20} className={activeTab === id ? 'text-blue-500' : 'text-gray-500'} />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-row">
        {/* Desktop left sidebar */}
        {!isMobile && (
          <div className="w-1/4 pr-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex flex-col mb-4">
                <button
                  className={`p-2 mb-2 ${activeTab === 'text' ? 'bg-[#04d9b2]' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab('text')}
                >
                  <Type size={20} className="mx-auto" />
                  <span className="text-xs text-black font-geometos mt-1">Texto</span>
                </button>
                <button
                  className={`p-2 ${activeTab === 'image' ? 'bg-[#04d9b2]' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab('image')}
                >
                  <Image size={20} className="mx-auto" />
                  <span className="text-xs text-black font-geometos mt-1">Imagen</span>
                </button>
              </div>
              {renderEditorContent()}
            </div>
          </div>
        )}

        {/* Canvas area */}
        <div className={`${isMobile ? 'w-full' : 'w-3/4'} aspect-[3/4] rounded-lg overflow-hidden relative mb-4`}>
          <NextImage
            src={`/templates/TEMPLATE-${template.id}-${selectedPage}.webp`}
            alt={`Template ${template.id} - Page ${selectedPage}`}
            layout="fill"
            objectFit="contain"
          />
          {elements.map((element) => (
            <Draggable
              key={element.id}
              position={element.position}
              onStop={(e, data) => updateElement(element.id, { position: { x: data.x, y: data.y } })}
              onMouseDown={() => setActiveElement(element.id)}
            >
              <div className={`absolute cursor-move ${activeElement === element.id ? 'ring-2 ring-blue-500' : ''}`}>
                {element.type === 'text' ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateElement(element.id, { content: e.currentTarget.textContent || '' })}
                    style={{
                      fontFamily: element.font,
                      fontSize: `${element.size}px`,
                      color: element.color,
                      textAlign: element.align,
                    }}
                  >
                    {element.content}
                  </div>
                ) : (
                  <img src={element.content} alt="Uploaded" className="max-w-full max-h-full" />
                )}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      
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
                <h3 className="text-lg font-semibold">{activeTab === 'text' ? 'Text' : 'Photos'}</h3>
                <button onClick={() => setIsDrawerOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              {renderEditorContent()}
            </div>
          </div>
        </div>
      )}
      
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