// src/containers/Home/HomeContainer.jsx
import React from 'react';
import Carousel from '../../components/organisms/Home/Carousel/Carousel';
import { CultureSection } from '../../components/organisms/Home/Cultura/Cultura';


export default function HomeContainer() {
  return (
    <div className="min-h-[calc(100vh-4rem)]"> 
      <Carousel />
      <CultureSection />
    </div>
  );
}
