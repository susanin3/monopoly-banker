import type { Player, Players } from './types/player'

export const createPlayer = (name: string, color: string, balance: number): Player => {
  color = color || '#1073f2'
  return {
    id: Math.round(Math.random() * 10 ** 16),
    name,
    color,
    balance,
    isBankrupt: false
  }
}

export const validatePlayer = (player: Player): boolean => {
  // check that the name and color are filled
  return Boolean(player.name && !isNaN(player.balance))
}

export const validatePlayers = (players: Players): boolean => {
  // check that the players are valid and their names are unique
  const reservedNames: string[] = []
  let valid = true
  Object.values(players).forEach((p) => {
    if (reservedNames.includes(p.name) || !validatePlayer(p)) {
      valid = false
    }
    reservedNames.push(p.name)
  })
  return valid
}
