export const useRestarter = () => {
  const { opened, open } = useModal('restart-modal')
  const askToRestart = () => {
    open()
  }
  return {
    opened,
    askToRestart
  }
}
