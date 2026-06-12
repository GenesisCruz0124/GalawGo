import { useState, useEffect } from 'react'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import Workout from './components/Workout'
import Diet from './components/Diet'
import Progress from './components/Progress'
import BottomNav from './components/BottomNav'
import { getProfile } from './utils/storage'
import './App.css'

// ===========================================================
// App - the root component.
//
// It does two jobs:
//   1. Check localStorage for a saved profile. If there isn't
//      one yet, show the Onboarding form.
//   2. Once a profile exists, show the main app: whichever
//      page is selected ('home' | 'workout' | 'diet' |
//      'progress') plus the bottom navigation bar.
// ===========================================================
export default function App() {
  // undefined = "haven't checked localStorage yet"
  // null      = "checked, no profile saved"
  // object    = the saved profile
  const [profile, setProfile] = useState(undefined)
  const [page, setPage] = useState('home')

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  // Avoid a flash of the onboarding screen while we check storage
  if (profile === undefined) return null

  // No profile yet -> ask the user to fill in the onboarding form
  if (!profile) {
    return <Onboarding onComplete={setProfile} />
  }

  return (
    <div className="app">
      <main className="app-main">
        {page === 'home' && <Home profile={profile} goToPage={setPage} />}
        {page === 'workout' && <Workout />}
        {page === 'diet' && <Diet profile={profile} />}
        {page === 'progress' && (
          <Progress profile={profile} onProfileChange={setProfile} />
        )}
      </main>
      <BottomNav current={page} onChange={setPage} />
    </div>
  )
}
