import { fetchPages } from "@/lib/notionClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await fetchPages();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
