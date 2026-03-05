'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type BurstCork = {
  id: string;
  x: number;
  y: number;
  endY: number;
  scale: number;
  duration: number;
  delay: number;
  rotateXFrom: number;
  rotateXTo: number;
  rotateYFrom: number;
  rotateYTo: number;
  rotateZFrom: number;
  rotateZTo: number;
  width: number;
  expiresAt: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function leftX(index: number, isMobile: boolean) {
  if (isMobile) return index === 0 ? -34 : 38;
  return index === 0 ? -52 : 62;
}

function rightX(index: number, wrapperWidth: number, isMobile: boolean) {
  if (isMobile) return index === 0 ? wrapperWidth - 58 : wrapperWidth - 132;
  return index === 0 ? wrapperWidth - 78 : wrapperWidth - 170;
}

export default function SectionCorkBurst() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const [corks, setCorks] = useState<BurstCork[]>([]);
  const lastScrollYRef = useRef(0);
  const isScrollingDownRef = useRef(false);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const wrapper = layer.closest<HTMLElement>('[data-burst-root]');
    if (!wrapper) return;

    const sections = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-burst-section]'));
    if (!sections.length) return;

    const sectionIndex = new Map<HTMLElement, number>();
    sections.forEach((s, i) => sectionIndex.set(s, i));

    const firedAt = new WeakMap<HTMLElement, number>();
    const inViewState = new WeakMap<HTMLElement, boolean>();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const maxActive = 3;
    lastScrollYRef.current = window.scrollY;

    const cullTimer = window.setInterval(() => {
      const now = performance.now();
      setCorks((prev) => prev.filter((v) => v.expiresAt > now));
    }, 250);

    const onScroll = () => {
      const current = window.scrollY;
      isScrollingDownRef.current = current > lastScrollYRef.current + 0.5;
      lastScrollYRef.current = current;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const wrapperRect = wrapper.getBoundingClientRect();

        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            inViewState.set(target, false);
            return;
          }

          const wasInView = inViewState.get(target) ?? false;
          if (wasInView) return;
          inViewState.set(target, true);

          if (!isScrollingDownRef.current) return;

          const now = performance.now();
          const last = firedAt.get(target) ?? 0;
          if (now - last < 900) return;
          firedAt.set(target, now);

          const idx = sectionIndex.get(target) ?? 0;
          const sectionNumber = idx + 2;

          const r = target.getBoundingClientRect();
          const sectionTop = r.top - wrapperRect.top;
          const endY = sectionTop + r.height * 0.7;

          const leftDesktop = sectionNumber % 2 === 0 ? 1 : 2;
          const rightDesktop = 3 - leftDesktop;

          // Sempre 3 rolhas por seção (alternando 1:2 e 2:1 em todas as telas).
          const leftCount = leftDesktop;
          const rightCount = rightDesktop;

          const spawned: BurstCork[] = [];

          for (let i = 0; i < leftCount; i += 1) {
            const duration = rand(9.8, 12.2);
            const zSpinDelta = Math.random() > 0.5 ? 360 : -360;
            spawned.push({
              id: `${now}-L-${i}-${Math.random().toString(36).slice(2, 7)}`,
              x: leftX(i, isMobile) + rand(-6, 6),
              y: sectionTop - (34 + i * 66),
              endY,
              scale: rand(0.92, isMobile ? 1.12 : 1.26),
              duration,
              delay: 0.03 + i * 0.14,
              rotateXFrom: 0,
              rotateXTo: 0,
              rotateYFrom: 0,
              rotateYTo: 0,
              rotateZFrom: rand(-8, 8),
              rotateZTo: zSpinDelta,
              width: isMobile ? 104 : 144,
              expiresAt: now + (duration + 0.5) * 1000,
            });
          }

          for (let i = 0; i < rightCount; i += 1) {
            const duration = rand(9.8, 12.2);
            const zSpinDelta = Math.random() > 0.5 ? 360 : -360;
            spawned.push({
              id: `${now}-R-${i}-${Math.random().toString(36).slice(2, 7)}`,
              x: rightX(i, wrapperRect.width, isMobile) + rand(-6, 6),
              y: sectionTop - (42 + i * 68),
              endY,
              scale: rand(0.92, isMobile ? 1.12 : 1.26),
              duration,
              delay: 0.06 + i * 0.14,
              rotateXFrom: 0,
              rotateXTo: 0,
              rotateYFrom: 0,
              rotateYTo: 0,
              rotateZFrom: rand(-8, 8),
              rotateZTo: zSpinDelta,
              width: isMobile ? 104 : 144,
              expiresAt: now + (duration + 0.5) * 1000,
            });
          }

          setCorks((prev) => [...prev, ...spawned].slice(-maxActive));
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -8% 0px',
        root: null,
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(cullTimer);
    };
  }, []);

  return (
    <div ref={layerRef} className="absolute inset-0 z-[6] pointer-events-none overflow-hidden" aria-hidden="true">
      {corks.map((v) => (
        <motion.div
          key={v.id}
          className="absolute will-change-transform"
          style={{ left: 0, top: 0, width: v.width }}
          initial={{
            x: v.x,
            y: v.y,
            opacity: 0,
            scale: v.scale,
            rotateX: v.rotateXFrom,
            rotateY: v.rotateYFrom,
            rotateZ: v.rotateZFrom,
          }}
          animate={{
            x: v.x + rand(-34, 34),
            y: v.endY,
            opacity: [0, 0.85, 0.85, 0],
            scale: v.scale,
            rotateX: v.rotateXTo,
            rotateY: v.rotateYTo,
            rotateZ: v.rotateZTo,
          }}
          transition={{
            duration: v.duration,
            delay: v.delay,
            ease: 'linear',
            times: [0, 0.12, 0.76, 1],
          }}
          transformTemplate={({ x, y, rotateX, rotateY, rotateZ, scale }) =>
            `translate3d(${x ?? 0}, ${y ?? 0}, 0) rotateX(${rotateX ?? 0}) rotateY(${rotateY ?? 0}) rotateZ(${rotateZ ?? 0}) scale(${scale ?? 1})`
          }
          onAnimationComplete={() => {
            setCorks((prev) => prev.filter((item) => item.id !== v.id));
          }}
        >
          <Image
            src="/rolha-bravino-clean-v2.png"
            alt=""
            aria-hidden="true"
            width={3248}
            height={4600}
            loading="lazy"
            className="h-auto w-full select-none"
          />
        </motion.div>
      ))}
    </div>
  );
}
