<template>
  <div
    class="w-full bg-accented/60 rounded-md overflow-clip"
    :class="{ disabled: player.isBankrupt }"
  >
    <div class="w-full flex justify-between bg-accented/60 p-1.5 px-2">
      <div class="flex items-center gap-2 font-bold">
        <div
          class="rounded-full size-2"
          :style="{ background: player.color }"
        />
        {{ player.name }}
      </div>
      <div class="flex items-center gap-1">
        <u-icon name="tabler:coins" />
        {{ player.balance }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 p-2">
      <u-button
        color="success"
        icon="tabler:cash-banknote-plus"
        label="Add"
        variant="ghost"
        class="justify-center bg-accented"
        @click="openPT"
      />
      <u-button
        color="success"
        icon="tabler:cash-banknote-move-back"
        label="Receive"
        variant="ghost"
        class="justify-center bg-accented"
      />
      <u-button
        color="error"
        icon="tabler:cash-banknote-minus"
        label="Deduct"
        variant="ghost"
        class="justify-center bg-accented"
        @click="openPT"
      />
      <u-button
        color="error"
        icon="tabler:cash-banknote-move"
        label="Transfer"
        variant="ghost"
        class="justify-center bg-accented"
      />
      <u-button
        color="error"
        icon="i-lucide-skull"
        label="Bankrupt"
        variant="ghost"
        class="justify-center col-span-2"
        @click="bankrupt"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from '~/utils/types/player'

const { open: openPaymentTerminal } = usePaymentTerminal()

const playersStore = usePlayersStore()

const props = defineProps({
  player: {
    type: Object as () => Player,
    required: true
  }
})

const openPT = () => {
  openPaymentTerminal(false, props.player)
}

const bankrupt = () => {
  playersStore.updatePlayer(props.player, { isBankrupt: true })
}
</script>

<style scoped>
.disabled > * {
  opacity: 0.4;
  pointer-events: none;
}
</style>
