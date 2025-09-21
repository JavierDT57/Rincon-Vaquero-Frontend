// src/containers/Home/HomeContainer.jsx
import React from 'react';
import Carousel from '../../components/organisms/Home/Carousel/Carousel';
import { CultureSection } from '../../components/organisms/Home/Cultura/Cultura';
import { MapaInteractivo} from '../../components/organisms/Home/Mapa/Mapa';
import { ClimaYEpoca } from '../../components/organisms/Home/Clima/Clima';
import { TestimoniosYFotos } from '../../components/organisms/Home/Testimonios/Testimonios';
import { Footer } from '../../components/molecules/Footer/Footer';

export default function HomeContainer() {
  return (
    <div className="min-h-[calc(100vh-4rem)]"> 
      <Carousel />
      <CultureSection />
      <MapaInteractivo />
      <ClimaYEpoca />
      <TestimoniosYFotos />
      <Footer />
    </div>
  );
}
