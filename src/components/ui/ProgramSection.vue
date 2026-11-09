<script setup lang="ts">
import { computed } from 'vue'
import { padChannel } from '@/data/channels'
import type { BarColor } from '@/types/content'

/**
 * Seção-"programa": tarja com número do canal + título que entra em sintonia.
 */
const props = withDefaults(
  defineProps<{
    id: string
    channel: number
    slug: string
    title: string[]
    description: string
    color: BarColor
    /** Texto escuro sobre a tarja (para cores claras). */
    darkText?: boolean
    /** Faixa escura de largura total (ficha técnica). */
    dark?: boolean
  }>(),
  { darkText: false, dark: false },
)

const headingId = computed(() => `${props.id}-title`)
</script>

<template>
  <section :id="id" :class="dark ? 'band' : 'prog'" :aria-labelledby="headingId">
    <div class="wrap">
      <div
        class="lt"
        :style="{ '--c': `var(--${color})`, '--chc': darkText ? 'var(--ink)' : '#fff' }"
      >
        <div class="ch">
          <span class="osd">CH {{ padChannel(channel) }}</span>
          <small>{{ slug }}</small>
        </div>
        <div class="ttl">
          <h2 :id="headingId" v-tune>
            <template v-for="(line, i) in title" :key="line"><br v-if="i" />{{ line }}</template>
          </h2>
          <p>{{ description }}</p>
        </div>
      </div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.prog {
  padding-block: clamp(72px, 9vw, 128px) 0;
}

.band {
  background: var(--screen);
  color: var(--phos);
  margin-top: clamp(72px, 9vw, 128px);
  padding-block: clamp(64px, 8vw, 110px);
}

.lt {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: stretch;
  margin-bottom: clamp(28px, 4vw, 48px);
  border-bottom: 3px solid var(--ink);
}
.band .lt {
  border-color: var(--phos);
}
.ch {
  background: var(--c, var(--ink));
  color: var(--chc, #fff);
  padding: 10px 14px 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2px;
  min-width: 92px;
}
.ch .osd {
  font-size: 30px;
}
.ch small {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
}
.ttl {
  padding: 0 0 10px 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  min-width: 0;
}
.ttl p {
  margin: 0 0 4px;
  color: var(--muted);
  max-width: 30ch;
  font-size: 15.5px;
}
.band .ttl p {
  color: var(--phos-dim);
}
</style>
