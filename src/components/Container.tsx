import React from 'react';
import '../styles/theme.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
  padding = 'md',
}) => {
  const containerStyles: React.CSSProperties = {
    width: '100%',
    margin: '0 auto',
    padding: padding === 'none' ? '0' :
             padding === 'sm' ? 'var(--spacing-sm)' :
             padding === 'md' ? 'var(--spacing-md)' : 'var(--spacing-lg)',
    maxWidth: maxWidth === 'sm' ? '640px' :
              maxWidth === 'md' ? '768px' :
              maxWidth === 'lg' ? '1024px' :
              maxWidth === 'xl' ? '1280px' : '100%'
  };

  return (
    <div style={containerStyles} className={`${className}`}>
      {children}
    </div>
  );
};

export default Container;