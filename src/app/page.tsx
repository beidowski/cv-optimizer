"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CV_OPTIMIZER_PREFILL_KEY } from "@/lib/cv-optimizer-prefill";
import type { CvOptimizerPrefill } from "@/lib/cv-optimizer-prefill";
import {
  clampScore,
  getAtsScore,
  getMissingKeywordCount,
  parseResultSections,
} from "@/lib/cv-result";

type HistoryItem = {
  id: string;
  createdAt: string;
  atsScore: number | null;
  cvPreview: string;
  jobPreview: string;
  result: string;
};

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prefillNotice, setPrefillNotice] = useState<string | null>(null);
  const sections = parseResultSections(result);
  const atsSection = sections.find((section) => section.title === "ATS Score");
  const atsScore = atsSection ? getAtsScore(atsSection.content) : null;
  const missingKeywordsSection = sections.find(
    (section) => section.title === "Missing Keywords"
  );
  const missingKeywordCount = missingKeywordsSection
    ? getMissingKeywordCount(missingKeywordsSection.content)
    : 0;
  const currentSuccessScore =
    atsScore !== null ? clampScore(atsScore - missingKeywordCount * 2 - 4) : null;
  const projectedSuccessScore =
    atsScore !== null
      ? clampScore(atsScore + Math.min(18, missingKeywordCount * 2 + 6))
      : null;
  const cvLength = cvText.trim().length;
  const jobLength = jobText.trim().length;

  useEffect(() => {
    const raw = sessionStorage.getItem(CV_OPTIMIZER_PREFILL_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as CvOptimizerPrefill;
      if (data.cvText?.trim() && data.jobText?.trim()) {
        setCvText(data.cvText);
        setJobText(data.jobText);
        setResult("");
        setError("");
        setPrefillNotice(data.label ?? "Sample template");
      }
    } catch {
      /* ignore invalid payload */
    } finally {
      sessionStorage.removeItem(CV_OPTIMIZER_PREFILL_KEY);
    }
  }, []);

  const onOptimize = async () => {
    // Prevent duplicate submissions while request is in-flight.
    if (loading) return;
    if (!cvText.trim() || !jobText.trim()) {
      setError("Please fill in both CV and job description fields.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      // Send user input to the server route that calls Gemini.
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobText }),
      });

      const data: { result?: string; error?: string } = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Request failed. Please try again.");
        return;
      }
      const nextResult = data.result ?? "No result returned.";
      setResult(nextResult);

      const historyItem: HistoryItem = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        atsScore: getAtsScore(nextResult),
        cvPreview: cvText.trim().slice(0, 160),
        jobPreview: jobText.trim().slice(0, 160),
        result: nextResult,
      };
      const stored = localStorage.getItem("cv_optimizer_history");
      const parsed: HistoryItem[] = stored ? JSON.parse(stored) : [];
      const nextHistory = [historyItem, ...parsed].slice(0, 25);
      localStorage.setItem("cv_optimizer_history", JSON.stringify(nextHistory));
    } catch {
      setError("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async () => {
    if (!result.trim()) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="space-y-5">
      {prefillNotice ? (
        <div
          className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/25 bg-accent-subtle px-4 py-3 text-sm text-foreground"
          role="status"
        >
          <span>
            Loaded sample: <strong>{prefillNotice}</strong>. Edit if you want, then run{" "}
            <strong>Run analysis</strong>.
          </span>
          <button
            type="button"
            onClick={() => setPrefillNotice(null)}
            className="shrink-0 rounded-lg border border-border bg-card px-2 py-1 text-xs font-medium"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <section className="mb-6 rounded-2xl border border-white/10 bg-linear-to-br from-violet-950 via-violet-900 to-indigo-900 p-6 text-white shadow-lg shadow-violet-950/25">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">AI CV Optimizer</h1>
            <p className="mt-2 max-w-2xl text-sm text-violet-100/90">
              Match your CV to job requirements with clearer summaries, stronger
              bullets, and ATS-focused feedback.
            </p>
          </div>
          <Link
            href="/history"
            className="rounded-xl border border-white/25 bg-white/15 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            View History
          </Link>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <article className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Input</h2>
            <div className="text-xs text-muted-foreground">Step 1/2</div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <label className="font-medium text-foreground">CV Text</label>
              <span className="text-xs text-muted-foreground">{cvLength} chars</span>
            </div>
            <textarea
              className="min-h-52 w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Paste CV text here..."
              value={cvText}
              onChange={(event) => setCvText(event.target.value)}
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <label className="font-medium text-foreground">Job Description</label>
              <span className="text-xs text-muted-foreground">{jobLength} chars</span>
            </div>
            <textarea
              className="min-h-52 w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Paste job description here..."
              value={jobText}
              onChange={(event) => setJobText(event.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOptimize}
              disabled={loading || !cvText.trim() || !jobText.trim()}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-opacity hover:opacity-95 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Run analysis"}
            </button>
            <button
              onClick={onCopy}
              disabled={!result.trim()}
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy result"}
            </button>
          </div>

          {error ? (
            <div className="rounded-xl border border-danger-muted bg-danger-muted p-3 text-sm text-danger">
              {error}
            </div>
          ) : null}
        </article>

        <article className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Optimized Result</h2>
            <div className="text-xs text-muted-foreground">Step 2/2</div>
          </div>

          {atsScore !== null ||
          currentSuccessScore !== null ||
          projectedSuccessScore !== null ? (
            <div className="rounded-xl border border-border bg-surface p-3">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Score Dashboard
              </h3>

              {currentSuccessScore !== null ? (
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current CV Success (Estimated)</span>
                    <span className="font-semibold text-foreground">
                      {currentSuccessScore}/100
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div
                      className="h-2 rounded-full bg-muted-foreground transition-all"
                      style={{ width: `${currentSuccessScore}%` }}
                    />
                  </div>
                </div>
              ) : null}

              {projectedSuccessScore !== null ? (
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      After Suggested Improvements (Estimated)
                    </span>
                    <span className="font-semibold text-foreground">
                      {projectedSuccessScore}/100
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div
                      className="h-2 rounded-full bg-success transition-all"
                      style={{ width: `${projectedSuccessScore}%` }}
                    />
                  </div>
                </div>
              ) : null}

              <p className="text-xs text-muted-foreground">
                Estimates are heuristic and based on ATS score + missing keyword gap.
              </p>
            </div>
          ) : null}

          {atsScore !== null ? (
            <div className="rounded-xl border border-border bg-surface p-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">ATS Compatibility</span>
                <span className="font-semibold text-accent">{atsScore}/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-border">
                <div
                  className="h-2 rounded-full bg-accent transition-all"
                  style={{ width: `${atsScore}%` }}
                />
              </div>
            </div>
          ) : null}

          {!result ? (
            <div className="rounded-xl border border-border border-dashed bg-surface/50 p-4 text-sm text-muted-foreground">
              Your optimized result will appear here.
            </div>
          ) : null}

          {result && sections.length > 0 ? (
            <section className="grid gap-3">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <h3 className="mb-2 text-sm font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">
                    {section.content}
                  </pre>
                </article>
              ))}
            </section>
          ) : null}

          {result && sections.length === 0 ? (
            <pre className="whitespace-pre-wrap rounded-xl border border-border bg-surface p-3 text-sm text-foreground">
              {result}
            </pre>
          ) : null}
        </article>
      </section>
    </main>
  );
}