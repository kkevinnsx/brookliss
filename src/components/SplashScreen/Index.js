"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function SplashScreen({ visible }) {
    useEffect(() => {
        if (!visible) {
            gsap.to(".brookliss-splash", {
                opacity: 0,
                duration: .7,
                ease: "power3.out",
                pointerEvents: "none"
            });
        }
    }, [visible]);

    return (
        <div
            className={`brookliss-splash ${visible ? "" : "brookliss-splash-hide"
                }`}
        >

            <div className="brookliss-loader">
                <span className="brookliss-logo">
                    BROOK<span>LISS</span>
                </span>

                <div className="brookliss-loader-line">
                    <div className="brookliss-loader-fill" />
                </div>
            </div>
        </div>
    );
}