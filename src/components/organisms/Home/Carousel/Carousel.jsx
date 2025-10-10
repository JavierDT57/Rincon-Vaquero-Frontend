// src/components/organisms/Carousel/Carousel.jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../../molecules/Card";
import Button from "../../../atoms/Button";
import { MapPin } from "lucide-react";

/* IMPORTA AQUI TUS IMÁGENES desde src/assets */
import iglesia from "../../../../assets/Home/iglesia1.jpg";
import fiesta from "../../../../assets/Home/fiesta1.jpg";
import rio from "../../../../assets/Home/rio1.jpg";
import salón from "../../../../assets/Home/salon1.jpg";

const destinations = [
 {
    id: 1,
    title: "Iglesia",
    location: "Rincon Vaquero",
    description: "Un lugar de fe y tradición, símbolo de la identidad cultural del pueblo.",
    backgroundImage: iglesia,
    buttonText: "Explorar",
    carouselItems: [
      {
        title: "Salón",
        subtitle: "Rincon Vaquero",
        image: fiesta,
      },
      {
        title: "Paso del Mango",
        subtitle: "Rincon Vaquero",
        image: rio,
      },
      {
        title: "Salón",
        subtitle: "Rincon Vaquero",
        image: salón,
      },
    ],
  },
  {
    id: 2,
    title: "Salón",
    location: "Rincon Vaquero",
    description:
      "El salón del pueblo, escenario de eventos, bailes y asambleas que fortalecen la unión vecinal.",
    backgroundImage: fiesta,
    buttonText: "Explorar",
    carouselItems: [
      {
        title: "Iglesia",
        subtitle: "Rincon Vaquero",
        image: iglesia,
      },
      {
        title: "Salón",
        subtitle: "Rincon Vaquero",
        image: salón,
      },
      {
        title: "Paso del mango",
        subtitle: "Rincon Vaquero",
        image: rio,
      },
    ],
  },
  {
    id: 3,
    title: "Paso del mango",
    location: "Rincon Vaquero",
    description:
      "El río que da vida a la comunidad, reflejando la calma de la naturaleza y el día a día rural.",
    backgroundImage: rio,
    buttonText: "Explorar",
    carouselItems: [
      {
        title: "Salón",
        subtitle: "Kyoto, Japan",
        image: salón,
      },
      {
        title: "Iglesia",
        subtitle: "Rincon Vaquero",
        image: iglesia,
      },
      {
        title: "Salón",
        subtitle: "Rincon Vaquero",
        image: fiesta,
      },
    ],
  },
  {
    id: 4,
    title: "Salón",
    location: "Rincon Vaquero",
    description:
      "Espacio central para reuniones y celebraciones, donde la comunidad comparte sus tradiciones.",
    backgroundImage: salón,
    buttonText: "Explorar",
    carouselItems: [
      {
        title: "Paso del mango",
        subtitle: "Rincon Vaquero",
        image: rio,
      },
      {
        title: "Iglesia",
        subtitle: "Rincon Vaquero",
        image: iglesia,
      },
      {
        title: "Salón",
        subtitle: "Rincon Vaquero",
        image: fiesta,
      },
    ],
  },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const currentDestination = destinations[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(() => setCurrentIndex((i) => (i + 1) % destinations.length), 6000);
    return () => clearInterval(t);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };


  return (
    <div className="relative w-full overflow-hidden h-[60vh] md:h-[50vh]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentDestination.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and Description */}
            <div className="text-white space-y-8">
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-lg">{currentDestination.location}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                  {currentDestination.title}
                </h1>

                <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                  {currentDestination.description}
                </p>
              </div>

              <button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium px-8 py-3 rounded-full transition-all duration-300">
                {currentDestination.buttonText}
              </button>
            </div>

            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {/* Main large card */}
                <div
                  className="col-span-2 cursor-pointer transition-all duration-500 transform hover:scale-105 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
                  onClick={() => goToSlide((currentIndex + 1) % destinations.length)}
                >
                  <div className="relative h-48">
                    <img
                      src={currentDestination.carouselItems[0]?.image || "/placeholder.svg"}
                      alt={currentDestination.carouselItems[0]?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm opacity-80">{currentDestination.carouselItems[0]?.subtitle}</p>
                      <h3 className="font-bold text-xl">{currentDestination.carouselItems[0]?.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Two smaller cards */}
                {currentDestination.carouselItems.slice(1, 4).map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer transition-all duration-500 transform hover:scale-105 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
                    onClick={() => goToSlide((currentIndex + 1) % destinations.length)}
                  >
                    <div className="relative h-32">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 text-white">
                        <p className="text-xs opacity-80">{item.subtitle}</p>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-20 flex space-x-3">
        {destinations.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}