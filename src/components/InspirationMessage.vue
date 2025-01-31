<template>
  <div class="text-base text-center text-gray-400 font-mono">
    {{ currentMessage }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = [
  "Mining... slowly but surely",
  "Your CPU is working hard. Probably.",
  "This is definitely the most efficient way to mine",
  "Only a few million more attempts to go",
  "ASICs? Never heard of them",
  "Your electricity company thanks you",
  "Satoshi would be proud. Maybe.",
  "Have you tried turning it off and on again?",
  "This is fine. Everything is fine.",
  "Mining at the speed of... well, JavaScript",
  "Proof of Work? More like Proof of Waiting",
  "At least it's not Proof of Stake",
  "Your patience is... admirable",
  "This is what decentralization looks like",
  "Mining: the original blockchain game",
  "Your nonce is in another castle",
  "This is the future of finance",
  "Your hash rate is... something",
  "Mining: because why not?",
  "This is definitely not a waste of energy"
]

const currentMessage = ref(messages[0])

defineExpose({
  setRandomMessage: (isValid) => {
    const newMessage = isValid 
      ? "Congratulations. You did it. Now do it 143 more times."
      : messages[Math.floor(Math.random() * messages.length)]
    currentMessage.value = newMessage
  }
})
</script> 