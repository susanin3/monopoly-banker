<template>
  <u-modal
    v-model:open="opened"
    title="Payment terminal"
  >
    <template #body>
      <done-icon ref="doneRef" />
      <u-form
        v-if="!doneRef?.done"
        class="flex flex-col gap-4"
        @submit.prevent
      >
        <u-form-field
          label="Player:"
          orientation="horizontal"
          class="justify-start"
        >
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
        </u-form-field>
        <amount-input v-model="transactionValue" />

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
      </u-form>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import type DoneIcon from '../DoneIcon.vue'

const toast = useToast()

const {
  opened,
  close: closePaymentTerminal,
  bulk,
  selectedPlayer
} = usePaymentTerminal()

const { playersItems } = usePlayers()

const playersStore = usePlayersStore()

const transactionValue = ref(0)
const doneRef = ref<InstanceType<typeof DoneIcon> | null>(null)

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
  doneRef.value?.setState(true)
  closePaymentTerminal(1000)
}

const open = () => {
  doneRef.value?.setState(false)
}

const close = () => {
  doneRef.value?.setState(false, 300)
}

watch(opened, () => {
  if (opened.value) {
    open()
  } else {
    close()
  }
})
</script>
