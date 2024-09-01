"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { cardTemplates } from '@/components/cards/card-templates';
import Canvas from '@/components/personalize/canvas';
import { CardTemplate } from '@/components/cards/card-templates';
import PersonalizeHeader from '@/components/personalize/header-personalize';

export default function PersonalizePage() {
  const { id } = useParams();
  const [template, setTemplate] = useState<CardTemplate | null>(null);

  useEffect(() => {
    const selectedTemplate = cardTemplates.find(t => t.id === id);
    setTemplate(selectedTemplate || null);
  }, [id]);

  const handlePreview = () => {
    // Implement preview logic
  };

  const handleAddToBasket = () => {
    // Implement add to basket logic
  };

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto pt-48 px-4 py-8">
        <PersonalizeHeader onPreview={handlePreview} onAddToBasket={handleAddToBasket} />
      <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6 text-center">Personaliza tu tarjeta</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Canvas template={template} />
        {/* You can add additional components or toolbars here if needed */}
      </div>
    </div>
  );
}
