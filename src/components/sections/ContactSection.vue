<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'
import { PROFILE } from '@/data/profile'

const SMPTE = {
  top: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'].map((c) => `var(--${c})`),
  mid: [
    'var(--b7)',
    'var(--ink)',
    'var(--b5)',
    'var(--ink)',
    'var(--b3)',
    'var(--ink)',
    'var(--b1)',
  ],
  bot: ['#0b2a5c', '#fff', '#3a1366', 'var(--ink)', '#070707', '#1d1d1d', 'var(--ink)'],
}

const emailEl = ref<HTMLElement>()
const { status, copy } = useCopyToClipboard()
const copyLabel = computed(
  () =>
    ({ idle: 'Copiar e-mail', copied: 'Copiado ✓', selected: 'Selecionado · Ctrl+C' })[
      status.value
    ],
)
</script>

<template>
  <section id="contato" class="signoff" aria-labelledby="contato-title">
    <div class="smpte" aria-hidden="true">
      <div v-for="(row, name) in SMPTE" :key="name" :class="name">
        <i v-for="(c, i) in row" :key="i" :style="{ background: c }" />
      </div>
    </div>
    <div class="contact">
      <div class="wrap">
        <span class="osd">CH 08 · fim da transmissão</span>
        <h2 id="contato-title">Vamos entrar<br /><em>no ar juntos?</em></h2>
        <div class="mailrow">
          <a ref="emailEl" class="addr" :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
          <BaseButton solid inverted @click="copy(PROFILE.email, emailEl)">
            <span aria-live="polite">{{ copyLabel }}</span>
          </BaseButton>
        </div>
        <div class="links">
          <BaseButton :href="PROFILE.links.linkedin.href" external inverted>
            {{ PROFILE.links.linkedin.label }}
          </BaseButton>
          <BaseButton :href="PROFILE.links.github.href" external inverted>
            {{ PROFILE.links.github.label }}
          </BaseButton>
          <BaseButton href="#inicio" inverted>Voltar ao canal 1 ↑</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.signoff {
  margin-top: clamp(72px, 9vw, 128px);
}
.smpte {
  display: grid;
  grid-template-rows: 1fr auto auto;
  height: clamp(150px, 22vw, 240px);
}
.smpte .top {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.smpte .mid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 12%;
}
.smpte .bot {
  display: grid;
  grid-template-columns: 5fr 5fr 5fr 4fr 1fr 1fr 2fr;
  height: 22%;
}
.contact {
  background: var(--ink);
  color: var(--paper);
  padding-block: clamp(56px, 8vw, 100px);
}
.osd {
  color: var(--osd);
}
h2 {
  font-size: clamp(3rem, 8.4vw, 7.4rem);
  margin: 14px 0 30px;
}
h2 em {
  font-style: normal;
  color: var(--b2);
}
.mailrow {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding: 20px 0;
  border-top: 1px solid #34363c;
  border-bottom: 1px solid #34363c;
}
.addr {
  font-family: var(--f-display);
  font-weight: 800;
  font-size: clamp(1.5rem, 4.4vw, 3rem);
  letter-spacing: 0.01em;
  text-decoration: none;
  user-select: all;
  word-break: break-all;
  flex: 1;
  min-width: 0;
}
.addr:hover {
  color: var(--b2);
}
.links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 22px;
}
</style>
