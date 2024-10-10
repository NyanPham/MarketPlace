import { useCallback, useState } from 'react'

export const useToggle = (initialState: boolean = false): [boolean, () => void, (shouldToggle: boolean) => void] => {
  const [state, setState] = useState<boolean>(initialState)
  const toggle = useCallback(() => setState((prevState) => !prevState), [])
  const set = useCallback((shouldToggle: boolean) => setState(shouldToggle), [])

  return [state, toggle, set]
}
