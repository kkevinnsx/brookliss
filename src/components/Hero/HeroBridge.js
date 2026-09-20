"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function createHeroBridge() {
    const hero = document.querySelector("#hero")
    const manifesto = document.querySelector("#manifesto")

    if (!hero || !manifesto) return

    ScrollTrigger.create({
        trigger: manifesto,
        start: "top bottom",
        end: "top 35%",
        scrub: true,

        onUpdate(self) {
            const progress = self.progress
            //----------------------------------
            window.dispatchEvent(
                new CustomEvent("brookliss:heroBridge", {
                    detail: {
                        progress
                    }
                })
            )

            //----------------------------------
            // Hero ilumina a próxima seção
            //----------------------------------
            hero.style.setProperty(
                "--bridge-opacity",
                1 - progress
            )

            manifesto.style.setProperty(
                "--bridge-progress",
                progress
            )
        }
    })
}