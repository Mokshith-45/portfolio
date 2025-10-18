import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import "./index.css";

// Register commonly used GSAP plugins once at app startup so components
// can use them without worrying about registration order. Registering
// before importing the app prevents "Missing plugin?" warnings caused by
// components using gsap's scrollTrigger before the plugin is registered.
gsap.registerPlugin(ScrollTrigger, Draggable, Physics2DPlugin);

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
