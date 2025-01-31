import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBlockStore = defineStore('blockData', () => {
  const blockData = ref({
    version: '0x20000000',
    prevBlock: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
    merkleRoot: '8e679c6bed7dc4a0c5e3c06f0ad5b190b71bd0b7c6824e61b0b34edfc7f2866b',
    time: new Date().toISOString(),
    bits: '0x1a44b9f2',
    targetDifficulty: 2,
  })

  const rawBlockHeader = computed(() => {
    const data = blockData.value
    return [
      data.version,
      data.prevBlock,
      data.merkleRoot,
      new Date(data.time).getTime().toString(16),
      data.bits,
      data.targetDifficulty.toString(16)
    ].join('')
  })

  return { blockData, rawBlockHeader }
}) 