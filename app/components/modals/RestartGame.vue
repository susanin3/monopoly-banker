<template>
  <u-modal
    v-model:open="opened"
    title="Restart the game?"
  >
    <template #body>
      <div class="flex justify-center gap-4">
        <u-button
          color="success"
          label="No"
          @click="close"
        />
        <u-button
          color="error"
          label="Yes"
          @click="restart"
        />
      </div>
    </template>
  </u-modal>
</template>

<script setup>
const { opened } = useRestarter()
const { setPlayers } = usePlayers()

const restart = () => {
  setPlayers([])
}

const close = () => {
  opened.value = false
}
</script>
