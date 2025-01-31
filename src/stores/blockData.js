import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBlockStore = defineStore('blockData', () => {
  const blockData = ref({
    version: '20000000',
    prevBlock: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
    merkleRoot: '8e679c6bed7dc4a0c5e3c06f0ad5b190b71bd0b7c6824e61b0b34edfc7f2866b',
    time: 1738306916,
    bits: '1a44b9f2',
    targetDifficulty: 4,
    nonce: ''
  })

  const rawBlockHeader = computed(() => {
    const data = blockData.value
    return [
      data.version,
      data.prevBlock,
      data.merkleRoot,
      data.time.toString(16).padStart(8, '0'),
      data.bits,
      parseInt(data.nonce || 0).toString(16).padStart(8, '0')
    ].map(field => field.toLowerCase()).join('')
  })

  return { blockData, rawBlockHeader }
}) 