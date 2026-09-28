import { useEffect, useState } from 'react'
import { api } from './api'

/** Loads a public list from the API; keeps the built-in defaults if the API is offline or empty. */
export function useContent<T>(kind: string, fallback: T[]): T[] {
  const [items, setItems] = useState<T[]>(fallback)
  useEffect(() => {
    let alive = true
    api<T[]>(`/${kind}`)
      .then((d) => { if (alive && Array.isArray(d) && d.length) setItems(d) })
      .catch(() => {})
    return () => { alive = false }
  }, [kind])
  return items
}

export function useScrolled(offset = 60) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}
