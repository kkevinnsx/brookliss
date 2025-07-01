"use client"

import Image from "next/image"
import { useRef, useState } from "react"

const TiltCard = ({src, alt, name, price}) => {
    const itemRef = useRef(null)
    const [transformStyle, setTransformStyle] = useState('')
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e) => {
        if(!itemRef.current) return

        const {left, top, width, height} = itemRef.current.getBoundingClientRect()
        const relativeX = (e.clientX - left) / width
        const relativeY = (e.clientY - top)  / height
        const tiltX = (relativeY - 0.5) * 10
        const tiltY = (0.5 - relativeX) * 10
        const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`
        
        setTransformStyle(newTransform)
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setTransformStyle('transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        setTimeout(() => setTransformStyle(''), 300);
        setIsHovered(false);
    }   

    return ( 
        <div className="flex flex-col items-center">
            <div 
                ref={itemRef}
                className="w-64 h-96 relative rounded-2xl overflow-hidden transition-transform duration-300 ease-out group bg-white shadow-md"
                style={{transform: transformStyle}}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
                <div className="h-[75%] relative">
                    <Image
                        src={src}
                        alt={alt}
                        layout="fill"
                        className="object-cover"
                    />
                </div>
                <div className="h-[25%] bg-white p-2 flex flex-col justify-center">
                    <span className="text-black text-sm font-semibold text-center">
                        {name}
                    </span>
                    <span className="text-amber-500 text-lg font-bold text-center">
                        {price}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function Products() {
    const [showAll, setShowAll] = useState(false)
    const products = [
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},

        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},

        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},

        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},
        {src: "/Cacheada.PNG", alt:"Cabelo Cacheado", name:"Teste Produto", price: 255},

    ]

    const visibleProducts = showAll ? products : products.slice(0, 8)

    return(
        <div className="flex flex-col items-center justify-center bg-white p-8 w-full min-h-screen">
            <div className="text-center mb-8">
                <p className="text-lg text-amber-400">
                    Nossos Produtos!
                </p>
                <h2 className="text-4xl font-bold text-black mb-2 text-blue-100">
                    Nossa linha de cuidados
                </h2>
                <p className="text-lg text-blue-100">
                    Produtos formulados para atender a todas as necessidades capilares!
                </p>
            </div>
            <div className="flex flex-wrap justify-center max-w-[1300px] gap-8 w-screen">
                {visibleProducts.map((products, index) => (
                    <TiltCard key={index} {...products} />
                ))}
            </div>

            {!showAll && (
                <button 
                    onClick={() => setShowAll(true)}
                    className="mt-8 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">
                    Mostrar Mais
                </button>
            )}
                
        </div>
    )
}