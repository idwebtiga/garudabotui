import { useEffect, useRef, useState, useCallback } from 'react'

export function useDragScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
  totalPages: number,
) {
  const [currentPage, setCurrentPage] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)

  const updatePage = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const page = Math.round(el.scrollLeft / el.clientWidth)
    setCurrentPage(Math.min(page, totalPages - 1))
  }, [containerRef, totalPages])

  const snap = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const page = Math.round(el.scrollLeft / el.clientWidth)
    const clamped = Math.max(0, Math.min(page, totalPages - 1))
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    setCurrentPage(clamped)
  }, [containerRef, totalPages])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      isDragging.current = true
      startX.current = e.clientX
      startScrollLeft.current = el.scrollLeft
      el.style.cursor = 'grabbing'
      el.style.userSelect = 'none'
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      const dx = e.clientX - startX.current
      el.scrollLeft = startScrollLeft.current - dx
    }

    const onMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      el.style.cursor = ''
      el.style.userSelect = ''
      snap()
    }

    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [containerRef, snap])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('scroll', updatePage, { passive: true })
    return () => el.removeEventListener('scroll', updatePage)
  }, [containerRef, updatePage])

  const scrollToPage = useCallback((index: number) => {
    const el = containerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(index, totalPages - 1))
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    setCurrentPage(clamped)
  }, [containerRef, totalPages])

  return { currentPage, scrollToPage }
}
