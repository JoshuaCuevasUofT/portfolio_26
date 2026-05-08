import { Project } from '../types/project.ts';
import { extractEventDrivenBacktest } from './extract';

// Extract and prepare project data
const eventDrivenBacktest: Project = extractEventDrivenBacktest();

// Export array of all projects (chronologically ordered by date)
export const projects: Project[] = [
  eventDrivenBacktest,
  // Additional projects will be added here
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

// Export individual projects for easy access
export { eventDrivenBacktest };

// Export helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => project.tags.includes(tag as any));
}

// Export all unique tags
export const allTags = Array.from(
  new Set(projects.flatMap(project => project.tags))
);