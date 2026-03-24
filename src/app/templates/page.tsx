"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CV_TEMPLATES } from "@/data/cv-templates";
import {
  CV_OPTIMIZER_PREFILL_KEY,
  type CvOptimizerPrefill,
} from "@/lib/cv-optimizer-prefill";
import { getAtsScore, parseResultSections } from "@/lib/cv-result";

type CopyKind = "cv" | "job";

type DemoState =
  | { status: "idle" }
  | { status: "loading"; templateId: string; label: string }
  | { status: "error"; message: string }
  | { status: "done"; templateId: string; label: string; markdown: string };

export default function TemplatesPage() {
  const router = useRouter();
  const demoAnchorRef = useRef<HTMLDivElement>(null);
  const [copyFeedback, setCopyFeedback] = useState<{ id: string; kind: CopyKind } | null>(
    null
  );
  const [demo, setDemo] = useState<DemoState>({ status: "idle" });

  const loadInOptimizer = (payload: CvOptimizerPrefill) => {
    sessionStorage.setItem(CV_OPTIMIZER_PREFILL_KEY, JSON.stringify(payload));
    router.push("/");
  };

  const copyText = async (id: string, kind: CopyKind, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopyFeedback({ id, kind });
    setTimeout(() => setCopyFeedback(null), 1600);
  };

  const copyLabel = (id: string, kind: CopyKind, idle: string) => {
    const active =
      copyFeedback?.id === id && copyFeedback.kind === kind
        ? kind === "cv"
          ? "CV copied!"
          : "Job copied!"
        : null;
    return active ?? idle;
  };

  const runPreview = async (template: (typeof CV_TEMPLATES)[number]) => {
    setDemo({ status: "loading", templateId: template.id, label: template.label });
    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvText: template.cvText,
          jobText: template.jobText,
        }),
      });

      const data: { result?: string; error?: string } = await response.json();
      if (!response.ok) {
        setDemo({
          status: "error",
          message: data.error ?? "Preview failed. Try again.",
        });
        return;
      }

      const markdown = data.result ?? "";
      setDemo({
        status: "done",
        templateId: template.id,
        label: template.label,
        markdown,
      });
      requestAnimationFrame(() => {
        demoAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setDemo({ status: "error", message: "Network error. Try again." });
    }
  };

  const sections =
    demo.status === "done" ? parseResultSections(demo.markdown) : [];
  const atsSection = sections.find((s) => s.title === "ATS Score");
  const atsScore = atsSection ? getAtsScore(atsSection.content) : null;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Templates vs. home editor
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Try the product without the two-column editor
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          On the <strong className="text-foreground">home page</strong>, you paste your own CV and
          job text and click <strong className="text-foreground">Run analysis</strong> — that flow
          is built for real applications. <strong className="text-foreground">Here</strong>, each
          template has a ready pair of texts: use{" "}
          <strong className="text-foreground">Preview with AI</strong> to see the output on this
          page (no navigation, no editor). Use{" "}
          <strong className="text-foreground">Open in editor</strong> only when you want to tweak
          the sample and run analysis from home.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Türkçe: Şablonlarda sonucu <strong className="text-foreground">bu sayfada</strong>{" "}
          görürsün; ana sayfadaki «Run analysis» akışı kendi CV’n için. İstersen «Editörde aç» ile
          metni oraya taşıyıp düzenlersin.
        </p>
      </section>

      <section className="rounded-2xl border border-dashed border-border bg-surface/60 p-5">
        <h2 className="text-sm font-semibold text-foreground">How templates work</h2>
        <ol className="mt-3 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          <li className="flex gap-3 rounded-xl bg-card p-3 shadow-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              1
            </span>
            <span>
              <strong className="text-foreground">Preview with AI</strong> — same model as home,
              result appears below on this page.
            </span>
          </li>
          <li className="flex gap-3 rounded-xl bg-card p-3 shadow-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              2
            </span>
            <span>
              Optional: <strong className="text-foreground">Copy CV</strong> or{" "}
              <strong className="text-foreground">Copy job</strong> for your own workflow.
            </span>
          </li>
          <li className="flex gap-3 rounded-xl bg-card p-3 shadow-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              3
            </span>
            <span>
              <strong className="text-foreground">Open in editor</strong> when you want the full
              home tool with editable fields.
            </span>
          </li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Go to home editor
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Role packs</h2>
          <p className="text-sm text-muted-foreground">
            Each card includes sample CV + job posting. Preview stays on this page.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CV_TEMPLATES.map((template) => {
            const isLoading =
              demo.status === "loading" && demo.templateId === template.id;
            return (
              <article
                key={template.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground">{template.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {template.summary}
                </p>
                <p className="mt-3 text-xs font-medium text-muted-foreground">
                  Sample: full CV + job description
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {template.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-accent-subtle px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => runPreview(template)}
                    className="w-full rounded-xl bg-accent px-3 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-95 disabled:opacity-50"
                  >
                    {isLoading ? "Generating preview…" : "Preview with AI"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      loadInOptimizer({
                        label: template.label,
                        cvText: template.cvText,
                        jobText: template.jobText,
                      })
                    }
                    className="w-full rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                  >
                    Open in editor
                  </button>
                  <p className="px-0.5 text-center text-[11px] text-muted-foreground">
                    Preview does not open the home page. Editor sends nothing until you analyze
                    there.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(template.id, "cv", template.cvText)}
                      className="rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface sm:text-sm"
                    >
                      {copyLabel(template.id, "cv", "Copy CV")}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyText(template.id, "job", template.jobText)}
                      className="rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface sm:text-sm"
                    >
                      {copyLabel(template.id, "job", "Copy job")}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div ref={demoAnchorRef} id="template-preview-result" className="scroll-mt-24">
        {demo.status === "error" ? (
          <div
            className="rounded-xl border border-danger-muted bg-danger-muted p-4 text-sm text-danger"
            role="alert"
          >
            {demo.message}
          </div>
        ) : null}

        {demo.status === "loading" ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-foreground">Generating preview…</p>
            <p className="mt-1 text-xs text-muted-foreground">{demo.label}</p>
            <div className="mt-4 space-y-2">
              <div className="h-3 animate-pulse rounded-full bg-border" />
              <div className="h-3 w-4/5 animate-pulse rounded-full bg-border" />
              <div className="h-3 w-3/5 animate-pulse rounded-full bg-border" />
            </div>
          </div>
        ) : null}

        {demo.status === "done" ? (
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">AI preview</h2>
                <p className="text-sm text-muted-foreground">
                  Sample pair: <strong className="text-foreground">{demo.label}</strong>. This is a
                  demo; use the home editor for your real CV.
                </p>
              </div>
              {atsScore !== null ? (
                <div className="min-w-[140px] rounded-xl border border-border bg-surface px-3 py-2">
                  <p className="text-xs text-muted-foreground">ATS (from output)</p>
                  <p className="text-lg font-bold text-accent">{atsScore}/100</p>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-border">
                    <div
                      className="h-1.5 rounded-full bg-accent transition-all"
                      style={{ width: `${atsScore}%` }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {sections.length > 0 ? (
              <div className="grid gap-3">
                {sections.map((section) => (
                  <article key={section.title} className="rounded-xl border border-border p-4">
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">
                      {section.content}
                    </pre>
                  </article>
                ))}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 text-sm text-foreground">
                {demo.markdown}
              </pre>
            )}

            <p className="text-xs text-muted-foreground">
              Preview is not saved to History. Open in editor and run analysis from home to store a
              run.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
