import Image from "next/image";

export default function Veggan() {
  return (
    <section
      id="vegano"
      className="min-h-screen flex bg-white mt-6 text-[#2C2E55] justify-center items-center px-4"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-7xl">
        {/* Cabeçalho */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-[75%] gap-6">
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="hidden lg:block w-30 h-30" />
          </div>

          <div className="flex-4 h-full text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              100% Vegano. 100% Ético
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl mt-2">
              Beleza que respeita todos os seres vivos
            </p>
          </div>

          <div className="flex-1 flex justify-center mt-4 lg:mt-0">
            <Image
              width={150}
              height={150}
              alt="100% Vegano Natural"
              src="/veggan.png"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36"
            />
          </div>
        </div>

        {/* Corpo principal */}
        <section className="flex w-full mt-10 bg-white text-[#2C2E55]">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Texto */}
            <div className="p-6 sm:p-10 flex flex-col justify-center text-center md:text-left">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                Brookliss é uma marca 100% vegana — todos os nossos produtos são
                livres de ingredientes de origem animal e não são testados em
                animais. Ética, performance e respeito em cada fórmula.
              </p>

              <p className="mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed">
                Ser vegano é mais do que um rótulo — é um compromisso com a
                vida. Brookliss oferece cuidados profissionais, sustentáveis e
                totalmente livres de crueldade.
              </p>
            </div>

            {/* Imagem */}
            <div className="relative h-64 sm:h-80 md:h-full w-full">
              <Image
                src="/mandioca.jpg"
                alt="Produto Brookliss"
                fill
                className="rounded-lg object-cover"
              />
              <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
