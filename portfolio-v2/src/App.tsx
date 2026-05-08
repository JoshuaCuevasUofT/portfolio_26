import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'

// Import Vanta.js - it will register itself on window.VANTA
import 'vanta/dist/vanta.waves.min'

function App() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      console.log('Initializing Vanta.js WAVES effect...')

      // Check WebGL support
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        console.error('WebGL not supported')
        return
      }
      console.log('WebGL is supported')

      try {
        // Check if Vanta.js is available on window
        if (!window.VANTA || !window.VANTA.WAVES) {
          console.error('Vanta.js WAVES not available on window.VANTA')
          return
        }

        vantaEffect.current = window.VANTA.WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x1d1e2b,  // Dark blue-gray for subtle background waves
          shininess: 30.00,  // Default shininess
          waveHeight: 15.00,  // Default wave height
          waveSpeed: 1.00,    // Default speed
          zoom: 0.65
        })

        console.log('Vanta.js effect created:', vantaEffect.current)

        // Check if effect is actually working
        if (vantaEffect.current) {
          console.log('Vanta.js effect initialized successfully')
        } else {
          console.error('Vanta.js effect failed to initialize')
        }
      } catch (error) {
        console.error('Error creating Vanta.js effect:', error)
      }
    }

    return () => {
      console.log('Cleaning up Vanta.js effect...')
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  return (
    <div className="app-container">
      <div ref={vantaRef} className="vanta-background"></div>
      <div className="content">
        <main>
          <section className="hero-section">
            <h1 className="title">Portfolio V2</h1>
            <p className="subtitle">
              Interactive wave background with Vanta.js
            </p>
            <div className="features">
              <div className="feature">
                <h3>🌊 Animated Waves</h3>
                <p>Real-time wave simulation with mouse interaction</p>
              </div>
              <div className="feature">
                <h3>🎨 Dark Theme</h3>
                <p>Deep ocean blue (#1d1e2b) background</p>
              </div>
              <div className="feature">
                <h3>⚡ React + TypeScript</h3>
                <p>Modern frontend stack with Vite</p>
              </div>
            </div>
          </section>
        </main>
        <footer className="footer">
          <p>Move your mouse around to interact with the animated waves!</p>
        </footer>
      </div>
    </div>
  )
}

export default App
