"use client"

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const TiltCard = ({ src, alt, name }) => {
  const itemRef = useRef(null);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);

  const [transformStyle, setTransformStyle] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const isVideo = src.endsWith('.mp4');

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

  const handlePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleCardClick = () => {
    if (isVideo && videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsVideoPlaying(false);
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (showModal && modalVideoRef.current) {
      modalVideoRef.current.currentTime = currentTime;
      modalVideoRef.current.play();
    }
  }, [showModal, currentTime]);

  return (
    <>
      <div 
        ref={itemRef}
        className="w-74 h-120 relative rounded-2xl overflow-hidden transition-transform duration-300 ease-out group cursor-pointer"
        style={{ transform: transformStyle }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
            {!isVideoPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition"
              >
                <FaPlay className="text-white text-4xl" />
              </button>
            )}
          </div>
        ) : (
          <Image 
            src={src} 
            alt={alt}
            fill
            className="object-cover"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4
          opacity-100 translate-y-0 transition-all duration-500">
          <span className="text-white font-medium text-xl block text-center">
            {name}
          </span>
        </div>
      </div>

      {showModal && (
        <div 
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
        >
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={src}
              controls
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default function Video() {
  return (
    <div className="flex flex-col items-center bg-[#2C2E55] justify-center p-8 w-full min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          <b>RESULTADO COMPROVADO!</b>
        </h1>
        <h2 className="text-4xl text-white text-blue-100">
          <b>Utilizado por diversas profissionais.</b>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-12 w-screen">
        <TiltCard src="/antesDepois.mp4" alt="Antes e depois video" name="Antes e Depois" />
        <TiltCard src="/antesDepois.mp4" alt="Antes e depois video" name="Antes e Depois" />
        <TiltCard src="/antesDepois.mp4" alt="Antes e depois video" name="Antes e Depois" />
        <TiltCard src="/antesDepois.mp4" alt="Antes e depois video" name="Antes e Depois" />
      </div>
    </div>
  );
}