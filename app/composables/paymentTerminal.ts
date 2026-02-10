import type { Player } from '~/utils/types/player'

export const usePaymentTerminal = () => {
  const { opened, open: openModal, close, toggle } = useModal('payment-terminal')
  const bulk = useState<boolean>('payment-terminal-bulk', () => false)
  const selectedPlayer = useState<number | null>('payment-terminal-selected-player', () => null)

  const open = (asBulk: boolean, initPlayer: Player | null = null) => {
    if (!asBulk) {
      selectedPlayer.value = initPlayer?.id || null
    }
    openModal()
    bulk.value = asBulk
  }

  return {
    opened,
    bulk,
    selectedPlayer,
    open,
    close,
    toggle
  }
}
