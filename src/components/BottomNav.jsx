import './BottomNav.css'

// The four tabs of the app. Each one has:
//   id    - matches the "page" state in App.jsx
//   label - text shown under the icon
//   icon  - a simple emoji (keeps the app dependency-free)
const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'workout', label: 'Workout', icon: '💪' },
  { id: 'diet', label: 'Diet', icon: '🍽️' },
  { id: 'progress', label: 'Progress', icon: '📈' },
]

// Fixed bar pinned to the bottom of the screen.
// "current" is the active page id, "onChange" switches pages.
export default function BottomNav({ current, onChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`bottom-nav-item ${current === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
