import Image from "next/image";

export default function ModelImage() {
    return (
        <div className="manifesto-model">
            <Image
                src="/images/woman.png"
                className="woman-image"
                width={1500}
                height={1200}
                alt=""
            />
        </div>
    )
}