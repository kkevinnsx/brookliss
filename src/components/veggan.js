import Image from "next/image";


export default function Veggan() {
  return (
    <section
      id="veggan"
      className="h-screen flex bg-white mt-6 text-[#2C2E55] justify-center items-center"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-[75%] flex flex-row items-center justify-center m-auto">
          <div className="w-30 h-30 flex-1" />
          <div className="flex-4 h-full">
            <h1 className="text-4xl text-center">
              <b> 100% Vegano. 100% Ético</b>
            </h1>
            <p className="text-4xl text-center w-full">
              Beleza que respeita todos os seres vivos
            </p>
          </div>
          <div className="flex-1 justify-center flex">
            <Image width="150" height="150" alt="100% Vegano Natural" src="/veggan.png" />
          </div>
        </div>

        <section className="flex w-full mt-6 bg-white text-[#2C2E55]">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-2">
            <div className="p-10 flex flex-col justify-center">
              <p className="text-2xl leading-relaxed">
                Brookliss é uma marca 100% vegana — todos os nossos produtos são
                livres de ingredientes de origem animal e não são testados em
                animais. Ética, performance e respeito em cada fórmula.
              </p>

              <p className="mt-6 text-2xl leading-relaxed">
                Ser vegano é mais do que um rótulo — é um compromisso com a vida.
                Brookliss oferece cuidados profissionais, sustentáveis e totalmente
                livres de crueldade.
              </p>
            </div>

            <div className="relative h-full w-full">
              <Image
                src="/mandioca.jpg"
                alt="Produto Brookliss"
                width={800}
                height={600}
                className="w-full h-full rounded-lg object-cover"
              />
              <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
