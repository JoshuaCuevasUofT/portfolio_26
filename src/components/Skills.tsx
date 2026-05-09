import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { skills } from '../data/skills';
import Text from './Text';

// Map icon strings to actual icon components
const iconMap: Record<string, React.ComponentType> = {
  // Fa icons
  FaPython: FaIcons.FaPython,
  FaRProject: FaIcons.FaRProject,
  FaDatabase: FaIcons.FaDatabase,
  FaJs: FaIcons.FaJs,
  FaHtml5: FaIcons.FaHtml5,
  FaCss3Alt: FaIcons.FaCss3Alt,
  FaReact: FaIcons.FaReact,
  FaVuejs: FaIcons.FaVuejs,
  FaNodeJs: FaIcons.FaNodeJs,
  FaGitAlt: FaIcons.FaGitAlt,
  FaDocker: FaIcons.FaDocker,
  FaAws: FaIcons.FaAws,
  FaChartLine: FaIcons.FaChartLine,
  FaChartBar: FaIcons.FaChartBar,
  FaChartPie: FaIcons.FaChartPie,
  FaCode: FaIcons.FaCode,
  FaMicrosoft: FaIcons.FaMicrosoft,


  // Si icons
  SiTypescript: SiIcons.SiTypescript,
  SiPandas: SiIcons.SiPandas,
  SiNumpy: SiIcons.SiNumpy,
  SiScikitlearn: SiIcons.SiScikitlearn,
  SiTensorflow: SiIcons.SiTensorflow,
  SiPytorch: SiIcons.SiPytorch,
  SiPolars: SiIcons.SiPolars, // Added for Polars
  SiExpress: SiIcons.SiExpress,
  SiJupyter: SiIcons.SiJupyter,
  SiFigma: SiIcons.SiFigma,
  SiPostgresql: SiIcons.SiPostgresql,
  SiMongodb: SiIcons.SiMongodb,
  SiRust: SiIcons.SiRust, // Added for Rust
  SiDuckdb: SiIcons.SiDuckdb, // Added for DuckDB
};

const Skills: React.FC = () => {
  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="skills-section">
      <div className="container">
        <Text variant="h2" color="accent" align="center">
          Technical Skills
        </Text>
        <Text variant="body" color="secondary" align="center" className="skills-intro">
          A selection of technologies and tools I use for data science and web development.
        </Text>

        <div className="skills-categories">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <div key={category} className="skills-category">
                <div className="category-header">
                  {IconComponent && <span className="category-icon"><IconComponent /></span>}
                  <Text variant="h3" color="primary">
                    {category}
                  </Text>
                </div>
                <div className="skills-grid">
                  {categorySkills.map((skill) => {
                    const SkillIcon = iconMap[skill.icon];
                    return (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-icon">
                          {SkillIcon ? <SkillIcon /> : <div className="icon-placeholder" />}
                        </div>
                        <Text variant="body" color="secondary">
                          {skill.name}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Helper function to get category icon
function getCategoryIcon(category: string): React.ComponentType | null {
  switch (category) {
    case 'Languages':
      return FaIcons.FaCode;
    case 'Libraries/Frameworks':
      return FaIcons.FaCogs;
    case 'Tools':
      return FaIcons.FaTools;
    default:
      return null;
  }
}

export default Skills;
