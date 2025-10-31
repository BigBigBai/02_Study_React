import type { Route } from './+types/index';
import type { Project } from '~/types';
import ProjectCard from '~/components/ProjectCard';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  // const res = await fetch('http://localhost:8000/projects');
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();

  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  //   console.log(projects);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  //   const renderPagination = () => (
  //     <div className='flex justify-center gap-2 mt-8'>
  //       {Array.from({ length: totalPages }, (_, idx) => (
  //         <button
  //           key={idx + 1}
  //           onClick={() => setCurrentPage(idx + 1)}
  //           className={`px-3 py-1 cursor-pointer rounded ${
  //             currentPage === idx + 1
  //               ? 'bg-blue-500 text-white'
  //               : 'bg-gray-700 text-gray-200'
  //           }`}
  //         >
  //           {idx + 1}
  //         </button>
  //       ))}
  //     </div>
  //   );

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className='text-3xl font-bold mb-8 text-white'>🚀 Projects</h2>
      {/* Category Filter */}
      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              // Reset page number to 1 when category is changed
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      ;
      {/* <div className='grid gap-6 sm:grid-cols-2'>
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div> */}
      <AnimatePresence mode='wait'>
        <motion.div layout className='grid gap-6 sm:grid-cols-2'>
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
      {/* {totalPages > 1 && renderPagination()} */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;
