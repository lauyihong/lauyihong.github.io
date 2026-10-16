import React, { useEffect, useRef } from 'react';
import { avatarGrid, avatarPalette } from '../data/avatarPixels';

const SIZE = avatarGrid.length;
const PIXELS = avatarGrid.flatMap((row, y) => row.flatMap((color, x) =>
  color < 0 ? [] : [{ x, y, color: avatarPalette[color] }]
));

/** The portrait is colored HTML squares, not a bitmap or canvas. */
export default function PixelAvatar() {
  const root = useRef<HTMLButtonElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const physics = useRef(PIXELS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })));
  const pointer = useRef({ x: 0, y: 0, active: false });
  const cellSize = useRef(270 / SIZE);
  const frame = useRef(0);
  const previousTime = useRef(0);
  const reducedMotion = useRef(false);
  const wake = useRef<() => void>(() => {});

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reset = () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      previousTime.current = 0;
      physics.current.forEach((p, i) => {
        p.x = p.y = p.vx = p.vy = 0;
        if (nodes.current[i]) nodes.current[i]!.style.transform = '';
      });
    };
    const updatePreference = () => {
      reducedMotion.current = media.matches;
      if (media.matches) reset();
    };
    updatePreference();
    media.addEventListener('change', updatePreference);

    const tick = (time: number) => {
      frame.current = 0;
      const dt = previousTime.current ? Math.min((time - previousTime.current) / 16.667, 2) : 1;
      previousTime.current = time;
      let moving = false;
      physics.current.forEach((p, i) => {
        const pixel = PIXELS[i];
        const previousX = p.x;
        const previousY = p.y;
        if (pointer.current.active) {
          const dx = pixel.x + 0.5 + p.x - pointer.current.x;
          const dy = pixel.y + 0.5 + p.y - pointer.current.y;
          const distance = Math.hypot(dx, dy);
          const radius = 12 / cellSize.current; // 12 CSS pixels, independent of portrait size.
          if (distance < radius) {
            const angle = distance < 0.01 ? i * 2.39996 : Math.atan2(dy, dx);
            const force = (1 - distance / radius) * (1.8 / cellSize.current) * dt;
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }
        p.vx = (p.vx - p.x * 0.035 * dt) * Math.pow(0.83, dt);
        p.vy = (p.vy - p.y * 0.035 * dt) * Math.pow(0.83, dt);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const offset = Math.hypot(p.x, p.y);
        const limit = 12 / cellSize.current;
        if (offset > limit) {
          p.x *= limit / offset;
          p.y *= limit / offset;
          p.vx *= 0.5;
          p.vy *= 0.5;
        }
        if (Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.vx) + Math.abs(p.vy) < 0.012) {
          p.x = p.y = p.vx = p.vy = 0;
        } else moving = true;
        const node = nodes.current[i];
        if (node && (p.x !== previousX || p.y !== previousY)) node.style.transform = p.x || p.y
          ? `translate3d(${p.x * 100}%, ${p.y * 100}%, 0)` : '';
      });
      if (moving || pointer.current.active) frame.current = requestAnimationFrame(tick);
      else previousTime.current = 0;
    };
    wake.current = () => {
      if (!frame.current && !reducedMotion.current) frame.current = requestAnimationFrame(tick);
    };
    const pause = () => {
      if (document.hidden) {
        pointer.current.active = false;
        reset();
      }
    };
    document.addEventListener('visibilitychange', pause);
    return () => {
      reset();
      wake.current = () => {};
      media.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', pause);
    };
  }, []);

  const leave = () => { pointer.current.active = false; };
  const burst = () => {
    if (reducedMotion.current) return;
    if (root.current) cellSize.current = root.current.getBoundingClientRect().width / SIZE;
    physics.current.forEach((p, i) => {
      const dx = PIXELS[i].x - SIZE / 2;
      const dy = PIXELS[i].y - SIZE / 2;
      const distance = Math.hypot(dx, dy) || 1;
      p.vx += dx / distance * (2 + (i % 7) * 0.25) / cellSize.current;
      p.vy += dy / distance * (2 + (i % 5) * 0.25) / cellSize.current;
    });
    wake.current();
  };

  return (
    <button
      ref={root}
      type="button"
      aria-label="Yifeng Liu pixel portrait — activate to scatter pixels"
      title="Move over the portrait to scatter pixels"
      className="relative block w-[270px] max-w-full self-start md:w-[150%] md:max-w-[270px] md:self-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ aspectRatio: '1', padding: 0, border: 0, background: 'transparent', overflow: 'visible', cursor: 'default' }}
      onPointerMove={event => {
        if (event.pointerType === 'touch' || reducedMotion.current) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        cellSize.current = bounds.width / SIZE;
        pointer.current = {
          x: (event.clientX - bounds.left) / bounds.width * SIZE,
          y: (event.clientY - bounds.top) / bounds.height * SIZE,
          active: true,
        };
        wake.current();
      }}
      onPointerLeave={leave}
      onPointerCancel={leave}
      onBlur={leave}
      onClick={burst}
    >
      {PIXELS.map((pixel, i) => (
        <span
          key={`${pixel.x}-${pixel.y}`}
          ref={node => { nodes.current[i] = node; }}
          aria-hidden="true"
          style={{
            position: 'absolute', pointerEvents: 'none',
            left: `${pixel.x / SIZE * 100}%`, top: `${pixel.y / SIZE * 100}%`,
            width: `${100 / SIZE}%`, height: `${100 / SIZE}%`,
            backgroundColor: pixel.color,
          }}
        />
      ))}
    </button>
  );
}
