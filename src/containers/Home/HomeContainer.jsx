// src/containers/Home/HomeContainer.jsx
import React from 'react';
import Carousel from '../../components/organisms/Carousel/Carousel';

export default function HomeContainer() {
  return (
    <div className="min-h-[calc(100vh-4rem)]"> 
      <Carousel />
    </div>
  );
}
