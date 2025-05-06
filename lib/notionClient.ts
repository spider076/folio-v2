"server-only";

import { Client } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Use Next.js unstable_cache with a short revalidation period
export const fetchPages = async () => {
  try {
    if (!process.env.NOTION_BLOGS_DATABASE_ID) {
      throw new Error("NOTION_BLOGS_DATABASE_ID is not defined");
    }
    if (!process.env.NOTION_TOKEN) {
      throw new Error("NOTION_TOKEN is not defined");
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOGS_DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Live",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });
    return response.results as PageObjectResponse[];
  } catch (error) {
    console.error("Error in fetchPages:", error);
    return [];
  }
};

export const fetchBodySlug = async (slug: string) => {
  return unstable_cache(
    async () => {
      try {
        const response = await notion.databases.query({
          database_id: process.env.NOTION_BLOGS_DATABASE_ID || "",
          filter: {
            property: "slug",
            rich_text: {
              equals: slug,
            },
          },
        });
        return response.results[0] as PageObjectResponse | undefined;
      } catch (error) {
        console.error("Error in fetchBodySlug:", error);
        return undefined;
      }
    },
    [`notion-blog-${slug}`],
    { revalidate: 60 }
  )();
};

export const fetchPageBlocks = async (id: string) => {
  return unstable_cache(
    async () => {
      try {
        const response = await notion.blocks.children.list({
          block_id: id,
          page_size: 100,
        });
        return (response.results as BlockObjectResponse[]) || [];
      } catch (error) {
        console.error("Error in fetchPageBlocks:", error);
        return [];
      }
    },
    [`notion-blocks-${id}`],
    { revalidate: 10 }
  )();
};

export const getProjectDatabase = async (
  id: string,
  property = "Order",
  direction = "ascending"
) => {
  if (!process.env.NOTION_TOKEN || !id)
    throw new Error("Notion secret or database ID not found");
  const response = await notion.databases.query({
    database_id: id,
    sorts: [
      {
        property,
        direction: direction as "descending" | "ascending",
      },
    ],
    filter: {
      or: [
        {
          property: "Status",
          status: {
            equals: "Completed",
          },
        },
        {
          property: "Status",
          status: {
            equals: "In Progress",
          },
        },
      ],
    },
  });
  return response;
};

export async function fetchProjects() {
  const databaseID = process.env.NOTION_PROJECTS_DATABASE_ID || "";
  const query = await getProjectDatabase(databaseID);
  return query.results;
}
