<template>
  <div class="space-y-6">
    <InspirationMessage ref="inspiration" />
    
    <div v-if="lastHash" class="bg-gray-800 p-6 rounded-lg">
      <div class="text-gray-400 mb-2">Last Hash:</div>
      <HashDisplay :hash="lastHash" :target-zeros="targetDifficulty" ref="hashDisplay" />
    </div>

    <div class="space-y-4">
      <div class="flex gap-4">
        <input 
          v-model="nonce"
          type="text"
          placeholder="Enter nonce (number)"
          class="flex-1 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="checkNonce"
        >
        <button 
          @click="checkNonce"
          class="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Guess
        </button>
      </div>

      <input 
        v-model="btcAddress"
        type="text"
        placeholder="Your BTC address (you'll need it if you get lucky!)"
        class="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >

      <button 
        :disabled="!isValid"
        :class="[
          'w-full py-3 rounded text-lg font-bold transition',
          isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 cursor-not-allowed'
        ]"
      >
        Submit Block
      </button>
    </div>

    <div v-if="isDevMode" class="text-center space-y-2">
      <button 
        @click="toggleMining"
        :class="[
          'px-4 py-2 rounded text-sm transition',
          isMining ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
        ]"
      >
        {{ isMining ? `⛏️ Mining (${attemptCount})...` : '⛏️ Start Auto-Miner' }}
      </button>
      <div class="text-xs text-gray-400">
        {{ Math.round(attemptRate) }} attempts/sec
        <br>
        Best: {{ bestScore }} leading zeros
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CryptoJS from 'crypto-js'
import HashDisplay from './HashDisplay.vue'
import InspirationMessage from './InspirationMessage.vue'

const props = defineProps({
  targetDifficulty: {
    type: Number,
    default: 4
  }
})

const nonce = ref('')
const btcAddress = ref('')
const lastHash = ref('')
const isValid = ref(false)
const inspiration = ref(null)
const isDevMode = ref(import.meta.env.MODE === 'development')
const isMining = ref(false)
const attemptCount = ref(0)
const attemptRate = ref(0)
const bestScore = ref(0)
const lastLeadingZeros = ref(0)
const hashDisplay = ref(null)
let miningInterval = null
let startTime = null

const checkNonce = () => {
  const blockHeader = '000000000000000000071d4bebb27a8fbb4c9e15730613' // simplified for demo
  const toHash = blockHeader + nonce.value
  const hash = CryptoJS.SHA256(CryptoJS.SHA256(toHash)).toString()
  
  lastHash.value = hash
  const target = '0'.repeat(props.targetDifficulty)
  isValid.value = hash.startsWith(target)
  
  inspiration.value.setRandomMessage(isValid.value)
  nonce.value = ''
  
  // Get leading zeros from HashDisplay
  lastLeadingZeros.value = hashDisplay.value.splitIndex
  if (lastLeadingZeros.value > bestScore.value) {
    bestScore.value = lastLeadingZeros.value
  }
}

const toggleMining = () => {
  if (!isMining.value) {
    startTime = Date.now()
    attemptCount.value = 0
    isMining.value = true
    miningInterval = setInterval(() => {
      nonce.value = Math.floor(Math.random() * 1e12).toString()
      checkNonce()
      attemptCount.value++
      
      // Stop mining if we found a valid block!
      if (isValid.value) {
        stopMining()
      }
      
      // Calculate attempts/sec
      const elapsed = (Date.now() - startTime) / 1000
      attemptRate.value = elapsed > 0 ? attemptCount.value / elapsed : 0
    }, 10)
  } else {
    stopMining()
  }
}

const stopMining = () => {
  clearInterval(miningInterval)
  isMining.value = false
  attemptRate.value = 0
}
</script> 