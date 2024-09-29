import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-geometos text-[#5d60a6] mb-4">¡Éxito!</h2>
        <p className="text-gray-700 font-geometos mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
