import projectsData from '@/data/projects.json';

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  link: string;
  emoji: string;
  animation: string;
  period: string;
}

export function getProject(slug: string): ProjectData | null {
  const link = `/projects/${slug}`;

  for (const group of projectsData) {
    const project = group.projects.find((p) => p.link === link);
    if (project) {
      return {
        ...project,
        period: group.period
      };
    }
  }

  return null;
}
