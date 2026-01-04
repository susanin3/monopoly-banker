import type { Player } from '~/utils/types/player'

export const usePaymentTerminal = () => {
  const opened = useState<boolean>('payment-terminal-opened', () => false)
  const bulk = useState<boolean>('payment-terminal-bulk', () => false)
  const selectedPlayer = useState<number | null>('payment-terminal-selected-player', () => null)

  const open = (asBulk: boolean, initPlayer: Player | null = null) => {
    if (!asBulk) {
      selectedPlayer.value = initPlayer?.id || null
    }
    opened.value = true
    bulk.value = asBulk
  }

  const close = () => {
    opened.value = false
  }

  const toggle = () => {
    opened.value = !opened.value
  }

  return {
    open,
    close,
    toggle,
    opened,
    bulk,
    selectedPlayer
  }
}
