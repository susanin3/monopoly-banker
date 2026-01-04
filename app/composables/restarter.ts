export const useRestarter = () => {
  const opened = useState<boolean>('restart-modal-opened', () => false)
  const askToRestart = () => {
    opened.value = true
  }
  return {
    opened,
    askToRestart
  }
}
