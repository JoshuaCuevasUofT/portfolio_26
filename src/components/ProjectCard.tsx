import { type Project } from '../types/project';
import '../styles/theme.css';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {project.images.length > 0 && (
        <div style={{ marginBottom: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '200px', backgroundColor: 'var(--hover-bg)' }}>
          <img
            src={project.images[0]}
            alt={`${project.title} highlight`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
        <h3 className="heading-3" style={{ margin: 0, color: 'var(--text-accent)' }}>
          {project.title}
        </h3>
        <span className="small-text" style={{ color: 'var(--text-tertiary)' }}>
          {new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
          })}
        </span>
      </div>

      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--hover-bg)',
              color: 'var(--text-accent)',
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem',
              marginRight: 'var(--spacing-xs)',
              marginBottom: 'var(--spacing-xs)',
              border: '1px solid var(--border-accent)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="body-text" style={{ marginBottom: 'var(--spacing-lg)' }}>
        {project.shortDescription}
      </p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: 'var(--color-1)' }}
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
