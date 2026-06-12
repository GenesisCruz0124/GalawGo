import { useState } from 'react'
import Timer from './Timer'
import './ExerciseCard.css'

// ===========================================================
// ExerciseCard - shows one exercise (e.g. "Push-Ups") and
// walks the user through it set by set using <Timer>.
//
// Props:
//   exercise   - one exercise object from data/workoutPlan.js
//   completed  - true if this exercise is already marked done
//                for today (controlled by the Workout page)
//   onComplete - called once all sets are finished
// ===========================================================
export default function ExerciseCard({ exercise, completed, onComplete }) {
  const [expanded, setExpanded] = useState(false)
  // phase: 'idle' (not started) | 'work' (doing the exercise) | 'rest'
  const [phase, setPhase] = useState('idle')
  const [setIndex, setSetIndex] = useState(0) // 0-based current set

  const isTimeBased = exercise.type === 'time'
  const totalSets = exercise.sets
  const isLastSet = setIndex >= totalSets - 1

  // Called when the "work" portion of a set finishes
  // (either the work timer hits 0, or the user taps "Done with set")
  function handleWorkDone() {
    if (isLastSet) {
      // Finished the whole exercise!
      setPhase('idle')
      setSetIndex(0)
      onComplete(exercise.id)
      return
    }

    if (exercise.rest > 0) {
      setPhase('rest')
    } else {
      setSetIndex((i) => i + 1)
      setPhase('work')
    }
  }

  // Called when the rest timer between sets finishes
  function handleRestDone() {
    setSetIndex((i) => i + 1)
    setPhase('work')
  }

  function startExercise() {
    setSetIndex(0)
    setPhase('work')
    setExpanded(true)
  }

  // The little "3 x 12 reps" or "3 x 30s" summary badge
  const summary = isTimeBased
    ? `${exercise.sets} x ${exercise.duration}s`
    : `${exercise.sets} x ${exercise.reps} reps`

  return (
    <div className={`exercise-card ${completed ? 'is-completed' : ''}`}>
      <button className="exercise-header" onClick={() => setExpanded((e) => !e)}>
        <div className="exercise-title">
          <span className="exercise-check">{completed ? '✅' : '⬜'}</span>
          <span className="exercise-name">{exercise.name}</span>
        </div>
        <div className="exercise-summary">
          <span className="badge">{summary}</span>
          <span className="exercise-caret">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {expanded && (
        <div className="exercise-body">
          <p className="exercise-instructions">{exercise.instructions}</p>

          {phase === 'idle' && (
            <button className="btn btn-primary" onClick={startExercise}>
              {completed ? 'Do It Again 🔁' : 'Start Exercise ▶'}
            </button>
          )}

          {phase === 'work' && isTimeBased && (
            <Timer
              key={`work-${setIndex}`}
              seconds={exercise.duration}
              label={`Set ${setIndex + 1} of ${totalSets} · Work`}
              onComplete={handleWorkDone}
            />
          )}

          {phase === 'work' && !isTimeBased && (
            <div className="exercise-reps">
              <div className="exercise-reps-label">
                Set {setIndex + 1} of {totalSets}
              </div>
              <div className="exercise-reps-count">{exercise.reps} reps</div>
              <button className="btn btn-primary" onClick={handleWorkDone}>
                Done with Set ✓
              </button>
            </div>
          )}

          {phase === 'rest' && (
            <Timer
              key={`rest-${setIndex}`}
              seconds={exercise.rest}
              label={`Set ${setIndex + 1} of ${totalSets} · Rest`}
              onComplete={handleRestDone}
            />
          )}
        </div>
      )}
    </div>
  )
}
