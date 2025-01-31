import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useBlockStore = defineStore('blockData', () => {
  const blockData = reactive({
    version: '0x20000000',
    prevBlock: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
    merkleRoot: '8e679c6bed7dc4a0c5e3c06f0ad5b190b71bd0b7c6824e61b0b34edfc7f2866b',
    time: new Date().toISOString(),
    bits: '0x1a44b9f2',
    targetDifficulty: 2
  })

  return { blockData }
}) 