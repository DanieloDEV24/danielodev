import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

/**
 * Ruta navegable desde la terminal (comandos `ls` y `cd`).
 * `nombre` es lo que se escribe en el comando y `ruta` el destino real.
 */
interface Ruta {
  nombre: string;
  ruta: string;
}

/**
 * Tipos de línea que puede mostrar la terminal.
 * - comando: lo que "escribe" el usuario (con el prompt `$`)
 * - error: salida de error en rojo
 * - texto: salida normal
 * - rutas: listado de enlaces (resultado de `ls`)
 */
type TipoLinea = "comando" | "error" | "texto" | "rutas";

/**
 * Línea ya impresa en el log de la terminal.
 */
interface Linea {
  id: number;
  tipo: TipoLinea;
  texto?: string;
}

/**
 * Secciones del portfolio a las que se puede saltar desde la terminal.
 * Ajusta las rutas si tus secciones tienen otros ids.
 */
const RUTAS: Ruta[] = [
  { nombre: "inicio", ruta: "/" },
  { nombre: "proyectos", ruta: "/#proyectos" },
  { nombre: "herramientas", ruta: "/#herramientas" },
  { nombre: "contacto", ruta: "/#contacto" },
];

/**
 * Comando que "escribe" la animación inicial y que provoca el error.
 */
const COMANDO_INICIAL = "cd /pagina-que-buscas";

/**
 * Flecha dibujada a mano que señala el botón principal.
 * Se oculta en móvil desde el CSS.
 */
const FlechaBoton = () => (
  <svg className="e404-flecha" viewBox="0 0 90 70" aria-hidden="true">
    {/* Cuerpo de la flecha: baja desde arriba a la izquierda y curva hacia el botón */}
    <path d="M6 8 C10 44 40 58 74 44" />
    {/* Punta de la flecha */}
    <path d="M74 44 L52 36 M74 44 L58 62" />
  </svg>
);

/**
 * Página de error 404.
 * Sigue la línea visual de danielo24.dev (fondo con rejilla, turquesa, trazos
 * a mano y tarjetas de cristal) y plantea el error como una terminal:
 * al cargar "escribe" un `cd` que falla y después deja al usuario probar
 * comandos (`help`, `ls`, `cd <ruta>`, `clear`). No necesita router: se
 * renderiza cuando la ruta del navegador no corresponde a ninguna página.
 */
