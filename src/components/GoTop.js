'use client'

import { useState, useEffect } from 'react'

export default function GoTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a
      href="#top"
      className={`go-top ${isVisible ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToTop()
      }}
    >
      <ion-icon name="chevron-up-outline"></ion-icon>
    </a>
  )
}
