"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const TiltCard = ({ src, alt, name }) => {
  const itemRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (0.5 - relativeX) * 10;
    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
  };

  return (
    <div
      ref={itemRef}
      className="relative w-[250px] sm:w-[280px] md:w-[300px] h-[350px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden shadow-md transition-transform duration-300 ease-out hover:shadow-xl"
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={src} alt={alt} fill className="object-cover" />

      {/* Overlay com nome */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4">
        <span className="text-white font-semibold text-lg sm:text-xl md:text-2xl block text-center drop-shadow-md">
          {name}
        </span>
      </div>
    </div>
  );
};

export default function HairType() {
  return (
    <div id="cabelos" className="flex flex-col items-center justify-center bg-white px-6 sm:px-10 py-12 w-full min-h-screen">
      {/* Cabeçalho */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C2E55] mb-3">
          PARA TODOS OS TIPOS DE CABELO!
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600">
          Porque você merece se cuidar com consciência.
        </h2>
      </div>

      {/* Cards responsivos */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 max-w-7xl">
        <TiltCard src="/Cacheada.PNG" alt="Cabelo Cacheado" name="CACHEADOS" />
        <TiltCard src="/Lisa.PNG" alt="Cabelo Liso" name="LISOS" />
        <TiltCard src="/Crespa.PNG" alt="Cabelo Crespo" name="CRESPOS" />
        <TiltCard src="/Ondulada.PNG" alt="Cabelo Ondulado" name="ONDULADOS" />
      </div>
    </div>
  );
}
