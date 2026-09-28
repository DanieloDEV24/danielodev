import { useEffect, useMemo, useState } from 'react';

type LineKind = 'cmd' | 'out' | 'ok' | 'err';
interface Line {
  kind: LineKind;
  text: string;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function NotFound() {
  // Ruta que el usuario intentó abrir (recortada para que no rompa el layout)
  const path = useMemo(() => {
    const p = window.location.pathname || '/';
    return p.length > 32 ? `${p.slice(0, 31)}…` : p;
  }, []);

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

  const [shown, setShown] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setShown([]);
    setTyping(null);
    setDone(false);

    // Respeta "reducir movimiento": se muestra todo de golpe
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(lines);
      setDone(true);
      return;
    }

    (async () => {
      await sleep(350);
      for (const line of lines) {
        if (cancelled) return;

        if (line.kind === 'cmd') {
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return;
            setTyping(line.text.slice(0, i));
            await sleep(45);
          }
          await sleep(220);
          if (cancelled) return;
          setTyping(null);
          setShown((prev) => [...prev, line]);
        } else {
          await sleep(260);
          if (cancelled) return;
          setShown((prev) => [...prev, line]);
        }
      }
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [lines]);

  return (
    <main className="nf">
      <div className="nf__inner">
        <section className="nf__copy">
          <h1 className="nf__title">
            <span className="nf__title-main">ERROR</span>
            <span className="nf__title-accent">404.</span>
          </h1>

          <p className="nf__text">
            La página que buscas no existe, ha cambiado de sitio o nunca llegó a compilar.
            Nada grave: vuelve al inicio y sigue explorando el portfolio.
          </p>

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

        <div className="nf__term" aria-hidden="true">
          <div className="nf__term-bar">
            <span className="nf__dot nf__dot--r" />
            <span className="nf__dot nf__dot--y" />
            <span className="nf__dot nf__dot--g" />
            <span className="nf__term-title">daniel@dev — zsh — 88×24</span>
          </div>

          <div className="nf__term-body">
            {shown.map((l, i) => (
              <TermLine key={i} line={l} />
            ))}

            {typing !== null && (
              <p className="nf__line nf__line--cmd">
                <span className="nf__prompt">$</span> {typing}
                <span className="nf__caret" />
              </p>
            )}

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

function TermLine({ line }: { line: Line }) {
  if (line.kind === 'cmd') {
    return (
      <p className="nf__line nf__line--cmd">
        <span className="nf__prompt">$</span> {line.text}
      </p>
    );
  }
  const mark = line.kind === 'ok' ? '✓' : line.kind === 'err' ? '✗' : '>';
  return (
    <p className={`nf__line nf__line--${line.kind}`}>
      <span className="nf__mark">{mark}</span> {line.text}
    </p>
  );
}
