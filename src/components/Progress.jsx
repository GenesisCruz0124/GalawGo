import { useState } from 'react'
import WeightChart from './WeightChart'
import { computeHealthStats } from '../utils/calculations'
import {
  getWeightLog,
  addWeightEntry,
  getWorkoutStreak,
  getTotalWorkoutsCompleted,
  saveProfile,
  clearAllData,
} from '../utils/storage'
import './Progress.css'

// ===========================================================
// Progress - weight history chart + overall stats.
//
// Logging a new weight here also recalculates BMI and the
// daily calorie target (since both depend on body weight),
// and saves the updated profile via `onProfileChange`.
// ===========================================================
export default function Progress({ profile, onProfileChange }) {
  const [weightLog, setWeightLog] = useState(() => getWeightLog())
  const [weightInput, setWeightInput] = useState('')

  const streak = getWorkoutStreak()
  const totalWorkouts = getTotalWorkoutsCompleted()

  const latestWeight =
    weightLog.length > 0 ? weightLog[weightLog.length - 1].weight : profile.weight
  const startWeight = weightLog.length > 0 ? weightLog[0].weight : profile.weight
  const weightChange = Math.round((latestWeight - startWeight) * 10) / 10

  function handleLogWeight(e) {
    e.preventDefault()
    const weight = Number(weightInput)
    if (!weight || weight <= 0) return

    const updatedLog = addWeightEntry(weight)
    setWeightLog(updatedLog)
    setWeightInput('')

    // Weight changed -> recalculate BMI & calorie target too
    const stats = computeHealthStats({
      weight,
      height: profile.height,
      age: profile.age,
      gender: profile.gender,
      goal: profile.goal,
    })
    const updatedProfile = { ...profile, weight, ...stats }
    saveProfile(updatedProfile)
    onProfileChange(updatedProfile)
  }

  function handleReset() {
    const confirmed = window.confirm(
      'This will erase your profile, workouts, meals, and weight history on this device. Continue?'
    )
    if (confirmed) {
      clearAllData()
      window.location.reload()
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Progress</h1>
      </div>

      <div className="card progress-stats-grid">
        <div className="home-stat">
          <span className="home-stat-value">🔥 {streak}</span>
          <span className="home-stat-label">Day Streak</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-value">{totalWorkouts}</span>
          <span className="home-stat-label">Total Workouts</span>
        </div>
      </div>

      <div className="card">
        <h3>Weight Log</h3>
        <form onSubmit={handleLogWeight} className="progress-form">
          <input
            type="number"
            step="0.1"
            min="20"
            max="300"
            placeholder="Weight (kg)"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Log Weight
          </button>
        </form>

        {weightLog.length > 0 ? (
          <>
            <WeightChart data={weightLog} />
            <div className="progress-weight-summary">
              <div className="progress-weight-item">
                <span className="progress-weight-value">{latestWeight} kg</span>
                <span className="progress-weight-label">Current</span>
              </div>
              <div className="progress-weight-item">
                <span
                  className={`progress-weight-value ${
                    weightChange < 0
                      ? 'progress-down'
                      : weightChange > 0
                      ? 'progress-up'
                      : ''
                  }`}
                >
                  {weightChange > 0 ? '+' : ''}
                  {weightChange} kg
                </span>
                <span className="progress-weight-label">Change</span>
              </div>
              <div className="progress-weight-item">
                <span className="progress-weight-value">{profile.bmi}</span>
                <span className="progress-weight-label">BMI · {profile.bmiCategory}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="empty-text">Log your weight to see your progress chart.</p>
        )}
      </div>

      <div className="card progress-danger-zone">
        <h3>Reset App</h3>
        <p>This clears your profile and all logged data on this device.</p>
        <button className="btn btn-danger" onClick={handleReset}>
          Reset All Data
        </button>
      </div>
    </div>
  )
}
