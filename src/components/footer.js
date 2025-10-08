"use client";

import Image from "next/image";
import { LuPhone } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
    const [emailContent, setEmailContent] = useState("");
    const handleSendEmail = () => {
      if (!emailContent) return; 

      const recipient = "contato@brookliss.com.br";
      const subject = encodeURIComponent(emailContent); 
      const mailtoLink = `mailto:${recipient}?subject=${subject}`;

      window.location.href = mailtoLink;
    };

  return (
    <footer className="bg-[#f7f7f7] text-[#2e2e2e] py-10 relative flex flex-col items-center">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Copyright */}
        <p className="text-base sm:text-lg md:text-xl mb-2">
          © 2025 Brookliss. Todos os direitos reservados.
        </p>

        {/* Texto */}
        <p className="text-sm sm:text-base md:text-lg mb-6">
          envie-nos um e-mail
        </p>

        {/* Campo de e-mail */}
        <div className="flex flex-col sm:flex-row justify-center items-center mb-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Envie um E-mail"
            className="rounded-full sm:rounded-l-full sm:rounded-r-none px-4 py-2 border border-gray-300 h-12 w-full sm:w-72 outline-none mb-4 sm:mb-0"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
          <button
            onClick={handleSendEmail}
            className="rounded-full sm:rounded-r-full sm:rounded-l-none bg-[#e5d4f9] px-6 py-2 h-12 text-sm font-semibold text-[#2e2e2e] hover:bg-[#d6c2f3] transition"
          >
            ENVIAR
          </button>
        </div>

        {/* Atendimento */}
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-center">
          Atendimento ao cliente:{" "}
          <a
            href="mailto:contato@brookliss.com.br"
            className="text-[#2C2E55] hover:underline"
          >
            contato@brookliss.com.br
          </a>{" "}
          | (19) 99187-1870 <br className="block sm:hidden" />
          Segunda a sexta, das 9h às 18h
        </p>
      </div>

      {/* Ícones sociais / contato */}
      <div className="flex flex-row sm:flex-col gap-6 items-center justify-center mt-10 sm:mt-0 sm:absolute sm:right-10 sm:top-10">
        {/* Mercado Livre */}
        <a
          href="https://www.mercadolivre.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform"
        >
          <Image
            src="/mercado-livre.png"
            alt="Mercado Livre"
            width={64}
            height={64}
            className="rounded-md w-12 sm:w-16 h-auto"
          />
        </a>

        {/* Telefone */}
        <a
          href="tel:+5519991871870"
          className="text-[#2C2E55] hover:text-[#4B0082] transition"
        >
          <LuPhone size={28} />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2C2E55] hover:text-[#4B0082] transition"
        >
          <FaInstagram size={28} />
        </a>
      </div>
    </footer>
  );
}
