<script setup lang="ts">
import ProgramSection from '@/components/ui/ProgramSection.vue'
import { useTimeline } from '@/composables/useTimeline'
import { JOBS } from '@/data/career'

const { years, nowRatio, span, timecode } = useTimeline()
</script>

<template>
  <ProgramSection
    id="trajetoria"
    :channel="5"
    slug="trajetória"
    :title="['Ilha de', 'edição']"
    description="Minha carreira como linha do tempo de vídeo, em escala real. A agulha vermelha é hoje."
    color="b4"
    dark-text
  >
    <div class="editor" :style="{ '--now': nowRatio }" aria-hidden="true">
      <div class="ed-in">
        <div class="ed-head">
          <span class="osd">carreira_final_v3.prj</span>
          <span class="osd tc">{{ timecode }}</span>
        </div>
        <div class="ruler" :style="{ '--years': years.length }">
          <span />
          <span v-for="y in years" :key="y">{{ y }}</span>
        </div>
        <div v-for="(job, i) in JOBS" :key="job.clipLabel" class="trk">
          <span class="nm">V{{ i + 1 }}</span>
          <div class="lane" :style="{ '--years': years.length }">
            <div
              class="clip"
              :class="{ live: !job.end }"
              :style="{ ...span(job), '--cc': `var(--${job.color})` }"
            >
              {{ job.clipLabel }}
            </div>
          </div>
        </div>
        <div class="playhead" />
      </div>
    </div>

    <div class="jobs">
      <article
        v-for="job in JOBS"
        :key="job.clipLabel"
        class="job"
        :style="{ '--cc': `var(--${job.color})` }"
      >
        <h3>{{ job.title }}</h3>
        <p class="where">{{ job.company }}</p>
        <span class="label">{{ job.period }}</span>
        <ul>
          <li v-for="h in job.highlights" :key="h">{{ h }}</li>
        </ul>
      </article>
    </div>
  </ProgramSection>
</template>

<style scoped>
.editor {
  background: var(--screen);
  color: var(--phos);
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 30px 60px -35px rgba(17, 19, 23, 0.7);
  overflow-x: auto;
}
.ed-in {
  min-width: 640px;
  position: relative;
}
.ed-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: var(--phos-dim);
}
.ed-head .osd {
  font-size: 18px;
}
.ed-head .tc {
  color: var(--osd);
}
.ruler {
  display: grid;
  grid-template-columns: 70px repeat(var(--years), 1fr);
  font-family: var(--f-mono);
  font-size: 11px;
  color: var(--phos-dim);
}
.ruler span {
  border-left: 1px solid #2a332e;
  padding: 2px 6px 8px;
}
.ruler span:first-child {
  border: none;
}
.trk {
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  height: 46px;
  border-top: 1px solid #1f2723;
}
.nm {
  font-family: var(--f-osd);
  font-size: 18px;
  color: var(--phos-dim);
}
.lane {
  position: relative;
  height: 34px;
  background-image: linear-gradient(90deg, #1f2723 1px, transparent 1px);
  background-size: calc(100% / var(--years)) 100%;
}
.clip {
  position: absolute;
  top: 3px;
  bottom: 3px;
  border-radius: 5px;
  background: var(--cc);
  color: var(--screen);
  font-size: 12.5px;
  font-weight: 700;
  padding: 0 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.25);
}
.clip.live {
  background: linear-gradient(90deg, var(--cc) 85%, transparent);
}
.playhead {
  position: absolute;
  top: 22px;
  bottom: 0;
  width: 2px;
  background: var(--rec);
  left: calc(70px + (100% - 70px) * var(--now));
  box-shadow: 0 0 10px var(--rec);
}
.playhead::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -6px;
  border: 7px solid transparent;
  border-top: 9px solid var(--rec);
}

.jobs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 24px;
}
.job {
  border-top: 4px solid var(--cc);
  padding-top: 14px;
  min-width: 0;
}
h3 {
  margin: 0;
  font-family: var(--f-display);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.6rem;
  line-height: 1;
}
.where {
  font-weight: 700;
  margin: 4px 0 0;
}
.label {
  display: block;
  margin: 2px 0 10px;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  font-size: 15px;
}
li {
  margin-bottom: 4px;
}
@media (max-width: 900px) {
  .jobs {
    grid-template-columns: 1fr;
  }
}
</style>
