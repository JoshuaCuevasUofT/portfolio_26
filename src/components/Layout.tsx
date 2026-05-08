import React from 'react';
import '../styles/theme.css';
import Hero from './Hero';
import TagFilter from './TagFilter';
import Text from './Text';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Hero />
      <section className="section tagfilter-placeholder">
        <Text variant="h2" color="accent" align="center">
          Tag Filter
        </Text>
        <Text variant="body" color="secondary" align="center">
          Placeholder for tag filtering system
        </Text>
      </section>
      <section className="section projectgrid-placeholder">
        <Text variant="h2" color="accent" align="center">
          Project Grid
        </Text>
        <Text variant="body" color="secondary" align="center">
          Placeholder for project grid display
        </Text>
      </section>
      <section className="section skills-placeholder">
        <Text variant="h2" color="accent" align="center">
          Skills Visualization
        </Text>
        <Text variant="body" color="secondary" align="center">
          Placeholder for skills visualization
        </Text>
      </section>
      <section className="section contact-placeholder">
        <Text variant="h2" color="accent" align="center">
          Contact
        </Text>
        <Text variant="body" color="secondary" align="center">
          Placeholder for contact section
        </Text>
      </section>
      {children}
    </div>
  );
};

export default Layout;