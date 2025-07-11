import Hero from "@/components/hero";

import NavBar from "@/components/navbar";
import HairType from "@/components/hairType";
import Products from "@/components/products";
import Veggan from "@/components/veggan";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main style={{ fontFamily: 'Lora, serif' }} className="relative bg-white min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <HairType />
      <Products />
      <Veggan />
      <Footer/>
    </main>
  );
}
