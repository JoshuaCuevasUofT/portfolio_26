// types/project.ts
export type Tag =
  | 'Data Science (ML)'
  | 'Data Analysis'
  | 'Quantitative Research'
  | 'Data Engineering'
  | 'Dashboards';

export interface ProjectLink {
  title: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  tags: Tag[];
  images: string[];
  codeSnippets?: string[];
  links?: ProjectLink[];
  date: string;
}
