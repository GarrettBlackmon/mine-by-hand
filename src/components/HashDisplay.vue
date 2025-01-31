<template>
  <div class="font-mono text-lg break-all">
    <template v-for="(char, index) in hash" :key="index">
      <span 
        v-if="index < splitIndex" 
        class="text-hash-green"
      >{{ char }}</span>
      <span 
        v-else-if="index < targetZeros" 
        class="text-hash-red"
      >{{ char }}</span>
      <span v-else>{{ char }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  hash: String,
  targetZeros: Number
})

// Find where the leading zeros end
const splitIndex = computed(() => {
  if (!props.hash) return 0
  let i = 0
  while (i < props.hash.length && props.hash[i] === '0' && i < props.targetZeros) {
    i++
  }
  return i
})

// Add this to expose the split index
defineExpose({
  splitIndex
})
</script> 