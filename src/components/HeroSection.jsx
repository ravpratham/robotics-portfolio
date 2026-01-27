import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1920&q=80',
      alt: 'Industrial Robot Factory'
    },
    {
      url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1920&q=80',
      alt: 'White Robot Arm'
    },
    {
      url: 'https://images.unsplash.com/photo-1717386255773-1e3037c81788?w=1920&q=80',
      alt: 'Manufacturing Plant'
    },
    {
      url: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?w=1920&q=80',
      alt: 'Precision Gears'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide]);

  const handleManualNavigation = (action) => {
    setIsAutoPlaying(false);
    action();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl">
          Introduction to
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Robotics
          </span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
          Exploring the fundamentals of robotics, automation, and intelligent systems
        </p>

        {/* Carousel dots */}
        <div className="flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(() => goToSlide(index))}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => handleManualNavigation(prevSlide)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => handleManualNavigation(nextSlide)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 rounded-full border-2 border-gray-400">
          <div className="mx-auto mt-2 h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;