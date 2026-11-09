<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ChannelDial from './ChannelDial.vue'
import { CHANNELS, SECRET_CHANNEL, channelByNumber, padChannel } from '@/data/channels'
import { prefersReducedMotion } from '@/lib/motion'
import { TvSignal } from '@/lib/tv/TvSignal'
import { useBroadcast } from '@/stores/broadcast'

const { state, scrollToChannel, openGame } = useBroadcast()

const canvas = ref<HTMLCanvasElement>()
/** Canal mostrado no OSD da tela (pode diferir do seletor quando a prévia expira). */
const shownChannel = ref(1)
let signal: TvSignal | null = null
let raf = 0
let visible = true
let lastFrame = 0
let observer: IntersectionObserver | null = null

const hint = computed(() => {
  const n = shownChannel.value
  if (n === 1) return 'gire o seletor'
  if (channelByNumber(n) || n === SECRET_CHANNEL) return 'OK para assistir'
  return ''
})

function showPreview() {
  shownChannel.value = state.channel
  signal?.show(state.channel)
}

/** "Assistir" o canal: rola até a seção, abre o canal escondido ou faz chiado. */
function confirm() {
  const n = state.channel
  if (channelByNumber(n)) scrollToChannel(n)
  else if (n === SECRET_CHANNEL) openGame()
  else signal?.burst()
}

watch(() => state.previewTick, showPreview)

function loop(t: number) {
  // com movimento reduzido, atualiza a 4 fps
  if (visible && signal && (!prefersReducedMotion || t - lastFrame > 250)) {
    lastFrame = t
    signal.render(t)
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  if (!canvas.value) return
  signal = new TvSignal(canvas.value, {
    channels: CHANNELS,
    secretChannel: SECRET_CHANNEL,
    reducedMotion: prefersReducedMotion,
    onRevert: () => (shownChannel.value = state.channel),
  })

  // refaz as máscaras quando as fontes do letreiro estiverem disponíveis
  document.fonts
    ?.load('900 40px "Big Shoulders Display"')
    .then(() => document.fonts.load('40px VT323'))
    .then(() => signal?.buildMasks())
    .catch(() => {})

  observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  observer.observe(canvas.value)
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<template>
  <div class="hero-tv">
    <div class="tv">
      <div class="screen" title="Assistir este canal" @click="confirm">
        <canvas ref="canvas" aria-hidden="true" />
        <span class="tv-osd osd">CH {{ padChannel(shownChannel) }}</span>
        <span class="tv-hint osd">{{ hint }}</span>
      </div>
      <div class="tv-panel">
        <span class="brand">IURY·VISION</span>
        <div class="controls">
          <span class="led" aria-hidden="true" />
          <ChannelDial @confirm="confirm" />
          <button
            class="okbtn"
            type="button"
            aria-label="Assistir canal selecionado"
            @click="confirm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    <div class="tv-feet" aria-hidden="true"><i /><i /></div>
  </div>
</template>

<style scoped>
.tv {
  background: linear-gradient(170deg, #34363c, var(--body-plastic) 40%, #18191d);
  border-radius: 30px;
  padding: clamp(14px, 2vw, 24px) clamp(14px, 2vw, 24px) 16px;
  box-shadow:
    0 2px 0 #4a4d55 inset,
    0 50px 80px -40px rgba(17, 19, 23, 0.65),
    0 0 0 1px #0d0e10;
}
.screen {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 7% / 9%;
  overflow: hidden;
  background: var(--screen);
  box-shadow:
    0 0 0 6px #0d0e10,
    inset 0 0 50px #000;
  cursor: pointer;
}
.screen canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  display: block;
}
.screen::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(rgba(0, 0, 0, 0.28) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.6));
}
.screen::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.09), transparent 35%);
}
.tv-osd {
  position: absolute;
  z-index: 3;
  left: 6%;
  top: 6%;
  color: var(--osd);
  text-shadow: 0 0 6px rgba(125, 255, 161, 0.6);
}
.tv-hint {
  position: absolute;
  z-index: 3;
  right: 6%;
  bottom: 6%;
  color: var(--phos-dim);
  font-size: 16px;
}
.tv-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  padding-inline: 6px;
}
.brand {
  font-family: var(--f-display);
  font-weight: 800;
  letter-spacing: 0.2em;
  font-size: 13px;
  color: #8a8e98;
}
.controls {
  display: flex;
  align-items: center;
  gap: 16px;
}
.okbtn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: radial-gradient(circle at 35% 30%, #ff6b62, var(--rec) 60%, #9b1d18);
  color: #fff;
  font-family: var(--f-osd);
  font-size: 18px;
  cursor: pointer;
  box-shadow:
    0 4px 0 #6d1411,
    0 6px 12px rgba(0, 0, 0, 0.5);
  transition:
    transform 0.08s,
    box-shadow 0.08s;
}
.okbtn:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #6d1411;
}
.led {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--osd);
  box-shadow: 0 0 10px var(--osd);
}
.tv-feet {
  display: flex;
  justify-content: space-between;
  padding: 0 18%;
  margin-top: -2px;
}
.tv-feet i {
  width: 18%;
  height: 12px;
  background: #1b1c20;
  border-radius: 0 0 8px 8px;
}
@media (max-width: 900px) {
  .hero-tv {
    order: -1;
  }
}
</style>
