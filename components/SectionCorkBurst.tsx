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

export default function SectionCorkBurst() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const [corks, setCorks] = useState<BurstCork[]>([]);

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
    const previousTop = new WeakMap<HTMLElement, number>();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const maxActive = isMobile ? 6 : 15;

    const cullTimer = window.setInterval(() => {
      const now = performance.now();
      setCorks((prev) => prev.filter((v) => v.expiresAt > now));
    }, 250);

    const observer = new IntersectionObserver(
      (entries) => {
        const wrapperRect = wrapper.getBoundingClientRect();

        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) return;

          const target = entry.target as HTMLElement;
          const currentTop = entry.boundingClientRect.top;
          const prevTop = previousTop.get(target);
          previousTop.set(target, currentTop);

          // Dispara apenas quando a seção sobe na viewport (usuário descendo).
          const isMovingDownPage = prevTop === undefined ? true : currentTop < prevTop - 0.5;
          if (!isMovingDownPage) return;

          const now = performance.now();
          const last = firedAt.get(target) ?? 0;
          if (now - last < 1400) return;
          firedAt.set(target, now);

          const idx = sectionIndex.get(target) ?? 0;
          const sectionNumber = idx + 2;

          const r = target.getBoundingClientRect();
          const sectionTop = r.top - wrapperRect.top;
          const endY = sectionTop + r.height * 0.7;

          const leftDesktop = sectionNumber % 2 === 0 ? 1 : 2;
          const rightDesktop = 3 - leftDesktop;

          const leftCount = isMobile ? 1 : leftDesktop;
          const rightCount = isMobile ? 1 : rightDesktop;

          const spawned: BurstCork[] = [];

          for (let i = 0; i < leftCount; i += 1) {
            const duration = rand(9.8, 12.2);
            const zSpinDelta = Math.random() > 0.5 ? 360 : -360;
            spawned.push({
              id: `${now}-L-${i}-${Math.random().toString(36).slice(2, 7)}`,
              x: rand(-64, 178),
              y: sectionTop - rand(28, 76),
              endY,
              scale: rand(0.92, isMobile ? 1.12 : 1.26),
              duration,
              delay: rand(0.55, 1.35),
              rotateXFrom: rand(-14, 8),
              rotateXTo: rand(24, 56),
              rotateYFrom: rand(-12, 12),
              rotateYTo: rand(-60, 60),
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
              x: rand(wrapperRect.width - 178, wrapperRect.width + 64),
              y: sectionTop - rand(28, 76),
              endY,
              scale: rand(0.92, isMobile ? 1.12 : 1.26),
              duration,
              delay: rand(0.55, 1.35),
              rotateXFrom: rand(-14, 8),
              rotateXTo: rand(24, 56),
              rotateYFrom: rand(-12, 12),
              rotateYTo: rand(-60, 60),
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
        threshold: [0.2],
        root: null,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.clearInterval(cullTimer);
    };
  }, []);

  return (
    <div ref={layerRef} className="absolute inset-0 z-[6] pointer-events-none overflow-hidden" aria-hidden="true">
      {corks.map((v) => (
        <motion.div
          key={v.id}
          className="absolute will-change-transform"
          style={{ left: 0, top: 0, width: v.width, transformStyle: 'preserve-3d' }}
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
            src="/rolha-bravino-3d-uhd.webp"
            alt=""
            aria-hidden="true"
            width={3248}
            height={4600}
            loading="lazy"
            className="h-auto w-full select-none"
            style={{
              imageRendering: 'high-quality',
              filter: 'contrast(1.14) brightness(1.05) saturate(1.04)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
