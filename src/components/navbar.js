"use client"

import { useEffect, useRef, useState } from "react"
import { useWindowScroll } from "react-use"
import gsap from "gsap"
import { useRouter } from "next/navigation"
import usePremiumButton from "./Manifesto/Hooks/UsePremiumButton"

// NOTE: "Manifesto", "Ingredientes" and "Ciência" point to sections that
// still need to be rebuilt to match the new MVP structure. Until those
// exist, clicking them safely no-ops (see handleNavClick). Swap the ids
// below once those sections land.
const navItems = [
  { label: "Início", id: "inicio" },
  { label: "Manifesto", id: "manifesto" },
  { label: "Ingredientes", id: "ingredientes" },
  { label: "Coleção", id: "colecao" },
  { label: "Contato", id: "contato" },
]

export default function NavBar() {
  const router = useRouter()
  const navRef = useRef(null)
  const hasEntered = useRef(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const { y: currentScrollY } = useWindowScroll()

  usePremiumButton(".nav-cta")

  // Sticky behaviour — visible at load, hides on scroll down, returns on
  // scroll up (23_NAVIGATION_SYSTEM.md)
  useEffect(() => {
    setScrolled(currentScrollY > 8)

    if (currentScrollY === 0) {
      setVisible(true)
    } else if (currentScrollY > lastScrollY) {
      setVisible(false)
    } else {
      setVisible(true)
    }
    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    if (!navRef.current) return

    if (!hasEntered.current) {
      hasEntered.current = true
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }
      )
      return
    }

    gsap.to(navRef.current, {
      y: visible ? 0 : -110,
      opacity: visible ? 1 : 0,
      duration: visible ? 0.5 : 0.35,
      ease: "power3.out",
      overwrite: "auto",
    })
  }, [visible])

  const handleNavClick = (id) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      ref={navRef}
      className={`nav-shell fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
        ? "nav-shell-scrolled"
        : "nav-shell-top"
        }`}
    >
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-20">
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="nav-logo flex flex-col items-start leading-none cursor-pointer"
        >
          <span className="font-serif text-xl md:text-2xl tracking-wide text-[#0E3E7E]">
            BROOK<span className="font-light">LISS</span>
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#0E3E7E]/55 border-t border-[#0E3E7E]/20 pt-0.5 mt-0.5">
            Profissional
          </span>
        </button>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="nav-link text-xs tracking-[0.12em] uppercase text-[#174d88] cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA — same blue token as the Hero CTA, so the two never feel
            like they belong to different palettes */}
        <button
          onClick={() => router.push("https://wa.me/5519995218744")}
          className="nav-cta text-white text-xs font-medium tracking-[0.08em] uppercase rounded-full px-6 py-3 cursor-pointer"
        >
          Fale Conosco
        </button>
      </nav>
    </header>
  )
}
