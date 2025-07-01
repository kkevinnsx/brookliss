import Hero from "@/components/hero";

import NavBar from "@/components/navbar";
import HairType from "@/components/hairType";
import Products from "@/components/products";

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen font-[Lora] w-screen overflow-x-hidden">
      <NavBar />
      <Hero/>
      <HairType />
      <Products />
    </main>
  );
}
