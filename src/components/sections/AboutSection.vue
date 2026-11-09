<script setup lang="ts">
import ProgramSection from '@/components/ui/ProgramSection.vue'
import { BIO, FACTS } from '@/data/about'
</script>

<template>
  <ProgramSection
    id="sobre"
    :channel="7"
    slug="sobre"
    :title="['Bastidores']"
    description="De onde eu venho e o que estudo."
    color="b7"
  >
    <div class="about">
      <p class="bio">{{ BIO }}</p>
      <div class="facts">
        <div v-for="fact in FACTS" :key="fact.title" class="fact">
          <span class="label">{{ fact.label }}</span>
          <h3>{{ fact.title }}</h3>
          <p>{{ fact.detail }}</p>
        </div>
      </div>
    </div>
  </ProgramSection>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(24px, 5vw, 72px);
  align-items: start;
}
.about > * {
  min-width: 0;
}
.bio {
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  line-height: 1.5;
  margin: 0;
  max-width: 40ch;
}
.facts {
  display: grid;
  border-top: 3px solid var(--ink);
}
.fact {
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
}
h3 {
  margin: 4px 0 0;
  font-size: 18px;
}
.fact p {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 15px;
}
@media (max-width: 820px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
