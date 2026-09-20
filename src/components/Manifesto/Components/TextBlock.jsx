export default function TextBlock() {
    return (
        <div className="manifesto-text">
            <span className="manifesto-tag ">
                Manifesto
            </span>

            <h2 className="manifesto-title ">
                Mais que beleza.
                <br />
                É inteligência aplicada
                <br />
                ao que é essencial.
            </h2>

            <p className="manifesto-description ">
                Acreditamos que o cuidado verdadeiro
                começa na ciência e se revela
                nos detalhes.

                Brookliss é a união entre tecnologia
                de ponta e respeito pela natureza
                dos fios.
            </p>

            <button className="manifesto-button hero-cta hero-primary-cta inline-flex items-center gap-2 text-white rounded-full px-8 py-4 text-sm font-medium font-sans">
                Nossa Filosofia
                <span aria-hidden>→</span>
            </button>
        </div>
    );
}