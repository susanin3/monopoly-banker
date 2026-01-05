<template>
  <u-modal
    v-model:open="opened"
    title="Payment terminal"
  >
    <template #body>
      <div
        v-if="done"
        class="flex items-center justify-center"
      >
        <u-icon
          name="line-md:confirm"
          class="size-25 text-success"
        />
      </div>
      <form
        v-else
        class="flex flex-col gap-4"
        @submit.prevent
      >
        <div class="flex items-center">
          <div class="w-18">
            Player:
          </div>
          <div v-if="bulk">
            everyone
          </div>
          <u-select
            v-else
            v-model="selectedPlayer"
            :items="playersItems"
            placeholder="Select the player"
            required
          />
        </div>
        <div class="flex">
          <div class="w-18">
            Amount:
          </div>
          <u-input-number
            v-model="transactionValue"
            :min="0"
            :increment="false"
            :decrement="false"
            placeholder="Enter a value"
            orientation="vertical"
            required
          />
          <u-button
            color="neutral"
            icon="i-lucide-x"
            variant="link"
            class="justify-center"
            @click="transactionValue = 0"
          />
        </div>
        <div class="flex flex-wrap gap-1">
          <u-button
            v-for="preset in transactionValuePresets"
            :key="preset.value"
            color="neutral"
            variant="outline"
            class="justify-center"
            :label="preset.label"
            @click="transactionValue = preset.value"
          />
        </div>

        <div class="flex gap-4">
          <u-button
            color="success"
            icon="i-lucide-plus"
            label="Add"
            variant="subtle"
            class="justify-center"
            type="submit"
            @click="submit(1)"
          />
          <u-button
            color="error"
            icon="i-lucide-minus"
            label="Deduct"
            variant="subtle"
            class="justify-center"
            type="submit"
            @click="submit(-1)"
          />
        </div>
      </form>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import type { Player } from '~/utils/types/player'

const toast = useToast()

const {
  opened,
  close: closePaymentTerminal,
  bulk,
  selectedPlayer
} = usePaymentTerminal()

const transactionValue = ref(0)
const done = ref(false)

const transactionValuePresets = [
  { label: '1K', value: 1_000 },
  { label: '5K', value: 5_000 },
  { label: '10K', value: 10_000 },
  { label: '20K', value: 20_000 },
  { label: '50K', value: 50_000 },
  { label: '100K', value: 100_000 },
  { label: '500K', value: 500_000 },
  { label: '1M', value: 1_000_000 },
  { label: '2M', value: 2_000_000 }
] as const

const playersStore = usePlayersStore()

const playersItems = computed<SelectItem[]>(() => {
  const res: SelectItem[] = []
  Object.values(playersStore.players).forEach((p: Player) => res.push({
    label: p.name,
    value: p.id
  } as SelectItem))
  return res
})

const submit = (mul: number) => {
  const val = transactionValue.value * mul
  if (bulk.value) {
    Object.values(playersStore.players).forEach((p) => {
      playersStore.updatePlayer(p, { balance: p.balance + val })
    })
  } else {
    try {
      if (selectedPlayer.value) {
        const p = playersStore.getPlayerById(selectedPlayer.value)
        playersStore.updatePlayer(p, { balance: p.balance + val })
      }
    } catch {
      toast.add({
        title: 'Something went wrong. Try again.'
      })
    }
  }
  done.value = true
  setTimeout(() => {
    closePaymentTerminal()
  }, 1000)
}

const open = () => {
  done.value = false
}

const close = () => {
  setTimeout(() => done.value = false, 300)
}

watch(opened, () => {
  if (opened.value) {
    open()
  } else {
    close()
  }
})

// watch(() => paymentTerminalSelectedPlayer.value?.id, () => {
//   if (paymentTerminalSelectedPlayer.value) {
//     selectedPlayer.value = paymentTerminalSelectedPlayer.value.id
//   }
// })
</script>

<style>

</style>
