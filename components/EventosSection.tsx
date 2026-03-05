'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMemo } from 'react';

type IconProps = { className?: string };

type EventCard = {
  id: 'deck' | 'wine' | 'degust';
  title: string;
  description: string;
  imageTone: string;
};

function WineBarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 3H17V7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7V3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 12V20" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 21H15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function DeckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 16H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 20H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 2V3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.8 4.2L7.9 5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17.2 4.2L16.1 5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function DegustacaoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="8.2" y="3" width="7.6" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11 3V1.8H13V3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.2 21H14.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="18.2" cy="7.2" r="2.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 7.2L18 8.1L19.5 6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const events: EventCard[] = [
  {
    id: 'deck',
    title: 'Vinho no Deck',
    description:
      'Um convite semanal para degustar, descobrir e viver a energia unica da BRAVINO. Aos sabados, a casa recebe degustacoes gratuitas.',
    imageTone:
      'bg-[radial-gradient(circle_at_78%_18%,rgba(255,253,245,0.9),transparent_44%),linear-gradient(145deg,rgba(245,198,165,0.68),rgba(179,28,36,0.34),rgba(13,13,13,0.2))]',
  },
  {
    id: 'wine',
    title: 'Wine Bar',
    description:
      'O ponto de encontro perfeito, com vinhos servidos na temperatura ideal, tacas especiais e comidinhas selecionadas.',
    imageTone:
      'bg-[radial-gradient(circle_at_26%_14%,rgba(255,253,245,0.9),transparent_44%),linear-gradient(150deg,rgba(245,198,165,0.58),rgba(13,13,13,0.16),rgba(179,28,36,0.2))]',
  },
  {
    id: 'degust',
    title: 'Degustacoes Especiais',
    description: 'Eventos exclusivos com presenca de produtores e provas de grandes rotulos.',
    imageTone:
      'bg-[radial-gradient(circle_at_74%_16%,rgba(255,253,245,0.85),transparent_42%),linear-gradient(152deg,rgba(245,198,165,0.62),rgba(179,28,36,0.24),rgba(13,13,13,0.2))]',
  },
];

function EventIcon({ id, className }: { id: EventCard['id']; className?: string }) {
  if (id === 'deck') return <DeckIcon className={className} />;
  if (id === 'wine') return <WineBarIcon className={className} />;
  return <DegustacaoIcon className={className} />;
}

function BentoCard({ card, delay }: { card: EventCard; delay: number }) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 170, damping: 18, mass: 0.5 });
  const rotateY = useSpring(tiltY, { stiffness: 170, damping: 18, mass: 0.5 });

  const areaClass = useMemo(() => {
    if (card.id === 'deck') return '[grid-area:deck] min-h-[30rem] lg:min-h-[38rem]';
    if (card.id === 'wine') return '[grid-area:wine] min-h-[18rem] lg:min-h-[18.5rem]';
    return '[grid-area:degust] min-h-[18rem] lg:min-h-[18.5rem]';
  }, [card.id]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, ease: 'easeOut', delay }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        tiltY.set((px - 0.5) * 10);
        tiltX.set((0.5 - py) * 10);
      }}
      onMouseLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
      className={`group relative overflow-hidden border border-bravino-peach bg-bravino-cream ${areaClass}`}
    >
      <div className={`absolute inset-0 scale-100 transition-transform duration-500 ease-out group-hover:scale-110 ${card.imageTone}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-bravino-black/26 to-bravino-cream/8" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
        <span className="inline-flex h-11 w-11 items-center justify-center border border-bravino-peach/85 bg-bravino-cream/25 text-bravino-peach">
          <EventIcon id={card.id} className="h-6 w-6" />
        </span>

        <h3 className="mt-5 font-serif text-3xl leading-tight text-bravino-red lg:text-4xl">{card.title}</h3>

        <p className="mt-3 max-w-[40ch] translate-y-4 font-sans text-base leading-relaxed text-bravino-black/95 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function EventosSection() {
  return (
    <section className="bg-bravino-cream text-bravino-black">
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-20 lg:px-12 lg:py-24">
        <span className="block h-px w-full bg-bravino-peach/75" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mt-12 max-w-4xl text-center"
        >
          <h2 className="font-serif text-5xl leading-tight text-bravino-red md:text-6xl">Eventos e Experiencias</h2>
          <span className="mx-auto mt-6 block h-px w-28 bg-bravino-peach/80" aria-hidden="true" />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-7 [grid-template-areas:'deck''wine''degust'] lg:grid-cols-3 lg:gap-8 lg:[grid-template-areas:'deck_deck_wine''deck_deck_degust']">
          <BentoCard card={events[0]} delay={0.05} />
          <BentoCard card={events[1]} delay={0.16} />
          <BentoCard card={events[2]} delay={0.27} />
        </div>

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="inline-flex bg-bravino-red px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.08em] text-bravino-cream transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bravino-peach focus-visible:ring-offset-2 focus-visible:ring-offset-bravino-cream"
          >
            [Quero Participar do Proximo Deck]
          </button>
        </div>
      </div>
    </section>
  );
}
