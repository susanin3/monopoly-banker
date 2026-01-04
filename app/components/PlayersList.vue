<template>
  <div class="flex flex-col items-center w-full px-4 gap-4">
    <tools-panel />
    <player-card
      v-for="player in players"
      :key="player.name"
      :player="player"
      class="max-w-xl"
    />
  </div>
</template>

<script setup lang="ts">
import PlayerCard from './PlayerCard.vue'

const { players } = usePlayers()
</script>

<style>

</style>
