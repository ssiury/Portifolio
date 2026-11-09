<script setup lang="ts">
import { computed } from 'vue'
import ColorBars from '@/components/ui/ColorBars.vue'
import { CHANNELS, channelName, padChannel } from '@/data/channels'
import { PROFILE } from '@/data/profile'
import { useBroadcast } from '@/stores/broadcast'

const { state } = useBroadcast()
const navChannels = CHANNELS.filter((c) => c.number > 1)
const onAir = computed(
  () => `CH ${padChannel(state.section)} · ${channelName(state.section).toUpperCase()}`,
)
</script>

<template>
  <header class="top">
    <div class="wrap">
      <a class="mark" href="#inicio">
        <ColorBars />
        {{ PROFILE.firstName }} {{ PROFILE.lastName }}
      </a>
      <nav aria-label="Seções">
        <a
          v-for="c in navChannels"
          :key="c.id"
          :href="`#${c.id}`"
          :class="{ cur: state.section === c.number }"
          :aria-current="state.section === c.number ? 'location' : undefined"
        >
          <b>{{ padChannel(c.number) }}</b
          >{{ c.name }}
        </a>
      </nav>
      <span class="onair osd" aria-live="off"><i class="rec-dot" />{{ onAir }}</span>
    </div>
  </header>
</template>

<style scoped>
.top {
  position: sticky;
  top: env(safe-area-inset-top, 0px);
  z-index: 60;
  background: color-mix(in srgb, var(--wall) 88%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
}
.wrap {
  display: flex;
  align-items: center;
  gap: 18px;
  padding-block: 12px;
}
.mark {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--f-display);
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  line-height: 1;
}
nav {
  display: flex;
  gap: 2px;
  margin-left: auto;
}
nav a {
  text-decoration: none;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  color: var(--muted);
}
nav a b {
  font-family: var(--f-osd);
  font-weight: 400;
  font-size: 17px;
  margin-right: 4px;
  color: var(--ink);
}
nav a:hover,
nav a.cur {
  background: var(--ink);
  color: var(--paper);
}
nav a:hover b,
nav a.cur b {
  color: var(--osd);
}
.onair {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--screen);
  color: var(--osd);
  padding: 6px 10px 5px;
  border-radius: 6px;
  white-space: nowrap;
}
@media (max-width: 1060px) {
  nav {
    display: none;
  }
  .onair {
    margin-left: auto;
  }
}
</style>
