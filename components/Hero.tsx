import Image from 'next/image';
import Link from 'next/link';

const navItems = ['Sobre', 'Rótulos', 'Experiências', 'Contato'];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-bravino-black text-bravino-cream">
      <header className="absolute inset-x-0 top-0 z-30 bg-transparent">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-6 lg:px-12">
          <Link href="#" className="inline-flex items-center" aria-label="Bravino Wine Concept">
            <Image
              src="/logo-bravino.png"
              alt="Bravino Wine Concept"
              width={320}
              height={96}
              className="h-12 w-auto lg:h-16"
              quality={100}
              priority
            />
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item}
                href="#"
                className="font-sans text-sm uppercase tracking-[0.12em] text-bravino-cream/85 transition-colors hover:text-bravino-peach"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex bg-bravino-black px-6 pb-14 pt-28 lg:px-16 lg:pb-20 lg:pt-32 xl:px-24">
          <div className="my-auto max-w-2xl">
            <h1 className="font-serif text-[2.1rem] leading-tight text-bravino-cream sm:text-5xl lg:text-6xl">
              <span className="block">Viva a Experiência</span>
              <span className="block text-bravino-red">BRAVINO:</span>
              <span className="block">Onde cada taça</span>
              <span className="block">conta uma história.</span>
            </h1>

            <div className="my-8 h-px w-40 bg-bravino-peach/80" aria-hidden="true" />

            <p className="max-w-xl font-sans text-base font-light leading-relaxed text-bravino-cream sm:text-lg">
              Mais do que uma loja de vinhos, um conceito feito para quem valoriza momentos únicos, rótulos exclusivos e
              a arte de brindar à vida.
            </p>

            <button
              type="button"
              className="mt-10 inline-flex bg-bravino-red px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.08em] text-bravino-cream transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bravino-peach focus-visible:ring-offset-2 focus-visible:ring-offset-bravino-black"
            >
              [Descobrir Rótulos Exclusivos]
            </button>
          </div>
        </div>

        <div className="relative min-h-[46vh] lg:min-h-screen">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            aria-label="Vídeo de taças de vinho para a abertura da Bravino Wine Concept"
          >
            <source src="/video-hero.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bravino-black via-bravino-black/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
