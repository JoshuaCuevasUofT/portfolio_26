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
  images: string[]; // paths to images in /public/images/
  codeSnippets?: string[];
  links?: ProjectLink[];
  date: string; // ISO format for chronological ordering
}