export default function AboutPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About CV Optimizer</h1>
        <p className="text-sm text-muted-foreground">
          Improve CV relevance against job posts with structured AI feedback.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">1. Paste Inputs</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your CV text and job description to start the analysis.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">2. Optimize</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Generate improved summary, experience bullets, and missing keywords.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">3. Improve Score</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Apply suggestions to increase ATS match before submitting applications.
          </p>
        </article>
      </div>

      <article className="rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground shadow-sm">
        Results are AI-generated suggestions. Review and personalize outputs before
        applying. History is stored locally in your browser.
      </article>
    </section>
  );
}
