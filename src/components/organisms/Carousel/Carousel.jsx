"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const destinations = [
  {
    id: 1,
    title: "EL NIDO ISLAND",
    location: "Palawan, Philippines",
    description: "Experience the pinnacle of exceptional service at the world's best island this summer.",
    backgroundImage: "/marrakech-desert-landscape-with-camels-and-sand-du.jpg",
    buttonText: "Explore",
    carouselItems: [
      {
        title: "MAYON VOLCANO",
        subtitle: "Albay, Philippines",
        image: "/yosemite-national-park-mountains-and-waterfalls-la.jpg",
      },
      {
        title: "BORACAY ISLAND",
        subtitle: "Boracay, Philippines",
        image: "/santorini-sunset.png",
      },
      {
        title: "CHOCO HILLS",
        subtitle: "Bohol, Philippines",
        image: "/kyoto-japan-temples-bamboo-forest-traditional-arch.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Boracay Island, Aklan",
    location: "Boracay, Philippines",
    description:
      "Boracay, one of the top islands in the Philippines, is popular for its pristine white sand beaches, vibrant nightlife, crystal clear and azure waters, and a stunning sunset. Boracay is the most iconic island in the Philippines and has won multiple awards in previous years.",
    backgroundImage: "/yosemite-national-park-mountains-and-waterfalls-la.jpg",
    buttonText: "Discover Location",
    carouselItems: [
      {
        title: "EL NIDO ISLAND",
        subtitle: "Palawan, Philippines",
        image: "/marrakech-desert-landscape-with-camels-and-sand-du.jpg",
      },
      {
        title: "CHOCO HILLS",
        subtitle: "Bohol, Philippines",
        image: "/kyoto-japan-temples-bamboo-forest-traditional-arch.jpg",
      },
      {
        title: "MAYON VOLCANO",
        subtitle: "Albay, Philippines",
        image: "/santorini-sunset.png",
      },
    ],
  },
  {
    id: 3,
    title: "SANTORINI ISLAND",
    location: "Santorini, Greece",
    description:
      "Discover the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters.",
    backgroundImage: "/santorini-sunset.png",
    buttonText: "Explore",
    carouselItems: [
      {
        title: "KYOTO TEMPLES",
        subtitle: "Kyoto, Japan",
        image: "/kyoto-japan-temples-bamboo-forest-traditional-arch.jpg",
      },
      {
        title: "EL NIDO ISLAND",
        subtitle: "Palawan, Philippines",
        image: "/marrakech-desert-landscape-with-camels-and-sand-du.jpg",
      },
      {
        title: "BORACAY ISLAND",
        subtitle: "Boracay, Philippines",
        image: "/yosemite-national-park-mountains-and-waterfalls-la.jpg",
      },
    ],
  },
]

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const currentDestination = destinations[currentIndex]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
                <MapPin className="h-5 w-5" />
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

              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium px-8 py-3 rounded-full transition-all duration-300"
              >
                {currentDestination.buttonText}
              </Button>
            </div>

            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {/* Main large card */}
                <Card
                  className="col-span-2 cursor-pointer transition-all duration-500 transform hover:scale-105 bg-white/10 backdrop-blur-sm border-white/20"
                  onClick={() => goToSlide((currentIndex + 1) % destinations.length)}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <img
                        src={currentDestination.carouselItems[0]?.image || "/placeholder.svg"}
                        alt={currentDestination.carouselItems[0]?.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm opacity-80">{currentDestination.carouselItems[0]?.subtitle}</p>
                        <h3 className="font-bold text-xl">{currentDestination.carouselItems[0]?.title}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Two smaller cards */}
                {currentDestination.carouselItems.slice(1, 3).map((item, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer transition-all duration-500 transform hover:scale-105 bg-white/10 backdrop-blur-sm border-white/20"
                    onClick={() => goToSlide((currentIndex + index + 2) % destinations.length)}
                  >
                    <CardContent className="p-0">
                      <div className="relative h-32">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="text-xs opacity-80">{item.subtitle}</p>
                          <h4 className="font-bold text-sm">{item.title}</h4>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
  )
}
