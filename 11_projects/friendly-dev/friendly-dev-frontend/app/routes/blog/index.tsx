import type { Route } from './+types/index';
import type { PostMeta } from '~/types';
import { Link } from 'react-router';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import { useState } from 'react';
import PostFilter from '~/components/PostFilter';
import type { StrapiResponse, StrapiPost } from '~/types';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  // const url = new URL('/posts-meta.json', request.url);
  // const res = await fetch(url.href);

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts?populate=image&sort=date:desc`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const json: StrapiResponse<StrapiPost> = await res.json();

  const posts = json.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${import.meta.env.VITE_API_URL}${item.image.url}`
      : '/images/no-image.png',
  }));

  // posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: PostMeta[] };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <section className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>

      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      {/* {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))} */}

      <div className='space-y-8'>
        {currentPosts.length === 0 ? (
          <p className='text-gray-400 text-center'>No posts found.</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
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
