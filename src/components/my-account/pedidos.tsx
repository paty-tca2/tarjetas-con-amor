import Link from 'next/link';
import React from 'react';

interface Order {
  id: string;
  date: string;
  total: number;
  // Add more properties as needed
}

const Pedidos: React.FC = () => {
  const orders: Order[] = []; // This would typically be fetched from an API or state

  return (
    <div className="pedidos-container text-black">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Sus Pedidos</h2>
      {orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <p>Pedido #{order.id}</p>
              <p>Data: {order.date}</p>
              <p>Total: R$ {order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
            <div className="mb-4">
              <img src="/templates/template-1/1.svg" alt="Template Preview" className="w-40 h-40 mx-auto" />
            </div>
            <h3 className="text-xl font-geometos text-[#5D60a6] mb-2">Pedido #12345</h3>
            <p className="text-gray-600 mb-2">Fecha: 15 de agosto, 2023</p>
            <p className="text-gray-600 mb-4">Total: $ 199.99</p>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">Estado: En proceso</p>
              <p className="text-sm text-gray-500">
                Dirección de entrega: Calle Principal 123, Ciudad, País, CP 12345
              </p>
            </div>
          </div>
          <Link href="/">
            <button className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full transition duration-300">
              Realizar otro pedido
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
