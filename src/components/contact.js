import Image from "next/image";

export default function Contact() {
    return (
        <div className="relative flex flex-col items-center bg-white justify-center p-8 w-full min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#2C2E55] mb-2">
                    <b>Contato e Compras - Brookliss</b>
                </h1>
            </div>
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 m-8">
                <p className="text-3xl text-gray-600 font-bold mb-8">
                    No momento nosso atendimento e vendas são realizados <br/> exclusivamente através
                    dos botões ao lado:
                </p>
                <p className="text-3xl text-gray-600 font-bold mb-8">
                    📲 WhatsApp: Fale diretamente com a nossa equipe. <br/>
                    🛒 Mercado Livre: Compre com segurança pela nossa loja oficial.
                </p>
                <p className="text-3xl text-gray-600 font-bold mb-8">
                    A Brookliss é especializada em produtos capilares para profissionais. <br/> Obrigado pela visita!
                </p>
            </div>
            <div className="absolute right-65 top-90 flex flex-col gap-4 items-center">
                <Image
                    src="/mercado-livre.png"
                    alt="mercado livre"
                    width={170}
                    height={170}
                    className="rounded-md"
                />
                <Image
                    src="/whatsapp.png"
                    alt="whatsapp"
                    width={170}
                    height={170}
                    className="rounded-md"
                />
            </div>
        </div>
    );
}
