// ===========================================================
// GalawGo - localStorage helpers
//
// This app has NO backend/server. Everything the user enters
// (their profile, workouts done, meals logged, weight history)
// is saved directly in the browser's localStorage so it's
// still there next time they open the app.
//
// Every other file in the app should go through these helper
// functions instead of calling localStorage directly - that
// way all the storage "shapes" are defined in one place.
// ===========================================================

const KEYS = {
  PROFILE: 'galawgo_profile',
  WORKOUT_LOG: 'galawgo_workout_log',
  DIET_LOG: 'galawgo_diet_log',
  WEIGHT_LOG: 'galawgo_weight_log',
};

// ---------------------------------------------------------
// Date helpers - we use simple "YYYY-MM-DD" strings as keys
// so logs are grouped by calendar day.
// ---------------------------------------------------------

export function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayKey() {
  return formatDate(new Date());
}

// ---------------------------------------------------------
// Generic read/write helpers (JSON in, JSON out)
// ---------------------------------------------------------

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`GalawGo: failed to read "${key}" from storage`, err);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`GalawGo: failed to save "${key}" to storage`, err);
  }
}

// ---------------------------------------------------------
// Profile
// Shape: { name, age, gender, weight, height, goal, bmi,
//          bmiCategory, calorieTarget, createdAt }
// ---------------------------------------------------------

export function getProfile() {
  return readJSON(KEYS.PROFILE, null);
}

export function saveProfile(profile) {
  writeJSON(KEYS.PROFILE, profile);
}

// Wipes ALL GalawGo data - used by the "Reset App" button
export function clearAllData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

// ---------------------------------------------------------
// Workout log
// Shape: { "2026-06-12": 3, "2026-06-13": 4, ... }
// Maps a date -> which day (1-7) of the program was completed
// ---------------------------------------------------------

export function getWorkoutLog() {
  return readJSON(KEYS.WORKOUT_LOG, {});
}

export function isWorkoutCompleted(dateKey) {
  const log = getWorkoutLog();
  return Boolean(log[dateKey]);
}

export function markWorkoutComplete(dateKey, dayNumber) {
  const log = getWorkoutLog();
  log[dateKey] = dayNumber;
  writeJSON(KEYS.WORKOUT_LOG, log);
  return log;
}

export function getTotalWorkoutsCompleted() {
  return Object.keys(getWorkoutLog()).length;
}

// How many days in a row (ending today or yesterday) the user
// has completed a workout. If "today" isn't logged yet we still
// count yesterday's streak so it doesn't reset to 0 first thing
// in the morning.
export function getWorkoutStreak() {
  const log = getWorkoutLog();
  if (Object.keys(log).length === 0) return 0;

  let streak = 0;
  const cursor = new Date();

  if (!log[formatDate(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (log[formatDate(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

// ---------------------------------------------------------
// Diet log
// Shape: { "2026-06-12": [{ id, name, calories }, ...] }
// ---------------------------------------------------------

export function getDietLog() {
  return readJSON(KEYS.DIET_LOG, {});
}

export function getMealsForDate(dateKey) {
  const log = getDietLog();
  return log[dateKey] || [];
}

export function addMeal(dateKey, meal) {
  const log = getDietLog();
  const meals = log[dateKey] || [];
  const newMeal = { id: Date.now(), ...meal };
  log[dateKey] = [...meals, newMeal];
  writeJSON(KEYS.DIET_LOG, log);
  return log[dateKey];
}

export function removeMeal(dateKey, mealId) {
  const log = getDietLog();
  const meals = log[dateKey] || [];
  log[dateKey] = meals.filter((meal) => meal.id !== mealId);
  writeJSON(KEYS.DIET_LOG, log);
  return log[dateKey];
}

// ---------------------------------------------------------
// Weight log
// Shape: [{ date: "2026-06-12", weight: 70 }, ...]
// Kept sorted oldest -> newest, one entry per day.
// ---------------------------------------------------------

export function getWeightLog() {
  return readJSON(KEYS.WEIGHT_LOG, []);
}

export function addWeightEntry(weight) {
  const log = getWeightLog();
  const dateKey = getTodayKey();
  const entry = { date: dateKey, weight };

  // If the user already logged a weight today, update it
  // instead of adding a duplicate entry.
  const existingIndex = log.findIndex((item) => item.date === dateKey);
  let updated;
  if (existingIndex >= 0) {
    updated = [...log];
    updated[existingIndex] = entry;
  } else {
    updated = [...log, entry];
  }

  updated.sort((a, b) => (a.date > b.date ? 1 : -1));
  writeJSON(KEYS.WEIGHT_LOG, updated);
  return updated;
}
