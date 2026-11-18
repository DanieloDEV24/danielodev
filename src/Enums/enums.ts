export const ESTADOS_PROYECTOS = {
  Terminado: "Finalizado",
  Desarrollo: "En desarrollo",
  Pruebas: "Fase de pruebas"
} as const;

// export type EstadoProyecto =
//   (typeof ESTADOS_PROYECTOS)[keyof typeof ESTADOS_PROYECTOS];