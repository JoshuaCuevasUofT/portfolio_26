export interface Skill {
  name: string;
  icon: string; // React icon component name from react-icons
  category: 'Languages' | 'Libraries/Frameworks' | 'Tools';
}

export const skills: Skill[] = [
  // Languages
  { name: 'Python', icon: 'FaPython', category: 'Languages' },
  { name: 'R', icon: 'FaRProject', category: 'Languages' },
  { name: 'SQL', icon: 'FaDatabase', category: 'Languages' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'Languages' },
  { name: 'JavaScript', icon: 'FaJs', category: 'Languages' },
  { name: 'HTML', icon: 'FaHtml5', category: 'Languages' },
  { name: 'CSS', icon: 'FaCss3Alt', category: 'Languages' },

  // Libraries/Frameworks
  { name: 'Pandas', icon: 'SiPandas', category: 'Libraries/Frameworks' },
  { name: 'NumPy', icon: 'SiNumpy', category: 'Libraries/Frameworks' },
  { name: 'scikit-learn', icon: 'SiScikitlearn', category: 'Libraries/Frameworks' },
  { name: 'TensorFlow', icon: 'SiTensorflow', category: 'Libraries/Frameworks' },
  { name: 'PyTorch', icon: 'SiPytorch', category: 'Libraries/Frameworks' },
  { name: 'React', icon: 'FaReact', category: 'Libraries/Frameworks' },
  { name: 'Vue.js', icon: 'FaVuejs', category: 'Libraries/Frameworks' },
  { name: 'Node.js', icon: 'FaNodeJs', category: 'Libraries/Frameworks' },
  { name: 'Express', icon: 'SiExpress', category: 'Libraries/Frameworks' },
  { name: 'D3.js', icon: 'SiD3Dotjs', category: 'Libraries/Frameworks' },

  // Tools
  { name: 'Git', icon: 'FaGitAlt', category: 'Tools' },
  { name: 'Docker', icon: 'FaDocker', category: 'Tools' },
  { name: 'AWS', icon: 'FaAws', category: 'Tools' },
  { name: 'Tableau', icon: 'SiTableau', category: 'Tools' },
  { name: 'Power BI', icon: 'SiPowerbi', category: 'Tools' },
  { name: 'Jupyter', icon: 'SiJupyter', category: 'Tools' },
  { name: 'VS Code', icon: 'SiVisualstudiocode', category: 'Tools' },
  { name: 'Figma', icon: 'SiFigma', category: 'Tools' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'Tools' },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'Tools' },
];