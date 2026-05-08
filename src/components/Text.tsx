import React from 'react';
import '../styles/theme.css';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small';
  color?: 'primary' | 'secondary' | 'accent';
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({
  children,
  className = '',
  variant = 'body',
  color = 'primary',
  align = 'left',
  style = {},
}) => {
  const Tag = variant === 'h1' ? 'h1' :
              variant === 'h2' ? 'h2' :
              variant === 'h3' ? 'h3' : 'p';

  const textStyles: React.CSSProperties = {
    color: color === 'primary' ? 'var(--text-primary)' :
           color === 'secondary' ? 'var(--text-secondary)' : 'var(--text-accent)',
    textAlign: align,
    margin: 0,
  };

  const variantStyles: React.CSSProperties = variant === 'h1' ? {
    fontSize: '3.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 'var(--spacing-md)',
  } : variant === 'h2' ? {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
    marginBottom: 'var(--spacing-md)',
  } : variant === 'h3' ? {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    marginBottom: 'var(--spacing-sm)',
  } : variant === 'body' ? {
    fontSize: '1rem',
    lineHeight: 1.6,
  } : {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  };

  return (
    <Tag
      style={{ ...textStyles, ...variantStyles, ...style }}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default Text;