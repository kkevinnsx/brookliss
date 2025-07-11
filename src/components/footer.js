import Image from "next/image";
import { LuPhone } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="bg-[#f7f7f7] text-[#2e2e2e] py-10 relative">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Texto de copyright */}
                <p className="text-xl mb-2">© 2025 Brookliss. Todos os direitos reservados.</p>

                {/* Texto de contato */}
                <p className="text-lg mb-6">envie-nos um e-mail</p>

                {/* Input + Botão */}
                <div className="flex justify-center items-center mb-6">
                    <input
                        type="email"
                        placeholder="Value"
                        className="rounded-l-full px-4 py-2 border border-gray-300 h-12 w-96 outline-none"
                    />
                    <button className="rounded-r-full bg-[#e5d4f9] px-6 py-2 h-12 text-sm font-semibold text-[#2e2e2e]">
                        ENVIAR
                    </button>
                </div>

                {/* Atendimento ao cliente */}
                <p className="text-lg">
                    Atendimento ao cliente: contato@brookliss.com.br | (11) 0000-0000 &nbsp;
                    Segunda a sexta, das 9h às 18h
                </p>
            </div>

            {/* Ícones laterais à direita */}
            <div className="absolute right-16 top-10 flex flex-col gap-4 items-center">
                {/* Mercado Pago */}
                <Image
                    src="/mercado-livre.png"
                    alt="Mercado Livre"
                    width={64}
                    height={64}
                    className="rounded-md"
                />
                {/* Telefone */}
                <LuPhone size={32}/>
                {/* Instagram */}
                <FaInstagram size={32}/>
            </div>
        </footer>
    );
}
