export const useModal = (key: string) => {
  const opened = useState<boolean>(`${key}-opened`, () => false)

  const open = () => {
    opened.value = true
  }

  const close = () => {
    opened.value = false
  }

  const toggle = () => {
    opened.value = !opened.value
  }

  return {
    opened,
    open,
    close,
    toggle
  }
}
