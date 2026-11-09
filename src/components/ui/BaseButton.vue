<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    href?: string
    external?: boolean
    solid?: boolean
    /** Variante para fundos escuros. */
    inverted?: boolean
  }>(),
  { href: undefined, external: false, solid: false, inverted: false },
)

const tag = computed(() => (props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (!props.href) return { type: 'button' }
  return props.external
    ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: props.href }
})
</script>

<template>
  <component :is="tag" v-bind="attrs" class="btn" :class="{ solid, inverted }">
    <slot />
    <span v-if="external" aria-hidden="true">↗</span>
    <span v-if="external" class="visually-hidden">(abre em nova aba)</span>
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 18px;
  border-radius: 8px;
  border: 2px solid var(--ink);
  background: transparent;
  color: var(--ink);
  text-decoration: none;
  font: 700 15px var(--f-body);
  cursor: pointer;
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    background 0.15s,
    color 0.15s;
}
.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--ink);
}
.btn.solid {
  background: var(--ink);
  color: var(--paper);
}
.btn.solid:hover {
  box-shadow: 4px 4px 0 var(--rec);
}

.btn.inverted {
  border-color: var(--paper);
  color: var(--paper);
}
.btn.inverted:hover {
  box-shadow: 4px 4px 0 var(--b2);
}
.btn.inverted.solid {
  background: var(--paper);
  color: var(--ink);
}
</style>
