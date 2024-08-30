import React, { useState } from 'react';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const DireccionesEnvio: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setAddresses(prev => [...prev, { id, ...newAddress }]);
    setNewAddress({ street: '', city: '', state: '', zipCode: '' });
  };

  return (
    <div className="direcciones-envio-container text-black">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Direcciones de Envío</h2>
      
      <form onSubmit={handleAddAddress} className="mb-6">
        <input
          type="text"
          name="street"
          value={newAddress.street}
          onChange={handleInputChange}
          placeholder="Calle"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="city"
          value={newAddress.city}
          onChange={handleInputChange}
          placeholder="Ciudad"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="state"
          value={newAddress.state}
          onChange={handleInputChange}
          placeholder="Estado"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={newAddress.zipCode}
          onChange={handleInputChange}
          placeholder="Código Postal"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded w-full">
          Agregar Dirección
        </button>
      </form>

      {addresses.length > 0 ? (
        <ul className="address-list font-geometos">
          {addresses.map((address) => (
            <li key={address.id} className="address-item mb-4 p-4 border rounded">
              <p>{address.street}</p>
              <p>{address.city}, {address.state}</p>
              <p>{address.zipCode}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl font-geometos text-[#5D60a6]">No hay direcciones guardadas.</p>
      )}
    </div>
  );
};

export default DireccionesEnvio;
