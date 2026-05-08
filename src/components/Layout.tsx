import React from 'react';
import '../styles/theme.css';
import Hero from './Hero';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Hero />
      {children}
    </div>
  );
};

export default Layout;