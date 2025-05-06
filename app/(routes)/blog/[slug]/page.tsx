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

// Helper function to render rich text with inline annotations
function renderRichText(richText: any[]) {
  return richText.map((rt: any, index: number) => {
    let text = rt.plain_text;
    if (rt.annotations?.code) {
      return (
        <code key={`inline-code-${index}`} className="notion-code-inline">
          {text}
        </code>
      );
    }
    return <span key={`text-${index}`}>{text}</span>;
  });
}

// Recursive function to render blocks and their children
async function renderBlock(block: any, index: number, depth: number = 0) {
  const blockType = block.type;
  const blockData = block[blockType] as any || {};
  const content: any[] = [];

  // Handle blocks with children
  let children: any[] = [];
  if (block.has_children) {
    const childBlocks = await fetchPageBlocks(block.id);
    if (childBlocks && childBlocks.length > 0) {
      for (let i = 0; i < childBlocks.length; i++) {
        const childContent = await renderBlock(childBlocks[i], i, depth + 1);
        children.push(...childContent);
      }
    }
  }

  // Handle lists (group consecutive list items into a single ul/ol)
  let listItems: any[] = [];
  let currentListType: string | null = null;

  if (blockType === "bulleted_list_item" || blockType === "numbered_list_item") {
    const text = blockData.rich_text?.map((rt: any) => rt.plain_text).join("") || "";
    const listType = blockType === "bulleted_list_item" ? "ul" : "ol";

    listItems.push(
      <li key={`list-item-${index}`} className="notion-list-item">
        {renderRichText(blockData.rich_text)}
        {children.length > 0 && (
          <div className="notion-nested-content">{children}</div>
        )}
      </li>
    );

    return listItems;
  }

  // Handle other block types
  if (blockType === "paragraph" && blockData.rich_text && blockData.rich_text.length > 0) {
    content.push(
      <p key={`paragraph-${index}`} className="notion-text">
        {renderRichText(blockData.rich_text)}
        {children.length > 0 && (
          <div className="notion-nested-content">{children}</div>
        )}
      </p>
    );
  } else if (blockType === "image" && blockData.file && blockData.file.url) {
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
        {children.length > 0 && (
          <div className="notion-nested-content">{children}</div>
        )}
      </div>
    );
  } else if (
    ["heading_1", "heading_2", "heading_3"].includes(blockType) &&
    blockData.rich_text
  ) {
    const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
    const HeadingTag = blockType === "heading_1" ? "h1" : blockType === "heading_2" ? "h2" : "h3";
    content.push(
      <HeadingTag key={`heading-${index}`} className={`notion-${blockType.replace("_", "-")}`}>
        {text}
        {children.length > 0 && (
          <div className="notion-nested-content">{children}</div>
        )}
      </HeadingTag>
    );
  } else if (blockType === "code" && blockData.rich_text) {
    const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
    content.push(
      <CodeBox
        key={`code-${index}`}
        language={blockData?.language}
        code={text}
        className="notion-code"
      />
    );
  } else if (blockType === "quote" && blockData.rich_text) {
    const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
    content.push(
      <blockquote key={`quote-${index}`} className="notion-quote">
        {text}
        {children.length > 0 && (
          <div className="notion-nested-content">{children}</div>
        )}
      </blockquote>
    );
  } else if (blockType === "divider") {
    content.push(<hr key={`divider-${index}`} className="notion-divider" />);
  } else if (blockType === "table" && blockData.has_children) {
    const tableRows = await fetchPageBlocks(block.id);
    const rows = tableRows.map((row: any, rowIndex: number) => {
      if (row.type !== "table_row") return null;
      const cells = row.table_row.cells;
      return (
        <tr key={`table-row-${rowIndex}`}>
          {cells.map((cell: any[], cellIndex: number) => (
            rowIndex === 0 ? (
              <th key={`table-header-${cellIndex}`} className="notion-table-th">
                {cell.map((c: any) => c.plain_text).join("")}
              </th>
            ) : (
              <td key={`table-cell-${rowIndex}-${cellIndex}`} className="notion-table-td">
                {cell.map((c: any) => c.plain_text).join("")}
              </td>
            )
          ))}
        </tr>
      );
    });

    content.push(
      <table key={`table-${index}`} className="notion-table">
        <tbody>{rows}</tbody>
      </table>
    );
  } else if (blockType === "callout" && blockData.rich_text) {
    const text = blockData.rich_text.map((rt: any) => rt.plain_text).join("");
    content.push(
      <div key={`callout-${index}`} className="notion-callout">
        {blockData.icon?.emoji && (
          <span className="notion-callout-icon">{blockData.icon.emoji}</span>
        )}
        <div className="notion-callout-text">
          {text}
          {children.length > 0 && (
            <div className="notion-nested-content">{children}</div>
          )}
        </div>
      </div>
    );
  }

  return content;
}

export default async function BlogPage({ params }: BlogPostProps) {
  const { slug } = params;

  // Fetch the Notion page by slug
  const page = (await fetchBodySlug(slug)) as any;
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

  // Format the date
  let formattedDate = "";
  if (page.properties.Date?.date?.start) {
    formattedDate = format(
      new Date(page.properties.Date.date.start),
      "MMMM d, yyyy"
    );
  } else if (page.properties.PublishedDate?.date?.start) {
    formattedDate = format(
      new Date(page.properties.PublishedDate.date.start),
      "MMMM d, yyyy"
    );
  } else if (page.created_time) {
    formattedDate = format(new Date(page.created_time), "MMMM d, yyyy");
  }

  // Extract tags
  const tags = page.properties.Tags?.multi_select || [];

  // Render all blocks, including nested ones
  const content: any[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const blockContent = await renderBlock(blocks[i], i);
    content.push(...blockContent);
  }

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