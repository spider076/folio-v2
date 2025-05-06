"use client";

import { useRecentBlogs } from "@/lib/useRecentBlogs";
import BlogPost from "../molecules/BlogPost";
import Link from "next/link";
import Loader from "../atoms/Loader";

export default function RecentBlogs() {
  const { recentBlogs, isLoading } = useRecentBlogs();

  if (isLoading) {
    return <Loader text={"Blogs Loading..."} />;
  }

  if (!recentBlogs || recentBlogs.length === 0) {
    return null;
  }

  return (
    <div className="wrapper">
      <h2 className="inline-block mb-4">
        <span className="text-accent">Recent</span> Blogs
      </h2>
      {recentBlogs.map((blog: any) => {
        const slug = blog.properties.slug?.rich_text[0]?.plain_text;
        const title =
          blog.properties.Title?.rich_text[0]?.plain_text || "Untitled";
        const summary =
          blog.properties.description?.rich_text[0]?.plain_text || "";

        if (!slug) return null;

        return (
          <BlogPost key={blog.id} title={title} summary={summary} slug={slug} />
        );
      })}

      <Link href="/blogs" className="mx-auto">
        <p className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100">
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
  );
}
