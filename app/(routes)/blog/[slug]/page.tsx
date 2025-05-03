import CodeBox from "@/components/atoms/CodeBox";
import "@/lib/notion.css";
import { fetchBodySlug, fetchPageBlocks, fetchPages } from "@/lib/notionClient";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import "./blog.css";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const pages = await fetchPages();
  if (!pages || pages.length === 0) {
    console.warn("No pages found for static generation");
    return [];
  }

  return pages.map((page: any) => ({
    slug: page.properties.slug?.rich_text[0]?.plain_text || "",
  }));
}

export default async function BlogPage({ params }: BlogPostProps) {
  const { slug } = params;

  // Fetch the Notion page by slug
    const page = await fetchBodySlug(slug) as any;
  if (!page) {
    notFound();
  }

  // Fetch the page's blocks using the page ID
  const blocks = await fetchPageBlocks(page.id);
  if (!blocks) {
    notFound();
  }


  // Extract metadata from page properties
  const title = page.properties.Title?.rich_text[0]?.plain_text || "Untitled";

  // Format the date (assuming the date property is called "Date" or "PublishedDate")
  let formattedDate = "";
  if (page.properties.Date?.date?.start) {
    formattedDate = format(new Date(page.properties.Date.date.start), "MMMM d, yyyy");
  } else if (page.properties.PublishedDate?.date?.start) {
    formattedDate = format(new Date(page.properties.PublishedDate.date.start), "MMMM d, yyyy");
  } else if (page.created_time) {
    formattedDate = format(new Date(page.created_time), "MMMM d, yyyy");
  }

  // Extract tags (assuming the tags property is called "Tags" and is a multi-select)
  const tags = page.properties.Tags?.multi_select || [];

  // Extract content manually to render our own components
  const content = [] as any[];

  blocks.forEach((block: any, index) => {
    const blockType = block.type;
    const blockData = block[blockType] as any || {};

    if (blockType === "paragraph" && blockData.rich_text && blockData.rich_text.length > 0) {
      // Render paragraphs
      const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
      content.push(
        <p key={`paragraph-${index}`} className="notion-text">
          {text}
        </p>
      );
    } else if (blockType === "image" && blockData.file && blockData.file.url) {
      // Render images
      content.push(
        <div key={`image-${index}`} className="notion-image">
          <Image
          width={100}
          height={100}
          src={blockData.file.url}
          alt={
            blockData.caption?.map((c: any) => c.plain_text).join("") || "Notion image"
          }
          style={{ maxWidth: "100%", height: "auto", margin: "16px 0", width: "auto" }}
          unoptimized
        />
        </div>
      );
    } else if (
      ["heading_1", "heading_2", "heading_3"].includes(blockType) &&
      blockData.rich_text
    ) {
      // Render headings
      const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
      const HeadingTag = blockType === "heading_1" ? "h1" : blockType === "heading_2" ? "h2" : "h3";
      content.push(
        <HeadingTag key={`heading-${index}`} className={`notion-${blockType.replace("_", "-")}`}>
          {text}
        </HeadingTag>
      );
    } else if (blockType === "bulleted_list_item" && blockData.rich_text) {
      // Render bullet lists
      const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
      content.push(
        <ul key={`bullet-${index}`} className="notion-bulleted-list">
          <li>{text}</li>
        </ul>
      );
    } else if (blockType === "numbered_list_item" && blockData.rich_text) {
      // Render numbered lists
      const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
      content.push(
        <ol key={`number-${index}`} className="notion-numbered-list">
          <li>{text}</li>
        </ol>
      );
    } else if (blockType === "code" && blockData.rich_text) {
      // Render code blocks
      const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
      content.push(
        // <pre  className="notion-code">
          <CodeBox key={`code-${index}`}  language={blockData?.language} code={text} />
        // {/* </pre> */}
      );
    }
    // Add more block type handlers as needed
  });

  return (
    <main className="blog-wrapper">
      <header className="blog-header">
        <h1 className="blog-title">{title}</h1>

        <div className="blog-meta">
          {formattedDate && (
            <div className="blog-date">
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
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{formattedDate}</span>
            </div>
          )}

          {tags.length > 0 && (
            <div className="blog-tags">
              {tags.map((tag: any) => (
                <span
                  key={tag.id}
                  className="blog-tag"
                  style={{
                    backgroundColor:
                      tag.color === "default" ? "#e0e0e0" : `var(--notion-${tag.color})`,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="blog-content">{content}</div>
    </main>
  );
}