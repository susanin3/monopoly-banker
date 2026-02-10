import type { SelectItem } from '@nuxt/ui'
import type { Player } from '~/utils/types/player'

export const usePlayers = () => {
  const playersStore = usePlayersStore()

  const playersItems = computed<SelectItem[]>(() => {
    const res: SelectItem[] = []
    Object.values(playersStore.players).forEach((p: Player) => res.push({
      label: p.name,
      value: p.id
    } as SelectItem))
    return res
  })

  return {
    playersItems
  }
}
