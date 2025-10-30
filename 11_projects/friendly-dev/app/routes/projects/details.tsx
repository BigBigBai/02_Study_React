import type { P } from 'node_modules/react-router/dist/development/router-DIAPGK5f.mjs';
import type { Route } from './+types/details';
import type { Project } from '~/types';

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`http://localhost:8000/projects/${params.id}`);
  if (!res.ok) {
    throw new Response('Project Not Found', { status: 404 });
  }
  const project: Project = await res.json();
  return project;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const ProjectDetailPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData as Project;
  console.log(project);

  return <>Project Details</>;
};

export default ProjectDetailPage;
