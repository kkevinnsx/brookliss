'use client'

import { useEffect, useState } from 'react'

const sections = [
    { id: 'hero',      label: '01' },
    { id: 'manifesto', label: '02' },
    { id: 'ingredientes', label: '03' },
    { id: 'colecao', label: '04' },
    { id: 'contato', label: '05' }
]

export default function PageProgressIndicator() {
    const [active, setActive] = useState(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sections.findIndex(
                            (s) => s.id === entry.target.id
                        )

                        if (index !== -1) setActive(index)
                    }
                })
            },
            {
                threshold: 0.45
            }
        )

        sections.forEach((section) => {
            const el = document.getElementById(section.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className='page-indicator'>
            <span className='page-indicator__count'>01</span>

            <div className='page-indicator__dots'>
                {sections.map((section, index) => (
                    <button
                        key={section.id}
                        aria-label={`Ir para seção ${section.label}`}
                        className={`page-indicator__dot ${active === index ? 'is-active' : ''
                            }`}
                        onClick={() => {
                            document.getElementById(section.id)?.scrollIntoView({
                                behavior: 'smooth'
                            })
                        }}
                    />
                ))}
            </div>

            <span className='page-indicator__count'>05</span>
        </div>
    )
}