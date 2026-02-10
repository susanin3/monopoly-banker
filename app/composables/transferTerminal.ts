import type { Player } from '~/utils/types/player'

export const useTransferTerminal = () => {
  const { opened, open: openModal, close: closeModal } = useModal('transfer-terminal')
  const playersStore = usePlayersStore()

  const transferFrom = useState<number | null>('transfer-terminal-transfer-from', () => null)
  const transferTo = useState<number | null>('transfer-terminal-transfer-to', () => null)
  const amount = useState<number>('transfer-terminal-amount', () => 0)

  const transfer = () => {
    if (transferFrom.value && transferTo.value) {
      const playerFrom: Player = playersStore.getPlayerById(transferFrom.value)
      const playerTo: Player = playersStore.getPlayerById(transferTo.value)
      playersStore.updatePlayer(playerFrom, { balance: playerFrom.balance - amount.value })
      playersStore.updatePlayer(playerTo, { balance: playerTo.balance + amount.value })
    }
  }

  const open = (fromPlayer: Player | null, toPlayer: Player | null) => {
    openModal()
    transferFrom.value = fromPlayer?.id || null
    transferTo.value = toPlayer?.id || null
  }

  const close = (delay: number = 0) => {
    resetValues()
    closeModal(delay)
  }

  const resetValues = () => {
    transferFrom.value = null
    transferTo.value = null
  }

  return {
    opened,
    transferFrom,
    transferTo,
    amount,
    open,
    close,
    transfer
  }
}
