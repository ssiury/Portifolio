<script setup lang="ts">
import { computed } from 'vue'
import { CHANNELS, SECRET_CHANNEL, TOTAL_CHANNELS, channelName } from '@/data/channels'
import { clamp } from '@/lib/math'
import { useBroadcast } from '@/stores/broadcast'

const emit = defineEmits<{ confirm: [] }>()
const { state, selectChannel } = useBroadcast()

const STEP_DEG = 25
const START_DEG = -150
const TICK_RADIUS = 43
const angleOf = (n: number) => START_DEG + (n - 1) * STEP_DEG

const ticks = Array.from({ length: TOTAL_CHANNELS }, (_, i) => {
  const n = i + 1
  const a = (angleOf(n) * Math.PI) / 180
  const labelled = CHANNELS.some((c) => c.number === n)
  return {
    n,
    label: labelled ? String(n) : '',
    kind: labelled ? '' : n === SECRET_CHANNEL ? 'tk sec' : 'tk',
    style: {
      left: `calc(50% + ${Math.sin(a) * TICK_RADIUS}px)`,
      top: `calc(50% - ${Math.cos(a) * TICK_RADIUS}px)`,
    },
  }
})

const knobStyle = computed(() => ({ transform: `rotate(${angleOf(state.channel)}deg)` }))
const valueText = computed(() => `Canal ${state.channel}, ${channelName(state.channel)}`)

const turn = (n: number) => selectChannel(n, { byUser: true })

let drag: { x: number; y: number; moved: boolean } | null = null

function onPointerDown(e: PointerEvent) {
  drag = { x: e.clientX, y: e.clientY, moved: false }
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!drag) return
  if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 5) drag.moved = true
  if (!drag.moved) return
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const deg =
    (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) /
    Math.PI
  const n = Math.round((clamp(deg, START_DEG, -START_DEG) - START_DEG) / STEP_DEG) + 1
  if (n !== state.channel) turn(n)
}

function onPointerUp() {
  if (drag && !drag.moved) turn(state.channel + 1)
  drag = null
}

function onKeydown(e: KeyboardEvent) {
  const delta = ({ ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 } as const)[
    e.key as 'ArrowRight'
  ]
  if (delta) {
    e.preventDefault()
    turn(state.channel + delta)
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('confirm')
  }
}

function onWheel(e: WheelEvent) {
  turn(state.channel + (e.deltaY > 0 ? 1 : -1))
}
</script>

<template>
  <div class="dial-wrap">
    <div class="dial-ticks" aria-hidden="true">
      <span v-for="t in ticks" :key="t.n" :class="t.kind" :style="t.style">{{ t.label }}</span>
    </div>
    <button
      class="dial"
      type="button"
      role="slider"
      aria-label="Seletor de canais"
      aria-valuemin="1"
      :aria-valuemax="TOTAL_CHANNELS"
      :aria-valuenow="state.channel"
      :aria-valuetext="valueText"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKeydown"
      @click.prevent
      @wheel.prevent="onWheel"
    >
      <span class="knob" :style="knobStyle" />
    </button>
  </div>
</template>

<style scoped>
.dial-wrap {
  position: relative;
  width: 92px;
  height: 92px;
  flex: none;
}
.dial-ticks {
  position: absolute;
  inset: 0;
}
.dial-ticks span {
  position: absolute;
  left: 50%;
  top: 50%;
  font-family: var(--f-osd);
  font-size: 15px;
  color: #a7abb4;
  transform: translate(-50%, -50%);
}
.dial-ticks span.tk {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #62666f;
}
.dial-ticks span.sec {
  width: 2px;
  height: 2px;
  background: #4a4d55;
}
.dial {
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #5b5e66, #2a2c31 60%, #1a1b1f);
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  cursor: grab;
  border: none;
  padding: 0;
  touch-action: none;
}
.dial:active {
  cursor: grabbing;
}
.knob {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transition: transform 0.25s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.knob::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 5px;
  width: 4px;
  height: 16px;
  margin-left: -2px;
  border-radius: 2px;
  background: var(--b2);
}
.knob::after {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: repeating-conic-gradient(rgba(255, 255, 255, 0.06) 0 6deg, transparent 6deg 12deg);
}
</style>
