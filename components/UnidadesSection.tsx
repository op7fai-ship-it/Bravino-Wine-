'use client';

import { MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

function AyrtonImage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <div
      ref={ref}
      className="relative min-h-[430px] overflow-hidden rounded-2xl border border-bravino-peach/70 bg-bravino-cream shadow-[0_24px_70px_rgba(13,13,13,0.14)] lg:min-h-[560px]"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/ayrton-senna.png"
          alt="Unidade Bravino Ayrton Senna"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={false}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,13,13,0.58),rgba(13,13,13,0.14))]" />

      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
        <p className="max-w-sm font-serif text-xl text-bravino-cream lg:text-2xl">
          Ambiente sofisticado para experiências clássicas em Londrina.
        </p>
      </div>
    </div>
  );
}

function SantanaImage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div
      ref={ref}
      className="relative min-h-[430px] overflow-hidden rounded-2xl border border-bravino-peach/70 bg-bravino-peach/45 shadow-[0_24px_70px_rgba(13,13,13,0.12)] lg:min-h-[560px]"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/santana.jpg"
          alt="Unidade Bravino Santana"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={false}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,13,13,0.52),rgba(13,13,13,0.08))]" />

      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
        <p className="max-w-sm font-sans text-lg font-light text-bravino-cream lg:text-2xl">
          Conceito contemporâneo e aberto para novas experiências gastronômicas.
        </p>
      </div>
    </div>
  );
}

export default function UnidadesSection() {
  return (
    <section className="bg-bravino-cream text-bravino-black">
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-20 px-6 py-18 lg:gap-24 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <AyrtonImage />
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6 lg:pl-8"
          >
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-bravino-black/70">Unidade Ayrton Senna</p>
            <h3 className="mt-4 font-serif text-4xl leading-tight text-bravino-red md:text-5xl">O Coração da Tradição</h3>

            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-bravino-black/88 md:text-lg">
              Localizada em um ponto nobre de Londrina, a unidade Ayrton Senna oferece um ambiente sofisticado para
              garimpar produtores e produtos exclusivos.
            </p>

            <div className="mt-6 max-w-xl">
              <span className="inline-block border-b border-bravino-peach pb-1 font-serif text-2xl text-bravino-red">Vinho no Deck</span>

              <p className="mt-5 border-l-[3px] border-bravino-red pl-5 font-sans text-base leading-relaxed text-bravino-black md:text-lg">
                Casa do tradicional Vinho no Deck, onde os sábados ganham mais vida com degustações gratuitas e
                conversas entre amigos.
              </p>
            </div>

            <p className="mt-8 font-sans text-sm uppercase tracking-[0.1em] text-bravino-black/70">
              Av. Ayrton Senna da Silva, 509.
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-3 bg-bravino-red px-6 py-3 font-sans text-sm font-medium uppercase tracking-[0.08em] text-bravino-cream transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bravino-peach focus-visible:ring-offset-2 focus-visible:ring-offset-bravino-cream"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bravino-cream/40 bg-bravino-cream/15">
                <MapPin className="h-4 w-4" />
              </span>
              [Como chegar na Matriz]
            </button>
          </motion.article>
        </div>

        <div className="grid grid-cols-1 gap-10 bg-bravino-peach/30 p-6 lg:grid-cols-12 lg:items-center lg:p-10">
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 lg:pr-8"
          >
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-bravino-black/72">Unidade Santana</p>
            <h3 className="mt-4 font-serif text-4xl leading-tight text-bravino-red md:text-5xl">Praticidade e Estilo</h3>

            <p className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-bravino-black/88 md:text-lg">
              Situada na charmosa Alameda Santana, esta unidade traz um conceito contemporâneo e amplo para novas
              experiências gastronômicas.
            </p>

            <div className="mt-6 inline-flex items-center rounded-full border border-bravino-black/35 bg-bravino-cream/45 px-4 py-2 backdrop-blur-sm">
              <span className="font-sans text-sm uppercase tracking-[0.12em] text-bravino-black">Wine Bar / Rolha Free</span>
            </div>

            <p className="mt-4 max-w-xl font-sans text-base font-light leading-relaxed text-bravino-black/88 md:text-lg">
              Aproveite nosso Wine Bar e a facilidade de consumir seu vinho na temperatura ideal na área comum da
              Alameda, com Rolha Free para garrafas adquiridas na loja.
            </p>

            <p className="mt-8 font-sans text-sm uppercase tracking-[0.1em] text-bravino-black/72">
              R. Rubéns Carlos de Jesus, 300 - Quiosque 01.
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-3 bg-bravino-red px-6 py-3 font-sans text-sm font-medium uppercase tracking-[0.08em] text-bravino-cream transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bravino-peach focus-visible:ring-offset-2 focus-visible:ring-offset-bravino-cream"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bravino-cream/35 bg-bravino-cream/10">
                <MapPin className="h-4 w-4" />
              </span>
              [Como chegar na Alameda]
            </button>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6"
          >
            <SantanaImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

