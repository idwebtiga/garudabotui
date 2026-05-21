import { useState, useEffect } from 'react'

export function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)

    return () => {
      clearInterval(timer)
      setDisplayed('')
      setDone(false)
    }
  }, [text, speed])

  return { displayed, done }
}
