import type { CvOptimizerPrefill } from "@/lib/cv-optimizer-prefill";

export type CvTemplate = CvOptimizerPrefill & {
  id: string;
  summary: string;
  highlights: string[];
};

export const CV_TEMPLATES: CvTemplate[] = [
  {
    id: "backend",
    label: "Backend Engineer",
    summary:
      "APIs, databases, caching, and secure services—ready to tune against a real job posting.",
    highlights: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    cvText: `Alex Chen
Berlin, Germany
alex.chen@email.com | +49 1xx xxxx xxxx | github.com/alexchen

PROFESSIONAL SUMMARY
Backend engineer with 4 years of experience building reliable APIs and data-heavy services. Comfortable across Node.js, TypeScript, PostgreSQL, and Redis. Focus on performance, maintainability, and pragmatic security.

EXPERIENCE

Backend Developer | NorthScale | 2022 - Present
- Built REST APIs with Node.js, Express, and TypeScript for a B2B analytics product.
- Cut p95 latency by ~35% through query tuning, indexing, and Redis caching.
- Implemented JWT-based auth and role-based access for customer workspaces.
- Collaborated with frontend and data teams on API contracts and release planning.
- Added structured logging and Grafana dashboards for production visibility.

Software Engineer | OrbitLabs | 2020 - 2022
- Developed internal microservices for event ingestion and background processing.
- Worked with PostgreSQL, queues, and idempotent workers for reliable delivery.
- Improved CI stability with integration tests around critical API paths.

EDUCATION
BSc Computer Science | Technical University of Berlin | 2020

SKILLS
Node.js, TypeScript, Express, PostgreSQL, Redis, Docker, REST APIs, Git, Agile`,
    jobText: `Backend Software Engineer (Node.js / TypeScript)

We need a backend engineer to design and ship APIs for our multi-tenant SaaS platform.

Responsibilities:
- Design and implement RESTful APIs with Node.js and TypeScript.
- Own PostgreSQL schema, migrations, and query performance.
- Add caching (Redis), background jobs, and async workflows where needed.
- Implement secure authentication (JWT) and role-based access control.
- Partner with frontend and DevOps; improve observability and on-call readiness.
- Write automated tests and participate in code reviews.

Requirements:
- 3+ years backend development experience.
- Strong Node.js, TypeScript, PostgreSQL, and REST API design skills.
- Experience with Redis, Docker, and production troubleshooting.
- Familiar with software architecture, testing, and CI/CD.

Nice to have:
- Microservices, Kubernetes, infrastructure-as-code, message brokers.`,
  },
  {
    id: "frontend",
    label: "Frontend Engineer",
    summary:
      "Product UI, performance, and accessibility—sample CV + job you can optimize immediately.",
    highlights: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Testing"],
    cvText: `Samira Okonkwo
Lisbon, Portugal
samira.ok@email.com | +351 9xx xxx xxx | linkedin.com/in/samiraokonkwo

PROFESSIONAL SUMMARY
Frontend engineer with 3+ years building responsive web apps in React and TypeScript. Passionate about accessible UI, fast interactions, and working closely with design and backend teams.

EXPERIENCE

Frontend Developer | BrightCart | 2022 - Present
- Built customer dashboards with React, Next.js, TypeScript, and Tailwind CSS.
- Improved perceived performance via code-splitting, lazy loading, and image optimization.
- Created reusable component patterns shared across three product surfaces.
- Integrated REST APIs with robust loading, empty, and error UX.
- Partnered with designers on component specs and accessibility improvements.

Junior Web Developer | StudioNorth | 2020 - 2022
- Implemented marketing sites and onboarding flows with React and JavaScript.
- Refactored legacy forms to improve validation and conversion metrics.

EDUCATION
BSc Information Systems | University of Lisbon | 2020

SKILLS
React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, REST APIs, Git`,
    jobText: `Frontend Engineer (React / Next.js)

We are hiring a frontend engineer to build a fast, accessible product experience.

Responsibilities:
- Implement feature UI in React and Next.js with TypeScript.
- Collaborate with design on accessible, responsive layouts.
- Optimize performance (Core Web Vitals, bundle size, rendering).
- Integrate REST APIs and handle loading/error states thoughtfully.
- Write tests (Jest / React Testing Library) and maintain high quality.

Requirements:
- 2+ years frontend development experience.
- Strong React, Next.js, TypeScript, and modern CSS skills.
- Solid understanding of performance basics and component architecture.
- Experience with Git and working in agile teams.

Nice to have:
- Tailwind CSS, Storybook, analytics, A/B testing experience.`,
  },
  {
    id: "fullstack",
    label: "Full Stack Engineer",
    summary:
      "End-to-end features from API to UI—useful for testing full-role optimization.",
    highlights: ["API Design", "React", "Node.js", "SQL", "CI/CD"],
    cvText: `Jordan Rivera
Remote (EU)
jordan.rivera@email.com | +34 6xx xxx xxx

PROFESSIONAL SUMMARY
Full stack engineer with 4 years delivering SaaS features across Node.js APIs and React UIs. Comfortable owning a slice of product from database schema to polished interface.

EXPERIENCE

Full Stack Engineer | FlowDesk | 2021 - Present
- Shipped billing and workflow features using Node.js, PostgreSQL, and React.
- Designed pragmatic REST endpoints and coordinated versioning with mobile/web clients.
- Improved reliability with better validation, monitoring, and rollout practices.
- Collaborated with product to scope MVPs and iterate based on usage data.

Software Developer | Craftline | 2019 - 2021
- Built admin tooling and customer-facing modules with React and Express.
- Contributed to SQL schema improvements and reporting dashboards.

EDUCATION
BSc Software Engineering | Complutense University | 2019

SKILLS
Node.js, TypeScript, React, PostgreSQL, SQL, REST APIs, Docker, Git, CI/CD`,
    jobText: `Full Stack Engineer

Join our team to build customer-facing workflows end-to-end.

Responsibilities:
- Implement backend services (Node.js, TypeScript) and SQL data models.
- Build UI features in React with a focus on usability and consistency.
- Own API contracts between frontend and backend teams.
- Participate in testing, code review, and CI/CD improvements.
- Help troubleshoot production issues across the stack.

Requirements:
- 3+ years full stack or combined backend + frontend experience.
- Strong skills in Node.js, TypeScript, React, and SQL (PostgreSQL preferred).
- Experience shipping features in production SaaS environments.
- Pragmatic approach to architecture, testing, and delivery.

Nice to have:
- Docker, background jobs, observability tooling, billing domains.`,
  },
];
