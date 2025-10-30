// import type { Route } from '../+types/home';
import Hero from '../../components/Hero';
import FeatureProjects from '~/components/Feature-projects';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import FeaturedProjects from '~/components/Feature-projects';
import AboutPreview from '~/components/About-preview';

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: 'The Friendly Dev Portfolio' },
//     { name: 'description', content: 'Web design and development projects' },
//   ];
// }

// export default function Home() {
//   return <div>My App</div>;
// }

// console.log('Hello From Home');

// const now = new Date().toISOString();
// if (typeof window === 'undefined') {
//   console.log('Server Render at:', now);
// } else {
//   console.log('Client Hydration at:', now);
// }

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return { projects: data };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  return (
    <section>
      {/* <Hero name='White' /> */}
      <FeatureProjects projects={projects} count={2} />
      <AboutPreview />
    </section>
  );
};

export default HomePage;
