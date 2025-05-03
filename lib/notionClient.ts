// lib/notion.ts

import { Client } from "@notionhq/client";
import React from "react";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(async () => {
  try {
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error("NOTION_DATABASE_ID is not defined");
    }
    if (!process.env.NOTION_TOKEN) {
      throw new Error("NOTION_TOKEN is not defined");
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Live",
        },
      },
    });
    // console.log("fetchPages response:", response.results);
    return response.results as PageObjectResponse[] || [];
  } catch (error) {
    console.error("Error in fetchPages:", error);
    return [];
  }
});

export const fetchBodySlug = React.cache(async (slug: string) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || "",
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
});

export const fetchPageBlocks = React.cache(async (id: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: id,
      page_size: 50,
    });
    return response.results as BlockObjectResponse[] || [];
  } catch (error) {
    console.error("Error in fetchPageBlocks:", error);
    return [];
  }
});