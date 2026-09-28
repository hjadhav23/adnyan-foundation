import { useEffect, useRef, useState } from 'react'

export default function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return }
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1800, 1)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  return (
    <div ref={ref} className="stat">
      <div className="stat-num">{n.toLocaleString('en-IN')}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
