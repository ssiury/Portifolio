<script setup lang="ts">
import ProgramSection from '@/components/ui/ProgramSection.vue'
import CaseReport from '@/components/cases/CaseReport.vue'
import { CASES } from '@/data/cases'
</script>

<template>
  <ProgramSection
    id="casos"
    :channel="4"
    slug="casos"
    :title="['Reportagens', 'especiais']"
    description="Trabalho no Instituto Verbena e projetos que conduzi de ponta a ponta."
    color="b5"
  >
    <div class="reports">
      <CaseReport v-for="(report, i) in CASES" :key="report.title" :report="report" :index="i" />
    </div>
  </ProgramSection>
</template>

<style scoped>
.reports {
  display: grid;
  gap: clamp(28px, 4vw, 48px);
}
</style>
