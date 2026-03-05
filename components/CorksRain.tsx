'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Cork = {
  startX: number;
  startY: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rot: number;
  startRot: number;
  rotDrift: number;
  driftAmp: number;
  driftPhase: number;
  driftSpeed: number;
  alpha: number;
  blur: number;
  depth: number;
};

const DESKTOP_COUNT = 14;
const MOBILE_COUNT = 6;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createCork(width: number, height: number, isMobile: boolean): Cork {
  const size = rand(isMobile ? 34 : 28, isMobile ? 58 : 82);
  const depth = size > 62 ? 1 : size > 46 ? 0.65 : 0.35;
  const blur = isMobile ? 0 : size > 72 && Math.random() < 0.22 ? 1.2 : 0;
  const startX = rand(-80, width + 80);
  const startY = rand(-height, height * 0.85);
  const startRot = rand(-0.08, 0.08);
  return {
    startX,
    startY,
    x: startX,
    y: startY,
    size,
    speed: rand(22, 52) * (0.72 + depth * 0.35),
    rot: startRot,
    startRot,
    rotDrift: rand(0.01, 0.045),
    driftAmp: rand(8, 24),
    driftPhase: rand(0, Math.PI * 2),
    driftSpeed: rand(0.55, 1.25),
    alpha: rand(0.45, 0.82),
    blur,
    depth,
  };
}

export default function CorksRain() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const corkCount = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

    const nodes = nodesRef.current.slice(0, corkCount);
    let width = 0;
    let height = 0;
    let viewportH = window.innerHeight;
    let corks: Cork[] = [];
    let rafId = 0;
    let last = performance.now();
    let scrollY = window.scrollY;
    let throttleTimer: number | null = null;

    const resize = () => {
      const rect = layer.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      viewportH = window.innerHeight;

      const initialTopVisible = isMobile ? 2 : 4; // including the floating cork
      corks = Array.from({ length: corkCount }, (_, i) => {
        const cork = createCork(width, height, isMobile);

        if (i < initialTopVisible) {
          // 3-4 corks visible on first paint in section 2.
          cork.startY = rand(-90, Math.min(viewportH * 0.52, height * 0.28));
        } else {
          // Remaining corks start lower and still complete full path to footer.
          cork.startY = rand(viewportH * 0.72, Math.max(viewportH * 0.95, height * 0.95));
        }
        cork.y = cork.startY;
        cork.x = cork.startX;
        cork.rot = cork.startRot;
        return cork;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (!node) continue;
        node.style.display = 'block';
        node.style.width = `${corks[i].size}px`;
        node.style.opacity = `${corks[i].alpha}`;
        node.style.filter = corks[i].blur ? `blur(${corks[i].blur}px)` : 'none';
        node.style.transform = `translate3d(${corks[i].x}px, ${corks[i].y}px, 0) rotate(${corks[i].rot}rad)`;
      }

      for (let i = corkCount; i < nodesRef.current.length; i += 1) {
        const node = nodesRef.current[i];
        if (node) node.style.display = 'none';
      }
    };

    const onScroll = () => {
      if (throttleTimer !== null) return;
      throttleTimer = window.setTimeout(() => {
        scrollY = window.scrollY;
        throttleTimer = null;
      }, 16);
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      const parallax = scrollY * 0.012;

      for (let i = 0; i < corkCount; i += 1) {
        const node = nodes[i];
        const cork = corks[i];
        if (!node || !cork) continue;

        cork.y += cork.speed * dt;
        cork.x = cork.startX + Math.sin(now * 0.001 * cork.driftSpeed + cork.driftPhase) * cork.driftAmp;

        if (cork.y - cork.size > height + 10) {
          // Infinite loop: return exactly to where it started.
          cork.y = cork.startY;
          cork.x = cork.startX;
          cork.rot = cork.startRot;
        }

        const wobble = Math.sin(now * 0.0012 + cork.driftPhase) * cork.rotDrift;
        node.style.transform = `translate3d(${cork.x}px, ${cork.y - parallax * cork.depth}px, 0) rotate(${cork.startRot + wobble}rad)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (throttleTimer !== null) window.clearTimeout(throttleTimer);
    };
  }, []);

  return (
    <div ref={layerRef} className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: DESKTOP_COUNT }).map((_, idx) => (
        <Image
          key={idx}
          ref={(el) => {
            if (el) nodesRef.current[idx] = el;
          }}
          src="/rolha-bravino-3d-uhd.webp"
          onError={(event) => {
            const target = event.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = '1';
              target.src = '/rolha-bravino-3d-uhd.png';
            }
          }}
          alt=""
          width={120}
          height={160}
          className="absolute left-0 top-0 will-change-transform select-none"
          style={{ opacity: 0, transform: 'translate3d(-200vw, -200vh, 0)' }}
          draggable={false}
          loading="eager"
          unoptimized
        />
      ))}
    </div>
  );
}
