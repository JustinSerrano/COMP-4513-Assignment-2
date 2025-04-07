/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// main.jsx
// This file serves as the entry point for the React application, rendering the main App component into the root DOM element.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
