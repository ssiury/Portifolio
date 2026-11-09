<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import CrtTelevision from '@/components/tv/CrtTelevision.vue'
import { useClock } from '@/composables/useClock'
import { PROFILE } from '@/data/profile'

const clock = useClock(PROFILE.timeZone)
</script>

<template>
  <section id="inicio" class="hero" aria-labelledby="inicio-title">
    <div class="wrap hero-grid">
      <div>
        <span class="kicker osd">
          <b aria-hidden="true">●</b> Ao vivo de {{ PROFILE.city }} ·
          <time>{{ clock }}</time>
        </span>
        <h1 id="inicio-title">{{ PROFILE.firstName }}<br />{{ PROFILE.lastName }}</h1>
        <p class="role">{{ PROFILE.role }}</p>
        <p class="statement">
          {{ PROFILE.statement.before }}<strong>{{ PROFILE.statement.highlight }}</strong
          >{{ PROFILE.statement.after }}
        </p>
        <div class="ctas">
          <BaseButton href="#contato" solid>Vamos conversar</BaseButton>
          <BaseButton :href="PROFILE.links.github.href" external>
            {{ PROFILE.links.github.label }}
          </BaseButton>
          <BaseButton :href="PROFILE.links.linkedin.href" external>
            {{ PROFILE.links.linkedin.label }}
          </BaseButton>
        </div>
      </div>
      <CrtTelevision />
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(28px, 5vw, 64px) clamp(40px, 6vw, 80px);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
}
.hero-grid > * {
  min-width: 0;
}
.kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--ink);
  color: var(--paper);
  padding: 6px 12px 5px;
  border-radius: 4px;
}
.kicker b {
  color: var(--rec);
  font-weight: 400;
}
.role {
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  font-weight: 700;
  margin: 0 0 18px;
}
.statement {
  font-size: clamp(1.05rem, 1.5vw, 1.2rem);
  color: var(--muted);
  margin: 0;
  max-width: 36em;
}
.statement strong {
  color: var(--ink);
}
.ctas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 26px;
}
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
</style>
