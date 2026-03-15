import type { Metadata } from "next";
import Link from "next/link";

import ThemeToggle from "@/components/theme-toggle";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sakcastic",
    template: "%s | Sakcastic",
  },
  description:
    "Personal blog about programming, distributed systems, chess, and modern software craft.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="container site-header-inner">
              <Link className="brand" href="/">
                <span className="brand-mark">SK</span>
                <span className="brand-text">
                  <strong>Sakcastic</strong>
                  <span>Distributed systems, code, and curious detours</span>
                </span>
              </Link>

              <nav className="nav-links" aria-label="Primary">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          {children}

          <footer className="site-footer">
            <div className="container site-footer-inner">
              <p>Sakcastic is a personal writing space for software ideas and thoughtful experiments.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
