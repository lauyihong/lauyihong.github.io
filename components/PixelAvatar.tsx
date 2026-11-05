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
  const physics = useRef(PIXELS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, settled: false, returnX: 0, returnY: 0 })));
  const pointer = useRef({ x: 0, y: 0, active: false });
  const cellSize = useRef(4);
  const gridOffset = useRef(4);
  const returnStart = useRef<number | null>(null);
  const phase = useRef<'normal' | 'fallen' | 'returning'>('normal');
  const returnTimer = useRef<number | null>(null);
  const frame = useRef(0);
  const previousTime = useRef(0);
  const reducedMotion = useRef(false);
  const wake = useRef<() => void>(() => {});

  useEffect(() => {
    const alignGrid = () => {
      const width = root.current?.getBoundingClientRect().width || 180;
      const cell = Math.max(1, Math.floor(width / SIZE));
      const offset = Math.floor((width - cell * SIZE) / 2);
      cellSize.current = cell;
      gridOffset.current = offset;
      nodes.current.forEach((node, i) => {
        if (!node) return;
        node.style.left = `${Math.round(PIXELS[i].x * cell) + offset}px`;
        node.style.top = `${Math.round(PIXELS[i].y * cell) + offset}px`;
        node.style.width = node.style.height = `${cell}px`;
      });
    };
    alignGrid();
    const resizeObserver = new ResizeObserver(alignGrid);
    if (root.current) resizeObserver.observe(root.current);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reset = () => {
      if (returnTimer.current !== null) window.clearTimeout(returnTimer.current);
      returnTimer.current = null;
      phase.current = 'normal';
      returnStart.current = null;
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
      let returnProgress = 0;
      if (phase.current === 'returning') {
        if (returnStart.current === null) returnStart.current = time;
        returnProgress = Math.min(1, (time - returnStart.current) / 1000);
      }
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
        } else if (phase.current === 'returning') {
          const eased = returnProgress * returnProgress * (3 - 2 * returnProgress);
          p.x = p.returnX * (1 - eased);
          p.y = p.returnY * (1 - eased);
          p.vx = p.vy = 0;
          if (returnProgress < 1) moving = true;
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
      resizeObserver.disconnect();
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
        returnStart.current = null;
        physics.current.forEach(p => {
          p.settled = false;
          p.returnX = p.x;
          p.returnY = p.y;
        });
        wake.current();
      }
    }, 2000);
  };
  const leave = () => {
    pointer.current.active = false;
    scheduleReturn();
  };
  const burst = () => {
    if (reducedMotion.current) return;
    cancelReturn();
    phase.current = 'fallen';
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
        pointer.current = {
          x: (event.clientX - bounds.left - gridOffset.current) / cellSize.current,
          y: (event.clientY - bounds.top - gridOffset.current) / cellSize.current,
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
            left: Math.round(pixel.x * 4) + 4, top: Math.round(pixel.y * 4) + 4,
            width: 4, height: 4,
            backgroundColor: pixel.color,
          }}
        />
      ))}
    </button>
  );
}
