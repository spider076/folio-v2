import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useRecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blogs", {
          cache: "no-store",
          next: { revalidate: 0 },
        });
        const blogs = await response.json();

        if (!blogs || blogs.length === 0) {
          toast.error("No blogs found");
          return;
        }

        const sortedBlogs = [...blogs].sort((a: any, b: any) => {
          const dateA =
            a.properties.Date?.date?.start ||
            a.properties.PublishedDate?.date?.start ||
            a.created_time ||
            "";
          const dateB =
            b.properties.Date?.date?.start ||
            b.properties.PublishedDate?.date?.start ||
            b.created_time ||
            "";

          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });

        const showBlogs = 3;
        setRecentBlogs(sortedBlogs.slice(0, showBlogs));
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  return { recentBlogs, isLoading };
};
