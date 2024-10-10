import { RefObject, useEffect, useState } from 'react'

export default function useOnScreen<T extends HTMLElement>(ref: RefObject<T>, rootMargin = '0px'): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin })
    observer.observe(ref.current)
    return () => {
      if (!ref.current) return
      observer.unobserve(ref.current)
    }
  }, [ref.current, rootMargin])

  return isVisible
}
