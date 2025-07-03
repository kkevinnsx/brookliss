import Hero from "@/components/hero";

import NavBar from "@/components/navbar";
import HairType from "@/components/hairType";
import Products from "@/components/products";

export default function Home() {
  return (
    <main style={{ fontFamily: 'Lora, serif' }} className="relative bg-white min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero/>
      <HairType />
      <Products />
    </main>
  );
}
