import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import 'vanta/dist/vanta.waves.min'
import './App.css'
import Layout from './components/Layout'
import ProjectGrid from './components/ProjectGrid'
import Skills from './components/Skills'
import TagFilter from './components/TagFilter'
import Text from './components/Text'
import { projects } from './data/projects'
import { type Project, type Tag } from './types/project'
import { filterProjects } from './utils/filterProjects'
const ProjectDetailsModal = lazy(() => import('./components/ProjectDetailsModal'))

function App() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<ReturnType<typeof window.VANTA.WAVES> | null>(null)

  const allTags: Tag[] = useMemo(
    () => ['Data Science (ML)', 'Data Analysis', 'Quantitative Research', 'Data Engineering', 'Dashboards'],
    []
  )

  const [selectedTags, setSelectedTags] = useState<Tag[]>(allTags)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleTagSelect = (tag: Tag) => {
    setSelectedTags(prev => [...prev, tag])
  }

  const handleTagDeselect = (tag: Tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }

  const handleRefresh = () => {
    setSelectedTags([])
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  const filteredProjects = useMemo(
    () => filterProjects(projects, selectedTags),
    [selectedTags]
  )

  useEffect(() => {
    if (!vantaRef.current) return;

    const initVanta = () => {
      if (vantaEffect.current || !vantaRef.current) return;

      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        console.error('WebGL not supported')
        return
      }

      if (!window.VANTA?.WAVES) return;

      try {
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
          color: 0x1d1e2b,
          shininess: 30.00,
          waveHeight: 15.00,
          waveSpeed: 1.00,
          zoom: 0.65,
        })
      } catch (error) {
        console.error('Error creating Vanta.js effect:', error)
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(initVanta, { timeout: 2000 });
    } else {
      setTimeout(initVanta, 500);
    }

    return () => {
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
                  onRefresh={handleRefresh}
                />
                <Text variant="small" color="secondary" align="center" style={{ marginTop: 'var(--spacing-sm)' }}>
                  {selectedTags.length === 0 ? 'No tags selected (showing no projects)' :
                   selectedTags.length === allTags.length ? 'All tags selected (showing all projects)' :
                   `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} with tags: ${selectedTags.join(', ')}`}
                </Text>
              </div>

              <ProjectGrid
                projects={filteredProjects}
                onProjectClick={handleProjectClick}
              />
            </section>
          </Layout>

          {/* Skills Section */}
          <section className="section">
            <Skills />
          </section>
        </main>

        <Suspense fallback={null}>
          <ProjectDetailsModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        </Suspense>

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
