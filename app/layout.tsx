import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanjay R K Shetty — AI Security Researcher",
  description:
    "AI Security Researcher at SISA Information Security. Adversarial ML, LLM Security, DFIR pre-sales. B.Tech Cybersecurity, MIT Bengaluru.",
  openGraph: {
    title: "Sanjay R K Shetty",
    description: "AI Security Researcher · SISA · MIT Bengaluru",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
