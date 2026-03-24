"use client";

import { useState } from "react";

type HistoryItem = {
  id: string;
  createdAt: string;
  atsScore: number | null;
  cvPreview: string;
  jobPreview: string;
  result: string;
};

function readHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("cv_optimizer_history");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>(readHistory);

  const clearHistory = () => {
    localStorage.removeItem("cv_optimizer_history");
    setItems([]);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Optimization History</h1>
          <p className="text-sm text-muted-foreground">
            Past CV optimizations stored locally on this browser.
          </p>
        </div>
        <button
          onClick={clearHistory}
          disabled={items.length === 0}
          className="rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface disabled:opacity-50"
        >
          Clear History
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          No saved optimizations yet. Run an optimization from the home page.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="rounded-lg bg-accent-subtle px-2 py-1 text-xs font-medium text-accent">
                  ATS: {item.atsScore ?? "N/A"}/100
                </p>
              </div>
              <div className="mb-2 grid gap-2 text-sm text-foreground md:grid-cols-2">
                <p className="rounded-lg bg-surface p-2">
                  <span className="font-semibold">CV:</span> {item.cvPreview || "-"}
                </p>
                <p className="rounded-lg bg-surface p-2">
                  <span className="font-semibold">Job:</span> {item.jobPreview || "-"}
                </p>
              </div>
              <details>
                <summary className="cursor-pointer text-sm font-medium text-accent">
                  View full result
                </summary>
                <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-border bg-surface p-3 text-sm text-foreground">
                  {item.result}
                </pre>
              </details>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
