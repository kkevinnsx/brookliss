"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import Image from "next/image";

const navItens = ["Cabelos", "Produtos", "Resultados", "Vegano", "Contato/Lojas"]
const externalLinks = {
  Contato: "https://exemplo.com/produtos",
};

export default function NavBar () { 
    const [indicatorActive, setIndicatorActive] = useState(false)
    const navContainerRef = useRef(null)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [navVisible, setNavVisible] = useState(0)
    const {y: currentScrollY} = useWindowScroll()

    useEffect(() => {
        if (currentScrollY === 0) { 
            setNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if (currentScrollY < lastScrollY) {
            setNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')
        }
        setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY]) 

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: navVisible ? 0 : -100,
            opacity: navVisible ? 1 : 0,
            duration: 0.2,
        })
    })

    return (
        <div ref={navContainerRef} className="fixed top-0 left-0 right-0 bg-[#2C2E55] z-50 h-16 border-none transition-all duration-700">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <Image alt="Logo Brookliss" src="/logoBrookliss.jpg" width={170} height={48}/>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItens.map((item) => {
                                const isExternal = externalLinks[item];
                                return isExternal ? (
                                    <a
                                        key={item}
                                        href={externalLinks[item]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nav-hover-btn"
                                    >
                                        {item}
                                    </a>
                                ) : (
                                    <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                        {item}
                                    </a>
                                    )
                            })}
                        </div>
                    </div>
                    <div className="flex-items-center gap-7">
                        <button
                            id="Contact"
                            className={`group relative w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black`}>
                            <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
                                <div>Venha Conhecer</div>
                            </span>
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}