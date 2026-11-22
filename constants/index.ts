import { dateFormatter } from "@/lib/db/utils";
import {
  FailedGig,
  FeedbackCard,
  Gig,
  GigAccent,
  GigBudget,
  GigFailureReason,
  GigGroup,
  GigStatus,
  GigStatusMeta,
  LandingLink,
} from "@/types/type";
import {
  BriefcaseBusiness,
  CircleDollarSign,
  Clock3,
  Layers,
  LayoutTemplate,
  MapPin,
  Snowflake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const landingLinks: LandingLink[] = [
  { href: "#home", label: "Home" },
  { href: "#jobs", label: "Jobs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
  { href: "/sign-up", label: "Get Started", cta: true },
];

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea";
  placeholder: string;
  hint?: string;
};

export const EMPLOYEE_FORM_FIELDS: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Jane Applicant" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jane@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 characters",
  },
  {
    name: "jobTitle",
    label: "Job Title",
    type: "text",
    placeholder: "Product Designer",
  },
  {
    name: "skills",
    label: "Skills",
    type: "text",
    placeholder: "Figma, Prototyping, Research",
    hint: "Separate skills with commas",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell employers what you ship...",
  },
];

export const EMPLOYER_FORM_FIELDS: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Alex Recruiter" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "alex@company.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 characters",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Nova Studio",
  },
  {
    name: "bio",
    label: "About the Company",
    type: "textarea",
    placeholder: "What does your team build?",
  },
];

export const TESTIMONIALS: FeedbackCard[] = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Designer",
    company: "Nova Studio",
    text: "The pastel aesthetic and inflated type made me feel immediately creative. Best job board I've used this year.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mike R.",
    role: "Developer",
    company: "Sticker Labs",
    text: "Great platform for finding design-focused roles. The card-based interface is intuitive and applying takes under a minute.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma K.",
    role: "Product Manager",
    company: "Pastel Pay",
    text: "I love how the sticker theme isn't gimmicky — it's functional, clean, and the card layouts are well-structured.",
    rating: 5,
  },
  {
    id: 4,
    name: "David L.",
    role: "Writer",
    company: "Confetti Co",
    text: "Finally a job board that feels like art, not a spreadsheet. Tracking my application status is genuinely delightful.",
    rating: 4,
  },
  {
    id: 5,
    name: "Lisa T.",
    role: "Marketing",
    company: "Ribbon Cloud",
    text: "As a designer, the whole vibe resonates with me. Would love to see more roles added regularly.",
    rating: 5,
  },
];

export const AVATAR_COLORS = [
  "bg-sunburst",
  "bg-mint-pop",
  "bg-lavender",
  "bg-electric-blue",
  "bg-ember",
];

export const MARQUEE_ITEMS = [
  "Find the perfect job for you",
  "New roles added daily",
  "Apply in under a minute",
  "Track every application",
];

export const NAVIGATE_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#jobs", label: "Jobs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const JOB_TYPE_LINKS = [
  { label: "Full-Time", glyph: "FT", color: "bg-sunburst" },
  { label: "Part-Time", glyph: "PT", color: "bg-mint-pop" },
  { label: "Contract", glyph: "CT", color: "bg-lavender" },
  { label: "Internship", glyph: "IN", color: "bg-electric-blue" },
  { label: "Remote", glyph: "RE", color: "bg-voltage-violet" },
];

export const COLUMN_TITLE_CLASS =
  "mb-4 text-[12px] font-bold uppercase tracking-[0.032em] text-paper-white/50";

export const LINK_CLASS =
  "text-[14px] font-medium tracking-[-0.01px] text-paper-white/70 transition-colors hover:text-paper-white";

