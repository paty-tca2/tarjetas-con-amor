import React from 'react';
import { Heart, Facebook, Instagram, Twitter } from 'lucide-react';

const EmailTemplate = (p0: { firstName: string; }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white font-sans" style={{ color: '#5d60a6' }}>
      <header className="flex flex-row-reverse justify-between items-center mb-6">
        <img src="/logo-principal.png" alt="Logo" className="h-12" />
        <img src="/compartiendo-tus-memorias.png" alt="Slogan" className="h-12" />
      </header>

      <main>
        <h1 className="text-2xl font-bold mb-4">¡Bienvenid@ a Tarjetas con Amor!</h1>
        
        <p className="mb-4">Estamos felices de que te hayas unido a nuestra comunidad dónde compartes tus memorias más preciadas, cobrando vida a través de hermosas tarjetas, postales, álbumes personalizados y calendarios.</p>
        
        <h2 className="text-xl font-semibold mb-2">¿Qué puedes hacer en Tarjetas con Amor?</h2>
        <ol className="list-decimal list-inside mb-4">
          <li>Crear tarjetas únicas: Diseña tarjetas personalizadas para cualquier ocasión, desde cumpleaños hasta aniversarios o solo compartir un momento.</li>
          <li>Enviar postales: Sorprende a tus seres queridos con postales compartiendo tus aventuras.</li>
        </ol>
        
        <p className="font-semibold mb-2">Solo sigue 4 pasos y en minutos estarás compartiendo tus memorias:</p>
        <ol className="list-decimal list-inside mb-6">
          <li>Explora nuestra galería de productos.</li>
          <li>Sube tus fotos favoritas</li>
          <li>Personaliza tus diseños con nuestro editor intuitivo</li>
          <li>Comparte tus memorias!!!</li>
        </ol>
        
        <p className="mb-6">¡Esperamos ver tus hermosas creaciones pronto!</p>
        
        <a 
          href="https://www.tarjetasconamor.com/my-account" 
          className="bg-[#04d9b1] text-white py-2 px-4 rounded hover:bg-[#5d60a6] transition duration-300"
        >
          Ingresar a tu cuenta
        </a>
        
        <p className="mt-6 mb-2">Crea, comparte y atesora,</p>
        <p className="font-semibold">El equipo de Tarjetas con Amor.</p>
      </main>

      <footer className="mt-8">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-[#5d60a6] hover:text-[#04d9b1]"><Facebook size={24} /></a>
          <a href="#" className="text-[#5d60a6] hover:text-[#04d9b1]"><Instagram size={24} /></a>
          <a href="#" className="text-[#5d60a6] hover:text-[#04d9b1]"><Twitter size={24} /></a>
        </div>
        
        <div className="text-center text-sm">
          <a href="#" className="hover:underline">Aviso de Privacidad</a> | <a href="#" className="hover:underline">Términos y Condiciones</a>
        </div>
        
        <div className="flex justify-center mt-4">
          <Heart size={24} className="text-[#04d9b1]" />
        </div>
      </footer>
    </div>
  );
};

export default EmailTemplate;