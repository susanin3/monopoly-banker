<template>
  <u-modal v-model:open="opened">
    <template #body>
      <div
        class="flex justify-center flex-col sm:flex-row overflow-clip"
        @click="rollDice"
      >
        <one-dice ref="dice1Ref" />
        <one-dice ref="dice2Ref" />
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import OneDice from '../OneDice.vue'

const dice1Ref = ref<InstanceType<typeof OneDice> | null>(null)
const dice2Ref = ref<InstanceType<typeof OneDice> | null>(null)
const opened = ref(false)

const rollDice = () => {
  dice1Ref.value?.rollDice()
  dice2Ref.value?.rollDice()
}

const open = () => {
  opened.value = true
}

defineExpose({ open, opened })
</script>
