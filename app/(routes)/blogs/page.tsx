import { fetchPages } from '@/lib/notionClient'
import Link from 'next/link';
import React from 'react'

const BlogsPage = async () => {
  const blogs = await fetchPages();

  const blogTitle = blogs[0]?.properties.Title.rich_text[0].plain_text || 'No Title';

  console.log('blgos : ', );

  return (
    <main className='mt-40 wrapper'>
      <h1>Blogs</h1>
      {blogs.map((blog: any) => (
        <div key={blog.id} className='p-4 border-b border-gray-300'>
          <Link href={`/blog/${blog.id.split('-').join('')}`} className='text-2xl font-bold'>{blogTitle}</Link>
          <p className='text-gray-600'>{blog?.description}</p>
          <a href={blog.url} className='text-blue-500 hover:underline'>
            Read more
          </a>
        </div>
      ))}
    </main>
  )
}

export default BlogsPage