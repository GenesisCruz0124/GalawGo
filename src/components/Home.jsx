import { useState, useEffect } from 'react'
import {
  getTodayKey,
  isWorkoutCompleted,
  getWorkoutStreak,
  getTotalWorkoutsCompleted,
  getMealsForDate,
} from '../utils/storage'
import './Home.css'

// Friendly labels/messages for each goal chosen during onboarding
const GOAL_LABELS = {
  lose: 'Lose Weight',
  gain: 'Build Muscle',
  maintain: 'Stay Fit',
}

const GOAL_MESSAGES = {
  lose: 'Every workout brings you closer to your goal. Keep it up! 🔥',
  gain: 'Fuel up and push hard - those muscles are growing! 💪',
  maintain: 'Consistency is key. You are doing great! 🌟',
}

// ===========================================================
// Home - the dashboard / landing page.
// Shows a quick snapshot: BMI, calorie target, today's
// workout status, today's calories, streak, and total
// workouts completed. Buttons jump to the other tabs.
// ===========================================================
export default function Home({ profile, goToPage }) {
  const todayKey = getTodayKey()

  const [workoutDoneToday, setWorkoutDoneToday] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalWorkouts, setTotalWorkouts] = useState(0)
  const [caloriesToday, setCaloriesToday] = useState(0)

  // Read the latest stats from localStorage whenever this page is shown
  useEffect(() => {
    setWorkoutDoneToday(isWorkoutCompleted(todayKey))
    setStreak(getWorkoutStreak())
    setTotalWorkouts(getTotalWorkoutsCompleted())

    const meals = getMealsForDate(todayKey)
    const total = meals.reduce((sum, meal) => sum + Number(meal.calories), 0)
    setCaloriesToday(total)
  }, [todayKey])

  const caloriesPercent = Math.min(
    100,
    Math.round((caloriesToday / profile.calorieTarget) * 100)
  )
  const isOverTarget = caloriesToday > profile.calorieTarget

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Hi, {profile.name}! 👋</h1>
          <p>Goal: {GOAL_LABELS[profile.goal] || 'Stay Fit'}</p>
        </div>
        <div className="home-streak">
          <span className="home-streak-number">🔥 {streak}</span>
          <span className="home-streak-label">day streak</span>
        </div>
      </div>

      <div className="card home-stats-grid">
        <div className="home-stat">
          <span className="home-stat-value">{profile.bmi}</span>
          <span className="home-stat-label">BMI · {profile.bmiCategory}</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-value">{profile.calorieTarget}</span>
          <span className="home-stat-label">Daily Calorie Target</span>
        </div>
      </div>

      <div className="card">
        <h3>Today's Workout</h3>
        {workoutDoneToday ? (
          <p className="home-success">✅ You crushed today's workout. Nice!</p>
        ) : (
          <p>You haven't logged a workout today yet.</p>
        )}
        <button className="btn btn-primary" onClick={() => goToPage('workout')}>
          {workoutDoneToday ? 'View Workouts' : 'Start Workout 💪'}
        </button>
      </div>

      <div className="card">
        <h3>Today's Calories</h3>
        <p>
          {caloriesToday} / {profile.calorieTarget} kcal
        </p>
        <div className="progress-track">
          <div
            className={`progress-fill ${isOverTarget ? 'over' : ''}`}
            style={{ width: `${caloriesPercent}%` }}
          />
        </div>
        <button
          className="btn btn-outline"
          onClick={() => goToPage('diet')}
          style={{ marginTop: 12 }}
        >
          Log a Meal 🍽️
        </button>
      </div>

      <div className="card home-total">
        <h3>Total Workouts Completed</h3>
        <p className="home-total-value">{totalWorkouts}</p>
      </div>

      <div className="card home-motivation">
        <p>{GOAL_MESSAGES[profile.goal] || GOAL_MESSAGES.maintain}</p>
      </div>
    </div>
  )
}
