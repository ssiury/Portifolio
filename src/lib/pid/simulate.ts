import type { PlantLevel } from './levels'

export interface PidGains {
  kp: number
  ki: number
  kd: number
}

export interface SimulationResult {
  /** Ângulo normalizado (1 = alvo) a cada passo. */
  samples: Float32Array
  dt: number
  overshoot: number
  settlingTime: number
  steadyError: number
  goalsMet: { overshoot: boolean; settling: boolean; steadyError: boolean }
  passed: boolean
  /** 0 a 3 estrelas. */
  stars: number
}

const DT = 0.005
const DURATION = 10
const SETTLE_BAND = 0.02

/**
 * Simula uma antena (inércia + atrito) controlada por PID até o degrau unitário,
 * com saturação do motor, perturbação constante e atraso de sensor.
 */
export function simulate(level: PlantLevel, { kp, ki, kd }: PidGains): SimulationResult {
  const n = Math.round(DURATION / DT)
  const delaySteps = Math.round(level.sensorDelay / DT)
  const samples = new Float32Array(n)
  const history: number[] = []
  let x = 0
  let v = 0
  let integral = 0
  let prevError = 1

  for (let k = 0; k < n; k++) {
    history.push(x)
    const measured = history.length > delaySteps ? history[history.length - 1 - delaySteps] : 0
    const error = 1 - measured
    integral += error * DT
    const derivative = k ? (error - prevError) / DT : 0
    prevError = error

    let u = kp * error + ki * integral + kd * derivative
    u = Math.max(-level.maxEffort, Math.min(level.maxEffort, u))
    const a = (u + level.disturbance - level.damping * v) / level.inertia
    v += a * DT
    x += v * DT
    samples[k] = x
  }

  let peak = -Infinity
  for (const s of samples) if (s > peak) peak = s
  const overshoot = Math.max(0, (peak - 1) * 100)

  let settlingTime = 0
  for (let k = n - 1; k >= 0; k--) {
    if (Math.abs(samples[k] - 1) > SETTLE_BAND) {
      settlingTime = (k + 1) * DT
      break
    }
  }
  const steadyError = Math.abs(1 - samples[n - 1]) * 100

  const { goals } = level
  const goalsMet = {
    overshoot: overshoot <= goals.overshoot,
    settling: settlingTime <= goals.settling,
    steadyError: steadyError <= goals.steadyError,
  }
  const passed = goalsMet.overshoot && goalsMet.settling && goalsMet.steadyError

  let stars = 0
  if (passed) {
    stars = 1
    if (settlingTime <= goals.settling * 0.6) stars = 2
    if (settlingTime <= goals.settling * 0.4 && overshoot <= 5) stars = 3
  }

  return { samples, dt: DT, overshoot, settlingTime, steadyError, goalsMet, passed, stars }
}

/** Dica para a próxima tentativa, na ordem de prioridade. */
export function tuningHint(result: SimulationResult, level: PlantLevel): string {
  if (result.overshoot > level.goals.overshoot) return 'Passou do ponto: aumente Kd ou reduza Kp.'
  if (result.steadyError > level.goals.steadyError) return 'Ficou um erro sobrando: aumente Ki.'
  if (result.settlingTime > level.goals.settling)
    return 'Lento demais: aumente Kp (e Kd para segurar).'
  return ''
}
