import React, { useState, useRef, useEffect } from 'react';
import { CardTemplate } from '@/components/cards/card-templates';
import { ChevronLeft, ChevronRight, Type, Image, X, Trash2, AlignLeft, AlignCenter, AlignRight, Palette, Maximize } from 'lucide-react';
import { FileUpload } from './file-upload';
import Draggable from 'react-draggable';
import Modal from './modal';
import { VscTextSize } from 'react-icons/vsc';
import { Resizable } from 're-resizable';

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
  isStatic?: boolean;
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
  const [staticElements, setStaticElements] = useState<CanvasElement[]>([]);

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

  useEffect(() => {
    // Convert static placeholders to CanvasElements
    const currentPagePlaceholders = template.pages.find(p => p.pageNumber === selectedPage)?.staticPlaceholders || [];
    const staticCanvasElements = currentPagePlaceholders.map(placeholder => ({
      id: placeholder.id,
      type: placeholder.type,
      content: placeholder.content || placeholder.placeholder || '',
      position: placeholder.position,
      font: 'Arial', // Default font, adjust as needed
      size: placeholder.type === 'text' ? 16 : undefined, // Default font size for text, adjust as needed
      color: '#000000', // Default color, adjust as needed
      align: 'left', // Default alignment, adjust as needed
      width: placeholder.size.width,
      height: placeholder.size.height,
      isStatic: true
    }));
    setStaticElements(staticCanvasElements as CanvasElement[]);
  }, [template, selectedPage]);

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
  
  const renderSideImage = (pageNum: number) => (
    <div className="w-1/5 flex items-center justify-center">
      <div 
        className={`aspect-[3/4] w-full cursor-pointer transition-all duration-300 ${
          selectedPage === pageNum ? 'opacity-100 scale-100' : 'opacity-50 scale-90 hover:opacity-75 hover:scale-95'
        }`}
        onClick={() => onPageChange(pageNum)}
        style={{ width: '400px', height: '533px' }}
      >
        <object
          type="image/svg+xml"
          data={getSvgPath(pageNum)}
          className="w-full h-full"
        >
          Your browser does not support SVG
        </object>
      </div>
    </div>
  );

  const renderMobileButtons = () => {
    if (activeElement && elements.find(el => el.id === activeElement)?.type === 'text') {
      return (
        <>
          <button
            className="flex flex-col items-center justify-center p-2 rounded-full bg-[#04D9b2] hover:bg-[#5D60a6] text-white transition-colors duration-200"
            onClick={() => setFontModalOpen(true)}
          >
            <Type size={20} />
            <span className="text-xs mt-1">Fuente</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 rounded-full bg-[#04D9b2] hover:bg-[#5D60a6] text-white transition-colors duration-200"
            onClick={() => setSizeModalOpen(true)}
          >
            <VscTextSize size={20} />
            <span className="text-xs mt-1">Tamaño</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 rounded-full bg-[#04D9b2] hover:bg-[#5D60a6] text-white transition-colors duration-200"
            onClick={() => setColorModalOpen(true)}
          >
            <Palette size={20} />
            <span className="text-xs mt-1">Color</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 rounded-full bg-[#04D9b2] hover:bg-[#5D60a6] text-white transition-colors duration-200"
            onClick={() => {
              const currentAlign = elements.find(el => el.id === activeElement)?.align || 'left';
              const nextAlign = currentAlign === 'left' ? 'center' : currentAlign === 'center' ? 'right' : 'left';
              updateElement(activeElement, { align: nextAlign });
            }}
          >
            <AlignCenter size={20} />
            <span className="text-xs mt-1">Alinear</span>
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className={`flex flex-col items-center justify-center p-2 rounded-full ${
              activeTab === 'text' ? 'bg-[#04D9b2] text-white' : 'bg-[#5D60a6] text-white'
            }`}
            onClick={addTextElement}
          >
            <Type size={20} />
            <span className="text-xs mt-1">Texto</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center p-2 rounded-full ${
              activeTab === 'image' ? 'bg-[#5D60a6] text-white' : 'bg-[#04D9b2] text-white'
            }`}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => addImageElement(event.target?.result as string);
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
          >
            <Image size={20} />
            <span className="text-xs mt-1">Imagen</span>
          </button>
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
              <span className="text-xs mt-1">Fuente</span>
            </button>
            <button
              className="w-24 h-24 p-2 bg-[#04D9b2] hover:bg-[#5D60a6] text-white font-geometos rounded-full flex flex-col items-center justify-center transition-colors duration-200"
              onClick={() => setSizeModalOpen(true)}
            >
              <VscTextSize size={20} />
              <span className="text-xs mt-1">Tamaño</span>
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
              <span className="text-xs mt-1">Alinear</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const updateElementSize = (id: string, size: { width: number; height: number }) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...size } : el));
  };

  const getSvgPath = (pageNum: number) => {
    return `/templates/template-${template.id}/${pageNum}.svg`;
  };

  return (
    <div className="w-full">
      {/* Mobile controls */}
      {isMobile && (
        <div className="bg-white rounded-lg p-2 mb-4 flex justify-center space-x-4">
          {renderMobileButtons()}
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-row justify-between items-start">
        {/* Left side image */}
        {!isMobile && renderSideImage(selectedPage > 1 ? selectedPage - 1 : 4)}

        {/* Canvas area and options */}
        <div className={`${isMobile ? 'w-full' : 'w-3/5'} flex flex-col items-center`}>
          <div className="flex w-full justify-center">
            {/* Canvas options */}
            {!isMobile && (
              <div className="w-48 mr-4">
                {renderEditorContent()}
              </div>
            )}

            {/* Canvas */}
            <div 
              className="aspect-[3/4] rounded-lg overflow-hidden relative border-4 border-gray-300" 
              style={{ width: '400px', height: '533px' }}
              onClick={handleCanvasClick}
            >
              <object
                type="image/svg+xml"
                data={getSvgPath(selectedPage)}
                className="w-full h-full absolute top-0 left-0"
              >
                Your browser does not support SVG
              </object>
              <div className="absolute inset-0">
                {staticElements.map((element) => (
                  <div
                    key={element.id}
                    style={{
                      position: 'absolute',
                      left: `${element.position.x}px`,
                      top: `${element.position.y}px`,
                      width: `${element.width}px`,
                      height: `${element.height}px`,
                    }}
                  >
                    {element.type === 'image' ? (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Image size={24} />
                      </div>
                    ) : (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="w-full h-full border border-gray-300 p-2"
                        style={{
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '18px',
                          textAlign: 'center',
                        }}
                        onBlur={(e) => {
                          // Update the content of the static element
                          const updatedElements = staticElements.map(el => 
                            el.id === element.id ? { ...el, content: e.currentTarget.textContent || '' } : el
                          );
                          setStaticElements(updatedElements);
                        }}
                      >
                        {element.content}
                      </div>
                    )}
                  </div>
                ))}
                {elements.map((element) => (
                  <Draggable
                    key={element.id}
                    position={element.position}
                    onStop={(e, data) => updateElement(element.id, { position: { x: data.x, y: data.y } })}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setActiveElement(element.id);
                    }}
                    bounds="parent"
                  >
                    <Resizable
                      size={{ width: element.width, height: element.height }}
                      onResizeStop={(e, direction, ref, d) => {
                        updateElementSize(element.id, {
                          width: element.width + d.width,
                          height: element.height + d.height
                        });
                      }}
                      minWidth={50}
                      minHeight={50}
                      maxWidth={500}
                      maxHeight={500}
                    >
                      <div 
                        className={`absolute cursor-move ${activeElement === element.id ? 'ring-2 ring-blue-500' : ''}`}
                        style={{
                          width: '100%',
                          height: '100%',
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
                              background: activeElement === element.id ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                            }}
                          >
                            {element.content}
                          </div>
                        ) : (
                          <img src={element.content} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        )}
                        {activeElement === element.id && (
                          <button
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform translate-x-1/2 -translate-y-1/2 z-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeElement(element.id);
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </Resizable>
                  </Draggable>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side image */}
        {!isMobile && renderSideImage(selectedPage < 4 ? selectedPage + 1 : 1)}
      </div>

      {/* Page navigation */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button 
          className="bg-gray-200 p-2 rounded-full"
          onClick={() => onPageChange(selectedPage > 1 ? selectedPage - 1 : 4)}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-bold">{selectedPage} / 4</span>
        <button 
          className="bg-gray-200 p-2 rounded-full"
          onClick={() => onPageChange(selectedPage < 4 ? selectedPage + 1 : 1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Font Modal */}
      <Modal isOpen={fontModalOpen} onClose={() => setFontModalOpen(false)} title="Seleccionar Fuente">
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
      <Modal isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} title="Seleccionar Tamaño de Fuente">
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
      <Modal isOpen={colorModalOpen} onClose={() => setColorModalOpen(false)} title="Seleccionar Color">
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