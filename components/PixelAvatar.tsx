import React, { useEffect, useRef } from 'react';
import { avatarGrid, avatarPalette, avatarGridOrigin } from '../data/avatarPixels';

const SIZE = avatarGrid.length;
const PIXELS = avatarGrid.flatMap((row, y) => row.flatMap((color, x) =>
  color < 0 ? [] : [{ x: x + avatarGridOrigin[0], y: y + avatarGridOrigin[1], color: avatarPalette[color] }]
));

/** The portrait is colored HTML squares, not a bitmap or canvas. */
export default function PixelAvatar() {
  const root = useRef<HTMLButtonElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const physics = useRef(PIXELS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, settled: false })));
  const pointer = useRef({ x: 0, y: 0, active: false });
  const cellSize = useRef(180 / SIZE);
  const phase = useRef<'normal' | 'fallen' | 'returning'>('normal');
  const returnTimer = useRef<number | null>(null);
  const frame = useRef(0);
  const previousTime = useRef(0);
  const reducedMotion = useRef(false);
  const wake = useRef<() => void>(() => {});

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reset = () => {
      if (returnTimer.current !== null) window.clearTimeout(returnTimer.current);
      returnTimer.current = null;
      phase.current = 'normal';
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      previousTime.current = 0;
      physics.current.forEach((p, i) => {
        p.x = p.y = p.vx = p.vy = 0;
        p.settled = false;
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
        if (phase.current === 'fallen') {
          if (!p.settled) {
            p.vy += (0.32 / cellSize.current) * dt;
            p.vx *= Math.pow(0.99, dt);
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            const absoluteX = pixel.x + p.x;
            if (absoluteX < 0 || absoluteX > SIZE - 1) {
              p.x = Math.max(0, Math.min(SIZE - 1, absoluteX)) - pixel.x;
              p.vx *= -0.35;
            }
            // Every particle lands on the same horizontal plane.
            const floor = SIZE + 3;
            if (pixel.y + p.y >= floor) {
              p.y = floor - pixel.y;
              p.vy *= -0.25;
              p.vx *= 0.55;
              if (Math.abs(p.vy) < 0.45 / cellSize.current && Math.abs(p.vx) < 0.3 / cellSize.current) {
                p.vx = p.vy = 0;
                p.settled = true;
              }
            }
            if (!p.settled) moving = true;
          }
        } else {
          if (pointer.current.active && phase.current === 'normal') {
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
          if (phase.current === 'normal' && offset > limit) {
            p.x *= limit / offset;
            p.y *= limit / offset;
            p.vx *= 0.5;
            p.vy *= 0.5;
          }
          if (Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.vx) + Math.abs(p.vy) < 0.012) {
            p.x = p.y = p.vx = p.vy = 0;
          } else moving = true;
        }
        const node = nodes.current[i];
        if (node && (p.x !== previousX || p.y !== previousY)) node.style.transform = p.x || p.y
          ? `translate3d(${p.x * 100}%, ${p.y * 100}%, 0)` : '';
      });
      if (!moving && phase.current === 'returning') phase.current = 'normal';
      if (moving || (pointer.current.active && phase.current === 'normal')) frame.current = requestAnimationFrame(tick);
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

  const cancelReturn = () => {
    if (returnTimer.current !== null) window.clearTimeout(returnTimer.current);
    returnTimer.current = null;
  };
  const scheduleReturn = () => {
    cancelReturn();
    if (phase.current !== 'fallen') return;
    returnTimer.current = window.setTimeout(() => {
      returnTimer.current = null;
      if (!pointer.current.active && phase.current === 'fallen') {
        phase.current = 'returning';
        physics.current.forEach(p => { p.settled = false; });
        wake.current();
      }
    }, 1200);
  };
  const leave = () => {
    pointer.current.active = false;
    scheduleReturn();
  };
  const burst = () => {
    if (reducedMotion.current) return;
    cancelReturn();
    phase.current = 'fallen';
    if (root.current) cellSize.current = root.current.getBoundingClientRect().width / SIZE;
    physics.current.forEach((p, i) => {
      p.settled = false;
      p.vx = (((i * 13) % 23) / 11 - 1) * 2.8 / cellSize.current;
      p.vy = -(1 + ((i * 7) % 11) / 10 * 2) / cellSize.current;
    });
    wake.current();
    // Touch and keyboard activations have no hovering pointer to leave.
    if (!pointer.current.active) scheduleReturn();
  };

  return (
    <button
      ref={root}
      type="button"
      aria-label="Yifeng Liu pixel portrait — click to shatter, move away to restore"
      title="Click to shatter; move away to restore"
      className="relative block w-[180px] max-w-full self-start md:w-[150%] md:max-w-[180px] md:self-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ aspectRatio: '1', padding: 0, border: 0, background: 'transparent', overflow: 'visible', cursor: 'default' }}
      onPointerEnter={event => {
        if (event.pointerType === 'touch' || reducedMotion.current) return;
        cancelReturn();
        pointer.current.active = true;
      }}
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
