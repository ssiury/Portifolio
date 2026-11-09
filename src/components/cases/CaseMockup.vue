<script setup lang="ts">
import type { CaseMockup } from '@/types/content'

/** Ilustrações abstratas de cada projeto, desenhadas só com CSS. */
defineProps<{ variant: CaseMockup }>()
</script>

<template>
  <div class="inner" aria-hidden="true">
    <div v-if="variant === 'architecture'" class="m-arch">
      <div class="row">
        <span>portal público</span><span>inscrições</span><span>painel Filament</span>
      </div>
      <div class="core">Laravel · monolito modular</div>
      <div class="row"><span>PostgreSQL</span><span>Redis</span><span>Docker</span></div>
    </div>

    <div v-else-if="variant === 'dashboard'" class="m-dash">
      <div class="side"><b /><b /><b /><b /></div>
      <div class="main">
        <div class="filters"><b /><b /><b /></div>
        <div v-for="r in 4" :key="r" class="tr"><s /><s /><s /></div>
      </div>
    </div>

    <div v-else-if="variant === 'kanban'" class="m-kan">
      <div>disponibilidade<b /><b /></div>
      <div>suporte<b /><b /><b /></div>
      <div>manutenção<b /></div>
    </div>

    <div v-else-if="variant === 'pipeline'" class="m-pipe">
      <div class="st done"><b>✓</b>HU</div>
      <span class="ln" />
      <div class="st done"><b>✓</b>implementa</div>
      <span class="ln" />
      <div class="st done"><b>✓</b>revisa</div>
      <span class="ln wait" />
      <div class="st"><b>↻</b>calibra</div>
    </div>

    <div v-else-if="variant === 'layers'" class="m-code">
      <div><em>view</em> → FormRequest</div>
      <div>→ <em>Controller</em> // só orquestra</div>
      <div>→ <em>Application</em> // regra de negócio</div>
      <div>→ <em>Repository</em> // persistência</div>
      <div class="ok">API pronta para web e mobile</div>
    </div>
  </div>
</template>

<style scoped>
.inner {
  position: absolute;
  inset: 0;
  padding: 34px 16px 16px;
  color: var(--phos);
}

.m-arch {
  height: 100%;
  display: grid;
  gap: 9px;
  align-content: center;
  font-family: var(--f-mono);
  font-size: 11px;
  text-align: center;
}
.m-arch .row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.m-arch .row span,
.m-arch .core {
  border: 1px solid #2e3833;
  border-radius: 5px;
  padding: 9px 4px;
  color: var(--phos-dim);
}
.m-arch .core {
  border-color: var(--osd);
  color: var(--osd);
}

.m-dash {
  height: 100%;
  display: grid;
  grid-template-columns: 22% 1fr;
  gap: 12px;
}
.m-dash .side {
  border-right: 1px solid #2e3833;
  display: grid;
  gap: 8px;
  align-content: start;
  padding-right: 10px;
}
.m-dash .side b {
  height: 6px;
  border-radius: 3px;
  background: #2e3833;
}
.m-dash .side b:first-child {
  background: var(--osd);
  width: 70%;
}
.m-dash .main {
  display: grid;
  gap: 8px;
  align-content: start;
}
.m-dash .filters {
  display: flex;
  gap: 6px;
}
.m-dash .filters b {
  height: 16px;
  flex: 1;
  border: 1px solid #2e3833;
  border-radius: 4px;
}
.m-dash .filters b:first-child {
  border-color: var(--osd);
}
.m-dash .tr {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #222a26;
}
.m-dash .tr s {
  height: 6px;
  background: #2e3833;
  border-radius: 3px;
  text-decoration: none;
}
.m-dash .tr s:first-child {
  background: #5f7065;
}

.m-kan {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.m-kan div {
  border: 1px solid #2e3833;
  border-radius: 6px;
  padding: 8px;
  display: grid;
  gap: 6px;
  align-content: start;
  font-family: var(--f-mono);
  font-size: 10px;
  color: var(--phos-dim);
}
.m-kan b {
  height: 18px;
  border-radius: 4px;
  background: #18201c;
  border: 1px solid #2e3833;
}
.m-kan div:nth-child(2) b:first-of-type {
  border-color: var(--osd);
}

.m-pipe {
  height: 100%;
  display: flex;
  align-items: center;
}
.m-pipe .st {
  display: grid;
  justify-items: center;
  gap: 8px;
  font-family: var(--f-mono);
  font-size: 10px;
  color: var(--phos-dim);
}
.m-pipe .st b {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--osd);
  display: grid;
  place-items: center;
  color: var(--osd);
}
.m-pipe .st.done b {
  background: var(--osd);
  color: var(--screen);
}
.m-pipe .ln {
  flex: 1;
  height: 2px;
  background: var(--osd);
  margin-bottom: 20px;
  min-width: 8px;
}
.m-pipe .ln.wait {
  background: repeating-linear-gradient(90deg, #2e3833 0 5px, transparent 5px 9px);
}

.m-code {
  font-family: var(--f-mono);
  font-size: 12px;
  line-height: 1.9;
  color: var(--phos-dim);
}
.m-code em {
  font-style: normal;
  color: var(--osd);
}
.m-code .ok {
  color: var(--b2);
  margin-top: 6px;
}
</style>
