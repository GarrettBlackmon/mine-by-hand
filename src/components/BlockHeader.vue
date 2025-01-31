<template>
  <div class="border border-gray-700 rounded-lg overflow-hidden">
    <!-- Human-readable section -->
    <div class="grid grid-cols-2 gap-4 p-0 bg-gray-800">
      <div class="space-y-2 p-4">
        <div>Version: 
          <span 
            class="text-pink-200 font-mono hover:bg-pink-400/30 px-1 rounded transition-colors cursor-help"
            @mouseover="highlight('version')"
            @mouseleave="unhighlight()"
            title="Hover to highlight in raw header"
          >{{ blockStore.blockData.version }}</span>
          <span class="text-gray-500 text-xs ml-2 italic">(Version 2)</span>
        </div>
        <div class="break-all">Previous Block: 
          <span 
            class="text-blue-200 font-mono hover:bg-blue-400/30 px-1 rounded transition-colors cursor-help"
            @mouseover="highlight('prevBlock')"
            @mouseleave="unhighlight()"
            title="Hover to highlight in raw header"
          >{{ blockStore.blockData.prevBlock }}</span>
        </div>
        <div>
          Bits: 
          <span 
            class="text-green-200 font-mono hover:bg-green-400/30 px-1 rounded transition-colors cursor-help"
            @mouseover="highlight('bits')"
            @mouseleave="unhighlight()"
            title="Hover to highlight in raw header"
          >{{ blockStore.blockData.bits }}</span>
          <span class="text-gray-500 text-xs ml-2 italic">({{ blockStore.blockData.targetDifficulty }} leading zeros)</span>
        </div>
      </div>
      <div class="space-y-2 p-4">
        <div>Time: 
          <span 
            class="text-yellow-200 font-mono hover:bg-yellow-400/30 px-1 rounded transition-colors cursor-help"
            @mouseover="highlight('timestamp')"
            @mouseleave="unhighlight()"
            title="Hover to highlight in raw header"
          >{{ blockStore.blockData.time.toString(16).padStart(8, '0') }}</span>
          <span class="text-gray-500 text-xs ml-2 italic">({{ new Date(blockStore.blockData.time * 1000).toLocaleString() }})</span>
        </div>
        <div class="break-all">Merkle Root: 
          <span 
            class="text-purple-200 font-mono hover:bg-purple-400/30 px-1 rounded transition-colors cursor-help"
            @mouseover="highlight('merkleRoot')"
            @mouseleave="unhighlight()"
            title="Hover to highlight in raw header"
          >{{ blockStore.blockData.merkleRoot }}</span>
        </div>
        <div>Nonce: 
          <span 
            class="text-red-200 font-mono hover:bg-red-400/30 px-1 rounded transition-colors cursor-help"
            @mouseover="highlight('nonce')"
            @mouseleave="unhighlight()"
            title="Hover to highlight in raw header"
          >{{ blockStore.blockData.nonce ? parseInt(blockStore.blockData.nonce).toString(16).padStart(8, '0') : '00000000' }}</span>
          <span class="text-gray-500 text-xs ml-2 italic">({{ blockStore.blockData.nonce ? blockStore.blockData.nonce : "That's where you come in, bud." }})</span>
        </div>
      </div>
    </div>

    <!-- Raw data section -->
    <div class="border-t border-gray-700 bg-gray-900">
      <div class="p-4">
        <h3 class="text-sm font-mono text-gray-400 mb-2">Raw Block Header (Hex)</h3>
        <div class="font-mono text-sm text-gray-300 break-all">
          <span :class="['px-1', highlightedPart === 'version' ? 'bg-pink-400/50' : 'bg-pink-400/10']">{{ rawHeaderParts.version }}</span>
          <span :class="['px-1', highlightedPart === 'prevBlock' ? 'bg-blue-400/50' : 'bg-blue-400/10']">{{ rawHeaderParts.prevBlock }}</span>
          <span :class="['px-1', highlightedPart === 'merkleRoot' ? 'bg-purple-400/50' : 'bg-purple-400/10']">{{ rawHeaderParts.merkleRoot }}</span>
          <span :class="['px-1', highlightedPart === 'timestamp' ? 'bg-yellow-400/50' : 'bg-yellow-400/10']">{{ rawHeaderParts.timestamp }}</span>
          <span :class="['px-1', highlightedPart === 'bits' ? 'bg-green-400/50' : 'bg-green-400/10']">{{ rawHeaderParts.bits }}</span>
          <span :class="['px-1', highlightedPart === 'nonce' ? 'bg-red-400/50' : 'bg-red-400/10']">{{ rawHeaderParts.nonce }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlockStore } from '../stores/blockData'
import { computed, ref } from 'vue'

const blockStore = useBlockStore()
const highlightedPart = ref(null)

const rawHeaderParts = computed(() => {
  const raw = blockStore.rawBlockHeader
  return {
    version: raw.slice(0, 8),
    prevBlock: raw.slice(8, 72),
    merkleRoot: raw.slice(72, 136),
    timestamp: raw.slice(136, 144),
    bits: raw.slice(144, 152),
    nonce: raw.slice(152, 160)
  }
})

const highlight = (part) => {
  highlightedPart.value = part
}

const unhighlight = () => {
  highlightedPart.value = null
}
</script>

<style>
/* Add custom font if needed */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
</style> 