import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const postsDirectory = path.join(process.cwd(), "posts")

export type PostSummary = {
  slug: string
  title: string
  date: string
  formattedDate: string
  tags: string[]
  readingTime: string
  excerpt: string
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date))
}

export function getPosts() {

  const files = fs.readdirSync(postsDirectory)

  return files.map((file): PostSummary => {

    const slug = file.replace(".md", "")
    const fullPath = path.join(postsDirectory, file)

    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data, content } = matter(fileContents)
    const excerpt = content
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 150)

    return {
      slug,
      title: data.title,
      date: data.date,
      formattedDate: formatDate(data.date),
      tags: data.tags || [],
      readingTime: readingTime(content).text,
      excerpt: excerpt.endsWith(".") ? excerpt : `${excerpt}...`
    }

  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

}
