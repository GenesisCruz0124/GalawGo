import { useState } from 'react'
import { computeHealthStats } from '../utils/calculations'
import { saveProfile, addWeightEntry } from '../utils/storage'
import './Onboarding.css'

// ===========================================================
// Onboarding - shown once, the first time the app is opened.
//
// Collects basic info (name, age, gender, weight, height,
// goal), then uses those numbers to calculate the user's BMI
// and a daily calorie target (Mifflin-St Jeor formula).
//
// When the form is submitted, we save everything to
// localStorage and tell the parent (<App />) that onboarding
// is done via the `onComplete` callback.
// ===========================================================
export default function Onboarding({ onComplete }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '', // kg
    height: '', // cm
    goal: 'lose',
  })
  const [error, setError] = useState('')

  // Generic change handler - works for every input/select
  // because each one has a "name" attribute matching a form key.
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const age = Number(form.age)
    const weight = Number(form.weight)
    const height = Number(form.height)

    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!age || age <= 0 || !weight || weight <= 0 || !height || height <= 0) {
      setError('Please fill in valid age, weight, and height.')
      return
    }

    const stats = computeHealthStats({
      weight,
      height,
      age,
      gender: form.gender,
      goal: form.goal,
    })

    const profile = {
      name: form.name.trim(),
      age,
      gender: form.gender,
      weight,
      height,
      goal: form.goal,
      ...stats, // adds bmi, bmiCategory, calorieTarget
      createdAt: new Date().toISOString(),
    }

    saveProfile(profile)
    addWeightEntry(weight) // seed the weight log with the starting weight

    onComplete(profile)
  }

  return (
    <div className="page onboarding">
      <div className="onboarding-hero">
        <div className="onboarding-logo">🏃</div>
        <h1>Welcome to GalawGo</h1>
        <p>Let's set up your profile to personalize your workouts and meal goals.</p>
      </div>

      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Juan dela Cruz"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            min="10"
            max="100"
            placeholder="25"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="field-hint">Used for the calorie formula (Mifflin-St Jeor).</p>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              name="weight"
              type="number"
              min="20"
              max="300"
              step="0.1"
              placeholder="60"
              value={form.weight}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="height">Height (cm)</label>
            <input
              id="height"
              name="height"
              type="number"
              min="100"
              max="250"
              placeholder="165"
              value={form.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="goal">Goal</label>
          <select id="goal" name="goal" value={form.goal} onChange={handleChange}>
            <option value="lose">Lose Weight</option>
            <option value="gain">Build Muscle</option>
            <option value="maintain">Stay Fit</option>
          </select>
        </div>

        {error && <p className="onboarding-error">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Get Started 🚀
        </button>
      </form>
    </div>
  )
}
