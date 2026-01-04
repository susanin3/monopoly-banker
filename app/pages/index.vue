<template>
  <div class="flex">
    <starting-form
      v-if="players.length === 0"
      @submit="startTheGame"
    />
    <players-list v-else />
  </div>
</template>

<script setup lang="ts">
import PlayersList from '~/components/PlayersList.vue'
import StartingForm from '~/components/StartingForm.vue'
import type { Player } from '~/utils/types/player'

const { players, setPlayers } = usePlayers()
// const players: Ref<Player[]> = ref([])

const startTheGame = (pls: Player[]) => {
  setPlayers(pls)
}
</script>
