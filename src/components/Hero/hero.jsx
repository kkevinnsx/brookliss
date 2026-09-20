"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import usePremiumButton from "../Manifesto/Hooks/UsePremiumButton"
import createHeroBridge from "./HeroBridge"

export default function Hero({ onReady }) {
  const sceneContainerRef = useRef(null)
  const sceneRef = useRef(null)
  const textRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const heroRef = useRef(null)
  const heroProgress = useRef(0)

  usePremiumButton(".hero-primary-cta")

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return
    const { left, top, width, height } = heroRef.current.getBoundingClientRect()
    heroRef.current.style.setProperty("--mx", `${((e.clientX - left) / width) * 100}%`)
    heroRef.current.style.setProperty("--my", `${((e.clientY - top) / height) * 100}%`)
  }

  const handleHeroClick = (id) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  // Mount the Three.js scene client-side only, after first paint,
  // so the LCP text content is never blocked (24_PERFORMANCE_ENGINEERING.md)
  useEffect(() => {
    let mounted = true

    import("./ProductScene").then(({ default: ProductScene }) => {
      createHeroBridge()
      if (!mounted || !sceneContainerRef.current) return
      sceneRef.current = new ProductScene(sceneContainerRef.current, {
        onReady: () => {
          setReady(true)
          onReady?.()
        },
        onError: () => setLoadError(true),
      })
    })

    return () => {
      mounted = false
      sceneRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    const update = (e) => {
      heroProgress.current = e.detail.progress
      if (!sceneRef.current) return
      sceneRef.current.setBridgeProgress?.(heroProgress.current)
    }

    window.addEventListener(
      "brookliss:heroBridge",
      update
    )

    return () => {
      window.removeEventListener(
        "brookliss:heroBridge",
        update
      )
    }
  }, [])

  // Progressive reveal — 14_MOTION_SYSTEM.md: fade/mask, never bounce
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          ".hero-title-line",
          { opacity: 0, y: 28, duration: 0.9, stagger: 0.12 },
          "-=0.3"
        )
        .from(".hero-subtitle", { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4")
        .from(".hero-saibamais", { opacity: 0, duration: 0.6 }, "-=0.4")
    }, textRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e) => {
    if (!sceneContainerRef.current || !sceneRef.current) return
    const { left, top, width, height } =
      sceneContainerRef.current.getBoundingClientRect()
    const nx = ((e.clientX - left) / width) * 2 - 1
    const ny = ((e.clientY - top) / height) * 2 - 1
    sceneRef.current.onMouseMove(nx, ny)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      className="hero-shell hero-shell-move relative min-h-screen w-full flex items-center overflow-hidden px-6 md:px-12 lg:px-20 pt-24"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text column */}
        <div ref={textRef} className="text-center lg:text-left">
          <span className="hero-eyebrow block text-xs tracking-[0.2em] uppercase text-[#015C91] font-semibold mb-4">
            Brookliss Profissional
          </span>

          <h1 className="font-serif text-[#0E3E7E] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
            <span className="hero-title-line block">Ciência que</span>
            <span className="hero-title-line block">transforma.</span>
            <span className="hero-title-line block">Beleza que</span>
            <span className="hero-title-line block">permanece.</span>
          </h1>

          <p className="hero-subtitle font-sans text-[#496889] text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8">
            Fórmulas inteligentes para cabelos extraordinários, criadas com
            precisão, cuidado e tecnologia.
          </p>

          <button onClick={() => handleHeroClick('colecao')} className="hero-cta hero-primary-cta inline-flex items-center gap-2 text-white rounded-full px-8 py-4 text-sm font-medium font-sans">
            Descubra a Coleção
            <span aria-hidden>→</span>
          </button>

          <div className="hero-saibamais mt-8 flex justify-center lg:justify-start">
            <button className="text-xs tracking-[0.15em] uppercase text-[#2C2E55]/70 font-sans flex items-center gap-1">
              Saiba mais
              <span aria-hidden>⌄</span>
            </button>
          </div>
        </div>

        {/* 3D column */}
        <div className="relative w-full aspect-square max-w-[640px] mx-auto lg:translate-x-4">
          <div className="hero-scene-glow" aria-hidden />
          <div
            ref={sceneContainerRef}
            onMouseMove={handleMouseMove}
            className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"
              }`}
          />

          {/* Loading state — never a blank canvas (25_ACESSIBILITY / 24_PERFORMANCE) */}
          {!ready && !loadError && (
            <div className="hero-loader absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="hero-loader-orbit" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#0B5A98]/70 font-sans">
                Preparando a experiência
              </span>
            </div>
          )}

          {/* Error state — surfaces the problem instead of spinning forever */}
          {loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
              <span className="text-sm text-[#2C2E55]/60 font-sans">
                Não foi possível carregar o modelo 3D.
              </span>
              <span className="text-xs text-[#2C2E55]/40 font-sans">
                Confirme se o arquivo está em{" "}
                <code className="text-[#015C91]">
                  public/models/brookliss_matizador_300ml_ft.glb
                </code>
              </span>
            </div>
          )}

          {/* Mouse hint */}
          <div className="mouse-cue hidden md:flex items-center gap-2 absolute bottom-12 right-4 text-[10px] tracking-[0.15em] uppercase font-sans">
            <span className="mouse-cue-icon" aria-hidden />
            Mova o mouse
          </div>
        </div>
      </div>
    </section>
  )
}
