import { getPosts } from "@/lib/posts"

export default function BlogPage() {

  const posts = getPosts()

  return (
    <main style={{ padding: "40px" }}>

      <h1>Blog</h1>

      {posts.map((post) => (

        <div key={post.slug} style={{ marginBottom: "30px" }}>

          <a href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
          </a>

          <p>{post.date} • {post.readingTime}</p>

          <p>{post.tags.join(", ")}</p>

        </div>

      ))}

    </main>
  )
}