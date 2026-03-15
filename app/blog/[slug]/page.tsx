import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getPosts } from "@/lib/posts"

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params

  const filePath = path.join(process.cwd(), "posts", `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(fileContent)
  const summary = getPosts().find((post) => post.slug === slug)
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return (
    <main className="article-shell">
      <div className="article-wrap">
        <article className="surface">
          <div className="article-hero">
            <Link className="link-inline" href="/blog">
              Back to blog
            </Link>
            <div className="meta-row" style={{ marginTop: "1.2rem" }}>
              <span>{summary?.formattedDate ?? data.date}</span>
              {summary ? <span>{summary.readingTime}</span> : null}
            </div>
            <h1 className="article-title">{data.title}</h1>
            <p className="article-intro">
              {summary?.excerpt ??
                "Thoughts on programming, systems, and the craft of building software with care."}
            </p>
            {summary?.tags.length ? (
              <div className="tag-row">
                {summary.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="article-body">
            <div className="rich-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </article>
      </div>
    </main>
  )
}
