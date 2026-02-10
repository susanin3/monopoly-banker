export const useModal = (key: string) => {
  const opened = useState<boolean>(`${key}-opened`, () => false)

  const open = () => {
    opened.value = true
  }

  const close = (delay: number = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        opened.value = false
      }, delay)
    } else {
      opened.value = false
    }
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
