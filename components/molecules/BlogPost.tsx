

import Link from 'next/link';
import React from 'react';

interface BlogPostProps {
  title: string;
  summary: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, summary, slug }) => {
  if (!slug) return null;
  
  return (
    <Link 
      href={`/blog/${slug}`}
      className="w-full mb-2"
    >
      <div className="w-full mb-1 p-6 rounded-md dark:bg-elevation_two">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
            {title}
          </h4>
        </div>
        {summary && (
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {summary}
          </p>
        )}
      </div>
    </Link>
  );
};

export default BlogPost;