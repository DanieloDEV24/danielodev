import { useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.css';

/**
 * PreloaderProps
 * Props del preloader.
 *
 * @property onFinish Función opcional que se llama cuando termina la animación de carga
 */
interface PreloaderProps {
  /** Se llama cuando termina la animación de carga */
  onFinish?: () => void;
}

/**
 * LineType
 * Una línea de la terminal.
 *
 * @property text      Contenido de la línea
 * @property className Clase de CSS Module opcional (prompt, dim, ok...) que decide su color
 */
type LineType = { text: string; className?: string };

/**
 * BUILD_LOGS
 * Mensajes que van cambiando bajo la barra de progreso durante el "build".
 * Se elige uno u otro según el porcentaje avanzado (4 tramos del 25% cada uno).
 */
const BUILD_LOGS = [
  'compiling modules...',
  'optimizing assets...',
  'bundling components...',
  'ready ✓',
];

/**
 * Preloader
 * Pantalla de carga que simula una terminal: "escribe" varios comandos
 * (whoami, git checkout, npm run build), muestra sus salidas y una barra de
 * progreso con mensajes de build. Al terminar se desvanece (clase hide) y
 * avisa al padre con onFinish.
 * Respeta prefers-reduced-motion: en ese caso escribe los comandos de golpe y
 * acorta las pausas.
 *
 * @param onFinish Callback opcional que se ejecuta al terminar el fundido
 * @returns Un <div> a pantalla completa con la terminal animada
 */
export default function Preloader({ onFinish }: PreloaderProps) {
  // Líneas ya escritas en la terminal
  const [lines, setLines] = useState<LineType[]>([]);

  // Porcentaje de la barra de progreso (0-100)
  const [progress, setProgress] = useState(0);

  // Mensaje de build que se muestra bajo la barra
  const [buildLog, setBuildLog] = useState('');

  // true cuando toca mostrar la barra de progreso
  const [showBar, setShowBar] = useState(false);

  // true cuando empieza el fundido de salida
  const [hiding, setHiding] = useState(false);

  // Referencia al cuerpo de la terminal, para hacer scroll automático hasta el final
  const bodyRef = useRef<HTMLDivElement>(null);

  // Preferencia de movimiento del usuario, leída una vez.
  // Se guarda en un ref para poder usarla dentro de las funciones async sin re-renders
  const reducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Efecto principal: lanza la secuencia al montar (y de nuevo si cambia onFinish, ver notas)
  useEffect(() => {
    // Bandera para abortar la secuencia si el componente se desmonta a mitad
    let cancelled = false;

    /**
     * typeInline
     * Escribe un texto carácter a carácter en una línea nueva, con un prefijo fijo.
     *
     * @param prefix Parte inicial de la línea, que aparece de golpe (por ejemplo "$ ")
     * @param text   Texto que se va escribiendo letra a letra
     * @param speed  Milisegundos entre cada carácter
     * @returns Una promesa que se resuelve al terminar de escribir
     */
    async function typeInline(prefix: string, text: string, speed: number) {
      return new Promise<void>((resolve) => {
        // Con "reducir movimiento" la línea aparece completa al instante
        if (reducedMotion.current) {
          setLines((prev) => [...prev, { text: prefix + text, className: styles.prompt }]);
          resolve();
          return;
        }

        let i = 0;

        // Crea la línea solo con el prefijo...
        setLines((prev) => [...prev, { text: prefix, className: styles.prompt }]);

        // ...y en cada tick reemplaza la última línea añadiendo una letra más
        const interval = setInterval(() => {
          i++;
          setLines((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { text: prefix + text.slice(0, i), className: styles.prompt };
            return copy;
          });

          // Al llegar al final se detiene el intervalo y se resuelve la promesa
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    }

    /**
     * wait
     * Pausa asíncrona. Con "reducir movimiento" siempre espera solo 40 ms.
     *
     * @param ms Milisegundos que espera
     */
    function wait(ms: number) {
      return new Promise<void>((resolve) => setTimeout(resolve, reducedMotion.current ? 40 : ms));
    }

    /**
     * runSequence
     * Guion completo del preloader, paso a paso:
     * 1. whoami          -> muestra el nombre y el rol
     * 2. git checkout    -> confirma el cambio de rama
     * 3. npm run build   -> muestra la barra de progreso
     * 4. mensaje final, fundido de salida y llamada a onFinish
     */
    async function runSequence() {
      await wait(300);
      if (cancelled) return;

      // Paso 1: whoami
      await typeInline('$ ', 'whoami', 35);
      await wait(250);
      setLines((p) => [...p, { text: '> Daniel Ruiz — Full Stack Developer', className: styles.dim }]);
      await wait(350);

      // Paso 2: git checkout
      await typeInline('$ ', 'git checkout portfolio', 30);
      await wait(250);
      setLines((p) => [...p, { text: "✓ Switched to branch 'portfolio'", className: styles.ok }]);
      await wait(300);

      // Paso 3: npm run build + barra de progreso
      await typeInline('$ ', 'npm run build', 30);
      await wait(200);
      if (cancelled) return;

      setShowBar(true);
      await runBuildBar(); // función declarada más abajo: se puede usar antes gracias al hoisting
      if (cancelled) return;

      // Paso 4: cierre
      setLines((p) => [...p, { text: '✓ Build complete. Launching site...', className: styles.ok }]);
      await wait(reducedMotion.current ? 150 : 550);
      if (cancelled) return;

      // Empieza el fundido (clase hide) y, pasados 500 ms, avisa al padre.
      // Ese tiempo debería coincidir con la duración de la transición en el CSS
      setHiding(true);
      setTimeout(() => onFinish?.(), 500);
    }

    /**
     * runBuildBar
     * Anima la barra de progreso de 0 a 100 con requestAnimationFrame.
     * En cada frame calcula el porcentaje según el tiempo transcurrido y
     * elige el mensaje de build que corresponde a ese tramo.
     *
     * @returns Una promesa que se resuelve al llegar al 100% (o si se cancela)
     */
    async function runBuildBar() {
      // Duración total de la barra: más corta con "reducir movimiento"
      const duration = reducedMotion.current ? 300 : 1400;
      const start = performance.now();

      return new Promise<void>((resolve) => {
        function frame(now: number) {
          // t va de 0 a 1 según el tiempo transcurrido
          const t = Math.min(1, (now - start) / duration);
          const pct = Math.floor(t * 100);
          setProgress(pct);

          // Mensaje según el tramo: 0-24% -> 1º, 25-49% -> 2º, etc. (el índice no pasa del último)
          const idx = Math.min(BUILD_LOGS.length - 1, Math.floor(t * BUILD_LOGS.length));
          setBuildLog(BUILD_LOGS[idx]);

          // Sigue mientras no llegue al 100% y no se haya cancelado
          if (t < 1 && !cancelled) {
            requestAnimationFrame(frame);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(frame);
      });
    }

    // Arranca el guion
    runSequence();

    // Limpieza al desmontar: marca la secuencia como cancelada para que se detenga en el siguiente punto de control
    return () => {
      cancelled = true;
    };
  }, [onFinish]);

  // Scroll automático: mantiene visible la última línea cuando el contenido crece
  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [lines, progress]);

  return (
    // Contenedor a pantalla completa. La clase hide activa el fundido de salida
    <div className={`${styles.preloader} ${hiding ? styles.hide : ''}`}>

      {/* Ventana de la terminal */}
      <div className={styles.term}>

        {/* Barra superior estilo macOS: tres puntos de colores y título de la ventana */}
        <div className={styles.termBar}>
          <span className={`${styles.dot} ${styles.dotR}`} />
          <span className={`${styles.dot} ${styles.dotY}`} />
          <span className={`${styles.dot} ${styles.dotG}`} />
          <span className={styles.termTitle}>daniel@dev — zsh — 88×24</span>
        </div>

        {/* Cuerpo de la terminal. El ref permite hacer scroll automático hasta el final */}
        <div className={styles.termBody} ref={bodyRef}>

          {/* Líneas ya escritas. key={i} es correcto: la lista solo crece por el final,
              aunque la última línea se va modificando mientras se escribe */}
          {lines.map((line, i) => (
            <div key={i} className={`${styles.line} ${line.className ?? ''}`}>
              {line.text}
            </div>
          ))}

          {/* Barra de progreso y mensaje de build: solo aparecen durante "npm run build" */}
          {showBar && (
            <>
              {/* Pista, relleno (su ancho es el porcentaje) y número */}
              <div className={styles.barwrap}>
                <div className={styles.bartrack}>
                  <div className={styles.barfill} style={{ width: `${progress}%` }} />
                </div>
                <div className={styles.barpct}>{progress}%</div>
              </div>

              {/* Mensaje de build, con dos espacios delante para alinearlo con el texto de arriba */}
              <div className={`${styles.line} ${styles.dim}`} style={{ marginTop: 8 }}>
                {'  ' + buildLog}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}