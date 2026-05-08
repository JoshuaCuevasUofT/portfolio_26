import { Project, Tag } from '../types/project';

export function filterProjects(projects: Project[], selectedTags: Tag[]): Project[] {
  if (selectedTags.length === 0) {
    return [];
  }

  return projects.filter(project =>
    selectedTags.some(tag => project.tags.includes(tag))
  );
}