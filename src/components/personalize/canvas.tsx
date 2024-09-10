import React, { useState, useRef, useEffect } from 'react';
import { CardTemplate } from '@/components/cards/card-templates';
import { ChevronLeft, ChevronRight, Type, Image, X, Trash2, AlignLeft, AlignCenter, AlignRight, Palette, Maximize } from 'lucide-react';
import { FileUpload } from './file-upload';
import Draggable from 'react-draggable';
import Modal from './modal';

const fonts = [
  'Bavex',
  'Poppins',
  'Lust Script',
  'Melodrama',
  'Now Cloud',
  'Reselu',
  'Stardom',
  'Telma',
  'Blenny',
  'Geometos Soft',
  'Coneria Script',
  'Helvetica Neue'
];

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
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ template, selectedPage, onPageChange }) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [resizingElement, setResizingElement] = useState<string | null>(null);
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);

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
      content: 'Escribe tu texto aquí',
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      font: 'Arial',
      size: 16,
      color: '#000000',
      align: 'left',
      width: 200,
      height: 50,
    };
    setElements(prevElements => [...prevElements, newElement]);
    setActiveElement(newElement.id);
  };

  const addImageElement = (imageUrl: string) => {
    const newElement: CanvasElement = {
      id: `image-${Date.now()}`,
      type: 'image',
      content: imageUrl,
      position: { x: 50, y: 50 },
      width: 200,
      height: 200,
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

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60];
  const colors = ['#5D60A6', '#070A40', '#2D4BA6', '#737373', '#04D9B2'];

  const handleResizeStart = (e: React.MouseEvent, id: string, corner: 'nw' | 'ne' | 'sw' | 'se') => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const element = elements.find(el => el.id === id);
    if (!element) return;

    const startWidth = element.width;
    const startHeight = element.height;
    const startFontSize = element.size || 16;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      switch (corner) {
        case 'nw':
          newWidth = startWidth - deltaX;
          newHeight = startHeight - deltaY;
          break;
        case 'ne':
          newWidth = startWidth + deltaX;
          newHeight = startHeight - deltaY;
          break;
        case 'sw':
          newWidth = startWidth - deltaX;
          newHeight = startHeight + deltaY;
          break;
        case 'se':
          newWidth = startWidth + deltaX;
          newHeight = startHeight + deltaY;
          break;
      }

      const scaleFactor = Math.min(newWidth / startWidth, newHeight / startHeight);
      const newFontSize = Math.max(8, Math.round(startFontSize * scaleFactor));

      updateElement(id, { 
        width: Math.max(20, newWidth), 
        height: Math.max(20, newHeight),
        size: newFontSize
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setResizingElement(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActiveElement(null);
      setActiveSubTab(null);
    }
  };

  const renderMobileButtons = () => {
    if (activeElement && elements.find(el => el.id === activeElement)?.type === 'text') {
      return (
        <>
          <button
            className="flex flex-col items-center justify-center p-2 rounded"
            onClick={() => setFontModalOpen(true)}
          >
            <Type size={20} className="text-gray-500" />
            <span className="text-xs mt-1">Font</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 rounded"
            onClick={() => setSizeModalOpen(true)}
          >
            <Type size={20} className="text-gray-500" />
            <span className="text-xs mt-1">Size</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 rounded"
            onClick={() => setColorModalOpen(true)}
          >
            <Palette size={20} className="text-gray-500" />
            <span className="text-xs mt-1">Color</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 rounded"
            onClick={() => {
              const currentAlign = elements.find(el => el.id === activeElement)?.align || 'left';
              const nextAlign = currentAlign === 'left' ? 'center' : currentAlign === 'center' ? 'right' : 'left';
              updateElement(activeElement, { align: nextAlign });
            }}
          >
            <AlignCenter size={20} className="text-gray-500" />
            <span className="text-xs mt-1">Align</span>
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className="flex flex-col items-center justify-center p-2 rounded"
            onClick={addTextElement}
          >
            <Type size={20} className={activeTab === 'text' ? 'text-blue-500' : 'text-gray-500'} />
            <span className="text-xs mt-1">Text</span>
          </button>
          <label className="flex flex-col items-center justify-center p-2 rounded cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => addImageElement(event.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Image size={20} className={activeTab === 'image' ? 'text-blue-500' : 'text-gray-500'} />
            <span className="text-xs mt-1">Image</span>
          </label>
        </>
      );
    }
  };

  const renderEditorContent = () => (
    <div className="bg-white rounded-lg p-4">
      <div className="flex flex-col items-center">
        <button
          className="w-24 h-24 p-2 mb-4 bg-[#04D9b2] hover:bg-[#5D60a6] text-white font-geometos rounded-full flex flex-col items-center justify-center transition-colors duration-200"
          onClick={addTextElement}
        >
          <Type size={20} />
          <span className="text-xs mt-1">Texto</span>
        </button>
        <label className="w-24 h-24 p-2 bg-[#04D9b2] hover:bg-[#5D60a6] text-white font-geometos rounded-full flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => addImageElement(event.target?.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          <Image size={20} />
          <span className="text-xs mt-1">Imagen</span>
        </label>
        {activeElement && elements.find(el => el.id === activeElement)?.type === 'text' && (
          <div className="w-full space-y-2 flex flex-col items-center mt-4">
            <button
              className="w-24 h-24 p-2 bg-[#04D9b2] hover:bg-[#5D60a6] text-white font-geometos rounded-full flex flex-col items-center justify-center transition-colors duration-200"
              onClick={() => setFontModalOpen(true)}
            >
              <Type size={20} />
              <span className="text-xs mt-1">Font</span>
            </button>
            <button
              className="w-24 h-24 p-2 bg-[#04D9b2] hover:bg-[#5D60a6] text-white font-geometos rounded-full flex flex-col items-center justify-center transition-colors duration-200"
              onClick={() => setSizeModalOpen(true)}
            >
              <Type size={20} />
              <span className="text-xs mt-1">Size</span>
            </button>
            <button
              className="w-24 h-24 p-2 bg-[#04D9b2] hover:bg-[#5D60a6] text-white font-geometos rounded-full flex flex-col items-center justify-center transition-colors duration-200"
              onClick={() => setColorModalOpen(true)}
            >
              <Palette size={20} />
              <span className="text-xs mt-1">Color</span>
            </button>
            <button
              className="w-24 h-24 p-2 bg-[#04D9b2] hover:bg-[#5D60a6] text-white font-geometos rounded-full flex flex-col items-center justify-center transition-colors duration-200"
              onClick={() => {
                const currentAlign = elements.find(el => el.id === activeElement)?.align || 'left';
                const nextAlign = currentAlign === 'left' ? 'center' : currentAlign === 'center' ? 'right' : 'left';
                updateElement(activeElement, { align: nextAlign });
              }}
            >
              <AlignCenter size={20} />
              <span className="text-xs mt-1">Align</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile top bar */}
      {isMobile && (
        <div className="bg-white rounded-lg p-2 mb-4 flex justify-center space-x-4">
          {renderMobileButtons()}
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-row">
        {/* Desktop left sidebar */}
        {!isMobile && (
          <div className="w-1/4 pr-4">
            {renderEditorContent()}
          </div>
        )}

        {/* Canvas area */}
        <div 
          className={`${isMobile ? 'w-full' : 'w-3/4'} flex justify-center items-center`}
          onClick={handleCanvasClick}
        >
          <div className="aspect-[3/4] rounded-lg overflow-hidden relative mb-4 border-4 border-gray-300" style={{ width: '80%' }}>
            <object
              type="image/svg+xml"
              data={`/templates/${selectedPage}.svg`}
              className="w-full h-full"
            >
              Your browser does not support SVG
            </object>
            <div className="absolute inset-0">
              {elements.map((element) => (
                <Draggable
                  key={element.id}
                  position={element.position}
                  onStop={(e, data) => updateElement(element.id, { position: { x: data.x, y: data.y } })}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setActiveElement(element.id);
                  }}
                >
                  <div 
                    className={`absolute cursor-move ${activeElement === element.id ? 'ring-2 ring-blue-500' : ''}`}
                    style={{
                      width: `${element.width}px`,
                      height: `${element.height}px`,
                    }}
                  >
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
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                          padding: '4px',
                          background: 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        {element.content}
                      </div>
                    ) : (
                      <img src={element.content} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    )}
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeElement(element.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                    {resizingElement === element.id && (
                      <>
                        <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize" onMouseDown={(e) => handleResizeStart(e, element.id, 'nw')} />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-nesw-resize" onMouseDown={(e) => handleResizeStart(e, element.id, 'ne')} />
                        <div className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500 rounded-full cursor-nesw-resize" onMouseDown={(e) => handleResizeStart(e, element.id, 'sw')} />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize" onMouseDown={(e) => handleResizeStart(e, element.id, 'se')} />
                      </>
                    )}
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </div>
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
              <object
                type="image/svg+xml"
                data={`/templates/${pageNum}.svg`}
                className="w-full h-full"
              >
                Your browser does not support SVG
              </object>
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

      {/* Font Modal */}
      <Modal isOpen={fontModalOpen} onClose={() => setFontModalOpen(false)} title="Select Font">
        <div className="grid grid-cols-2 gap-2">
          {fonts.map((font) => (
            <button
              key={font}
              className="p-2 bg-gray-200 rounded text-sm"
              style={{ fontFamily: font }}
              onClick={() => {
                if (activeElement) {
                  updateElement(activeElement, { font });
                }
                setFontModalOpen(false);
              }}
            >
              {font}
            </button>
          ))}
        </div>
      </Modal>

      {/* Size Modal */}
      <Modal isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} title="Select Font Size">
        <div className="grid grid-cols-3 gap-2">
          {fontSizes.map((size) => (
            <button
              key={size}
              className="p-2 bg-gray-200 rounded text-sm"
              onClick={() => {
                if (activeElement) {
                  updateElement(activeElement, { size });
                }
                setSizeModalOpen(false);
              }}
            >
              {size}px
            </button>
          ))}
        </div>
      </Modal>

      {/* Color Modal */}
      <Modal isOpen={colorModalOpen} onClose={() => setColorModalOpen(false)} title="Select Color">
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: color }}
              onClick={() => {
                if (activeElement) {
                  updateElement(activeElement, { color });
                }
                setColorModalOpen(false);
              }}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Canvas;