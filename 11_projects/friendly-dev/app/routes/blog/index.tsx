import type { Route } from './+types/index';
import type { PostMeta } from '~/types';
import { Link } from 'react-router';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import { useState } from 'react';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await res.json();

  data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: PostMeta[] };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <section className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>
      {/* {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))} */}

      <div className='space-y-8'>
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </section>
  );
};

export default BlogPage;
