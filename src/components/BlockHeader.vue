<template>
  <div class="bg-gray-800 p-6 rounded-lg mb-8 font-mono text-sm">
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <div>Version: <span class="text-blue-400">{{ blockData.version }}</span></div>
        <div class="break-all">Previous Block: <span class="text-blue-400">{{ blockData.prevBlock }}</span></div>
        <div class="break-all">Merkle Root: <span class="text-blue-400">{{ blockData.merkleRoot }}</span></div>
      </div>
      <div class="space-y-2">
        <div>Time: <span class="text-blue-400">{{ blockData.time }}</span></div>
        <div>Bits: <span class="text-blue-400">{{ blockData.bits }}</span></div>
        <div>Target Difficulty: <span class="text-blue-400">{{ blockData.targetDifficulty }} leading zeros</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// In real life we'd fetch this, but let's keep it simple for now
const blockData = reactive({
  version: '0x20000000',
  prevBlock: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
  merkleRoot: '8e679c6bed7dc4a0c5e3c06f0ad5b190b71bd0b7c6824e61b0b34edfc7f2866b',
  time: new Date().toISOString(),
  bits: '0x1a44b9f2',
  targetDifficulty: 2, // We'll keep this low for the demo
})

defineProps({
  blockData: {
    type: Object,
    required: true
  }
})
</script> 