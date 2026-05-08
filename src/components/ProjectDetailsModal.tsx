import React, { useState, useEffect, useRef } from 'react';
import { type Project } from '../types/project';
import Text from './Text';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImageIndex, onClose]);

  // Clean up copy timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

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
                <div
                  key={index}
                  className="modal-image-item"
                  onClick={() => setSelectedImageIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedImageIndex(index);
                    }
                  }}
                >
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
              <div key={index} className="code-block">
                <div className="code-block-header">
                  <span>python</span>
                  <button
                    className="code-block-copy-btn"
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(snippet);
                        setCopiedIndex(index);

                        // Clear any existing timeout
                        if (copyTimeoutRef.current) {
                          clearTimeout(copyTimeoutRef.current);
                        }

                        // Set timeout to reset copied state after 2 seconds
                        copyTimeoutRef.current = setTimeout(() => {
                          setCopiedIndex(null);
                        }, 2000);
                      } catch (err) {
                        console.error('Failed to copy code:', err);
                        // Optional: Show error message to user
                      }
                    }}
                    title="Copy code"
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  showInlineLineNumbers={false}
                  lineNumberStyle={{ minWidth: '3.5em' }}
                  customStyle={{
                    margin: 0,
                    padding: 'var(--spacing-md)',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                    fontSize: '0.875rem',
                    textAlign: 'left',
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
                    }
                  }}
                >
                  {snippet}
                </SyntaxHighlighter>
              </div>
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

      {/* Lightbox for image zoom */}
      {selectedImageIndex !== null && project.images && (
        <div className="lightbox-overlay" onClick={() => setSelectedImageIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Close lightbox"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="lightbox-image-container">
              <img
                src={project.images[selectedImageIndex]}
                alt={`${project.title} full size ${selectedImageIndex + 1}`}
                className="lightbox-image"
              />
            </div>
            <div className="lightbox-navigation">
              {selectedImageIndex > 0 && (
                <button
                  className="lightbox-nav-btn prev"
                  onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <span className="lightbox-counter">
                {selectedImageIndex + 1} / {project.images.length}
              </span>
              {selectedImageIndex < project.images.length - 1 && (
                <button
                  className="lightbox-nav-btn next"
                  onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsModal;