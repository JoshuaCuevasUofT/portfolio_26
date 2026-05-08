import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './App.css'
import Button from './components/Button'
import Text from './components/Text'
import ProjectCard from './components/ProjectCard'
import TagFilter from './components/TagFilter'
import { projects } from './data/projects'
import { filterProjects } from './utils/filterProjects'
import { Tag } from './types/project'

// Import Vanta.js - it will register itself on window.VANTA
import 'vanta/dist/vanta.waves.min'

function App() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)
  const allTags: Tag[] = ['Data Science (ML)', 'Data Analysis', 'Quantitative Research', 'Data Engineering', 'Dashboards']
  const [selectedTags, setSelectedTags] = useState<Tag[]>(allTags)

  const handleTagSelect = (tag: Tag) => {
    setSelectedTags(prev => [...prev, tag])
  }

  const handleTagDeselect = (tag: Tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }

  const filteredProjects = filterProjects(projects, selectedTags)

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
            <Text variant="h1" color="accent" align="center">
              Portfolio V2
            </Text>
            <Text variant="body" color="secondary" align="center">
              Interactive wave background with Vanta.js
            </Text>

            {/* Theme color demonstration */}
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              marginTop: 'var(--spacing-xl)',
              marginBottom: 'var(--spacing-xl)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--color-1)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                fontWeight: 'bold'
              }}>#1</div>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--color-2)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                fontWeight: 'bold'
              }}>#2</div>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--color-3)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                fontWeight: 'bold'
              }}>#3</div>
            </div>

            <div className="features">
              <div className="feature">
                <h3>🌊 Animated Waves</h3>
                <p>Real-time wave simulation with mouse interaction</p>
              </div>
              <div className="feature">
                <h3>🎨 Dark Theme</h3>
                <p>CSS custom properties with accent colors</p>
                <div style={{ marginTop: 'var(--spacing-sm)' }}>
                  <Button variant="primary" size="small" onClick={() => console.log('Primary clicked')}>
                    Primary Button
                  </Button>
                </div>
              </div>
              <div className="feature">
                <h3>⚡ React + TypeScript</h3>
                <p>Modern frontend stack with Vite</p>
                <div style={{ marginTop: 'var(--spacing-sm)' }}>
                  <Button variant="secondary" size="small" onClick={() => console.log('Secondary clicked')}>
                    Secondary Button
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Tag Filter demonstration */}
          <section style={{
            maxWidth: '800px',
            margin: 'var(--spacing-2xl) auto',
            padding: '0 var(--spacing-md)'
          }}>
            <Text variant="h2" color="accent" align="center" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Tag Filter Demo (Issue #005)
            </Text>
            <TagFilter
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              onTagDeselect={handleTagDeselect}
            />
            <Text variant="body" color="secondary" align="center" style={{ marginTop: 'var(--spacing-sm)' }}>
              {selectedTags.length === 0 ? 'No tags selected (showing no projects)' :
               selectedTags.length === allTags.length ? 'All tags selected (showing all projects)' :
               `Showing projects with tags: ${selectedTags.join(', ')}`}
            </Text>
          </section>

          {/* ProjectCard demonstration */}
          <section style={{
            maxWidth: '800px',
            margin: 'var(--spacing-2xl) auto',
            padding: '0 var(--spacing-md)'
          }}>
            <Text variant="h2" color="accent" align="center" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Project Card Demo (Issue #004)
            </Text>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {filteredProjects.length === 0 ? (
                <Text variant="body" color="secondary" align="center">
                  No projects match the selected tags.
                </Text>
              ) : (
                filteredProjects.map((project) => (
                  <div key={project.id} style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <ProjectCard
                      project={project}
                      onClick={() => console.log(`Clicked project: ${project.title}`)}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
        <footer className="footer">
          <Text variant="small" color="accent" align="center">
            Move your mouse around to interact with the animated waves!
          </Text>
          <Text variant="small" color="secondary" align="center" style={{ marginTop: 'var(--spacing-xs)' }}>
            Theme colors: var(--color-1: #54AECC), var(--color-2: #5472CC), var(--color-3: #7254CC)
          </Text>
        </footer>
      </div>
    </div>
  )
}

export default App
