<template>
  <u-modal
    v-model:open="opened"
    title="Money transfer terminal"
  >
    <template #body>
      <done-icon ref="doneRef" />
      <u-form
        v-if="!doneRef?.done"
        class="flex flex-col gap-4"
        @submit.prevent="submit"
      >
        <div class="flex items-center gap-4">
          <u-form-field
            label="From"
            class="flex-1"
          >
            <u-select
              v-model="transferFrom"
              :items="playersItems"
              class="w-full"
              placeholder="Select the player"
              required
            />
          </u-form-field>
          <u-icon
            name="i-lucide-move-right"
            size="20"
            class="mt-6"
          />
          <u-form-field
            label="To"
            class="flex-1"
          >
            <u-select
              v-model="transferTo"
              :items="playersItems"
              class="w-full"
              placeholder="Select the player"
              required
            />
          </u-form-field>
        </div>
        <amount-input v-model="amount" />
        <u-button
          type="submit"
          icon="i-lucide-credit-card"
          label="Transfer"
          color="success"
          variant="subtle"
          class="w-fit"
        />
      </u-form>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import type DoneIcon from '../DoneIcon.vue'

const { playersItems } = usePlayers()
const doneRef = ref<InstanceType<typeof DoneIcon> | null>(null)

const { opened, transferFrom, transferTo, amount, close: closeTransferTerminal, transfer } = useTransferTerminal()

const submit = () => {
  transfer()
  doneRef.value?.setState(true)
  closeTransferTerminal(1000)
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
