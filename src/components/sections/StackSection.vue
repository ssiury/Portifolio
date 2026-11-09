<script setup lang="ts">
import ProgramSection from '@/components/ui/ProgramSection.vue'
import { STACK } from '@/data/stack'
</script>

<template>
  <ProgramSection
    id="stack"
    :channel="6"
    slug="stack"
    :title="['Ficha', 'técnica']"
    description="Em destaque, o que uso toda semana."
    color="b6"
    dark
  >
    <dl class="credits">
      <div v-for="credit in STACK" :key="credit.role" class="cred">
        <dt>{{ credit.role }}</dt>
        <dd :class="{ dimmed: credit.dimmed }">
          <template v-for="(item, i) in [...credit.featured, ...credit.others]" :key="item">
            <template v-if="i"> · </template>
            <b v-if="i < credit.featured.length">{{ item }}</b>
            <template v-else>{{ item }}</template>
          </template>
        </dd>
      </div>
    </dl>
  </ProgramSection>
</template>

<style scoped>
.credits {
  max-width: 860px;
  margin: 0 auto;
  display: grid;
  gap: 22px;
}
.cred {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 28px;
  align-items: baseline;
}
.cred > * {
  min-width: 0;
}
dt {
  text-align: right;
  font-family: var(--f-osd);
  font-size: 22px;
  color: var(--osd);
  text-transform: uppercase;
}
dd {
  margin: 0;
  font-family: var(--f-display);
  font-weight: 600;
  font-size: clamp(1.5rem, 2.6vw, 2.1rem);
  line-height: 1.15;
  text-transform: uppercase;
}
dd b {
  font-weight: 900;
  color: #fff;
}
dd.dimmed {
  color: var(--phos-dim);
}
@media (max-width: 620px) {
  .cred {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  dt {
    text-align: left;
  }
}
</style>
