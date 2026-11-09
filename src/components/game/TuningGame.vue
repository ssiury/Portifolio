<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, shallowRef, watch } from 'vue'
import { SECRET_CHANNEL } from '@/data/channels'
import { clamp } from '@/lib/math'
import { prefersReducedMotion } from '@/lib/motion'
import { getNoiseTexture } from '@/lib/noise'
import { drawChart } from '@/lib/pid/drawChart'
import { LEVELS } from '@/lib/pid/levels'
import { simulate, tuningHint, type SimulationResult } from '@/lib/pid/simulate'
import { storage } from '@/lib/storage'
import { useBroadcast } from '@/stores/broadcast'

const STORAGE_UNLOCKED = 'iury.tv.unlocked'
const STORAGE_STARS = 'iury.tv.stars'
const RUN_ANIMATION_MS = 2600

const { state, closeGame } = useBroadcast()

const chart = ref<HTMLCanvasElement>()
const closeBtn = ref<HTMLButtonElement>()

const gains = reactive({ kp: 5, ki: 0, kd: 0 })
const knobs = [
  { key: 'kp', label: 'Kp', max: 30 },
  { key: 'ki', label: 'Ki', max: 20 },
  { key: 'kd', label: 'Kd', max: 15 },
] as const

const level = ref(0)
const unlocked = ref(storage.get(STORAGE_UNLOCKED, 1))
const stars = ref<number[]>(storage.get(STORAGE_STARS, [0, 0, 0, 0]))

/** Simulação em exibição (animada até progress = 1). */
const run = shallowRef<{ result: SimulationResult; t0: number; done: boolean } | null>(null)
const running = computed(() => !!run.value && !run.value.done)

const current = computed(() => LEVELS[level.value])
const canGoNext = computed(
  () => level.value + 1 < LEVELS.length && level.value + 1 < unlocked.value,
)

const goals = computed(() => {
  const g = current.value.goals
  const met = run.value?.done ? run.value.result.goalsMet : null
  const status = (ok: boolean | undefined) => (met ? (ok ? 'ok' : 'bad') : '')
  return [
    { text: `sobressinal ≤ ${g.overshoot}%`, status: status(met?.overshoot) },
    { text: `acomoda em ≤ ${g.settling}s`, status: status(met?.settling) },
    { text: `erro final ≤ ${g.steadyError}%`, status: status(met?.steadyError) },
  ]
})

const starString = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

/** Mensagem de resultado exibida abaixo do botão. */
const feedback = computed(() => {
  const r = run.value
  if (!r) {
    const best = stars.value[level.value]
    return best
      ? { title: `Melhor resultado: ${starString(best)}`, lines: [] }
      : { title: '', lines: ['Ajuste os ganhos e transmita.'] }
  }
  if (!r.done) return { title: '', lines: ['Transmitindo…'] }

  const res = r.result
  const nums = `sobressinal ${res.overshoot.toFixed(1)}% · acomodação ${res.settlingTime.toFixed(2)}s · erro ${res.steadyError.toFixed(1)}%`
  if (!res.passed) {
    return { title: 'Sem sinal', lines: [nums, tuningHint(res, current.value)] }
  }
  const lines = [nums]
  if (res.stars < 3) lines.push('Mais rápido e com menos de 5% de sobressinal vale 3 estrelas.')
  if (stars.value.every((s) => s > 0) && level.value === LEVELS.length - 1)
    lines.push('Todos os canais sintonizados. É isso que eu estudo em sistemas de controle na UFG.')
  return { title: `Sinal travado ${starString(res.stars)}`, lines }
})

function setLevel(i: number) {
  level.value = clamp(i, 0, LEVELS.length - 1)
  run.value = null
}

function transmit() {
  const result = simulate(current.value, gains)
  run.value = { result, t0: performance.now(), done: false }
}

function finishRun() {
  const r = run.value
  if (!r) return
  run.value = { ...r, done: true }
  const { result } = r
  if (!result.passed) return
  if (result.stars > stars.value[level.value]) {
    stars.value[level.value] = result.stars
    storage.set(STORAGE_STARS, stars.value)
  }
  if (level.value + 2 > unlocked.value) {
    unlocked.value = Math.min(LEVELS.length, level.value + 2)
    storage.set(STORAGE_UNLOCKED, unlocked.value)
  }
}

/* laço de desenho */
let raf = 0
function frame(t: number) {
  if (!state.gameOpen || !chart.value) return
  let progress = 1
  const r = run.value
  if (r) {
    progress = prefersReducedMotion ? 1 : clamp((t - r.t0) / RUN_ANIMATION_MS)
    if (progress >= 1 && !r.done) finishRun()
  }
  const shown = run.value
  drawChart(chart.value, {
    run: shown ? { result: shown.result, progress, done: shown.done } : null,
    noise: getNoiseTexture(),
    reducedMotion: prefersReducedMotion,
  })
  raf = requestAnimationFrame(frame)
}

/* abrir / fechar com gestão de foco */
let lastFocus: HTMLElement | null = null

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeGame()
}

