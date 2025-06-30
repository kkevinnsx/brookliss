import Hero from "@/components/hero";

import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen font-[Lora] w-screen overflow-x-hidden">
      <NavBar />
      <Hero/>
    </main>
  );
}
