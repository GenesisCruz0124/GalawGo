import React from 'react'
import ReactDOM from 'react-dom/client'
// Import global styles BEFORE App so component-level CSS
// (e.g. Home.css) loads after and can override shared
// classes like .card when needed.
import './index.css'
import App from './App.jsx'

// This is the entry point of the whole app.
// It just renders <App /> into the #root div in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
