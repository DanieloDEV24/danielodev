import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringWrapperRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // el punto sigue al ratón de forma casi instantánea
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      // el anillo (contenedor) sigue con retraso, solo posición
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const handleMouseDown = () => {
      dotRef.current?.classList.add('cursor-dot--click');
      ringWrapperRef.current?.classList.add('cursor-ring-wrapper--click');
    };

    const handleMouseUp = () => {
      dotRef.current?.classList.remove('cursor-dot--click');
      ringWrapperRef.current?.classList.remove('cursor-ring-wrapper--click');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animate();

    // Detecta elementos clickeables (enlaces, botones, o cualquiera con onClick / role="button")
    const interactiveEls = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input, textarea, select, label, [onclick]'
    );

    const addHover = () => {
      dotRef.current?.classList.add('cursor-dot--hover');
      ringWrapperRef.current?.classList.add('cursor-ring-wrapper--hover');
    };
    const removeHover = () => {
      dotRef.current?.classList.remove('cursor-dot--hover');
      ringWrapperRef.current?.classList.remove('cursor-ring-wrapper--hover');
    };

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      {/* Contenedor: solo se ENCARGA de la posición (sigue al cursor) */}
      <div ref={ringWrapperRef} className="cursor-ring-wrapper">
        {/* Anillo interior: solo se ENCARGA de rotar sobre su propio centro */}
        <div className="cursor-ring" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}