"use client"

import Image from 'next/image';
import { useRef, useState } from 'react';

const TiltCard = ({ src, alt, name }) => {
  const itemRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 10; 
    const tiltY = (0.5 - relativeX) * 10;
    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    setTransformStyle(newTransform);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTransformStyle('transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setTimeout(() => setTransformStyle(''), 300);
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={itemRef}
        className="w-74 h-120 relative rounded-2xl overflow-hidden transition-transform duration-300 ease-out group"
        style={{ transform: transformStyle }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image 
          src={src} 
          alt={alt}
          fill
          className="object-cover"
        />
        
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4
          transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <span className="text-white font-medium text-xl block text-center">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function HairType() {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-8 w-full min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2 text-blue-100">
          <b>PARA TODOS OS TIPOS DE CABELO!</b>
        </h1>
        <h2 className="text-4xl text-gray-600 text-blue-100">
          Porque você merece se cuidar com consciência.
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-12 w-screen">
        <TiltCard src="/Cacheada.PNG" alt="Cabelo Cacheado" name="CACHEADOS" />
        <TiltCard src="/Lisa.PNG"     alt="Cabelo Liso"     name="LISOS" />
        <TiltCard src="/Crespa.PNG"   alt="Cabelo Crespo"   name="CRESPOS" />
        <TiltCard src="/Ondulada.PNG" alt="Cabelo Ondulado" name="ONDULADOS" />
      </div>
    </div>
  );
}