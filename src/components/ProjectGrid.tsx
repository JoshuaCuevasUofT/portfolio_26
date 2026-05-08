import React from 'react';
import { type Project } from '../types/project';
import ProjectCard from './ProjectCard';
import Text from './Text';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick }) => {
  if (projects.length === 0) {
    return (
      <div className="project-grid-empty">
        <Text variant="h3" color="secondary" align="center">
          No projects match the selected filters
        </Text>
        <Text variant="body" color="secondary" align="center" style={{ marginTop: 'var(--spacing-sm)' }}>
          Try selecting different tags to see more projects.
        </Text>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <div key={project.id} className="project-grid-item">
          <ProjectCard
            project={project}
            onClick={() => onProjectClick?.(project)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;