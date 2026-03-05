'use client';

import { CalendarDays, Gift, SearchCheck } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  { icon: SearchCheck, label: 'Curadoria' },
  { icon: Gift, label: 'Presentes' },
  { icon: CalendarDays, label: 'Eventos' },
];

export default function AcolhimentoSection() {
  return (
    <section className="bg-bravino-cream text-bravino-black">
      <div className="relative z-10 grid min-h-screen grid-cols-1 items-start lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="px-6 py-20 lg:px-16 lg:py-24 xl:px-24"
        >
          <span className="mb-6 block h-px w-28 bg-bravino-peach" aria-hidden="true" />

          <h2 className="font-serif text-5xl font-black leading-[0.95] text-bravino-red md:text-6xl lg:text-7xl">A BRAVINO</h2>

          <p className="mt-8 max-w-xl font-sans text-base leading-[1.8] text-bravino-black md:max-w-lg md:text-lg">
            A BRAVINO é um local de confraternização e acolhimento onde todas as expectativas são superadas. Nossa
            curadoria especializada busca rótulos diferentes e únicos, transformando simples instantes em memórias
            inesquecíveis. Somos o parceiro ideal para qualquer ocasião, seja para presentear, consumir em casa ou
            celebrar em nossos eventos.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center border border-bravino-peach">
                  <Icon className="h-5 w-5 text-bravino-black" strokeWidth={1.7} />
                </span>
                <span className="font-sans text-sm uppercase tracking-[0.12em] text-bravino-black/80">{label}</span>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
          className="relative h-full overflow-hidden px-6 py-20 lg:px-16 lg:py-24 xl:px-20"
        >
          <div className="pointer-events-none absolute -right-28 top-10 h-[28rem] w-[28rem] rounded-full bg-bravino-peach/10" aria-hidden="true" />
          <div className="pointer-events-none absolute right-24 top-56 h-48 w-48 rounded-full bg-bravino-peach/10" aria-hidden="true" />

          <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col pt-[7.6rem] lg:pt-[7.6rem]">
            <p className="font-serif text-3xl italic leading-[1.2] text-bravino-black lg:text-5xl">
              Confraternização, acolhimento e experiências memoráveis.
            </p>

            <span className="my-8 block h-px w-24 bg-bravino-peach" aria-hidden="true" />

            <div className="space-y-5">
              <p className="border-t border-bravino-peach pt-5 font-serif text-xl leading-[1.8] text-bravino-black lg:text-2xl">
                A arte de brindar aos momentos únicos.
              </p>
              <p className="border-t border-bravino-peach pt-5 font-serif text-xl leading-[1.8] text-bravino-black lg:text-2xl">
                Curadoria com alma: rótulos que narram histórias.
              </p>
              <p className="border-t border-bravino-peach pt-5 font-serif text-xl leading-[1.8] text-bravino-black lg:text-2xl">
                Onde a tradição encontra o contemporâneo.
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