watch(
  () => state.gameOpen,
  async (open) => {
    if (open) {
      lastFocus = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
      setLevel(Math.min(unlocked.value - 1, LEVELS.length - 1))
      await nextTick()
      closeBtn.value?.focus()
      raf = requestAnimationFrame(frame)
    } else {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeydown)
      lastFocus?.focus?.()
    }
  },
)

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="state.gameOpen"
      class="game"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gtitle"
      @click.self="closeGame"
    >
      <div class="g-tv">
        <div class="g-screen">
          <canvas ref="chart" aria-label="Gráfico do ângulo da antena ao longo do tempo" />
        </div>
        <div class="g-panel">
          <div class="g-top">
            <span class="osd">CH {{ SECRET_CHANNEL }} · canal escondido</span>
            <button ref="closeBtn" class="g-close" type="button" @click="closeGame">
              Desligar ✕
            </button>
          </div>
          <h2 id="gtitle">Sintonia</h2>
          <p>
            A antena precisa apontar para a torre. Você controla o motor com um PID:
            <b>Kp</b> empurra em direção ao alvo, <b>Ki</b> corrige o erro que sobra,
            <b>Kd</b> freia antes de passar do ponto. Trave o sinal dentro das metas.
          </p>
          <div class="g-level">
            <span class="osd">Nível {{ level + 1 }} / {{ LEVELS.length }}</span>
            <span>{{ current.name }} · {{ current.description }}</span>
          </div>
          <ul class="goals">
            <li v-for="g in goals" :key="g.text" class="goal" :class="g.status">{{ g.text }}</li>
          </ul>
          <div class="knobs">
            <div v-for="k in knobs" :key="k.key" class="kn">
              <label :for="`gain-${k.key}`">{{ k.label }}</label>
              <input
                :id="`gain-${k.key}`"
                v-model.number="gains[k.key]"
                type="range"
                min="0"
                :max="k.max"
                step="0.5"
              />
              <output :for="`gain-${k.key}`">{{ gains[k.key].toFixed(1) }}</output>
            </div>
          </div>
          <button class="g-run" type="button" :disabled="running" @click="transmit">
            Transmitir ▸
          </button>
          <div class="g-res" aria-live="polite">
            <b v-if="feedback.title" class="line">{{ feedback.title }}</b>
            <span v-for="line in feedback.lines" :key="line" class="line">{{ line }}</span>
          </div>
          <div class="g-nav">
            <button type="button" :disabled="level === 0" @click="setLevel(level - 1)">
              ‹ Nível anterior
            </button>
            <button type="button" :disabled="!canGoNext" @click="setLevel(level + 1)">
              Próximo nível ›
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.game {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(10, 11, 13, 0.92);
  display: grid;
  place-items: center;
  padding: max(14px, env(safe-area-inset-top, 0px)) max(14px, env(safe-area-inset-right, 0px))
    max(14px, env(safe-area-inset-bottom, 0px)) max(14px, env(safe-area-inset-left, 0px));
  overflow-y: auto;
}
.g-tv {
  width: min(1100px, 100%);
  background: linear-gradient(170deg, #34363c, var(--body-plastic) 40%, #18191d);
  border-radius: 26px;
  padding: clamp(12px, 2vw, 22px);
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: clamp(14px, 2vw, 24px);
  box-shadow:
    0 0 0 1px #0d0e10,
    0 60px 120px -40px #000;
  animation: poweron 0.5s ease-out;
}
.g-tv > * {
  min-width: 0;
}
.g-screen {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--screen);
  aspect-ratio: 4/3;
  box-shadow: 0 0 0 5px #0d0e10;
}
.g-screen canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.g-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(rgba(0, 0, 0, 0.25) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse, transparent 60%, rgba(0, 0, 0, 0.55));
}
.g-panel {
  color: var(--phos);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 6px 4px;
}
.g-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.g-top .osd {
  color: var(--osd);
}
.g-close,
.g-nav button {
  background: none;
  border: 1px solid #4a4d55;
  color: var(--phos);
  border-radius: 6px;
  font: 700 13px var(--f-body);
  cursor: pointer;
}
.g-close {
  padding: 6px 10px;
}
.g-close:hover {
  border-color: var(--rec);
  color: #fff;
}
h2 {
  color: #fff;
  font-size: clamp(2.4rem, 4vw, 3.4rem);
}
p {
  margin: 0;
  color: var(--phos-dim);
  font-size: 14.5px;
  line-height: 1.5;
}
p b {
  color: #fff;
}
.g-level {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  border-top: 1px solid #34363c;
  padding-top: 10px;
}
.g-level .osd {
  color: var(--b2);
  font-size: 22px;
  white-space: nowrap;
}
.g-level span:last-child {
  font-size: 14px;
  color: var(--phos-dim);
}
.goals {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}
.goal {
  font-family: var(--f-mono);
  font-size: 11.5px;
  padding: 3px 8px;
  border-radius: 4px;
  background: #1b1d22;
  color: var(--phos);
}
.goal.ok {
  background: var(--osd);
  color: var(--screen);
}
.goal.bad {
  background: var(--rec);
  color: #fff;
}
.knobs {
  display: grid;
  gap: 10px;
}
.kn {
  display: grid;
  grid-template-columns: 44px 1fr 46px;
  align-items: center;
  gap: 10px;
}
.kn label {
  font-family: var(--f-osd);
  font-size: 22px;
  color: var(--osd);
}
.kn input {
  width: 100%;
  accent-color: var(--b2);
}
.kn output {
  font-family: var(--f-mono);
  font-size: 13px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.g-run {
  background: var(--b2);
  color: var(--screen);
  border: none;
  border-radius: 8px;
  padding: 13px;
  font: 700 16px var(--f-body);
  cursor: pointer;
  box-shadow: 0 4px 0 #8a7400;
}
.g-run:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #8a7400;
}
.g-run:disabled {
  opacity: 0.6;
  cursor: wait;
}
.g-res {
  min-height: 44px;
  font-size: 14px;
  color: var(--phos);
}
.g-res .line {
  display: block;
}
.g-res b {
  color: var(--b2);
  font-weight: 400;
  font-family: var(--f-osd);
  font-size: 20px;
}
.g-nav {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
}
.g-nav button {
  padding: 8px 12px;
}
.g-nav button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
@media (max-width: 860px) {
  .g-tv {
    grid-template-columns: 1fr;
  }
}
</style>
