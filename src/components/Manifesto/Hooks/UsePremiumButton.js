"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Hook responsável por adicionar microinterações premium
 * aos botões da Brookliss.
 *
 * Exemplo:
 *
 * usePremiumButton(".hero-primary-cta");
 * usePremiumButton(".nav-cta");
 * usePremiumButton(".manifesto-button");
 */

export default function usePremiumButton(selector) {
    useEffect(() => {
        const buttons = document.querySelectorAll(selector);
        if (!buttons.length) return;

        const cleanups = [];

        buttons.forEach((button) => {
            //------------------------------------
            // Hover
            //------------------------------------

            const enter = () => {
                gsap.killTweensOf(button);
                gsap.to(button, {
                    scale: 1.015,
                    y: -3,
                    duration: .35,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            //------------------------------------

            const leave = () => {
                gsap.killTweensOf(button);
                gsap.to(button, {
                    scale: 1,
                    y: 0,
                    duration: .35,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            //------------------------------------
            // Mouse Down
            //------------------------------------

            const down = () => {
                gsap.killTweensOf(button);
                gsap.to(button, {
                    scale: .98,
                    duration: .12,
                    ease: "power2.out"
                });
            };

            //------------------------------------
            // Mouse Up
            //------------------------------------

            const up = () => {
                gsap.killTweensOf(button);
                gsap.to(button, {
                    scale: 1.015,
                    y: -3,
                    duration: .22,
                    ease: "power2.out"
                });
            };

            //------------------------------------

            button.addEventListener("mouseenter", enter);
            button.addEventListener("mouseleave", leave);
            button.addEventListener("mousedown", down);
            button.addEventListener("mouseup", up);

            //------------------------------------

            cleanups.push(() => {
                button.removeEventListener("mouseenter", enter);
                button.removeEventListener("mouseleave", leave);

                button.removeEventListener("mousedown", down);
                button.removeEventListener("mouseup", up);
            });
        });

        //----------------------------------------

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }, [selector]);
}