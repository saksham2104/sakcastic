import Link from "next/link"

import { getPosts } from "@/lib/posts"

export default function BlogPage() {
  const posts = getPosts()

  return (
    <main className="page-section">
      <div className="container">
        <section className="section-heading">
          <div>
            <h1>Blog archive</h1>
            <p>
              Notes on programming, distributed systems, and the kind of details that make software
              feel well made.
            </p>
          </div>
          <div className="pill-row">
            <span className="pill">{posts.length} posts</span>
          </div>
        </section>

        <section className="posts-grid">
          {posts.map((post) => (
            <article className="surface post-card" key={post.slug}>
              <div className="post-card-content">
                <div className="meta-row">
                  <span>{post.formattedDate}</span>
                  <span>{post.readingTime}</span>
                </div>

                <div>
                  <h2 className="card-title">{post.title}</h2>
                  <p className="card-copy">{post.excerpt}</p>
                </div>

                <div className="tag-row">
                  {post.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <Link className="link-inline" href={`/blog/${post.slug}`}>
                    Read article
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
