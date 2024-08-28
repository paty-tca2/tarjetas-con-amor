// src/app/page.tsx
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ProductShowcase from '@/components/productos';
import PromoSouvenirComponent from '@/components/promo-souvenir';
import SocialMediaIcons from '@/components/socials';
import TestimonialsComponent from '@/components/testimonials';
import React from 'react';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection/>
      <ProductShowcase/>
      <PromoSouvenirComponent/>
      <TestimonialsComponent/>
      <SocialMediaIcons/>
      <Footer/>
    </main>
  );
}