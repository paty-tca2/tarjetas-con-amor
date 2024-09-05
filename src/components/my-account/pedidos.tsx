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
          <p className="no-orders-message text-xl font-geometos text-[#5D60a6] mb-4">Parece que no has hecho ningun pedido.</p>
          <Link href="/">
            <button className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full">
              Comienza a comprar
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
