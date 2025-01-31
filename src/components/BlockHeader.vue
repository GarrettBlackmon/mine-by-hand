<template>
  <div class="border border-gray-700 rounded-lg overflow-hidden">
    <!-- Human-readable section -->
    <div class="grid grid-cols-2 gap-4 p-0 bg-gray-800">
      <div class="space-y-2 p-4">
        <div>Version: <span class="text-blue-400">{{ blockStore.blockData.version }}</span></div>
        <div class="break-all">Previous Block: <span class="text-blue-400">{{ blockStore.blockData.prevBlock }}</span></div>
        <div>Bits: <span class="text-blue-400">{{ blockStore.blockData.bits }}</span></div>
      </div>
      <div class="space-y-2 p-4">
        <div>Time: <span class="text-blue-400">{{ blockStore.blockData.time }}</span></div>
        <div class="break-all">Merkle Root: <span class="text-blue-400">{{ blockStore.blockData.merkleRoot }}</span></div>
        <div>Target Difficulty: <span class="text-blue-400">{{ blockStore.blockData.targetDifficulty }} leading zeros</span></div>
      </div>
    </div>

    <!-- Raw data section -->
    <div class="border-t border-gray-700 bg-gray-900">
      <div class="p-4">
        <h3 class="text-sm font-mono text-gray-400 mb-2">Raw Block Header (Hex)</h3>
        <div class="font-mono text-sm text-gray-300 break-all">
          {{ blockStore.rawBlockHeader }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlockStore } from '../stores/blockData'

const blockStore = useBlockStore()

// Copy raw data to clipboard
const copyRawData = async () => {
  try {
    await navigator.clipboard.writeText(blockStore.rawBlockHeader)
    alert('Raw block header copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style>
/* Add custom font if needed */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
</style> 