import type { Player } from '~/utils/types/player'

export const usePlayers = () => {
  const players: Ref<Player[]> = useState('players-state', () => [])

  const getPlayersFromLocalStorage = (): Player[] => {
    const lsPls: string = localStorage.getItem('players') || ''
    if (lsPls) {
      return JSON.parse(lsPls) as Player[]
    }
    return []
  }

  const setPlayersToLocalStorage = (players: Player[]) => {
    localStorage.setItem('players', JSON.stringify(players))
  }

  const getPlayerIndex = (targetPlayer: Player): number => {
    let c = 0
    let ind = -1
    players.value.forEach((p) => {
      if (p.id === targetPlayer.id) {
        ind = c
        return
      }
      c++
    })
    return ind
  }

  const updatePlayer = (player: Player, data: Partial<Player>): Player | undefined => {
    const ind: number = getPlayerIndex(player)
    if (players.value[ind]?.isBankrupt) {
      return
    }
    players.value[ind] = {
      ...player,
      ...data
    }
    setPlayersToLocalStorage(players.value)
    return players.value[ind]
  }

  const setPlayers = (pls: Player[]) => {
    setPlayersToLocalStorage(pls)
    players.value = pls
  }

  const getPlayerById = (id: number): Player => {
    let player: Player | null = null
    players.value.forEach((p) => {
      if (p.id === id) {
        player = p
        return
      }
    })
    if (player) {
      return player
    } else {
      throw new Error('Player not found')
    }
  }

  if (!players.value.length) {
    players.value = getPlayersFromLocalStorage()
  }

  return {
    players,
    setPlayers,
    getPlayersFromLocalStorage,
    setPlayersToLocalStorage,
    updatePlayer,
    getPlayerById
  }
}