export const FAQ_ITEMS = [
  {
    question: "Is GigClip free to use?",
    answer:
      "Yes. Candidates pay nothing, ever. Posting a job is also free during the demo — the whole board runs on stickers and good intentions.",
  },
  {
    question: "What do I need to apply for a job?",
    answer:
      "Just one resume (PDF, DOC/DOCX, TXT or ODT, under 5 MB) and an optional cover note. The whole application takes under a minute.",
  },
  {
    question: "How do employers review applications?",
    answer:
      "Every application lands on the employer's desk with the resume attached. They move it through statuses — submitted, reviewing, interview, offered — and you get an email + in-app alert on every change.",
  },
  {
    question: "Can I use GigClip on my phone?",
    answer:
      "Absolutely. The entire site is mobile-first — search, apply, post and review from any screen size, pill buttons included.",
  },
  {
    question: "Is my resume safe?",
    answer:
      "Your resume lives only on your profile and is visible to the employer of the job you applied to. Nothing is shared publicly, ever.",
  },
  {
    question: "How do I try the demo?",
    answer:
      "Use employer@demo.com or candidate@demo.com with password demo1234 — both roles are pre-loaded with sample data so you can click around instantly.",
  },
];

export const STEPS = [
  {
    numeral: "01",
    title: "SEARCH",
    color: "bg-sunburst",
    body: "Type a keyword, pick a location and filter by full-time, remote or contract — the board narrows down to your match.",
  },
  {
    numeral: "02",
    title: "CLIP & APPLY",
    color: "bg-mint-pop",
    body: "Attach one resume and a short note. Your application clips straight onto the employer's board in under a minute.",
  },
  {
    numeral: "03",
    title: "GET UPDATES",
    color: "bg-lavender",
    body: "Track submitted → reviewing → interview → offered. Email and in-app alerts land the moment the status changes.",
  },
];

export const JOB_VARIETIES = [
  {
    glyph: "FT",
    title: "Full-Time",
    color: "bg-sunburst",
    blurb:
      "The intentional nine-to-five: real benefits, a real team, and a corner of the sticker universe to call home.",
    openings: "40+",
  },
  {
    glyph: "PT",
    title: "Part-Time",
    color: "bg-mint-pop",
    blurb:
      "Balanced by design — school, family or a side hustle gets equal billing with the work.",
    openings: "15+",
  },
  {
    glyph: "CT",
    title: "Contract",
    color: "bg-lavender",
    blurb:
      "Fixed-scope missions for craftspeople who ship hard and bounce clean.",
    openings: "12+",
  },
  {
    glyph: "IN",
    title: "Internship",
    color: "bg-electric-blue",
    blurb: "Green horns welcome. Mentorship-heavy roles to cut your teeth on.",
    openings: "8+",
  },
  {
    glyph: "RE",
    title: "Remote",
    color: "bg-voltage-violet",
    blurb: "Anywhere with Wi-Fi and a good chair. No commute, no compromise.",
    openings: "20+",
  },
];

export const LABEL_CLASS =
  "mb-2 block text-[12px] font-bold uppercase tracking-[0.032em]";

export const FIELD_CLASS =
  "w-full rounded-cards border border-carbon bg-paper-white px-5 py-3 text-[15px] font-medium tracking-[-0.01px] placeholder:text-carbon/40 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

export const GIG_STATUS_META: Record<GigStatus, GigStatusMeta> = {
  ongoing: { label: "In progress", tone: "electric-blue", glyph: "Timer" },
  failed: { label: "Deadline reached", tone: "ember", glyph: "AlarmClockOff" },
  completed: { label: "Completed", tone: "mint-pop", glyph: "CircleCheck" },
};

export const GIG_FAILURE_REASON_LABELS: Record<GigFailureReason, string> = {
  "deadline-missed": "Deadline missed",
  "scope-abandoned": "Scope abandoned",
  "client-cancelled": "Client cancelled",
};

export const GIG_FAILURE_COPY: Record<GigFailureReason, string> = {
  "deadline-missed":
    "The deadline landed before the final handoff was ready to ship.",
  "scope-abandoned": "The brief grew past what this gig was set up to deliver.",
  "client-cancelled":
    "The client pulled the plug before the work reached the finish line.",
};

export const GIG_ACCENT_CLASS: Record<GigAccent, string> = {
  "electric-blue": "bg-electric-blue",
  "mint-pop": "bg-mint-pop",
  lavender: "bg-lavender",
  sunburst: "bg-sunburst",
  "voltage-violet": "bg-voltage-violet",
  ember: "bg-ember",
};

