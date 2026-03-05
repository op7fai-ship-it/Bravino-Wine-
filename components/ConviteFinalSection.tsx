'use client';

import { motion } from 'motion/react';

function SignatureGlass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path d="M7 3H17V7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7V3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 12V20" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 21H15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function ConviteFinalSection() {
  return (
    <section className="relative overflow-hidden bg-bravino-cream text-bravino-black">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-[2vw]" aria-hidden="true">
        <span className="font-serif text-[20vw] leading-none tracking-[-0.02em] text-bravino-peach/8">LONDRINA</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24 text-center lg:px-12 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="mx-auto flex max-w-4xl flex-col items-center"
        >
          <span className="mx-auto mb-10 block h-px w-full max-w-3xl bg-bravino-peach/80" aria-hidden="true" />

          <h2 className="font-serif text-5xl leading-[1.1] text-bravino-red md:text-6xl lg:text-7xl">
            Londrina merece brindes <em className="font-serif italic">inesquecíveis</em>.
          </h2>

          <p className="mx-auto mt-9 max-w-4xl font-sans text-base leading-relaxed text-bravino-black md:text-lg">
            Venha nos visitar e descubra por que a BRAVINO é a grande parceira dos apaixonados por vinho. Sinta o
            aroma, deguste a história e encontre o rótulo ideal para o seu momento.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 text-bravino-peach">
            <span className="h-px w-10 bg-bravino-peach" aria-hidden="true" />
            <SignatureGlass />
            <span className="h-px w-10 bg-bravino-peach" aria-hidden="true" />
          </div>

          <span className="mx-auto mt-10 block h-px w-full max-w-3xl bg-bravino-peach/80" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
