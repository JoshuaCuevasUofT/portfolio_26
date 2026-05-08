import { Project } from '../types/project.ts';

/**
 * Sort projects chronologically (most recent first)
 */
export function sortProjectsByDate(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Sort projects by title (alphabetical)
 */
export function sortProjectsByTitle(projects: Project[]): Project[] {
  return [...projects].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}