export const GIG_SKILL_TONES = [
  "bg-sunburst",
  "bg-mint-pop",
  "bg-lavender",
  "bg-electric-blue",
  "bg-soft-mist",
];

export const GIG_GLYPH_ICONS: Record<string, LucideIcon> = {
  LayoutTemplate,
  Layers,
  Snowflake,
};

export const formatGigBudget = (amount: number, type: GigBudget["type"]) =>
  `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)}${type === "hourly" ? "/hr" : ""}`;

export const getGigHref = (gig: Gig) =>
  `/hub/empee/gigs/${gig.status}/${gig.id}`;

export type GigFactCard = {
  label: string;
  value: string;
  note: string;
  tone: string;
  icon?: LucideIcon;
};

export const getFailedGigFacts = (gig: FailedGig): GigFactCard[] => [
  {
    label: "Client",
    value: gig.client,
    note: "Commissioned this gig",
    icon: BriefcaseBusiness,
    tone: "bg-sunburst",
  },
  {
    label: "Budget",
    value: formatGigBudget(gig.budget.amount, gig.budget.type),
    note: gig.budget.type === "fixed" ? "Fixed price" : "Hourly rate",
    icon: CircleDollarSign,
    tone: "bg-mint-pop",
  },
  {
    label: "Duration",
    value: gig.duration,
    note: "Planned timeline",
    icon: Clock3,
    tone: "bg-lavender",
  },
  {
    label: "Location",
    value: gig.location,
    note: "Work arrangement",
    icon: MapPin,
    tone: "bg-electric-blue",
  },
];

export const getFailedGigDates = (gig: FailedGig): GigFactCard[] => [
  {
    label: "Posted",
    value: dateFormatter(gig.postedAt),
    note: "Gig went live",
    tone: "bg-soft-mist",
  },
  {
    label: "Started",
    value: dateFormatter(gig.startedAt),
    note: "Work kicked off",
    tone: "bg-soft-mist",
  },
  {
    label: "Deadline",
    value: dateFormatter(gig.deadline),
    note: "Original due date",
    tone: "bg-sunburst",
  },
  {
    label: "Marked failed",
    value: dateFormatter(gig.failedAt),
    note: "Record closed",
    tone: "bg-ember",
  },
];

