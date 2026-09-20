'use client'

import { useEffect, useRef } from 'react'
import { createScienceTimeline } from './Animations/ScienceTimeline'
import {
    FiSun,
    FiShield,
    FiCpu
} from 'react-icons/fi'
import { FaLeaf } from 'react-icons/fa'


export default function ScienceSection() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = createScienceTimeline(sectionRef.current)
        return () => ctx?.revert()
    }, [])

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        sectionRef.current.style.setProperty("--mx", `${x}%`);
        sectionRef.current.style.setProperty("--my", `${y}%`);
    };


    return (
        <section className='science-section' onMouseMove={handleMouseMove} id='ingredientes' ref={sectionRef}>
            <div className='science-container'>
                <div className='science-grid'>

                    {/* Lado esquerdo */}
                    <div className='science-content'>
                        <span className='science-eyebrow'>CIÊNCIA QUE CUIDA</span>

                        <h2 className='science-title'>
                            Resultados visíveis.
                            <br />
                            Por dentro e por fora.
                        </h2>

                        <p className='science-text'>
                            Desenvolvemos fórmulas profissionais que unem tecnologia cosmética,
                            ativos botânicos e performance de salão para transformar a saúde
                            dos fios com suavidade, brilho e resistência duradoura.
                        </p>

                        <div className='benefits-grid'>
                            <article className='benefit-card benefit-card--glow'>
                                <div className='benefit-icon'>
                                    <FiSun />
                                </div>
                                <h3>Brilho Inteligente</h3>
                                <p>Reflete a luz com naturalidade e revela um acabamento luminoso.</p>
                            </article>

                            <article className='benefit-card benefit-card--glow'>
                                <div className='benefit-icon'>
                                    <FiShield />
                                </div>
                                <h3>Proteção Avançada</h3>
                                <p>Defende os fios contra calor, química e agressões diárias.</p>
                            </article>

                            <article className='benefit-card benefit-card--glow'>
                                <div className='benefit-icon'>
                                    <FaLeaf />
                                </div>
                                <h3>Fórmula Vegana</h3>
                                <p>Ativos botânicos selecionados sem ingredientes de origem animal.</p>
                            </article>

                            <article className='benefit-card benefit-card--glow'>
                                <div className='benefit-icon'>
                                    <FiCpu />
                                </div>
                                <h3>Tecnologia Profissional</h3>
                                <p>Precisão inspirada em protocolos avançados de salão.</p>
                            </article>
                        </div>
                    </div>

                    {/* Lado direito */}
                    <div className='science-visual'>

                        <div className='science-image'>
                            <img
                                src='/images/science-ingredients.png'
                                alt='Ingredientes naturais e científicos Brookliss'
                            />
                        </div>

                        <div className='ingredients-block'>
                            <span className='ingredients-eyebrow'>INGREDIENTES</span>

                            <h3 className='ingredients-title'>
                                Selecionamos o melhor da ciência e da natureza.
                            </h3>

                            <p className='ingredients-text'>
                                Cada ingrediente é escolhido com propósito. Utilizamos ativos de
                                alta performance, extratos botânicos e fórmulas <strong>veganas </strong>
                                desenvolvidas para cuidar dos fios com eficácia profissional e
                                respeito à natureza.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}