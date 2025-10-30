// import type { Route } from '../+types/home';

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

const HomePage = () => {
  return (
    <section>
      <h1>Welcome</h1>
    </section>
  );
};

export default HomePage;
