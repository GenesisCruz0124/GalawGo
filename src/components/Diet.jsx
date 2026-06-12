import { useState } from 'react'
import { filipinoFoods } from '../data/filipinoFoods'
import { getTodayKey, getMealsForDate, addMeal, removeMeal } from '../utils/storage'
import './Diet.css'

// ===========================================================
// Diet - daily calorie tracker.
//
// Users can:
//   - type in any food + calorie amount manually, or
//   - tap a preset Filipino food to add it instantly
//
// A progress bar compares total calories logged today against
// the daily target calculated during onboarding.
// ===========================================================
export default function Diet({ profile }) {
  const todayKey = getTodayKey()

  const [meals, setMeals] = useState(() => getMealsForDate(todayKey))
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')

  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0)
  const target = profile.calorieTarget
  const percent = Math.min(100, Math.round((totalCalories / target) * 100))
  const isOver = totalCalories > target

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  function handleAddMeal(e) {
    e.preventDefault()
    const cals = Number(calories)
    if (!foodName.trim() || !cals || cals <= 0) return

    const updated = addMeal(todayKey, { name: foodName.trim(), calories: cals })
    setMeals(updated)
    setFoodName('')
    setCalories('')
  }

  function handleQuickAdd(food) {
    const updated = addMeal(todayKey, { name: food.name, calories: food.calories })
    setMeals(updated)
  }

  function handleRemove(mealId) {
    const updated = removeMeal(todayKey, mealId)
    setMeals(updated)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Diet</h1>
        <span className="badge">{todayLabel}</span>
      </div>

      <div className="card">
        <h3>Today's Calories</h3>
        <p className="diet-calorie-numbers">
          <span className={isOver ? 'diet-over' : ''}>{totalCalories}</span> /{' '}
          {target} kcal
        </p>
        <div className="progress-track">
          <div
            className={`progress-fill ${isOver ? 'over' : ''}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        {isOver && (
          <p className="diet-over-text">
            You're over your daily target by {totalCalories - target} kcal.
          </p>
        )}
      </div>

      <div className="card">
        <h3>Log a Meal</h3>
        <form onSubmit={handleAddMeal} className="diet-form">
          <input
            type="text"
            placeholder="Food name (e.g. Grilled Chicken)"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <input
            type="number"
            placeholder="kcal"
            min="0"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="diet-calorie-input"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Add
          </button>
        </form>

        <h4 className="diet-presets-title">Common Filipino Foods</h4>
        <div className="diet-presets">
          {filipinoFoods.map((food) => (
            <button
              key={food.name}
              className="diet-preset"
              onClick={() => handleQuickAdd(food)}
            >
              {food.name}
              <span className="diet-preset-cal">{food.calories} kcal</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Today's Meals</h3>
        {meals.length === 0 ? (
          <p className="empty-text">No meals logged yet today.</p>
        ) : (
          <ul className="diet-meal-list">
            {meals.map((meal) => (
              <li key={meal.id} className="diet-meal-item">
                <span className="diet-meal-name">{meal.name}</span>
                <span className="diet-meal-cal">{meal.calories} kcal</span>
                <button
                  className="diet-meal-remove"
                  onClick={() => handleRemove(meal.id)}
                  aria-label={`Remove ${meal.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
