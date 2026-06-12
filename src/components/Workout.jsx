import { useState, useEffect } from 'react'
import { workoutPlan } from '../data/workoutPlan'
import ExerciseCard from './ExerciseCard'
import {
  getTodayKey,
  isWorkoutCompleted,
  markWorkoutComplete,
  getWorkoutStreak,
  getTotalWorkoutsCompleted,
} from '../utils/storage'
import './Workout.css'

// ===========================================================
// Workout - the 7-day no-equipment program.
//
// The user picks a day (Day 1-7), works through each
// exercise with <ExerciseCard>, then taps "Mark Day Complete"
// to log it for today and update their streak.
// ===========================================================
export default function Workout() {
  const todayKey = getTodayKey()

  // Suggest the next day in the cycle based on total workouts done so far
  // (e.g. 9 workouts completed -> 9 % 7 = 2 -> suggest Day 3)
  const [selectedDay, setSelectedDay] = useState(() => {
    const total = getTotalWorkoutsCompleted()
    return (total % 7) + 1
  })

  // Which exercises (by id) the user has finished in this session
  const [completedIds, setCompletedIds] = useState([])
  const [doneToday, setDoneToday] = useState(() => isWorkoutCompleted(todayKey))
  const [streak, setStreak] = useState(() => getWorkoutStreak())

  const dayPlan = workoutPlan.find((d) => d.day === selectedDay)

  // Start with a fresh checklist whenever the user switches days
  useEffect(() => {
    setCompletedIds([])
  }, [selectedDay])

  function handleExerciseComplete(exerciseId) {
    setCompletedIds((prev) =>
      prev.includes(exerciseId) ? prev : [...prev, exerciseId]
    )
  }

  function handleMarkDayComplete() {
    markWorkoutComplete(todayKey, selectedDay)
    setDoneToday(true)
    setStreak(getWorkoutStreak())
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Workout</h1>
        <div className="home-streak">
          <span className="home-streak-number">🔥 {streak}</span>
          <span className="home-streak-label">day streak</span>
        </div>
      </div>

      {/* Day 1 - Day 7 picker */}
      <div className="day-selector">
        {workoutPlan.map((d) => (
          <button
            key={d.day}
            className={`day-pill ${selectedDay === d.day ? 'active' : ''}`}
            onClick={() => setSelectedDay(d.day)}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      <div className="card workout-day-header">
        <h2>{dayPlan.title}</h2>
        <p>
          {dayPlan.exercises.length} exercises · {completedIds.length}/
          {dayPlan.exercises.length} done
        </p>
      </div>

      {doneToday && (
        <div className="card workout-banner">
          ✅ You've already logged a workout today. Keep going for extra
          practice, or come back tomorrow!
        </div>
      )}

      {dayPlan.exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          completed={completedIds.includes(exercise.id)}
          onComplete={handleExerciseComplete}
        />
      ))}

      <button
        className="btn btn-accent"
        onClick={handleMarkDayComplete}
        disabled={doneToday}
      >
        {doneToday ? "Today's Workout Logged ✓" : 'Mark Day Complete ✓'}
      </button>
      {!doneToday && (
        <p className="workout-hint">
          Tip: work through each exercise above, then mark the day complete
          to keep your streak going.
        </p>
      )}
    </div>
  )
}
