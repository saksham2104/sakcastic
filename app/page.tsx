import Link from "next/link";

import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();
  const [featuredPost] = posts;

  return (
    <main className="page-section">
      <div className="container">
        <section className="hero-grid">
          <div className="surface hero-copy">
            <span className="eyebrow">Engineering notes, systems thinking, and sharp opinions</span>
            <h1 className="hero-title">Sakcastic</h1>
            <p className="hero-text">
              A personal blog about building software with taste. Expect distributed systems,
              programming ideas, careful writing, and the occasional chess-shaped detour.
            </p>
            <div className="action-row">
              <Link className="button" href="/blog">
                Read the blog
              </Link>
              {featuredPost ? (
                <Link className="button-secondary" href={`/blog/${featuredPost.slug}`}>
                  Start with the latest post
                </Link>
              ) : null}
            </div>
          </div>

          <article className="surface feature-card">
            {featuredPost ? (
              <>
                <div>
                  <div className="meta-row">
                    <span>Latest post</span>
                    <strong>{featuredPost.formattedDate}</strong>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                  <h2 className="card-title">{featuredPost.title}</h2>
                  <p className="card-copy">{featuredPost.excerpt}</p>
                </div>

                <div>
                  <div className="tag-row">
                    {featuredPost.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="action-row">
                    <Link className="link-inline" href={`/blog/${featuredPost.slug}`}>
                      Explore the post
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="meta-row">
                    <span>Fresh canvas</span>
                  </div>
                  <h2 className="card-title">Start publishing with a stronger visual identity.</h2>
                  <p className="card-copy">
                    Your site is ready for thoughtful essays, technical tutorials, and standout
                    writing that feels curated instead of template-generated.
                  </p>
                </div>
                <div className="pill-row">
                  <span className="pill">Long-form writing</span>
                  <span className="pill">Clean reading flow</span>
                  <span className="pill">Editorial feel</span>
                </div>
              </>
            )}
          </article>
        </section>

        <section className="page-section">
          <div className="split-grid">
            <div className="surface stat-card">
              <p className="stat-value">{posts.length.toString().padStart(2, "0")}</p>
              <p className="stat-label">
                Published entries with room to grow into a thoughtful archive.
              </p>
            </div>
            <div className="surface note-card">
              <div className="section-heading">
                <div>
                  <h2>Built for readable, modern writing</h2>
                  <p>
                    Warm contrast, generous spacing, and article styling designed to make technical
                    posts feel more premium on desktop and mobile.
                  </p>
                </div>
              </div>
              <div className="pill-row">
                <span className="pill">Responsive layout</span>
                <span className="pill">Editorial cards</span>
                <span className="pill">Polished markdown</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
