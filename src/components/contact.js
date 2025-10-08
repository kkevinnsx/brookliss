import Image from "next/image";

export default function Contact() {
  return (
    <div id="contato" className="relative flex flex-col items-center bg-white justify-center px-4 py-12 w-full min-h-screen">
      {/* Título */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C2E55]">
          Contato e Compras - Brookliss
        </h1>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Textos */}
        <div className="text-center lg:text-left px-2">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-semibold mb-8 leading-relaxed">
            No momento nosso atendimento e vendas são realizados
            <br className="hidden sm:block" /> exclusivamente através dos botões
            ao lado:
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-semibold mb-8 leading-relaxed">
            📲 <b>WhatsApp:</b> Fale diretamente com a nossa equipe.
            <br className="hidden sm:block" />
            🛒 <b>Mercado Livre:</b> Compre com segurança pela nossa loja
            oficial.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-semibold mb-8 leading-relaxed">
            A Brookliss é especializada em produtos capilares para
            profissionais.
            <br className="hidden sm:block" /> Obrigado pela visita!
          </p>
        </div>

        {/* Ícones de contato */}
        <div className="flex flex-col items-center lg:items-end justify-center gap-6">
          <a
            href="https://www.mercadolivre.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
          >
            <Image
              src="/mercado-livre.png"
              alt="Mercado Livre"
              width={160}
              height={160}
              className="rounded-md w-28 sm:w-32 md:w-40 h-auto"
            />
          </a>
          <a
            href="https://wa.me/5519991871870"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={160}
              height={160}
              className="rounded-md w-28 sm:w-32 md:w-40 h-auto"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
