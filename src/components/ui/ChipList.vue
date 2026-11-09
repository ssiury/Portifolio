<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <ul class="chips">
    <li v-for="item in items" :key="item" class="chip">{{ item }}</li>
  </ul>
</template>

<style scoped>
.chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chip {
  font-family: var(--f-mono);
  font-size: 11.5px;
  line-height: 1.6;
  padding: 3px 8px;
  border: 1px solid currentColor;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0.85;
}
</style>
