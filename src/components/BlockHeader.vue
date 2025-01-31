<template>
  <div class="bg-gray-800 p-6 rounded-lg mb-8 font-mono text-sm">
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <div>Version: <span class="text-blue-400">{{ blockStore.blockData.version }}</span></div>
        <div class="break-all">Previous Block: <span class="text-blue-400">{{ blockStore.blockData.prevBlock }}</span></div>
        <div class="break-all">Merkle Root: <span class="text-blue-400">{{ blockStore.blockData.merkleRoot }}</span></div>
      </div>
      <div class="space-y-2">
        <div>Time: <span class="text-blue-400">{{ blockStore.blockData.time }}</span></div>
        <div>Bits: <span class="text-blue-400">{{ blockStore.blockData.bits }}</span></div>
        <div>Target Difficulty: <span class="text-blue-400">{{ blockStore.blockData.targetDifficulty }} leading zeros</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlockStore } from '../stores/blockData'
const blockStore = useBlockStore()
</script> 