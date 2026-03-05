'use client';

import { ArrowDownToLine } from 'lucide-react';
import { motion } from 'motion/react';

const wineTypes = [
  { name: 'Brancos', note: 'Frescor vibrante', tone: 'from-bravino-cream to-bravino-peach/45' },
  { name: 'Rosés', note: 'Aromas delicados', tone: 'from-bravino-cream to-bravino-peach/40' },
  { name: 'Tintos', note: 'Estrutura e intensidade', tone: 'from-bravino-cream to-bravino-peach/55' },
  { name: 'Espumantes', note: 'Elegância festiva', tone: 'from-bravino-cream to-bravino-peach/35' },
];

export default function VinhosSection() {
  return (
    <section className="bg-bravino-cream text-bravino-black">
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-4xl border-l-4 border-bravino-red pl-6"
        >
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-bravino-black/70">Bravino Wine Selection</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            <span className="text-bravino-black">Variedade de </span>
            <span className="font-black text-bravino-red">Vinhos</span>
          </h2>
          <p className="mt-8 font-sans text-base leading-relaxed text-bravino-black/88 md:text-lg">
            Nossa carta conta com mais de 200 rótulos selecionados das principais regiões do mundo, como Argentina,
            Chile, Portugal, Itália, França e Brasil. Do frescor vibrante dos Brancos e Rosés à imponência dos Tintos
            encorpados e a elegância dos Espumantes e Champagnes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scroll-px-6 scroll-smooth overscroll-x-contain touch-pan-x [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-12 lg:overflow-visible lg:snap-none lg:scroll-px-0"
        >
          {wineTypes.map((wine, idx) => (
            <article
              key={wine.name}
              className="group relative min-h-[280px] min-w-[78%] snap-start overflow-hidden rounded-2xl border border-bravino-peach/80 bg-bravino-peach/30 p-6 shadow-[0_18px_40px_rgba(13,13,13,0.08)] sm:min-w-[46%] lg:col-span-3 lg:min-w-0"
            >
              <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${wine.tone} blur-[1px]`} />
              <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full border border-bravino-peach/70 bg-bravino-cream/20" />

              <p className="relative z-10 font-sans text-5xl font-light leading-none text-bravino-peach/80">
                0{idx + 1}
              </p>
              <h3 className="relative z-10 mt-4 font-serif text-4xl leading-none tracking-tight text-bravino-red md:text-[2.65rem]">
                {wine.name}
              </h3>
              <p className="relative z-10 mt-4 font-sans text-base text-bravino-black/75">{wine.note}</p>

              <div className="relative z-10 mt-10 h-px w-20 bg-bravino-peach transition-all duration-300 group-hover:w-28" />
            </article>
          ))}
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          href="#"
          className="mt-12 inline-flex items-center gap-3 border-b border-bravino-red pb-1 font-sans text-sm uppercase tracking-[0.12em] text-bravino-red transition-opacity hover:opacity-80"
        >
          <span>[Ver Carta Completa em PDF]</span>
          <ArrowDownToLine className="h-4 w-4 text-bravino-red" />
        </motion.a>
      </div>
    </section>
  );
}

