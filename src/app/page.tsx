// src/app/page.tsx
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ProductShowcase from '@/components/productos';
import PromoSouvenirComponent from '@/components/promo-souvenir';
import SocialMediaIcons from '@/components/socials';
import TestimonialsComponent from '@/components/testimonials';
import React from 'react';
import SignIn from "@/app/pages/signIn";
import SignUp from "@/app/pages/signup";

export default function Home() {
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow md:pt-24 lg:pt-28">
          <SignUp/>
      </main>
      <Footer/>
    </div>
  );
}