<template>
  <div class="min-h-screen p-8 bg-gray-900 text-white">
    <header class="max-w-3xl mx-auto text-center mb-8">
      <h1 class="text-4xl font-bold mb-2">Mine By Hand</h1>
      <p class="text-gray-400">Because who needs ASICs when you have fingers?</p>
    </header>
    
    <main class="max-w-3xl mx-auto">
      <BlockHeader :block-data="blockData" />
      <NonceGuesser :target-difficulty="blockData.targetDifficulty" />
    </main>

    <footer class="max-w-3xl mx-auto text-center mt-8 text-gray-400 text-sm">
      Made with 🍺 by someone who should know better
    </footer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import BlockHeader from './components/BlockHeader.vue'
import NonceGuesser from './components/NonceGuesser.vue'

const blockData = reactive({
  version: '0x20000000',
  prevBlock: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
  merkleRoot: '8e679c6bed7dc4a0c5e3c06f0ad5b190b71bd0b7c6824e61b0b34edfc7f2866b',
  time: new Date().toISOString(),
  bits: '0x1a44b9f2',
  targetDifficulty: 2,
})
</script> 