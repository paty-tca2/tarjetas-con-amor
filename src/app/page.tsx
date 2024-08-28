// src/app/page.tsx
import Header from '@/components/header';
import React from 'react';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-24">
        <h2 className="text-2xl font-bold mb-4">Welcome to Our Card Shop</h2>
        <p className="text-center max-w-2xl">
          Create and share your memories with our custom cards and postcards. 
          Upload your pictures, edit text, and choose from our beautiful layouts.
        </p>
        <button className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Start Creating
        </button>
      </div>
    </main>
  );
}