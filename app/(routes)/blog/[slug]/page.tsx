import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import { NotionRenderer } from "react-notion";
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()
interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage ({ params }: BlogPostProps) {
  const { slug: blogId } = params;

  const blockMap = await notion.getPage(blogId);

    // const blockMap = await fetch(
    //     `https://notion-api.splitbee.io/v1/page/${blogId}?pvs=4`
    //   ).then(res => res.json());

    return (
  <main className="wrapper mt-30">
    <NotionRenderer blockMap={blockMap} />
  </main>
)};