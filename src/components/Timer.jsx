import { useState, useEffect, useRef } from 'react'
import './Timer.css'

// ===========================================================
// Timer - a reusable countdown clock with a circular progress
// ring, used for both "work" and "rest" phases of an exercise.
//
// Props:
//   seconds    - how many seconds to count down from
//   label      - small text shown above the clock (e.g. "Work")
//   onComplete - called once, when the countdown reaches 0
//
// IMPORTANT: parents should give this component a unique
// `key` whenever a new phase starts (see ExerciseCard.jsx),
// so React creates a fresh Timer instead of reusing state from
// the previous phase.
// ===========================================================
export default function Timer({ seconds, label, onComplete }) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(true)

  // Keep the latest onComplete callback without re-running the
  // countdown effect every time the parent re-renders.
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!running) return

    if (remaining <= 0) {
      setRunning(false)
      onCompleteRef.current?.()
      return
    }

    const id = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(id)
  }, [running, remaining])

  const minutes = Math.floor(remaining / 60)
  const secs = remaining % 60
  const display = `${minutes}:${String(secs).padStart(2, '0')}`

  // How much of the ring should be filled in (0 - 100)
  const percent = seconds > 0 ? ((seconds - remaining) / seconds) * 100 : 100
  const circumference = 283 // 2 * PI * r, where r = 45

  return (
    <div className="timer">
      {label && <div className="timer-label">{label}</div>}

      <div className="timer-circle">
        <svg viewBox="0 0 100 100">
          <circle className="timer-bg" cx="50" cy="50" r="45" />
          <circle
            className="timer-progress"
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - (circumference * percent) / 100,
            }}
          />
        </svg>
        <div className="timer-time">{display}</div>
      </div>

      <div className="timer-controls">
        <button className="btn btn-outline btn-sm" onClick={() => setRunning((r) => !r)}>
          {running ? '⏸ Pause' : '▶ Resume'}
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => setRemaining(seconds)}>
          ↺ Reset
        </button>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => {
            setRemaining(0)
            setRunning(true) // make sure onComplete fires even if paused
          }}
        >
          Skip
        </button>
      </div>
    </div>
  )
}
