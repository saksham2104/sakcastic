export const metadata = {
  title: "Sakcastic",
  description: "Personal blog about programming, distributed systems and chess",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}