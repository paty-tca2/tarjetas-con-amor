"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CardTemplate } from '@/components/cards/card-templates';
import { useSession } from 'next-auth/react';

type CardOptions = {
  type: 'ecard' | 'standard';
  quantity: number;
};

type CardSize = {
  label: string;
  description: string;
  price: number;
  bgColor: string;
};

const cardSizes: Record<CardOptions['type'], CardSize> = {
  ecard: { label: 'eCard', description: 'Envio instantaneo', price: 99, bgColor: '#04d9b2' },
  standard: { label: 'Standard Card', description: 'Para tus seres queridos', price: 199, bgColor: '#5D60a6' },
};

type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

const CartPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cartItem, setCartItem] = useState<{ template: CardTemplate; options: CardOptions } | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (session) {
        try {
          const response = await fetch('/api/user/address');
          if (response.ok) {
            const data = await response.json();
            setAddresses(data);
          } else {
            console.error('Failed to fetch addresses');
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAddresses();
    const storedTemplate = localStorage.getItem('selectedTemplate');
    const storedOptions = localStorage.getItem('selectedOptions');

    if (storedTemplate && storedOptions) {
      try {
        const template = JSON.parse(storedTemplate) as CardTemplate;
        const options = JSON.parse(storedOptions) as CardOptions;
        setCartItem({ template, options });
      } catch (error) {
        console.error('Error parsing stored cart data:', error);
        localStorage.removeItem('selectedTemplate');
        localStorage.removeItem('selectedOptions');
      }
    }
  }, [session]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handlePayment = () => {
    console.log('Processing payment...');
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (cartItem) {
      const updatedOptions = { ...cartItem.options, quantity: newQuantity };
      setCartItem({ ...cartItem, options: updatedOptions });
      localStorage.setItem('selectedOptions', JSON.stringify(updatedOptions));
    }
  };

  const handleTypeChange = (newType: CardOptions['type']) => {
    if (cartItem) {
      const updatedOptions = { ...cartItem.options, type: newType };
      setCartItem({ ...cartItem, options: updatedOptions });
      localStorage.setItem('selectedOptions', JSON.stringify(updatedOptions));
    }
  };

  const handleRemoveItem = () => {
    setCartItem(null);
    localStorage.removeItem('selectedTemplate');
    localStorage.removeItem('selectedOptions');
  };

  const handleContinueShopping = () => {
    router.push('/cards');
  };

  if (!cartItem) {
    return (
      <div className="container mx-auto pt-48 px-4 py-8 text-center">
        <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6">Carrito vacío</h1>
        <p className="text-xl font-geometos text-gray-600 mb-8">No hay artículos en tu carrito.</p>
        <button
          onClick={handleContinueShopping}
          className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-6 py-3 rounded font-geometos text-lg"
        >
          Continuar comprando
        </button>
      </div>
    );
  }

  const totalPrice = cardSizes[cartItem.options.type].price * cartItem.options.quantity;

  return (
    <div className="container mx-auto pt-48 px-4 py-8">
      <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6 text-center">Carrito</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Artículo en el carrito</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Image 
              src={`/templates/TEMPLATE-${cartItem.template.id}-1.webp`} 
              alt="Card Template" 
              width={200} 
              height={200} 
              className="w-full h-48 object-cover rounded-lg mb-4" 
            />
            <h3 className="text-xl font-geometos text-[#5D60a6]">{cartItem.template.id}</h3>
            <p className="text-sm font-geometos text-gray-600">{cardSizes[cartItem.options.type].description}</p>
            
            {/* Card Type Selection */}
            <div className="mt-4">
              <label className="block text-sm font-geometos text-gray-600 mb-2">Tipo de tarjeta:</label>
              <div className="flex space-x-4">
                {(['ecard', 'standard'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`px-4 py-2 rounded-full font-geometos text-sm ${
                      cartItem.options.type === type
                        ? 'bg-[#5D60a6] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {cardSizes[type].label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(Math.max(1, cartItem.options.quantity - 1))}
                  className="bg-gray-200 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="bg-gray-100 px-4 py-1">{cartItem.options.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(cartItem.options.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-geometos text-[#04d9b2]">
                ${cardSizes[cartItem.options.type].price} x {cartItem.options.quantity}
              </p>
            </div>
            <p className="text-lg font-geometos text-[#5D60a6] mt-2">Total: ${totalPrice}</p>
            <button
              onClick={handleRemoveItem}
              className="mt-4 text-red-500 hover:text-red-700 font-geometos"
            >
              Eliminar articulo
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Direccion de envio</h2>
          {isLoading ? (
            <p>Cargando direcciones...</p>
          ) : addresses.length > 0 ? (
            <select
              value={selectedAddress}
              onChange={handleAddressChange}
              className="w-full p-2 mb-4 font-geometos text-[#5D60a6] border border-gray-200 rounded-lg"
            >
              <option value="">Selecciona una direccion</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id.toString()}>
                  {`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-xl font-geometos text-[#5D60a6]">No hay direcciones guardadas. Por favor, agrega una direccion en tu perfil.</p>
          )}
          
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Metodo de pago</h2>
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <p className="font-geometos text-[#5D60a6]">Opciones de pago en desarrollo</p>
          </div>
          
          <button
            onClick={handlePayment}
            className="w-80 bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-4 py-2 rounded-full font-geometos"
          >
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
