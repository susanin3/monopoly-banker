<template>
  <div class="flex gap-2">
    <u-button
      color="neutral"
      icon="i-lucide-banknote"
      label="Bulk transaction"
      variant="ghost"
      class="justify-center bg-accented/30"
      @click="openPaymentTerminal(true)"
    />
    <u-button
      color="neutral"
      icon="i-lucide-dices"
      variant="link"
      class="justify-center bg-accented/30"
      @click="openDice"
    />
    <u-button
      color="neutral"
      icon="i-lucide-rotate-ccw"
      variant="link"
      class="justify-center bg-accented/30"
      @click="restart"
    />
    <modals-payment-terminal />
    <modals-restart-game />
    <modals-dice-throwing ref="diceRef" />
  </div>
</template>

<script setup lang="ts">
import type DiceThrowing from './modals/DiceThrowing.vue'

const { open: openPaymentTerminal } = usePaymentTerminal()
const { askToRestart } = useRestarter()
const diceRef = ref<InstanceType<typeof DiceThrowing> | null>(null)

const restart = () => {
  askToRestart()
}

const openDice = () => {
  diceRef.value?.open()
}
</script>
