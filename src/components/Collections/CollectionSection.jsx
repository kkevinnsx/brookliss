'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { COLLECTIONS } from '../../Constants/CollectionConstant'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CollectionSection() {
    const [active, setActive] = useState(COLLECTIONS[0].id)
    const [selected, setSelected] = useState(null)
    const sectionRef = useRef(null)

    const current = useMemo(
        () => COLLECTIONS.find(c => c.id === active),
        [active]
    )

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return

        const rect = sectionRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        sectionRef.current.style.setProperty("--mx", `${x}%`)
        sectionRef.current.style.setProperty("--my", `${y}%`)
    }

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            gsap.from('.collection-section .reveal', {
                y: 32,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
            })

            gsap.from('.collection-section .product-card', {
                y: 28,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: {
                    trigger: '.collection-carousel',
                    start: 'top 85%',
                    once: true,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [active])

    return (
        <section className='collection-section' onMouseMove={handleMouseMove} id='colecao' ref={sectionRef}>
            <div className='collection-container'>
                {/* HEADER */}
                <div className='collection-header reveal'>
                    <span className='collection-kicker'>COLEÇÃO</span>

                    <div className='collection-title'>
                        <h2>Sofisticação em <br /> cada detalhe.</h2>
                    </div>
                </div>

                {/* TABS */}
                <div className='collection-tabs reveal'>
                    {COLLECTIONS.map(item => (
                        <button
                            key={item.id}
                            className={item.id === active ? 'active' : ''}
                            onClick={() => setActive(item.id)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <div className='collection-content'>
                    <div className='collection-intro reveal'>
                        <h3>{current.name}</h3>
                        <p>{current.tagline}</p>
                    </div>

                    <div className='collection-carousel-wrapper reveal'>
                        <div className='collection-carousel'>
                            {current.products.map(product => (
                                <article className='product-card' key={product.id}>
                                    <div className='product-image'>
                                        <img src={product.image} alt={product.name} />
                                    </div>

                                    <div className='product-info'>
                                        <h4>{product.name}</h4>
                                        <p>{product.short}</p>

                                        <div className='product-footer'>
                                            <span>{product.volume}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}