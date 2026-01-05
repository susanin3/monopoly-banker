import { defineStore } from 'pinia'
import type { Player, Players } from '~/utils/types/player'

export const usePlayersStore = defineStore('Players', () => {
  const getPlayersFromLocalStorage = (): Players => {
    const lsPls: string = localStorage.getItem('players') || ''
    if (lsPls) {
      return JSON.parse(lsPls) as Players
    }
    return {}
  }

  const setPlayersToLocalStorage = (players: Players) => {
    localStorage.setItem('players', JSON.stringify(players))
  }

  const updatePlayer = (player: Player, data: Partial<Player>): Player | undefined => {
    if (players.value[player.id]?.isBankrupt) {
      return
    }
    players.value[player.id] = {
      ...player,
      ...data
    }
    setPlayersToLocalStorage(players.value)
    return players.value[player.id]
  }

  const setPlayers = (pls: Players) => {
    setPlayersToLocalStorage(pls)
    players.value = pls
  }

  const getPlayerById = (id: number): Player => {
    const player: Player | undefined = players.value[id]
    if (player) {
      return player
    } else {
      throw new Error('Player not found')
    }
  }

  const players: Ref<Players> = ref(getPlayersFromLocalStorage())

  const hasPlayers = computed(() => Object.keys(players.value).length !== 0)

  return {
    players,
    setPlayers,
    getPlayersFromLocalStorage,
    setPlayersToLocalStorage,
    updatePlayer,
    getPlayerById,
    hasPlayers
  }
})
