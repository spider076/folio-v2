'server-only';

import { Client } from "@notionhq/client";
import React from 'react';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages  = React.cache(async () => {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID || '',
        filter: {
            property: 'Status',
            status: {
                equals: "Live", 
            }
        }
    });
    console.log('response : ', response.results);

    return response.results as any || undefined; 
});

export const fetchBodySlug = React.cache(async (slug: string) => {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID || '',
        filter: {
            property: 'slug',
            rich_text: {
                equals: slug,
            }
        }
    });

    
    return response.results[0] as PageObjectResponse || undefined;
});

export const fetchPageBlocks = React.cache(async (id: string) => {
    const response = await notion.blocks.children.list({
        block_id: id,
        page_size: 50,
    });
    
    return response.results as BlockObjectResponse[] || undefined;
});