// ===========================================================
// GalawGo - Health calculations
// Small pure functions used to turn the user's onboarding
// answers (weight, height, age, etc.) into useful numbers:
// BMI and a daily calorie target.
// ===========================================================

// BMI (Body Mass Index) = weight (kg) / height (m)^2
// It's a quick way to estimate if someone's weight is healthy
// for their height.
export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

// Turns a raw BMI number into a friendly category label
export function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

// Mifflin-St Jeor formula for BMR (Basal Metabolic Rate):
// the number of calories your body burns at complete rest.
//   Men:   10 x weight(kg) + 6.25 x height(cm) - 5 x age + 5
//   Women: 10 x weight(kg) + 6.25 x height(cm) - 5 x age - 161
export function calculateBMR(weightKg, heightCm, age, gender) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

// Activity multiplier turns BMR into TDEE (Total Daily Energy
// Expenditure). We assume "lightly active" since this app is
// aimed at beginners just starting to exercise.
const ACTIVITY_MULTIPLIER = 1.375;

export function calculateTDEE(bmr) {
  return bmr * ACTIVITY_MULTIPLIER;
}

// Adjust TDEE based on the user's goal to get a daily calorie target:
//   lose     -> ~500 calorie deficit (about 0.5 kg/week loss)
//   gain     -> ~300 calorie surplus (for building muscle)
//   maintain -> TDEE as-is (stay fit)
export function calculateCalorieTarget(tdee, goal) {
  switch (goal) {
    case 'lose':
      return Math.round(tdee - 500);
    case 'gain':
      return Math.round(tdee + 300);
    default:
      return Math.round(tdee);
  }
}

// Runs the whole pipeline at once. Used by the Onboarding form.
// Returns the numbers we want to save on the user's profile.
export function computeHealthStats({ weight, height, age, gender, goal }) {
  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr);
  const calorieTarget = calculateCalorieTarget(tdee, goal);

  return {
    bmi: Math.round(bmi * 10) / 10, // round to 1 decimal place
    bmiCategory: getBMICategory(bmi),
    calorieTarget,
  };
}
