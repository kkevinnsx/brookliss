"use client";

import { useState } from "react";

import Hero from "../Hero/hero";
import NavBar from "../navbar";
import Manifesto from "../Manifesto/Index";
import SplashScreen from "../SplashScreen/Index";
import ScienceSection from "../ScienceSection/ScienceSection";
import PageProgressIndicator from "../Layout/PageProgressIndicator";
import CollectionSection from "../Collections/CollectionSection";
import FooterSection from "../Footer/FooterSection";

export default function HomePage() {

    const [ready, setReady] = useState(false);

    return (
        <>
            <SplashScreen visible={!ready} />
            <main className="relative bg-white min-h-screen w-screen overflow-x-hidden">
                <PageProgressIndicator />
                <NavBar />
                <Hero onReady={() => setReady(true)} />
                <Manifesto />
                <ScienceSection />
                <CollectionSection />
                <FooterSection />
            </main>
        </>
    );
}