import Image from "next/image";
import hairImg from "../assets/hair-comparision.png";
import facebookLogo from "../assets/facebook.svg";
import instagramLogo from "../assets/instagram.svg";
import tiktokLogo from "../assets/tiktok.svg";

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
      <div className="relative ring-2 ring-[#2C2E55] rounded-2xl antialiased flex justify-around items-center bg-white py-[1%] w-[70%] m-auto top-15">
        <div>
          <button className="bg-[#2C2E55] rounded-sm px-16 py-4 text-white"> Conheça-nos! {'>'}</button> 
              {/* Ainda precisa achar algum icon pra colocar aqui, vou deixar o > provisório. ^^ */}
        </div>
        <div className="flex gap-6">
          <Image width="150" alt="Facebook Logo" src={facebookLogo}/>
          <Image width="150" alt="Tiktok Logo" src={tiktokLogo}/>
          <Image width="150" alt="Instagram Logo" src={instagramLogo}/>
        </div>
      </div>
      <section
        id="hero-blue-banner"
        className="bg-[#2C2E55] text-white py-24 px-4"
      >
        <div className="w-full max-w-4xl mx-auto flex justify-center items-center gap-8">
          <div className="flex-1">
            <h2 className="font-semibold text-3xl mb-4">
              Temos produtos para:
            </h2>
            <ul className="space-y-2 text-lg">
              <li>✔️ Cabelos com ou sem química</li>
              <li>✔️ Dos lisos aos crespos</li>
              <li>✔️ Feminino e Masculino</li>
            </ul>
          </div>

          <div className="w-1 border h-full mx-6 py-[8%] bg-white" />

          <div className="flex-1">
            <h2 className="mb-4 text-white font-bold text-3xl leading-[28px] tracking-normal antialiased">
              Acessível
            </h2>
            <p className="text-lg antialiased w-2/3">
              Produtos profissionais de alta qualidade com preços acessíveis
              para o seu cuidado diário.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
