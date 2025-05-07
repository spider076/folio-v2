import { fetchPages } from "@/lib/notionClient";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const blogs = await fetchPages();

    const response = NextResponse.json(blogs);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("CDN-Cache-Control", "no-store");
    response.headers.set("Vercel-CDN-Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  }
}
