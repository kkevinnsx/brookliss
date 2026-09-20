"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { createManifestoTimeline } from "../Animations/ManifestoTimeline";

export default function useManifestoAnimation(sectionRef){
    useLayoutEffect(()=>{
        const ctx=gsap.context(()=>{
            createManifestoTimeline(sectionRef);
        });
        return ()=>ctx.revert();
    },[]);
}