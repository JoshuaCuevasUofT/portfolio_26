import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './App.css'
import Text from './components/Text'
import ProjectGrid from './components/ProjectGrid'
import TagFilter from './components/TagFilter'
import Layout from './components/Layout'
import { projects } from './data/projects'
import { filterProjects } from './utils/filterProjects'
import { type Tag } from './types/project'

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
          <Layout>

          {/* Portfolio Projects Section */}
          <section className="section">
            <Text variant="h2" color="accent" align="center" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Portfolio Projects
            </Text>
            <Text variant="body" color="secondary" align="center" style={{ marginBottom: 'var(--spacing-xl)' }}>
              Filter projects by skill tags to find relevant work samples.
            </Text>

            <div style={{ maxWidth: '800px', margin: '0 auto var(--spacing-xl)' }}>
              <TagFilter
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
                onTagDeselect={handleTagDeselect}
              />
              <Text variant="small" color="secondary" align="center" style={{ marginTop: 'var(--spacing-sm)' }}>
                {selectedTags.length === 0 ? 'No tags selected (showing no projects)' :
                 selectedTags.length === allTags.length ? 'All tags selected (showing all projects)' :
                 `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} with tags: ${selectedTags.join(', ')}`}
              </Text>
            </div>

            <ProjectGrid
              projects={filteredProjects}
              onProjectClick={(project) => console.log(`Clicked project: ${project.title}`)}
            />
          </section>
        </Layout>
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
