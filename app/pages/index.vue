<template>
  <div class="flex">
    <players-list v-if="playersStore.hasPlayers" />
    <starting-form
      v-else
      @submit="startTheGame"
    />
    <modals-payment-terminal />
    <modals-transfer-terminal />
    <modals-restart-game />
  </div>
</template>

<script setup lang="ts">
import PlayersList from '~/components/PlayersList.vue'
import StartingForm from '~/components/StartingForm.vue'
import type { Player, Players } from '~/utils/types/player'

const playersStore = usePlayersStore()

const startTheGame = (players: Player[]) => {
  let pls: Players = {}
  players.forEach((p: Player) => {
    pls = { ...pls, ...{ [p.id]: p } }
  })
  playersStore.setPlayers(pls)
}
</script>
