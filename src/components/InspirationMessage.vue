<template>
  <div class="text-xl text-center my-6 h-12 text-yellow-400">
    {{ currentMessage }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messages = [
  "Your CPU is crying right now",
  "Only a few trillion more combinations to try!",
  "An ASIC miner just found 50 blocks while you typed that",
  "Maybe try using your lucky numbers?",
  "Pro tip: Yelling at your screen won't help",
  "Your electricity bill thanks you",
  "Somewhere, Satoshi is laughing",
  "Have you tried turning it off and on again?",
  "Maybe try u...HOLD UP... IS THAT A BLOCK?",
]

const currentMessage = ref(messages[0])

defineExpose({
  setRandomMessage: (isValid) => {
    const newMessage = isValid 
      ? messages[messages.length - 1] 
      : messages[Math.floor(Math.random() * (messages.length - 1))]
    currentMessage.value = newMessage
  }
})

onMounted(() => {
  currentMessage.value = messages[Math.floor(Math.random() * messages.length)]
})
</script> 