const Error404 = () => {
  // Líneas ya impresas en el log
  const [lineas, setLineas] = useState<Linea[]>([]);
  // Comando que se está "escribiendo" en la animación inicial (null si no hay)
  const [escribiendo, setEscribiendo] = useState<string | null>(null);
  // Se activa al terminar la animación para mostrar el input real
  const [interactivo, setInteractivo] = useState(false);
  // Texto actual del input
  const [valor, setValor] = useState("");

  const contadorId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Añade una línea al final del log.
   */
  const anadir = useCallback((tipo: TipoLinea, texto?: string) => {
    setLineas((prev) => [...prev, { id: contadorId.current++, tipo, texto }]);
  }, []);

  // Secuencia inicial: es la única animación automática de la página
  useEffect(() => {
    let cancelado = false;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pausa que se salta si el usuario prefiere menos movimiento
    const esperar = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, reducido ? 0 : ms));

    // Escribe un comando letra a letra y lo deja impreso
    const escribir = async (texto: string) => {
      for (let i = 1; i <= texto.length; i++) {
        if (cancelado) return;
        setEscribiendo(texto.slice(0, i));
        await esperar(38);
      }
      setEscribiendo(null);
      anadir("comando", texto);
    };

    (async () => {
      await esperar(700);
      if (cancelado) return;
      await escribir(COMANDO_INICIAL);
      await esperar(250);
      if (cancelado) return;
      anadir("error", `bash: cd: /pagina-que-buscas: No such file or directory`);
      await esperar(500);
      if (cancelado) return;
      await escribir("ls ./");
      await esperar(250);
      if (cancelado) return;
      anadir("rutas");
      await esperar(300);
      if (!cancelado) setInteractivo(true);
    })();

    // Evita escribir en el log si el componente se desmonta a mitad
    return () => {
      cancelado = true;
    };
  }, [anadir]);

  // Mantiene el scroll del log al final cuando entran líneas nuevas
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lineas, escribiendo]);

  // Pone el foco en el input en cuanto aparece
  useEffect(() => {
    if (interactivo) inputRef.current?.focus();
  }, [interactivo]);

  /**
   * Interpreta un comando escrito por el usuario.
   */
  const ejecutar = (entrada: string) => {
    const limpio = entrada.trim();
    if (!limpio) return;

    anadir("comando", limpio);
    const [cmd, arg] = limpio.split(/\s+/);

    switch (cmd) {
      case "help":
        anadir("texto", "comandos: help, ls, cd <ruta>, clear");
        break;
      case "ls":
        anadir("rutas");
        break;
      case "clear":
        setLineas([]);
        break;
      case "cd": {
        // Sin argumento, `cd` lleva al inicio
        const nombre = (arg ?? "inicio").replace(/\//g, "");
        const destino = RUTAS.find((r) => r.nombre === nombre);
        if (destino) {
          anadir("texto", `redirigiendo a ${destino.nombre}/ ...`);
          window.location.assign(destino.ruta);
        } else {
          anadir("error", `bash: cd: ${arg}: No such file or directory`);
        }
        break;
      }
      default:
        anadir("error", `bash: ${cmd}: command not found. Prueba "help"`);
    }
  };

  /**
   * Ejecuta el comando al pulsar Enter.
   */
  const alPulsarTecla = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    ejecutar(valor);
    setValor("");
  };

  return (
    <main className="e404">
      {/* Número gigante: cuatros rellenos y cero solo con contorno */}
      <h1 className="e404-numero" aria-label="Error 404">
        <span aria-hidden="true">4</span>
        <span className="e404-cero" aria-hidden="true">0</span>
        <span aria-hidden="true">4</span>
      </h1>

      {/* Mensaje que explica qué ha pasado y qué se puede hacer */}
      <p className="e404-subtitulo">
        Esta ruta no compila. Prueba otra o <strong>escribe un comando</strong>.
      </p>

      {/* Terminal de cristal */}
      <section className="e404-terminal" aria-label="Terminal">
        {/* Barra superior con los tres puntos de ventana */}
        <div className="e404-barra">
          <i />
          <i />
          <i />
          <span>danielo24 — bash</span>
        </div>

        {/* Log de salida; al hacer clic se enfoca el input */}
        <div
          ref={logRef}
          className="e404-log"
          role="log"
          aria-live="polite"
          onClick={() => inputRef.current?.focus()}
        >
          {lineas.map((l) => {
            // Cada tipo de línea se pinta distinto
            if (l.tipo === "comando") {
              return (
                <div key={l.id}>
                  <span className="e404-prompt">$</span> {l.texto}
                </div>
              );
            }
            if (l.tipo === "rutas") {
              return (
                <div key={l.id}>
                  {RUTAS.map((r) => (
                    <a key={r.nombre} href={r.ruta} className="e404-enlace">
                      {r.nombre}/
                    </a>
                  ))}
                </div>
              );
            }
            return (
              <div key={l.id} className={l.tipo === "error" ? "e404-error" : undefined}>
                {l.texto}
              </div>
            );
          })}

          {/* Comando a medio escribir durante la animación */}
          {escribiendo !== null && (
            <div>
              <span className="e404-prompt">$</span> {escribiendo}
            </div>
          )}

          {/* Input real: solo aparece cuando acaba la animación */}
          {interactivo && (
            <div className="e404-fila">
              <span className="e404-prompt">$</span>
              <input
                ref={inputRef}
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                onKeyDown={alPulsarTecla}
                autoComplete="off"
                spellCheck={false}
                aria-label="Comando"
              />
            </div>
          )}
        </div>
      </section>

      {/* Acciones: principal (relleno) y secundaria (contorno) */}
      <div className="e404-acciones">
        <FlechaBoton />
        <a href="/" className="e404-boton-primario">
          Volver al inicio <span aria-hidden="true">→</span>
        </a>
        <a href="/#proyectos" className="e404-boton-secundario">
          Ver proyectos
        </a>
      </div>
    </main>
  );
};

export default Error404;