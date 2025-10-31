// import type { Route } from '../+types/home';
import Hero from '../../components/Hero';
import FeatureProjects from '~/components/Feature-projects';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import FeaturedProjects from '~/components/Feature-projects';
import AboutPreview from '~/components/About-preview';
import type { PostMeta } from '~/types';
import LatestPosts from '~/components/LatestPosts';

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
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  // const res = await fetch('http://localhost:8000/projects');
  // const data = await res.json();

  const url = new URL(request.url);

  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url).href),
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error('Failed to fetch projects or posts');
  }

  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json(),
  ]);

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData as { projects: Project[] };
  return (
    <section>
      {/* <Hero name='White' /> */}
      <FeatureProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} limit={3} />
    </section>
  );
};

export default HomePage;