export const SAMPLE_GIGS: Gig[] = [
  {
    id: "gig-001",
    status: "ongoing",
    title: "Design System Revamp",
    client: "Nova Studio",
    blurb:
      "Refresh the component library, tokens and docs ahead of the v3 launch.",
    skills: ["Figma", "Design Tokens", "Documentation"],
    budget: { amount: 3200, currency: "USD", type: "fixed" },
    duration: "4 weeks",
    location: "Remote",
    glyph: "PenTool",
    accent: "electric-blue",
    postedAt: "2026-11-02",
    deadline: "2026-11-28",
    startedAt: "2026-11-04",
    progress: 45,
    milestonesDone: 2,
    milestonesTotal: 5,
  },
  {
    id: "gig-004",
    status: "ongoing",
    title: "Mobile Onboarding Flow",
    client: "Sundae Labs",
    blurb:
      "Design and ship the first-run experience for the iOS app, from welcome screens to account setup.",
    skills: ["React Native", "Motion", "Prototyping"],
    budget: { amount: 5400, currency: "USD", type: "fixed" },
    duration: "5 weeks",
    location: "Remote",
    glyph: "Smartphone",
    accent: "lavender",
    postedAt: "2026-10-28",
    deadline: "2026-12-12",
    startedAt: "2026-11-03",
    progress: 30,
    milestonesDone: 1,
    milestonesTotal: 4,
  },
  {
    id: "gig-005",
    status: "ongoing",
    title: "Checkout Flow Audit",
    client: "Orbit Freight",
    blurb:
      "Map the current checkout, run five usability sessions and hand over a prioritised fix list.",
    skills: ["UX Research", "Figma", "Analytics"],
    budget: { amount: 70, currency: "USD", type: "hourly" },
    duration: "3 weeks",
    location: "Hybrid — Berlin",
    glyph: "Compass",
    accent: "sunburst",
    postedAt: "2026-11-05",
    deadline: "2026-12-05",
    startedAt: "2026-11-08",
    progress: 62,
    milestonesDone: 3,
    milestonesTotal: 5,
  },
  {
    id: "gig-006",
    status: "ongoing",
    title: "Design Ops Playbook",
    client: "Sticker Club",
    blurb:
      "Write the team's review ritual, file conventions and handoff checklist into one living doc.",
    skills: ["Design Ops", "Notion", "Facilitation"],
    budget: { amount: 2800, currency: "USD", type: "fixed" },
    duration: "4 weeks",
    location: "Remote",
    glyph: "NotebookPen",
    accent: "voltage-violet",
    postedAt: "2026-11-10",
    deadline: "2026-12-19",
    startedAt: "2026-11-12",
    progress: 18,
    milestonesDone: 1,
    milestonesTotal: 6,
  },
  {
    id: "gig-007",
    status: "ongoing",
    title: "Analytics Dashboard Redesign",
    client: "Marmalade",
    blurb:
      "Rework the reporting dashboard around three questions the team actually asks every Monday.",
    skills: ["Product Design", "Data Viz", "Figma"],
    budget: { amount: 6800, currency: "USD", type: "fixed" },
    duration: "6 weeks",
    location: "Remote",
    glyph: "Gauge",
    accent: "mint-pop",
    postedAt: "2026-10-20",
    deadline: "2026-12-24",
    startedAt: "2026-10-24",
    progress: 55,
    milestonesDone: 3,
    milestonesTotal: 6,
  },
  {
    id: "gig-008",
    status: "ongoing",
    title: "Podcast Cover Art Series",
    client: "Bubblegum FM",
    blurb:
      "Eight episode covers in one sticker language, delivered weekly alongside the show.",
    skills: ["Illustration", "Procreate", "Brand"],
    budget: { amount: 45, currency: "USD", type: "hourly" },
    duration: "2 weeks",
    location: "Remote",
    glyph: "Mic",
    accent: "electric-blue",
    postedAt: "2026-11-12",
    deadline: "2026-11-30",
    startedAt: "2026-11-14",
    progress: 22,
    milestonesDone: 1,
    milestonesTotal: 3,
  },
  {
    id: "gig-002",
    status: "failed",
    title: "Marketing Site Rebuild",
    client: "Confetti Co",
    blurb:
      "Ship the new Next.js marketing site with a CMS-backed blog and pricing page.",
    skills: ["Next.js", "Tailwind CSS", "CMS"],
    budget: { amount: 4800, currency: "USD", type: "fixed" },
    duration: "6 weeks",
    location: "Remote",
    glyph: "LayoutTemplate",
    accent: "ember",
    postedAt: "2026-09-15",
    deadline: "2026-11-06",
    startedAt: "2026-09-18",
    failedAt: "2026-11-07",
    progress: 72,
    reason: "deadline-missed",
    failureReason:
      "The CMS integration ran long, and the site was still in QA when the deadline passed.",
  },
  {
    id: "gig-012",
    status: "failed",
    title: "CRM Integration Dashboard",
    client: "Copperline",
    blurb:
      "Wire the sales pipeline into one screen, until the scope tripled mid-sprint.",
    skills: ["React", "tRPC", "Postgres"],
    budget: { amount: 7200, currency: "USD", type: "fixed" },
    duration: "8 weeks",
    location: "Remote",
    glyph: "Layers",
    accent: "voltage-violet",
    postedAt: "2026-07-20",
    deadline: "2026-10-12",
    startedAt: "2026-07-25",
    failedAt: "2026-10-14",
    progress: 46,
    reason: "scope-abandoned",
    failureReason:
      "The scope tripled mid-sprint, adding dashboards and exports that were never in the original brief.",
  },
  {
    id: "gig-013",
    status: "failed",
    title: "Holiday Campaign Illustrations",
    client: "Tinsel & Co",
    blurb:
      "Six seasonal illustrations for print and social, shelved when the campaign was pulled.",
    skills: ["Illustration", "Art Direction", "Print"],
    budget: { amount: 3200, currency: "USD", type: "fixed" },
    duration: "4 weeks",
    location: "Remote",
    glyph: "Snowflake",
    accent: "lavender",
    postedAt: "2026-09-02",
    deadline: "2026-10-02",
    startedAt: "2026-09-05",
    failedAt: "2026-10-03",
    progress: 28,
    reason: "client-cancelled",
    failureReason:
      "The client pulled the campaign before the second round of illustrations could be approved.",
  },
  {
    id: "gig-003",
    status: "completed",
    title: "Brand Illustration Set",
    client: "Pastel Pay",
    blurb:
      "Twelve sticker-style illustrations for onboarding and the wallet screen.",
    skills: ["Illustration", "Vector", "Brand"],
    budget: { amount: 55, currency: "USD", type: "hourly" },
    duration: "3 weeks",
    location: "Remote",
    glyph: "Palette",
    accent: "mint-pop",
    postedAt: "2026-09-28",
    deadline: "2026-10-30",
    startedAt: "2026-10-01",
    completedAt: "2026-10-27",
    rating: 5,
    payout: 1540,
  },
  {
    id: "gig-009",
    status: "completed",
    title: "Wallet Onboarding Copy",
    client: "Coinpurse",
    blurb:
      "Rewrote the first four wallet screens from feature lists into plain, human sentences.",
    skills: ["UX Writing", "Copywriting", "Tone of Voice"],
    budget: { amount: 38, currency: "USD", type: "hourly" },
    duration: "2 weeks",
    location: "Remote",
    glyph: "PencilLine",
    accent: "lavender",
    postedAt: "2026-08-18",
    deadline: "2026-09-12",
    startedAt: "2026-08-21",
    completedAt: "2026-09-09",
    rating: 4,
    payout: 1140,
  },
  {
    id: "gig-010",
    status: "completed",
    title: "Sticker Pack Illustration",
    client: "Sticker Club",
    blurb:
      "Twenty-four cut-out stickers with black outlines, packed for web and print.",
    skills: ["Illustration", "Vector", "Packaging"],
    budget: { amount: 2600, currency: "USD", type: "fixed" },
    duration: "3 weeks",
    location: "Remote",
    glyph: "Sticker",
    accent: "sunburst",
    postedAt: "2026-07-06",
    deadline: "2026-08-14",
    startedAt: "2026-07-09",
    completedAt: "2026-08-11",
    rating: 5,
    payout: 2600,
  },
  {
    id: "gig-011",
    status: "completed",
    title: "Landing Page Motion Pass",
    client: "Pastel Pay",
    blurb:
      "Added scroll-timed motion to the hero and pricing sections without a single gradient.",
    skills: ["After Effects", "Motion", "Web"],
    budget: { amount: 60, currency: "USD", type: "hourly" },
    duration: "2 weeks",
    location: "Remote",
    glyph: "Clapperboard",
    accent: "voltage-violet",
    postedAt: "2026-06-15",
    deadline: "2026-07-03",
    startedAt: "2026-06-18",
    completedAt: "2026-07-01",
    rating: 5,
    payout: 2160,
  },
];

export const SAMPLE_GIG_GROUPS: GigGroup[] = (
  ["ongoing", "failed", "completed"] as const
).map((status) => ({
  status,
  label: GIG_STATUS_META[status].label,
  gigs: SAMPLE_GIGS.filter((gig) => gig.status === status),
}));

export const empeeLinks = [
  {
    label: "Hub",
    link: "/hub/empee",
  },
  {
    label: "My Gigs",
    link: "/hub/empee/gigs",
  },
  {
    label: "Gig Board",
    link: "/hub/board",
  },
];

export const SECTION_ORDER: GigStatus[] = ["ongoing", "completed", "failed"];

export const SECTION_TITLES: Record<GigStatus, string> = {
  ongoing: "Ongoing Tasks",
  completed: "Completed Tasks",
  failed: "Failed Tasks",
};