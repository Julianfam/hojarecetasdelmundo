import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DriftRail({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const dir = useRef(1);
  const resumeAt = useRef(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = performance.now();
    let raf = 0;
    const pxPerSec = 26;

    const tick = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;
      if (!paused.current && !reduce.matches) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 8) {
          let next = el.scrollLeft + dir.current * pxPerSec * (dt / 1000);
          if (next >= max) {
            next = max;
            dir.current = -1;
          } else if (next <= 0) {
            next = 0;
            dir.current = 1;
          }
          el.scrollLeft = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function pause() {
    paused.current = true;
    window.clearTimeout(resumeAt.current);
  }

  function resume() {
    window.clearTimeout(resumeAt.current);
    resumeAt.current = window.setTimeout(() => {
      paused.current = false;
    }, 1800);
  }

  return (
    <div
      ref={scroller}
      role="toolbar"
      aria-label={label}
      onPointerDown={pause}
      onPointerUp={resume}
      onPointerEnter={pause}
      onPointerLeave={resume}
      className={cn(
        "flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain pb-1",
        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
      )}
    >
      {children}
    </div>
  );
}
