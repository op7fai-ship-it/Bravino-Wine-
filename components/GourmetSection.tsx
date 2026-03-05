'use client';

import { Beer, Candy, CookingPot } from 'lucide-react';
import { motion } from 'motion/react';

const gourmetCards = [
  {
    title: 'Chocolates e Doces.',
    description:
      'Seleção de chocolates importados e panetones premium que transformam a mesa em momentos inesquecíveis.',
    icon: Candy,
    visual:
      'bg-[radial-gradient(circle_at_20%_18%,rgba(255,253,245,0.9),transparent_45%),linear-gradient(145deg,rgba(245,198,165,0.55),rgba(179,28,36,0.26),rgba(13,13,13,0.35))]',
  },
  {
    title: 'Gourmet.',
    description: 'Antepastos, massas italianas, azeites e molhos especiais que convidam a boas histórias.',
    icon: CookingPot,
    visual:
      'bg-[radial-gradient(circle_at_78%_14%,rgba(255,253,245,0.88),transparent_42%),linear-gradient(155deg,rgba(245,198,165,0.62),rgba(13,13,13,0.28),rgba(179,28,36,0.22))]',
  },
  {
    title: 'Destilados e Cervejas.',
    description: 'Whiskies premium, licores e cervejas artesanais para os paladares mais exigentes.',
    icon: Beer,
    visual:
      'bg-[radial-gradient(circle_at_74%_20%,rgba(255,253,245,0.85),transparent_46%),linear-gradient(148deg,rgba(179,28,36,0.34),rgba(245,198,165,0.6),rgba(13,13,13,0.3))]',
  },
];

export default function GourmetSection() {
  return (
    <section className="relative overflow-hidden bg-bravino-cream text-bravino-black">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-bravino-peach/30 lg:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-serif text-5xl leading-tight text-bravino-red md:text-6xl">Seleção Gourmet e Bebidas.</h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-bravino-black/86 md:text-lg">
            Uma experiência completa que vai além da uva.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3"
        >
          {gourmetCards.map(({ title, description, icon: Icon, visual }) => (
            <article
              key={title}
              className="group overflow-hidden border border-bravino-peach/80 bg-bravino-cream shadow-[0_14px_40px_rgba(13,13,13,0.08)]"
            >
              <div className="relative h-56 overflow-hidden border-b border-bravino-peach/70">
                <div className={`absolute inset-0 scale-100 transition-transform duration-500 ease-out group-hover:scale-110 ${visual}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-bravino-black/24 to-bravino-cream/10" />
                <span className="absolute bottom-4 left-4 inline-flex h-10 w-10 items-center justify-center border border-bravino-cream/70 bg-bravino-black/24 text-bravino-cream">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </div>

              <div className="p-7">
                <h3 className="font-serif text-3xl leading-tight text-bravino-black">{title}</h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-bravino-black/84">{description}</p>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="inline-flex bg-bravino-red px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.08em] text-bravino-cream transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bravino-peach focus-visible:ring-offset-2 focus-visible:ring-offset-bravino-cream"
          >
            [Explorar Seleção Gourmet]
          </button>
        </div>
      </div>
    </section>
  );
}

