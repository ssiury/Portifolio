<script setup lang="ts">
import type { BarColor } from '@/types/content'

withDefaults(defineProps<{ colors?: BarColor[] }>(), {
  colors: () => ['b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
})
</script>

<template>
  <span class="bars-mini" aria-hidden="true">
    <i v-for="c in colors" :key="c" :style="{ background: `var(--${c})` }" />
  </span>
</template>

<style scoped>
.bars-mini {
  display: flex;
  height: 16px;
  width: 28px;
  border-radius: 2px;
  overflow: hidden;
}
.bars-mini i {
  flex: 1;
}
</style>
