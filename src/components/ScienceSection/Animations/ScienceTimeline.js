import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function createScienceTimeline(section) {
    if (!section) return

    return gsap.context(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'bottom 75%',
                scrub: 0.8,
                anticipatePin: 1
            }
        })

        tl.from('.science-eyebrow', {
            y: 20,
            opacity: 0,
            duration: 0.6
        })

            .from('.science-title', {
                y: 28,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out'
            }, '-=0.3')

            .from('.science-text', {
                y: 18,
                opacity: 0,
                duration: 0.6
            }, '-=0.5')

            .from('.benefit-card', {
                y: 18,
                opacity: 0,
                stagger: 0.12,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.4')

            .from('.science-image', {
                scale: 1.03,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            }, '-=0.5')

            .from('.ingredients-block', {
                y: 28,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.85')
        // Respiração sutil dos ícones
        gsap.to('.benefit-icon', {
            y: -2,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.2
        })

    }, section)
}