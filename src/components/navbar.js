"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navItens = [
  "Cabelos",
  "Produtos",
  "Resultados",
  "Vegano",
  "Contato/Lojas",
];

export default function NavBar() {
  const router = useRouter();
  const navContainerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();

  // animação de visibilidade da navbar
  useEffect(() => {
    if (currentScrollY === 0) {
      setNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: navVisible ? 0 : -100,
      opacity: navVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [navVisible]);

  // comportamento ao clicar nos itens da navbar
    const handleNavClick = (item) => {
      const normalized = item.toLowerCase();

      switch (normalized) {
        case "produtos":
          const productsSection = document.getElementById("produtos");
          if (productsSection)
            productsSection.scrollIntoView({ behavior: "smooth" });
          break;

        case "contato/lojas":
          const contactSection = document.getElementById("contato");
          if (contactSection)
            contactSection.scrollIntoView({ behavior: "smooth" });
          break;

        case "cabelos":
          const hairTypeSection = document.getElementById("cabelos");
          if (hairTypeSection)
            hairTypeSection.scrollIntoView({ behavior: "smooth" });
          break;

        case "vegano":
          const vegganSection = document.getElementById("vegano");
          if (vegganSection)
            vegganSection.scrollIntoView({ behavior: "smooth" });
          break;

        default:
          const section = document.getElementById(normalized);
          if (section)
            section.scrollIntoView({ behavior: "smooth" });
          break;
      }
    };

  return (
    <div
      ref={navContainerRef}
      className="fixed top-0 left-0 right-0 bg-[#2C2E55] z-50 h-16 border-none transition-all duration-700"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <Image
            alt="Logo Brookliss"
            src="/logoBrookliss.jpg"
            width={170}
            height={48}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItens.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="nav-hover-btn text-white px-4 py-2 text-sm font-semibold uppercase hover:text-[#e5d4f9] transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-items-center gap-7">
            <button
              onClick={() => router.push("https://wa.me/5519991871870")}
              className="group relative w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black"
            >
              <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
                <div>Venha Conhecer</div>
              </span>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
