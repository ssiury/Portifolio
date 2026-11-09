<script setup lang="ts">
import ChipList from '@/components/ui/ChipList.vue'
import CaseMockup from './CaseMockup.vue'
import type { CaseStudy } from '@/types/content'

defineProps<{ report: CaseStudy; index: number }>()
</script>

<template>
  <article class="rep">
    <div class="crt">
      <div class="scr">
        <span class="tag osd">REP {{ String(index + 1).padStart(2, '0') }}</span>
        <span class="rec osd" aria-hidden="true"><i class="rec-dot" />REC</span>
        <CaseMockup :variant="report.mockup" class="mock" />
      </div>
    </div>
    <div>
      <span class="kick">{{ report.kicker }}</span>
      <h3>{{ report.title }}</h3>
      <p>{{ report.description }}</p>
      <ChipList :items="report.tags" />
    </div>
  </article>
</template>

<style scoped>
.rep {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(20px, 4vw, 56px);
  align-items: center;
}
.rep > * {
  min-width: 0;
}
.rep:nth-child(even) .crt {
  order: 2;
}
.crt {
  background: var(--body-plastic);
  border-radius: 20px;
  padding: 12px;
  box-shadow: 0 30px 60px -35px rgba(17, 19, 23, 0.7);
}
.scr {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--screen);
  aspect-ratio: 16/10;
}
.scr::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(rgba(0, 0, 0, 0.25) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse, transparent 60%, rgba(0, 0, 0, 0.5));
}
.tag {
  position: absolute;
  left: 12px;
  top: 10px;
  z-index: 2;
  color: var(--osd);
}
.rec {
  position: absolute;
  right: 12px;
  top: 10px;
  z-index: 2;
  color: var(--rec);
  display: flex;
  gap: 6px;
  align-items: center;
}
.rep:hover .mock {
  filter: drop-shadow(2px 0 0 rgba(229, 50, 45, 0.75)) drop-shadow(-2px 0 0 rgba(0, 184, 204, 0.75));
  animation: jolt 0.4s steps(2) 1;
}
.kick {
  display: inline-block;
  font-family: var(--f-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 8px;
  background: var(--ink);
  color: var(--paper);
  border-radius: 3px;
}
h3 {
  font-family: var(--f-display);
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  line-height: 0.9;
  margin: 14px 0 12px;
}
p {
  color: var(--muted);
  margin: 0 0 16px;
  max-width: 48ch;
}
@media (max-width: 820px) {
  .rep {
    grid-template-columns: 1fr;
  }
  .rep:nth-child(even) .crt {
    order: 0;
  }
}
</style>
