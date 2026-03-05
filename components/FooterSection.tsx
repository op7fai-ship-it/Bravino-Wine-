'use client';

import { Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="bg-bravino-black text-bravino-cream">
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-14 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          <section className="space-y-4 border-b border-bravino-peach/35 pb-8 sm:border-b-0 sm:pb-0">
            <h3 className="font-sans text-xs uppercase tracking-[0.16em] text-bravino-peach">Brand</h3>
            <div className="inline-flex items-center gap-3">
              <Image
                src="/logo-bravino-round.jpg"
                alt="Logo redonda Bravino"
                width={120}
                height={120}
                quality={100}
                className="h-14 w-14 rounded-full border border-bravino-peach/80 object-contain"
              />
              <div>
                <p className="font-serif text-xl text-bravino-cream">BRAVINO</p>
                <p className="font-sans text-xs uppercase tracking-[0.14em] text-bravino-peach">Wine Concept</p>
              </div>
            </div>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-bravino-cream/85">
              Curadoria, acolhimento e experiencias para transformar cada brinde em memoria.
            </p>
          </section>

          <section className="flex flex-col gap-4 border-b border-bravino-peach/35 pb-8 sm:border-b-0 sm:pb-0">
            <h3 className="font-sans text-xs uppercase tracking-[0.16em] text-bravino-peach">Unidade Ayrton Senna</h3>
            <div className="inline-flex items-center gap-2 text-bravino-cream/90">
              <Clock3 className="h-4 w-4 text-bravino-peach" />
              <p className="font-sans text-sm font-light leading-relaxed">Seg a Sex: 09h as 22h / Sab: 09h as 17h</p>
            </div>
            <Link
              href="https://wa.me/5543991231069"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit border border-bravino-peach px-4 py-2 font-sans text-sm text-bravino-cream transition-colors hover:bg-bravino-red"
            >
              WhatsApp Ayrton Senna
            </Link>
          </section>

          <section className="flex flex-col gap-4 border-b border-bravino-peach/35 pb-8 sm:border-b-0 sm:pb-0">
            <h3 className="font-sans text-xs uppercase tracking-[0.16em] text-bravino-peach">Unidade Santana</h3>
            <div className="inline-flex items-center gap-2 text-bravino-cream/90">
              <Clock3 className="h-4 w-4 text-bravino-peach" />
              <p className="font-sans text-sm font-light leading-relaxed">Seg a Sab: 11h as 23h</p>
            </div>
            <Link
              href="https://wa.me/5543999731534"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit border border-bravino-peach px-4 py-2 font-sans text-sm text-bravino-cream transition-colors hover:bg-bravino-red"
            >
              WhatsApp Santana
            </Link>
          </section>

          <section className="space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-[0.16em] text-bravino-peach">Links</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="https://instagram.com/bravino"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-bravino-cream transition-colors hover:text-bravino-red"
              >
                @bravino
              </Link>
              <Link
                href="https://bravino.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-bravino-cream transition-colors hover:text-bravino-red"
              >
                bravino.com.br
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-bravino-peach/35 pt-6">
          <p className="text-center font-sans text-xs tracking-[0.04em] text-bravino-cream/75">
            © 2026 Bravino Wine Concept. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
