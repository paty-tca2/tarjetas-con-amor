import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/fondo-hero.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[48rem] h-auto mb-8 px-4 sm:px-0 relative">
          <Image
            src="/logo-principal.png"
            alt="Tarjetas con amor logo"
            layout="responsive"
            width={480}
            height={240}
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-white text-sm sm:text-xl font-geometos text-center sm:text-left w-full sm:w-auto">
        ENVIOS GRATIS A TODA LA REPUBLICA
      </div>
    </div>
  );
};

export default HeroSection;