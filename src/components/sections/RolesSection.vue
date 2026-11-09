<script setup lang="ts">
import ProgramSection from '@/components/ui/ProgramSection.vue'
import { ROLES } from '@/data/roles'
</script>

<template>
  <ProgramSection
    id="atuacao"
    :channel="3"
    slug="atuação"
    :title="['Seis telas,', 'um dev']"
    description="O que faço no dia a dia, da reunião ao terminal do servidor."
    color="b3"
    dark-text
  >
    <div class="mons">
      <article v-for="role in ROLES" :key="role.title" class="mon">
        <div class="mon-screen">
          <span class="osd">▶ {{ role.channel }}</span>
          <h3>{{ role.title }}</h3>
          <p>{{ role.description }}</p>
          <span class="kw">{{ role.keywords }}</span>
        </div>
      </article>
    </div>
  </ProgramSection>
</template>

<style scoped>
.mons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.mon {
  background: var(--body-plastic);
  border-radius: 16px;
  padding: 10px 10px 12px;
  box-shadow: 0 20px 40px -25px rgba(17, 19, 23, 0.6);
}
.mon-screen {
  position: relative;
  background: var(--screen);
  color: var(--phos);
  border-radius: 10px;
  padding: 22px;
  min-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mon-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(rgba(0, 0, 0, 0.25) 0 1px, transparent 1px 3px);
}
.mon-screen::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: var(--noise);
  background-size: 140px;
  opacity: 0;
  transition: opacity 0.2s;
}
.mon:hover .mon-screen::before {
  opacity: 0.18;
  animation: noise 0.25s steps(3) infinite;
}
.mon:hover .mon-screen {
  animation: jolt 0.35s steps(2) 1;
}
.osd {
  color: var(--osd);
  font-size: 18px;
}
h3 {
  margin: 0;
  font-family: var(--f-display);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.75rem;
  line-height: 1;
}
p {
  margin: 0;
  color: var(--phos-dim);
  font-size: 15px;
  line-height: 1.55;
}
.kw {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px dashed #2c3430;
  font-family: var(--f-mono);
  font-size: 12px;
  color: var(--phos);
}
@media (max-width: 980px) {
  .mons {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 620px) {
  .mons {
    grid-template-columns: 1fr;
  }
}
</style>
