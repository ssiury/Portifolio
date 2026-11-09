<script setup lang="ts">
import { onMounted } from 'vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import RolesSection from '@/components/sections/RolesSection.vue'
import CasesSection from '@/components/sections/CasesSection.vue'
import CareerSection from '@/components/sections/CareerSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import TuningGame from '@/components/game/TuningGame.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { useSecretChannel } from '@/composables/useSecretChannel'
import { installNoiseVariable } from '@/lib/noise'
import { installPointerTracking } from '@/lib/pointer'

useActiveSection()
useSecretChannel()

onMounted(() => {
  installNoiseVariable()
  installPointerTracking()
})
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <ProcessSection />
    <RolesSection />
    <CasesSection />
    <CareerSection />
    <StackSection />
    <AboutSection />
    <ContactSection />
  </main>
  <SiteFooter />
  <TuningGame />
</template>
