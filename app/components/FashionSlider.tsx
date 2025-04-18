"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Slide {
  id: number;
  title: string;
  description: string;
  leftImage: string;
  rightImage: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,  
    title: "Summer Vibes",
    description: "Explore the Collection",
    leftImage: "https://images.unsplash.com/photo-1621786030484-4c855eed6974?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=1000",
    color: "#f4d03f"
  },
  {
    id: 2,
    title: "Urban Style",
    description: "Street Fashion Edit",
    leftImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&q=80&w=1000",
    color: "#e74c3c"
  },
  {
    id: 3,
    title: "Autumn Mood",
    description: "Seasonal Collection",
    leftImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1000",
    color: "#27ae60"
  }
];

export default function FashionSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <div 
      ref={sliderRef}
      className="relative w-full h-[90vh] overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${
            index === currentSlide 
              ? "translate-x-0 opacity-100" 
              : index < currentSlide 
                ? "-translate-x-full opacity-0" 
                : "translate-x-full opacity-0"
          }`}
        >
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full overflow-hidden">
              <div 
                className="w-full h-full transform transition-transform duration-500"
                style={{
                  transform: `scale(1.1) translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px)`
                }}
              >
                <img
                  src={slide.leftImage}
                  alt={`Left ${slide.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-1/2 h-full overflow-hidden">
              <div 
                className="w-full h-full transform transition-transform duration-500"
                style={{
                  transform: `scale(1.1) translate(${(mousePosition.x - 50) * -0.05}px, ${(mousePosition.y - 50) * -0.05}px)`
                }}
              >
                <img
                  src={slide.rightImage}
                  alt={`Right ${slide.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              background: `linear-gradient(45deg, ${slide.color}33, transparent)`
            }}
          >
            <div className="text-center transform transition-all duration-500">
              <h2 
                className="font-bourbon text-8xl mb-6 text-white "
                style={{
                  transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
                }}
              >
                {slide.title}
              </h2>
              <p 
                className="text-2xl tracking-[8px] text-white/90 uppercase"
                style={{
                  transform: `translate(${(mousePosition.x - 50) * -0.05}px, ${(mousePosition.y - 50) * -0.05}px)`
                }}
              >
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentSlide) {
                setIsTransitioning(true);
                setCurrentSlide(index);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white w-12" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute top-1/2 left-8 -translate-y-1/2 bg-white/10 text-white p-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute top-1/2 right-8 -translate-y-1/2 bg-white/10 text-white p-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}