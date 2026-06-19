'use client'

import { useState, useEffect, Fragment } from 'react'

// Update this date to your actual launch date
const LAUNCH_DATE = new Date('2026-12-31T23:59:59')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null

  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 &&
    timeLeft.minutes === 0 && timeLeft.seconds === 0

  if (isLaunched) {
    return <p className="launched-text">We&apos;re live.</p>
  }

  const units = [
    { label: 'Days', value: pad(timeLeft.days) },
    { label: 'Hrs', value: pad(timeLeft.hours) },
    { label: 'Min', value: pad(timeLeft.minutes) },
    { label: 'Sec', value: pad(timeLeft.seconds) },
  ]

  return (
    <div className="countdown">
      {units.map(({ label, value }, i) => (
        <Fragment key={label}>
          <div className="countdown-unit">
            <span className="countdown-number">{value}</span>
            <span className="countdown-label">{label}</span>
          </div>
          {i < units.length - 1 && (
            <span className="countdown-sep" aria-hidden>:</span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
