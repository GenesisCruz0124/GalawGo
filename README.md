# GalawGo 🏃‍♂️🥗

**Live app:** https://genesiscruz0124.github.io/galawgo/

A beginner-friendly diet & fitness companion built with **React + Vite**.
Everything runs in the browser - no backend, no sign-up. All your data
(profile, workouts, meals, weight) is saved in your browser's
`localStorage`.

## Features

- **Installable (PWA)** - GalawGo is a Progressive Web App. On mobile,
  open it in the browser and choose **Add to Home Screen** (or look for the
  install prompt) to get an app icon and a full-screen, offline-capable
  experience.
- **Onboarding** - enter your name, age, gender, weight, height, and goal.
  GalawGo calculates your **BMI** and a **daily calorie target** using the
  Mifflin-St Jeor formula.
- **Workout** - a 7-day no-equipment beginner program (push-ups, squats,
  planks, jumping jacks, and more). Each exercise has a built-in countdown
  timer, simple instructions, and a streak counter for completed days.
- **Diet** - log meals manually or tap a preset from a list of common
  Filipino foods (rice, adobo, sinigang, pandesal, etc.). A progress bar
  compares your total calories against your daily target.
- **Progress** - log your weight over time on a simple line chart, and see
  your workout streak and total workouts completed.
- **Bottom navigation** - quick access to Home, Workout, Diet, and Progress.

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- Plain CSS (no UI framework) - mobile-first, energetic colors
- `localStorage` for persistence (see `src/utils/storage.js`)

## Project structure

```
src/
├── components/      # One file per screen/UI piece
│   ├── Onboarding.jsx   # First-time setup form
│   ├── Home.jsx         # Dashboard
│   ├── Workout.jsx       # 7-day workout program
│   ├── ExerciseCard.jsx  # Single exercise + set/rest flow
│   ├── Timer.jsx         # Reusable countdown timer
│   ├── Diet.jsx          # Calorie tracker
│   ├── Progress.jsx      # Weight log + stats
│   ├── WeightChart.jsx   # Small SVG line chart
│   └── BottomNav.jsx     # Bottom tab bar
├── data/
│   ├── workoutPlan.js    # The 7-day exercise program
│   └── filipinoFoods.js  # Preset food + calorie list
├── utils/
│   ├── calculations.js   # BMI / BMR / calorie target math
│   └── storage.js        # localStorage read/write helpers
├── App.jsx           # Top-level page switcher
└── main.jsx          # Entry point
```

## Getting started (local development)

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/galawgo/`).

## Building for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that automatically builds and deploys the
site to GitHub Pages every time you push to the `main` branch.

### One-time setup

1. Push this project to a GitHub repository (see commands below).
2. In your GitHub repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` - the workflow will build and deploy automatically.
5. Your site will be live at:
   `https://<your-github-username>.github.io/<repo-name>/`

### Important: the `base` path

`vite.config.js` sets:

```js
base: '/galawgo/'
```

This must match your repository name (with leading/trailing slashes). If
you rename the repo, update this value to `/your-repo-name/`.

### Git commands to push this project

```bash
# from inside the project folder
git init                      # only if not already a git repo
git add .
git commit -m "Initial commit: GalawGo app"

# create the GitHub repo (replace <your-username>)
git remote add origin https://github.com/<your-username>/galawgo.git

# push to main
git branch -M main
git push -u origin main
```

Then enable Pages as described above (Settings → Pages → Source:
GitHub Actions). After the first push, check the **Actions** tab to watch
the deploy workflow run.

## Installing GalawGo as an app (PWA)

GalawGo uses [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) to
generate a web app manifest and service worker, so it can be installed
like a native app:

- **Android (Chrome)**: open the site, tap the **⋮** menu, then
  **Add to Home screen** / **Install app**.
- **iPhone/iPad (Safari)**: open the site, tap the **Share** icon, then
  **Add to Home Screen**.
- **Desktop (Chrome/Edge)**: click the install icon in the address bar.

Once installed, GalawGo launches full-screen (no browser UI) and the
service worker caches the app shell so it keeps working offline. The
PWA icons live in `public/` (`icon-192.png`, `icon-512.png`,
`maskable-icon-512.png`, `apple-touch-icon.png`) and are generated from
the same design as `favicon.svg`.
