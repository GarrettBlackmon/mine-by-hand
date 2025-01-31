<template>
  <div class="min-h-screen p-8 bg-gray-900 text-white flex flex-col relative">
    <header class="max-w-3xl mx-auto text-center mb-8">
      <h1 class="text-4xl font-bold mb-2">Mine By Hand</h1>
      <p class="text-gray-400">Because who needs ASICs when you have fingers?</p>
    </header>
    
    <main class="max-w-3xl mx-auto flex-1">
      <BlockHeader />
      <NonceGuesser />
    </main>

    <footer class="max-w-3xl mx-auto text-center absolute bottom-0 left-0 right-0  text-gray-400 text-sm">
      Made with 🍺 by someone who should know better
    </footer>
  </div>
</template>

<script setup>
import BlockHeader from './components/BlockHeader.vue'
import NonceGuesser from './components/NonceGuesser.vue'
</script> 