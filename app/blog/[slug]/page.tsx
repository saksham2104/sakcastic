import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params

  const filePath = path.join(process.cwd(), "posts", `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return <div>Post not found</div>
  }

  const fileContent = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(fileContent)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return (
    <main style={{ padding: "40px" }}>
      <h1>{data.title}</h1>
      <p>{data.date}</p>

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  )
}