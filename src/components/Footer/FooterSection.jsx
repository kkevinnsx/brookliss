'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FooterSection() {
    const footerRef = useRef(null)

    const handleFooterClick = (id) => {
        const section = document.getElementById(id)
        if (section) section.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (!footerRef.current) return

        const ctx = gsap.context(() => {
            gsap.from('.footer-reveal', {
                y: 32,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                    once: true,
                },
            })
        }, footerRef)

        return () => ctx.revert()
    }, [])

    const handleMouseMove = (e) => {
        if (!footerRef.current) return

        const rect = footerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        footerRef.current.style.setProperty('--mx', `${x}%`)
        footerRef.current.style.setProperty('--my', `${y}%`)
    }

    return (
        <footer
            className='footer-section'
            ref={footerRef}
            onMouseMove={handleMouseMove}
            id='contato'
        >
            <div className='footer-container'>

                {/* CTA BANNER */}
                <div className='footer-cta footer-reveal'>
                    <div className='footer-cta-art' />

                    <div className='footer-cta-content'>
                        <h2>Seu melhor cabelo começa aqui.</h2>
                    </div>

                    <a href='https://wa.me/5519995218744' className='footer-cta-button'>
                        Fale Conosco
                        <span>→</span>
                    </a>
                </div>

                {/* MAIN */}
                <div className='footer-main footer-reveal'>

                    <div className='footer-brand'>
                        <img
                            src='/images/LogoBrookSemFundo.png'
                            alt='Brookliss Professional'
                        />

                        <p>
                            Cosméticos capilares premium desenvolvidos para performance,
                            ciência e sofisticação profissional.
                        </p>
                    </div>

                    <nav className='footer-nav'>
                        <a onClick={() => handleFooterClick('hero')}>Início</a>
                        <a onClick={() => handleFooterClick('manifesto')}>Manifesto</a>
                        <a onClick={() => handleFooterClick('ingredientes')}>Ingredientes</a>
                        <a onClick={() => handleFooterClick('colecao')}>Coleção</a>
                        <a onClick={() => handleFooterClick('contato')}>Contato</a>
                    </nav>

                    <div className='footer-social'>

                        <a href='https://www.instagram.com/brookliss/' target='_blank' aria-label='Instagram'>
                            <svg viewBox='0 0 24 24' fill='none'>
                                <rect x='3' y='3' width='18' height='18' rx='5' stroke='currentColor' strokeWidth='1.7' />
                                <circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='1.7' />
                                <circle cx='17.5' cy='6.5' r='1' fill='currentColor' />
                            </svg>
                        </a>
                        <a href='https://wa.me/5519995218744' target='_blank' aria-label='WhatsApp'>
                            <svg viewBox='0 0 24 24' fill='none'>
                                <path
                                    d='M12 2C6.48 2 2 6.48 2 12C2 13.77 2.46 15.43 3.27 16.86L2 22L7.3 20.7C8.68 21.53 10.3 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z'
                                    stroke='currentColor'
                                    strokeWidth='1.7'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M9.2 8.7C9.45 8.15 9.7 8.1 10.05 8.1C10.3 8.1 10.55 8.1 10.75 8.15C10.95 8.2 11.1 8.35 11.2 8.6L12.1 10.7C12.2 10.95 12.15 11.2 11.95 11.4L11.4 12C11.95 13.1 12.85 14 14 14.55L14.6 14C14.8 13.8 15.05 13.75 15.3 13.85L17.4 14.75C17.65 14.85 17.8 15 17.85 15.25C17.9 15.45 17.9 15.7 17.9 15.95C17.9 16.3 17.85 16.55 17.3 16.8C16.75 17.05 15.75 17.2 14.65 16.8C13.4 16.35 12.15 15.65 11.05 14.55C9.95 13.45 9.25 12.2 8.8 10.95C8.4 9.85 8.55 8.85 8.8 8.3Z'
                                    fill='currentColor'
                                />
                            </svg>
                        </a>

                        <a href='https://mercadolivre.com.br' target='_blank' aria-label='Mercado Livre'>
                            <svg viewBox='0 0 24 24' fill='none'>
                                <path
                                    d='M3 4H5L7.4 14.2C7.55 14.85 8.1 15.3 8.75 15.3H17.5C18.15 15.3 18.7 14.85 18.9 14.25L20.5 8H6'
                                    stroke='currentColor'
                                    strokeWidth='1.7'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <circle
                                    cx='9'
                                    cy='19'
                                    r='1.5'
                                    fill='currentColor'
                                />
                                <circle
                                    cx='17'
                                    cy='19'
                                    r='1.5'
                                    fill='currentColor'
                                />
                            </svg>
                        </a>

                    </div>
                </div>

                {/* BOTTOM */}
                <div className='footer-bottom footer-reveal'>
                    <p>© {new Date().getFullYear()} Brookliss. Todos os direitos reservados.</p>
                </div>

            </div>
        </footer>
    )
}