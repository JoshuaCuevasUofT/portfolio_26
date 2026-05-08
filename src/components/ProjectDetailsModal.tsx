import React from 'react';
import { type Project } from '../types/project';
import Text from './Text';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
          <Text variant="h2" color="accent" style={{ margin: 0 }}>
            {project.title}
          </Text>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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

        <Text variant="body" color="secondary" style={{ marginBottom: 'var(--spacing-lg)' }}>
          {project.detailedDescription}
        </Text>

        {project.images && project.images.length > 0 && (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <Text variant="h3" color="accent" style={{ marginBottom: 'var(--spacing-md)' }}>
              Project Images
            </Text>
            <div className="modal-image-grid">
              {project.images.map((image, index) => (
                <div key={index} className="modal-image-item">
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {project.codeSnippets && project.codeSnippets.length > 0 && (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <Text variant="h3" color="accent" style={{ marginBottom: 'var(--spacing-md)' }}>
              Code Snippets
            </Text>
            {project.codeSnippets.map((snippet, index) => (
              <pre
                key={index}
                style={{
                  backgroundColor: 'var(--hover-bg)',
                  color: 'var(--text-accent)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  overflowX: 'auto',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-sm)',
                  border: '1px solid var(--border-accent)',
                }}
              >
                <code>{snippet}</code>
              </pre>
            ))}
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div>
            <Text variant="h3" color="accent" style={{ marginBottom: 'var(--spacing-md)' }}>
              Links
            </Text>
            <div className="modal-links">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-accent)' }}>
          <Text variant="small" color="secondary">
            Project date: {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
          <button
            className="modal-close-btn secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;