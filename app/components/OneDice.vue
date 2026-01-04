<template>
  <button
    class="dice"
    :class="{ rolling }"
  >
    <UIcon
      :name="diceIcons[current]"
      class="size-40"
    />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const diceIcons = [
  'i-lucide-dice-1',
  'i-lucide-dice-2',
  'i-lucide-dice-3',
  'i-lucide-dice-4',
  'i-lucide-dice-5',
  'i-lucide-dice-6'
]

const current = ref(0)
const rolling = ref(false)

let intervalId: number | null = null

function rollDice() {
  if (rolling.value) return

  rolling.value = true

  // Быстро меняем грани
  intervalId = window.setInterval(() => {
    current.value = Math.floor(Math.random() * 6)
  }, 100)

  // Останавливаем через 2 секунды
  setTimeout(() => {
    if (intervalId) clearInterval(intervalId)
    current.value = Math.floor(Math.random() * 6)
    rolling.value = false
  }, 2000)
}

defineExpose({ rollDice })
</script>

<style scoped>
.dice {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  transition: transform 0.2s;
}

.rolling {
  animation: roll 0.6s infinite ease;
}

@keyframes roll {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(90deg) scale(1.2); }
  50%  { transform: rotate(180deg) scale(0.9); }
  75%  { transform: rotate(270deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}
</style>
