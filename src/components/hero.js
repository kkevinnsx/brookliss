import Image from "next/image";
import hairImg from "../assets/hair-comparision.png";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="h-screen flex bg-white text-[#52514F] justify-center items-center"
      >
        <div className="w-5/6 h-3/4 flex">
          <div className="flex justify-center gap-5 w-3/4 flex-col">
            <h1 className="text-5xl">
              Beleza começa com cuidado <br /> cabelos incriveis começam aqui.
            </h1>
            <p className="text-2xl w-full">
              Nossos produtos são desenvolvidos com tecnologia de alta
              performance para todos os tipos de cabelo — dos salões para a sua
              casa. Fórmulas 100% veganas, livres de crueldade, sem ingredientes
              de origem animal e com ativos poderosos da natureza. Cabelos
              saudáveis, com respeito ao planeta e aos animais.
            </p>
          </div>
          <div className="w-3/4">
            <Image alt="Imagem de comparação de cabelos" src={hairImg} />
          </div>
        </div>
      </section>
      <section id="hero-blue-banner" className="bg-[#2C2E55]">
        <div className="py-2 w-1/2"></div>
      </section>
    </>
  );
}
