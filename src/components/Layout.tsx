import React from 'react';
import '../styles/theme.css';
import Hero from './Hero';
import Skills from './Skills';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Hero />
      <Skills />
      {children}
    </div>
  );
};

export default Layout;