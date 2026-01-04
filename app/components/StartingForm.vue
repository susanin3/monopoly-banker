<template>
  <form
    class="w-full h-full flex flex-col items-center gap-2"
    @submit.prevent="submit"
  >
    <div
      v-for="player, index in players"
      :key="player.id"
      class="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 p-2 px-4 rounded-md"
    >
      <span class="text-dimmed">
        {{ index + 1 }}
      </span>
      <u-input
        v-model="player.name"
        placeholder="Name *"
        :class="`${!player.name ? 'ring-error' : ''}`"
        :required="true"
        autofocus
      />
      <u-popover>
        <u-button
          color="neutral"
          variant="link"
          class="p-0 cursor-pointer"
        >
          <template #leading>
            <span
              :style="{ backgroundColor: player.color }"
              class="size-4 rounded-full"
            />
          </template>
        </u-button>

        <template #content>
          <u-color-picker
            v-model="player.color"
            class="p-2"
          />
        </template>
      </u-popover>
      <u-button
        icon="i-lucide-x"
        color="error"
        variant="link"
        class="p-0"
        @click="removePlayer(index)"
      />
    </div>

    <div class="w-full flex justify-center gap-2">
      <u-button
        v-if="players.length < 4"
        icon="i-lucide-plus"
        variant="link"
        color="neutral"
        @click="addPlayer"
      >
        Add player
      </u-button>
      <u-button
        :disabled="players.length === 0"
        icon="i-lucide-swords"
        variant="subtle"
        color="success"
        type="submit"
      >
        Start game
      </u-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { createPlayer } from '~/utils/player'
import type { Player } from '~/utils/types/player'

const toast = useToast()

const emit = defineEmits(['submit'])

const players: Ref<Player[]> = ref([])

const addPlayer = () => {
  players.value.push(createPlayer('', '', 0))
}

const removePlayer = (index: number) => {
  players.value.splice(index, 1)
}

const submit = () => {
  if (!validatePlayers(players.value)) {
    toast.add({
      title: 'Players validation error',
      description: 'Check that names are unique',
      icon: 'i-lucide-triangle-alert',
      color: 'error'
    })
  } else {
    emit('submit', players.value)
  }
}
</script>

<style scoped></style>
