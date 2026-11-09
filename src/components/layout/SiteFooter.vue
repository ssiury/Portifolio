<script setup lang="ts">
import { PROFILE } from '@/data/profile'
import { SECRET_CHANNEL } from '@/data/channels'

const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="wrap">
      <span>© {{ year }} {{ PROFILE.fullName }} · {{ PROFILE.city }}</span>
      <span class="faint">sinal fraco no {{ SECRET_CHANNEL }}</span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--ink);
  color: #8a8e98;
  border-top: 1px solid #2a2c31;
}
.wrap {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-block: 20px;
  font-size: 14px;
}
.faint {
  color: #4c5059;
  font-family: var(--f-osd);
  font-size: 17px;
}
</style>
