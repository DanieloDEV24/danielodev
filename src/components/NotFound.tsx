import { useEffect, useMemo, useState } from 'react';

/**
 * LineKind
 * Tipo de línea que se pinta en la terminal falsa:
 * - cmd: comando que "escribe" el usuario (con prompt $)
 * - out: salida normal (marca >)
 * - ok:  salida correcta (marca ✓)
 * - err: salida de error (marca ✗)
 */
type LineKind = 'cmd' | 'out' | 'ok' | 'err';

/**
 * Line
 * Una línea de la terminal.
 *
 * @property kind Tipo de línea (decide el estilo y la marca)
 * @property text Contenido de la línea
 */
interface Line {
  kind: LineKind;
  text: string;
}

/**
 * sleep
 * Pausa asíncrona para poder usar "await" en la animación de la terminal.
 *
 * @param ms Milisegundos que espera
 * @returns Una promesa que se resuelve pasado ese tiempo
 */
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * NotFound
 * Página 404 del portfolio. A la izquierda muestra el título, un texto
 * explicativo y dos botones (volver al inicio / página anterior). A la derecha
 * simula una terminal donde se "escriben" comandos letra a letra y aparecen
 * sus salidas, usando la ruta que el usuario intentó abrir.
 * Respeta prefers-reduced-motion: en ese caso muestra toda la terminal de golpe.
 * No recibe props.
 *
 * @returns Un <main class="nf"> con el mensaje de error y la terminal animada
 */
export default function NotFound() {
  // Ruta que el usuario intentó abrir (recortada para que no rompa el layout)
  // useMemo con [] -> se calcula una sola vez, al montar
  const path = useMemo(() => {
    const p = window.location.pathname || '/';
    return p.length > 32 ? `${p.slice(0, 31)}…` : p;
  }, []);

  // Guion de la terminal: comandos y respuestas, en el orden en que se muestran.
  // Se recalcula solo si cambia `path`
  const lines: Line[] = useMemo(
    () => [
      { kind: 'cmd', text: `cd ${path}` },
      { kind: 'err', text: `bash: cd: ${path}: No such file or directory` },
      { kind: 'cmd', text: 'git status' },
      { kind: 'err', text: `error: pathspec '${path}' did not match any route` },
      { kind: 'cmd', text: 'cd ~' },
      { kind: 'ok', text: "Back on branch 'portfolio'" },
    ],
    [path]
  );

  // Líneas ya completadas y visibles en la terminal
  const [shown, setShown] = useState<Line[]>([]);

  // Comando que se está escribiendo ahora mismo (null si no hay ninguno)
  const [typing, setTyping] = useState<string | null>(null);

  // true cuando termina toda la secuencia (se muestra el prompt final con el cursor)
  const [done, setDone] = useState(false);

  // Efecto de la animación: se ejecuta al montar (y si cambia `lines`)
  useEffect(() => {
    // Bandera para abortar la animación si el componente se desmonta a mitad
    let cancelled = false;

    // Reinicia el estado por si el efecto se vuelve a ejecutar
    setShown([]);
    setTyping(null);
    setDone(false);

    // Respeta "reducir movimiento": se muestra todo de golpe
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(lines);
      setDone(true);
      return;
    }

    // Función asíncrona autoejecutada: permite usar await dentro del efecto
    (async () => {
      // Pausa inicial antes de empezar a escribir
      await sleep(350);

      for (const line of lines) {
        if (cancelled) return;

        if (line.kind === 'cmd') {
          // Comando: se escribe letra a letra (45 ms por carácter)
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return;
            setTyping(line.text.slice(0, i));
            await sleep(45);
          }

          // Pausa breve, como si el usuario pulsara Enter
          await sleep(220);
          if (cancelled) return;

          // El comando pasa de "escribiéndose" a línea fija
          setTyping(null);
          setShown((prev) => [...prev, line]);
        } else {
          // Salida: aparece entera tras una pequeña pausa
          await sleep(260);
          if (cancelled) return;
          setShown((prev) => [...prev, line]);
        }
      }

      // Secuencia completa: se muestra el prompt final
      if (!cancelled) setDone(true);
    })();

    // Limpieza al desmontar: detiene la animación en curso
    return () => {
      cancelled = true;
    };
  }, [lines]);

  return (
    // Contenedor principal de la página de error
    <main className="nf">
      <div className="nf__inner">

        {/* Columna de texto: título, explicación y botones */}
        <section className="nf__copy">

          {/* Título en dos líneas con estilos distintos */}
          <h1 className="nf__title">
            <span className="nf__title-main">ERROR</span>
            <span className="nf__title-accent">404.</span>
          </h1>

          <p className="nf__text">
            La página que buscas no existe, ha cambiado de sitio o nunca llegó a compilar.
            Nada grave: vuelve al inicio y sigue explorando el portfolio.
          </p>

          {/* Acciones de salida: ir al inicio o volver a la página anterior */}
          <div className="nf__actions">
            <a className="nf__btn nf__btn--primary" href="/">
              Volver al inicio
            </a>
            <button
              type="button"
              className="nf__btn nf__btn--ghost"
              onClick={() => window.history.back()}
            >
              Página anterior
            </button>
          </div>
        </section>

        {/* Terminal decorativa: aria-hidden porque es solo ambientación
            y todo lo importante ya está en el texto de la izquierda */}
        <div className="nf__term" aria-hidden="true">

          {/* Barra superior estilo macOS: tres puntos de colores y título de la ventana */}
          <div className="nf__term-bar">
            <span className="nf__dot nf__dot--r" />
            <span className="nf__dot nf__dot--y" />
            <span className="nf__dot nf__dot--g" />
            <span className="nf__term-title">daniel@dev — zsh — 88×24</span>
          </div>

          <div className="nf__term-body">

            {/* Líneas ya completadas */}
            {shown.map((l, i) => (
              <TermLine key={i} line={l} />
            ))}

            {/* Comando en escritura, con el cursor parpadeante al final */}
            {typing !== null && (
              <p className="nf__line nf__line--cmd">
                <span className="nf__prompt">$</span> {typing}
                <span className="nf__caret" />
              </p>
            )}

            {/* Prompt final vacío cuando termina la secuencia */}
            {done && (
              <p className="nf__line nf__line--cmd">
                <span className="nf__prompt">$</span> <span className="nf__caret" />
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * TermLine
 * Pinta una línea ya terminada de la terminal. Los comandos llevan el prompt
 * "$"; el resto de líneas llevan una marca según su tipo
 * (✓ correcto, ✗ error, > salida normal).
 * Es un componente presentacional: solo pinta su prop.
 *
 * @param line Línea a pintar
 * @returns Un <p> con el estilo correspondiente a su tipo
 */
function TermLine({ line }: { line: Line }) {
  // Comando: prompt + texto
  if (line.kind === 'cmd') {
    return (
      <p className="nf__line nf__line--cmd">
        <span className="nf__prompt">$</span> {line.text}
      </p>
    );
  }

  // Salida: marca según el tipo. La clase nf__line--{kind} permite colorearla desde CSS
  const mark = line.kind === 'ok' ? '✓' : line.kind === 'err' ? '✗' : '>';
  return (
    <p className={`nf__line nf__line--${line.kind}`}>
      <span className="nf__mark">{mark}</span> {line.text}
    </p>
  );
}