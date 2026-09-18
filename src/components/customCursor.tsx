import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Detecta elementos clickeables (enlaces, botones, o cualquiera con onClick / role="button")
    const interactiveEls = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input, textarea, select, label, [onclick]'
    );

    const addHover = () => cursorRef.current?.classList.add('cursor--hover');
    const removeHover = () => cursorRef.current?.classList.remove('cursor--hover');

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}