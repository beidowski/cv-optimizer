import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Optimizer",
  description: "Optimize your CV with AI and ATS insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 sm:px-6">
          <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                className="text-base font-semibold tracking-tight text-foreground"
              >
                CV <span className="text-accent">Optimizer</span>
              </Link>
              <nav className="flex flex-wrap items-center justify-end gap-1 text-sm sm:gap-2">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent-subtle hover:text-accent"
                >
                  Optimizer
                </Link>
                <Link
                  href="/history"
                  className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent-subtle hover:text-accent"
                >
                  History
                </Link>
                <Link
                  href="/templates"
                  className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent-subtle hover:text-accent"
                >
                  Templates
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent-subtle hover:text-accent"
                >
                  About
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 py-6">{children}</main>
          <footer className="border-t border-border py-4 text-xs text-muted-foreground">
            CV Optimizer - ATS-focused improvements and interview-ready output.
          </footer>
        </div>
      </body>
    </html>
  );
}
