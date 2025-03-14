import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    title: "Masala Chai"
  },
  {
    url: "https://media.istockphoto.com/id/980106992/photo/samosa-snack-served-with-tomato-ketchup-and-mint-chutney.webp?a=1&b=1&s=612x612&w=0&k=20&c=kLqY6RY-uvHPdGqExrUzas9n4V6GOgoa3XY7ApquWmM=",
    title: "Fresh Samosas"
  },
  {
    url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    title: "Special Combos"
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(current => current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(current => current === slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover object-cover duration-500"
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">{slides[currentIndex].title}</h2>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        <ChevronRight size={30} />
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-110' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
