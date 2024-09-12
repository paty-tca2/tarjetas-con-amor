import React, { useState } from 'react';

interface Address {
  id: string;
  name: string;
  street: string;
  interiorNumber: string;
  exteriorNumber: string;
  colony: string;
  city: string;
  state: string;
  zipCode: string;
}

const DireccionesEnvio: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    street: '',
    interiorNumber: '',
    exteriorNumber: '',
    colony: '',
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
    setNewAddress({ name: '', street: '', exteriorNumber: '', interiorNumber: '', colony: '', city: '', state: '', zipCode: '' });
  };

  return (
    <div className="direcciones-envio-container text-black">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Direcciones de Envio</h2>
      
      <form onSubmit={handleAddAddress} className="mb-6">
      <input
          type="text"
          name="name"
          value={newAddress.name}
          onChange={handleInputChange}
          placeholder="Nombre del destinatario"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
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
          name="exteriorNumber"
          value={newAddress.exteriorNumber}
          onChange={handleInputChange}
          placeholder="Numero Exterior"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
         <input
          type="text"
          name="interiorNumber"
          value={newAddress.interiorNumber}
          onChange={handleInputChange}
          placeholder="Numero Interior"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="colony"
          value={newAddress.colony}
          onChange={handleInputChange}
          placeholder="Colonia"
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
          placeholder="Codigo Postal"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full">
          Agregar Direccion
        </button>
      </form>

      {addresses.length > 0 ? (
        <ul className="address-list font-geometos">
          {addresses.map((address, index) => (
            <li key={address.id} className="address-item mb-4 p-4 border rounded relative">
              <span className="absolute top-2 right-2 bg-[#04d9b2] text-white rounded-full w-6 h-6 flex items-center justify-center">
                {index + 1}
              </span>
              <p>{address.name}</p>
              <p>{address.street}</p>
              <p>{address.exteriorNumber}</p>
              <p>{address.interiorNumber}</p>
              <p>{address.colony}</p>
              <p>{address.city}, {address.state}</p>
              <p>{address.zipCode}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl font-geometos text-[#5D60a6]">No hay direcciones guardadas</p>
      )}
    </div>
  );
};

export default DireccionesEnvio;
