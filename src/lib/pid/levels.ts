export interface PlantLevel {
  name: string
  description: string
  /** Inércia. */
  inertia: number
  /** Atrito viscoso. */
  damping: number
  /** Saturação do motor (|u| máximo). */
  maxEffort: number
  /** Perturbação constante (vento). */
  disturbance: number
  /** Atraso do sensor, em segundos. */
  sensorDelay: number
  goals: {
    /** Sobressinal máximo, em %. */
    overshoot: number
    /** Tempo de acomodação máximo, em s. */
    settling: number
    /** Erro em regime máximo, em %. */
    steadyError: number
  }
}

export const LEVELS: PlantLevel[] = [
  {
    name: 'Antena leve',
    description: 'Motor forte, pouca inércia.',
    inertia: 1,
    damping: 1,
    maxEffort: 10,
    disturbance: 0,
    sensorDelay: 0,
    goals: { overshoot: 20, settling: 4, steadyError: 2 },
  },
  {
    name: 'Antena pesada',
    description: 'Muita inércia e motor fraco: tudo demora a responder.',
    inertia: 3,
    damping: 0.5,
    maxEffort: 6,
    disturbance: 0,
    sensorDelay: 0,
    goals: { overshoot: 10, settling: 5, steadyError: 2 },
  },
  {
    name: 'Vento lateral',
    description: 'Um vento constante empurra a antena para trás.',
    inertia: 1.5,
    damping: 1,
    maxEffort: 8,
    disturbance: -2.5,
    sensorDelay: 0,
    goals: { overshoot: 15, settling: 6, steadyError: 2 },
  },
  {
    name: 'Sinal atrasado',
    description: 'O sensor responde com 0,12 s de atraso.',
    inertia: 1,
    damping: 0.8,
    maxEffort: 8,
    disturbance: 0,
    sensorDelay: 0.12,
    goals: { overshoot: 15, settling: 5, steadyError: 2 },
  },
]
