"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createManifestoTimeline(sectionRef) {
    return gsap.context(() => {
        const section = sectionRef.current;
        if (!section) return;

        //------------------------------------------
        // ELEMENTOS
        //------------------------------------------

        const tag = section.querySelector(".manifesto-tag");
        const title = section.querySelector(".manifesto-title");
        const description = section.querySelector(".manifesto-description");
        const button = section.querySelector(".manifesto-button");
        const woman = section.querySelector(".woman-image");

        //------------------------------------------
        // ESTADOS INICIAIS
        //------------------------------------------

        gsap.set(tag, {
            opacity: 0,
            y: 10
        });

        gsap.set(title, {
            opacity: 0,
            y: 34,
            filter: "blur(10px)"
        });

        gsap.set(description, {
            opacity: 0,
            x: -25,
            filter: "blur(8px)"
        });

        gsap.set(button, {
            opacity: 0,
            y: 16,
            scale: .95,
            filter: "blur(8px)"
        });

        gsap.set(woman, {
            opacity: 0,
            x: 60,
            scale: 1.05,
            filter: "blur(12px)"
        });

        //------------------------------------------
        // HERO BRIDGE
        //------------------------------------------

        ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "top center",
            scrub: true,
            onUpdate: self => {
                window.dispatchEvent(
                    new CustomEvent(
                        "brookliss:heroBridge",
                        {
                            detail: {
                                progress: self.progress
                            }
                        }
                    )
                );
            }
        });

        //------------------------------------------
        // REVEAL
        //------------------------------------------

        const reveal = gsap.timeline({
            paused: true,
            defaults: {
                ease: "power3.out"
            }
        });

        reveal.to(tag, {
                opacity: 1,
                y: 0,
                duration: .45
            })

            .to(title, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                clearProps: "filter",
                duration: 1
            }, "-=.2")

            .to(description, {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                clearProps: "filter",
                duration: .95
            }, "-=.55")

            .to(button, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                clearProps: "filter",
                duration: .75
            }, "-=.55")

            .to(woman, {
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
                clearProps: "filter",
                duration: 1.25
            }, "<");

        //------------------------------------------

        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            once: true,
            onEnter() {
                reveal.play();
            }
        });
    }, sectionRef);
}