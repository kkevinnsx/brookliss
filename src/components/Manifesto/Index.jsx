"use client";

import { useRef } from "react";
import ModelImage from "./Components/ModelImage";
import TextBlock from "./Components/TextBlock";
import useManifestoAnimation from "./Hooks/UseManifestoAnimation";
import usePremiumButton from "./Hooks/UsePremiumButton";

export default function Manifesto() {
    const sectionRef = useRef(null);
    useManifestoAnimation(sectionRef);
    usePremiumButton(".manifesto-button");

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        sectionRef.current.style.setProperty("--mx", `${x}%`);
        sectionRef.current.style.setProperty("--my", `${y}%`);
    };

    return (
        <section
            ref={sectionRef}
            id="manifesto"
            className="manifesto"
            onMouseMove={handleMouseMove}
        >
            <div className="manifesto-light" />
            <div className="manifesto-vignette" />
            <div className="manifesto-spotlight" />
            <div className="manifesto-gradient-left" />
            <div className="manifesto-gradient-right" />
            <div className="manifesto-container">
                <TextBlock />
                <ModelImage />
            </div>
        </section>
    );
}