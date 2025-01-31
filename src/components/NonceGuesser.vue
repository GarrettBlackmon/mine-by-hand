<template>
  <div>
    <InspirationMessage ref="inspiration" class="mt-4" />
    
    <div v-if="lastHash" class="bg-gray-800 p-6 rounded-lg">
      <div class="text-gray-400 mb-2">Last Hash:</div>
      <HashDisplay :hash="lastHash" :target-zeros="blockStore.blockData.targetDifficulty" ref="hashDisplay" />
    </div>

    <div class="mt-4 space-y-4">
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

    <div v-if="isDevMode" class="fixed bottom-4 left-4 space-y-1">
      <div class="space-y-0.5">
        <div class="text-xs text-gray-400">
          Attempts: {{ attemptCount }}
        </div>
        <div class="text-xs text-gray-400">
          Attempts/Sec: {{ Math.round(attemptRate) }}
        </div>
        <div class="text-xs text-gray-400">
          Best: {{ bestScore }} leading zeros
        </div>
      </div>
      <button 
        @click="toggleMining"
        :class="[
          'px-4 py-2 rounded text-sm transition w-40',
          isMining ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-700 hover:bg-yellow-800'
        ]"
      >
        {{ isMining ? '⛏️ Mining...' : '⛏️ Start Auto-Miner' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CryptoJS from 'crypto-js'
import HashDisplay from './HashDisplay.vue'
import InspirationMessage from './InspirationMessage.vue'
import { useBlockStore } from '../stores/blockData'

const blockStore = useBlockStore()

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
  const target = '0'.repeat(blockStore.blockData.targetDifficulty)
  isValid.value = hash.startsWith(target)
  
  // Calculate leading zeros directly
  const leadingZeros = (hash.match(/^0+/) || [''])[0].length
  lastLeadingZeros.value = Math.min(leadingZeros, blockStore.blockData.targetDifficulty)
  
  // Update best score
  if (lastLeadingZeros.value > bestScore.value) {
    bestScore.value = lastLeadingZeros.value
  }
  
  // Debug logging
  console.log(`Hash: ${hash}, Leading Zeros: ${leadingZeros}, Best: ${bestScore.value}, Valid: ${isValid.value}`)
  
  // Now check if we should stop
  if (isValid.value) {
    stopMining()
  }
  
  // Update store with current nonce
  blockStore.blockData.nonce = nonce.value
  
  inspiration.value.setRandomMessage(isValid.value)
  nonce.value = ''
}

const toggleMining = () => {
  if (!isMining.value) {
    startTime = Date.now()
    attemptCount.value = 0
    bestScore.value = 0
    isMining.value = true
    miningInterval = setInterval(() => {
      nonce.value = Math.floor(Math.random() * 1e12).toString()
      checkNonce()
      attemptCount.value++
      
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
  // Reset values after stopping
  setTimeout(() => {
    attemptCount.value = 0
    bestScore.value = 0
    attemptRate.value = 0
  }, 0)
}
</script> 