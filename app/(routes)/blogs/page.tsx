import { fetchPages } from "@/lib/notionClient";
import Link from "next/link";
import { format } from "date-fns";
import "@/lib/notion.css";

export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await fetchPages();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-16 px-4 text-center text-gray-600">
        No blogs found
      </div>
    );
  }

  return (
    <main className="wrapper mt-16">
      <h1 className="text-[3rem] text-accent font-bold mb-8">Blogs</h1>
      <div className="space-y-1 px-4 mt-6">
        {blogs.map((blog: any) => {
          const slug = blog.properties.slug?.rich_text[0]?.plain_text || "";
          const title =
            blog.properties.Title?.rich_text[0]?.plain_text || "No Title";
          const description =
            blog.properties.description?.rich_text[0]?.plain_text || "";

          let formattedDate = "";
          const dateProperty =
            blog.properties.Date?.date?.start ||
            blog.properties.PublishedDate?.date?.start ||
            blog.created_time;

          if (dateProperty) {
            try {
              formattedDate = format(new Date(dateProperty), "MMMM d, yyyy");
            } catch (e) {
              formattedDate = "";
            }
          }

          const tags = blog.properties.Tags?.multi_select || [];

          return (
            <div
              key={blog.id}
              className="dark:bg-elevation_four border-b border-accent p-6 last:border-b-0 cursor-pointer transition-opacity duration-300"
            >
              <section className="flex items-center justify-between flex-wrap">
                <Link
                  href={`/blog/${slug}`}
                  className="text-3xl dark:text-text_primary font-semibold hover:text-white dark:hover:text-text_secondary transition-colors"
                >
                  {title}
                </Link>
                {formattedDate && (
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{formattedDate}</span>
                  </div>
                )}
              </section>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="inline-block px-3 py-1 text-xs font-medium text-gray-700 rounded-full"
                      style={{
                        backgroundColor:
                          tag.color === "default"
                            ? "#e0e0e0"
                            : `var(--notion-${tag.color})`,
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              {description && (
                <p className="mt-6 text-text_secondary line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
