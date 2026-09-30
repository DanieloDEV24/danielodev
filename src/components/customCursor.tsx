import { useEffect, useRef } from 'react';

/**
 * CustomCursor
 * Cursor personalizado formado por dos elementos:
 * - Un punto (.cursor-dot) que sigue al ratón de forma casi instantánea.
 * - Un anillo (.cursor-ring) que lo sigue con retraso (efecto "lerp") y que,
 *   desde CSS, puede rotar sobre su propio centro.
 * Añade clases modificadoras (--hover y --click) para que el CSS anime ambos
 * elementos al pasar sobre algo clickeable o al pulsar el botón del ratón.
 * En dispositivos táctiles no registra ningún listener ni animación.
 * No recibe props.
 *
 * @returns Un fragmento con el contenedor del anillo y el punto
 */
export default function CustomCursor() {
  // Referencias a los nodos del DOM: se manipulan directamente (sin estado)
  // para evitar re-renders de React en cada movimiento del ratón
  const dotRef = useRef<HTMLDivElement>(null);
  const ringWrapperRef = useRef<HTMLDivElement>(null);

  // Posición real del ratón (destino del anillo)
  const mouse = useRef({ x: 0, y: 0 });

  // Posición actual del anillo (va persiguiendo a `mouse` frame a frame)
  const pos = useRef({ x: 0, y: 0 });

  // Id del requestAnimationFrame en curso, necesario para cancelarlo al desmontar
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Si el dispositivo no tiene hover o su puntero es táctil, no hay cursor que seguir
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    /** Guarda la posición del ratón y mueve el punto al instante */
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // el punto sigue al ratón de forma casi instantánea
      if (dotRef.current) {
        // El segundo translate(-50%, -50%) centra el elemento sobre el puntero
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    /** Bucle de animación: acerca el anillo un 15% hacia el ratón en cada frame */
    const animate = () => {
      // el anillo (contenedor) sigue con retraso, solo posición
      // 0.15 = factor de suavizado: más bajo -> más retraso, más alto -> más pegado
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      // Se vuelve a encolar para el siguiente frame (~60 veces por segundo)
      rafId.current = requestAnimationFrame(animate);
    };

    /** Al pulsar: añade la clase --click para que el CSS anime el "clic" */
    const handleMouseDown = () => {
      dotRef.current?.classList.add('cursor-dot--click');
      ringWrapperRef.current?.classList.add('cursor-ring-wrapper--click');
    };

    /** Al soltar: quita la clase --click y vuelve al estado normal */
    const handleMouseUp = () => {
      dotRef.current?.classList.remove('cursor-dot--click');
      ringWrapperRef.current?.classList.remove('cursor-ring-wrapper--click');
    };

    // Listeners globales sobre window: el cursor funciona en toda la página
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Arranca el bucle de animación del anillo
    animate();

    // Detecta elementos clickeables (enlaces, botones, o cualquiera con onClick / role="button")
    // Ojo: es una "foto" del DOM en el momento de montar; los elementos que aparezcan después no se incluyen
    const interactiveEls = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input, textarea, select, label, [onclick]'
    );

    /** Al entrar en un elemento interactivo: activa el estado --hover */
    const addHover = () => {
      dotRef.current?.classList.add('cursor-dot--hover');
      ringWrapperRef.current?.classList.add('cursor-ring-wrapper--hover');
    };

    /** Al salir de un elemento interactivo: desactiva el estado --hover */
    const removeHover = () => {
      dotRef.current?.classList.remove('cursor-dot--hover');
      ringWrapperRef.current?.classList.remove('cursor-ring-wrapper--hover');
    };

    // Registra hover en cada elemento interactivo encontrado
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    // Limpieza al desmontar: quita listeners y detiene el bucle para evitar fugas de memoria
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
  }, []); // [] -> se ejecuta una sola vez, al montar

  return (
    <>
      {/* Contenedor: solo se ENCARGA de la posición (sigue al cursor) */}
      <div ref={ringWrapperRef} className="cursor-ring-wrapper">
        {/* Anillo interior: solo se ENCARGA de rotar sobre su propio centro */}
        <div className="cursor-ring" />
      </div>

      {/* Punto: sigue al ratón sin retraso */}
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}