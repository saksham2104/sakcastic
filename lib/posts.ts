import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const postsDirectory = path.join(process.cwd(), "posts")

export function getPosts() {

  const files = fs.readdirSync(postsDirectory)

  return files.map((file) => {

    const slug = file.replace(".md", "")
    const fullPath = path.join(postsDirectory, file)

    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      readingTime: readingTime(content).text
    }

  })

}