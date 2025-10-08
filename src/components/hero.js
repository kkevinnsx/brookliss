import Image from "next/image";
import hairImg from "../assets/hair-comparision.png";
import facebookLogo from "../assets/facebook.svg";
import instagramLogo from "../assets/instagram.svg";
import tiktokLogo from "../assets/tiktok.svg";

export default function Hero() {
  return (
    <>
      {/* HERO PRINCIPAL */}
      <section
        id="hero"
        className="min-h-screen flex flex-col-reverse md:flex-row bg-white text-[#52514F] justify-center items-center px-6 md:px-12 lg:px-24"
      >
        {/* Texto */}
        <div className="flex flex-col justify-center gap-6 md:gap-8 w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Beleza começa com cuidado <br className="hidden sm:block" /> cabelos
            incríveis começam aqui.
          </h1>
          <p className="text-base sm:text-lg md:text-2xl">
            Nossos produtos são desenvolvidos com tecnologia de alta performance
            para todos os tipos de cabelo — dos salões para a sua casa. Fórmulas
            100% veganas, livres de crueldade e com ativos poderosos da
            natureza. Cabelos saudáveis, com respeito ao planeta e aos animais.
          </p>
        </div>

        {/* Imagem principal */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            alt="Imagem de comparação de cabelos"
            src={hairImg}
            className="w-3/4 sm:w-2/3 md:w-full h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* BOTÃO E REDES SOCIAIS */}
      <div className="relative ring-2 ring-[#2C2E55] mb-10 rounded-2xl antialiased flex flex-col md:flex-row justify-between items-center bg-white py-6 px-8 w-[90%] md:w-[70%] mx-auto mt-8 md:mt-12 gap-6">
        <button className="bg-[#2C2E55] rounded-sm px-10 py-4 text-white text-lg">
          Conheça-nos! {">"}
        </button>

        <div className="flex justify-center gap-6">
          <Image width={75} alt="Facebook Logo" src={facebookLogo} />
          <Image width={75} alt="Tiktok Logo" src={tiktokLogo} />
          <Image width={75} alt="Instagram Logo" src={instagramLogo} />
        </div>
      </div>

      {/* BANNER AZUL */}
      <section
        id="hero-blue-banner"
        className="bg-[#2C2E55] text-white py-16 px-6 md:px-12"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 text-center md:text-left">
          {/* Coluna esquerda */}
          <div className="flex-1">
            <h2 className="font-semibold text-2xl md:text-3xl mb-4">
              Temos produtos para:
            </h2>
            <ul className="space-y-2 text-base md:text-lg">
              <li>✔️ Cabelos com ou sem química</li>
              <li>✔️ Dos lisos aos crespos</li>
              <li>✔️ Feminino e Masculino</li>
            </ul>
          </div>

          {/* Linha divisória (aparece só em telas médias pra cima) */}
          <div className="hidden md:block w-px bg-white h-32" />

          {/* Coluna direita */}
          <div className="flex-1">
            <h2 className="mb-4 font-bold text-2xl md:text-3xl">Acessível</h2>
            <p className="text-base md:text-lg max-w-md mx-auto md:mx-0">
              Produtos profissionais de alta qualidade com preços acessíveis
              para o seu cuidado diário.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
