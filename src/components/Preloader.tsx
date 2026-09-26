import { useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.css';

interface PreloaderProps {
  /** Se llama cuando termina la animación de carga */
  onFinish?: () => void;
}

type LineType = { text: string; className?: string };

const BUILD_LOGS = [
  'compiling modules...',
  'optimizing assets...',
  'bundling components...',
  'ready ✓',
];

export default function Preloader({ onFinish }: PreloaderProps) {
  const [lines, setLines] = useState<LineType[]>([]);
  const [progress, setProgress] = useState(0);
  const [buildLog, setBuildLog] = useState('');
  const [showBar, setShowBar] = useState(false);
  const [hiding, setHiding] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    let cancelled = false;

    async function typeInline(prefix: string, text: string, speed: number) {
      return new Promise<void>((resolve) => {
        if (reducedMotion.current) {
          setLines((prev) => [...prev, { text: prefix + text, className: styles.prompt }]);
          resolve();
          return;
        }
        let i = 0;
        setLines((prev) => [...prev, { text: prefix, className: styles.prompt }]);
        const interval = setInterval(() => {
          i++;
          setLines((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { text: prefix + text.slice(0, i), className: styles.prompt };
            return copy;
          });
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    }

    function wait(ms: number) {
      return new Promise<void>((resolve) => setTimeout(resolve, reducedMotion.current ? 40 : ms));
    }

    async function runSequence() {
      await wait(300);
      if (cancelled) return;

      await typeInline('$ ', 'whoami', 35);
      await wait(250);
      setLines((p) => [...p, { text: '> Daniel Ruiz — Full Stack Developer', className: styles.dim }]);
      await wait(350);

      await typeInline('$ ', 'git checkout portfolio', 30);
      await wait(250);
      setLines((p) => [...p, { text: "✓ Switched to branch 'portfolio'", className: styles.ok }]);
      await wait(300);

      await typeInline('$ ', 'npm run build', 30);
      await wait(200);
      if (cancelled) return;

      setShowBar(true);
      await runBuildBar();
      if (cancelled) return;

      setLines((p) => [...p, { text: '✓ Build complete. Launching site...', className: styles.ok }]);
      await wait(reducedMotion.current ? 150 : 550);
      if (cancelled) return;

      setHiding(true);
      setTimeout(() => onFinish?.(), 500);
    }

    async function runBuildBar() {
      const duration = reducedMotion.current ? 300 : 1400;
      const start = performance.now();
      return new Promise<void>((resolve) => {
        function frame(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const pct = Math.floor(t * 100);
          setProgress(pct);
          const idx = Math.min(BUILD_LOGS.length - 1, Math.floor(t * BUILD_LOGS.length));
          setBuildLog(BUILD_LOGS[idx]);
          if (t < 1 && !cancelled) {
            requestAnimationFrame(frame);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(frame);
      });
    }

    runSequence();
    return () => {
      cancelled = true;
    };
  }, [onFinish]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [lines, progress]);

  return (
    <div className={`${styles.preloader} ${hiding ? styles.hide : ''}`}>
      <div className={styles.term}>
        <div className={styles.termBar}>
          <span className={`${styles.dot} ${styles.dotR}`} />
          <span className={`${styles.dot} ${styles.dotY}`} />
          <span className={`${styles.dot} ${styles.dotG}`} />
          <span className={styles.termTitle}>daniel@dev — zsh — 88×24</span>
        </div>
        <div className={styles.termBody} ref={bodyRef}>
          {lines.map((line, i) => (
            <div key={i} className={`${styles.line} ${line.className ?? ''}`}>
              {line.text}
            </div>
          ))}
          {showBar && (
            <>
              <div className={styles.barwrap}>
                <div className={styles.bartrack}>
                  <div className={styles.barfill} style={{ width: `${progress}%` }} />
                </div>
                <div className={styles.barpct}>{progress}%</div>
              </div>
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
