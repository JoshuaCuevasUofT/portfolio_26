import React from 'react';
import '../styles/theme.css';
import Text from './Text';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <Text variant="h1" color="accent" align="center">
          Joshua Joel Cuevas
        </Text>
        <Text variant="h2" color="secondary" align="center">
          Data Scientist | Quantitative Researcher
        </Text>
        <Text variant="body" color="secondary" align="center">
          Building data-driven solutions with machine learning, statistical analysis, and quantitative research.
        </Text>
      </div>
    </section>
  );
};

export default Hero;