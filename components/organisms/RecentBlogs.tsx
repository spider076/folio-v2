import Link from 'next/link'
import React from 'react'
import BlogPost from '../molecules/BlogPost'
import { fetchPages } from '@/lib/notionClient';

const RecentBlogs = async () => {
  const blogs = await fetchPages();
  const showBlogs = 3;
   
  if (!blogs || blogs.length === 0) {
        return (
        <div className="max-w-2xl mx-auto mt-16 px-4 text-center text-gray-600">
            No blogs found
        </div>
        );
    }

  return (
<div className="wrapper flex flex-col justify-center items-start mb-16">
        <h3 className="text-accent text-2xl md:text-4xl tracking-tight mb-4">
          Recent Blogs
        </h3>

        {blogs.map((blog : any, index)=> {

            if (index >= showBlogs) {
                return null;
            }

            return(
                <BlogPost
                key={blog.id}
                title={blog.properties.Title?.rich_text[0]?.plain_text || "No Title"}
                summary={blog.properties.description?.rich_text[0]?.plain_text || ""}
                slug={blog.properties.slug?.rich_text[0]?.plain_text || ""}
              />
            )
        })}

        <Link href="/blogs" className='mx-auto'>
          <p
            className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100"
          >
            See All Blogs
            <svg
              className="h-4 w-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </p>
        </Link>
        </div>
  )
}

export default RecentBlogs