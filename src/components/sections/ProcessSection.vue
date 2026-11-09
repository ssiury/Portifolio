<script setup lang="ts">
import ChipList from '@/components/ui/ChipList.vue'
import ProgramSection from '@/components/ui/ProgramSection.vue'
import { PROCESS } from '@/data/process'
</script>

<template>
  <ProgramSection
    id="processo"
    :channel="2"
    slug="processo"
    :title="['Grade de', 'programação']"
    description="Quatro blocos em que estou presente, do objetivo ao sistema no ar."
    color="b2"
    dark-text
  >
    <ol class="guide">
      <li v-for="slot in PROCESS" :key="slot.title" class="slot">
        <span class="blk">{{ slot.block }}</span>
        <h3>{{ slot.title }}</h3>
        <p>{{ slot.description }}</p>
        <ChipList :items="slot.tags" class="tags" />
      </li>
    </ol>
  </ProgramSection>
</template>

<style scoped>
.guide {
  border-top: 1px solid var(--rule);
  list-style: none;
  margin: 0;
  padding: 0;
}
.slot {
  display: grid;
  grid-template-columns: 120px 220px 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 22px 16px;
  border-bottom: 1px solid var(--rule);
  border-radius: 4px;
  transition:
    background 0.2s,
    color 0.2s;
  position: relative;
}
.slot > * {
  min-width: 0;
}
.blk {
  font-family: var(--f-osd);
  font-size: 24px;
  color: var(--muted);
  text-transform: uppercase;
}
h3 {
  margin: 0;
  font-family: var(--f-display);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 2rem;
  line-height: 1;
}
p {
  margin: 0;
  color: var(--muted);
}
.tags {
  justify-content: flex-end;
  max-width: 260px;
}
.slot:hover {
  background: var(--screen);
  color: var(--phos);
}
.slot:hover p {
  color: var(--phos-dim);
}
.slot:hover .blk {
  color: var(--osd);
}
.slot:hover::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background-image: var(--noise);
  background-size: 120px;
  opacity: 0.07;
  pointer-events: none;
  animation: noise 0.3s steps(3) infinite;
}
@media (max-width: 960px) {
  .slot {
    grid-template-columns: 90px 1fr;
    gap: 6px 18px;
  }
  .slot p,
  .tags {
    grid-column: 2;
  }
  .tags {
    justify-content: flex-start;
    max-width: none;
  }
}
</style>
