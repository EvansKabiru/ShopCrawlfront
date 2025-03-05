import React, { useState, useEffect } from "react";

const images = [
  "https://i.pcmag.com/imagery/articles/07Hm155HQLUB0VhzcIsrou8-12.fit_lim.size_1200x630.v1717434783.jpg",
  "https://www.simbapos.co.ke/wp-content/uploads/2021/04/online-shop-kenya.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-7mQ_COj8P8K9xQYwrH_t1sv7oUT-qP_WUA&s",
  "https://cbx-prod.b-cdn.net/COLOURBOX33573970.jpg?width=800&height=800&quality=70",
  "https://ke.jumia.is/cms/2025/W08/JAS/mny-50-desktop.jpg",
  "https://ke.jumia.is/cms/2025/W08/verseman-desktop.png",
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[400px] w-[800px] max-w-screen-xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
