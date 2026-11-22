import { ReactNode } from "react";

export type FeedbackCard = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
};

export type LandingLink = {
  href: string;
  label: string;
  cta?: boolean;
};

export type IconProps = {
  icon: string;
  position: string;
  color: string;
};

export type JobCardProps = {
  title: string;
  color: string;
  glyph: string;
  blurb: string;
  openings: string;
};

export type HIWCardProps = {
  numeral: string;
  title: string;
  body: string;
  color: string;
};

export type FAQCardProps = {
  question: string;
  index: number;
  answer: string;
};

export type SubmittedCardProps = {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ContactFormProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type FooterNavProps = {
  href: string;
  label: string;
};

export type JobLinkItemProps = {
  label: string;
  color: string;
  glyph: string;
};

export type EmployeeData = {
  id: string;
  role: "employer" | "employee";
};

export type AuthResult =
  | {
      success: true;
      data: EmployeeData;
      message: string;
    }
  | {
      success: false;
      data?: never;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

export type Data = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "employee" | "employer";
  jobTitle?: string;
  createdAt: Date;
  updatedAt: Date;
  skills?: string[];
  bio?: string;
  company?: string;
};

export type Values = {
  email: string;
  password: string;
};

export type UserProfile =
  | {
      id: string;
      userId: string;
      jobTitle: string;
      skills: string[];
      bio: string;
      createdAt: Date;
      updatedAt: Date;
      role?: "employee";
    }[]
  | {
      id: string;
      userId: string;
      company: string;
      bio: string;
      createdAt: Date;
      updatedAt: Date;
      role?: "employer";
    }[]
  | null;

export type Layout = {
  children: ReactNode;
};

export type GigStatus = "ongoing" | "failed" | "completed";

export type GigAccent =
  | "electric-blue"
  | "mint-pop"
  | "lavender"
  | "sunburst"
  | "voltage-violet"
  | "ember";

export type GigFailureReason =
  | "deadline-missed"
  | "scope-abandoned"
  | "client-cancelled";

export type GigBudget = {
  amount: number;
  currency: "USD";
  type: "fixed" | "hourly";
};

type GigBase = {
  id: string;
  title: string;
  client: string;
  blurb: string;
  skills: string[];
  budget: GigBudget;
  duration: string;
  location: string;
  glyph: string;
  accent: GigAccent;
  postedAt: string;
  deadline: string;
  startedAt: string;
};

export type OngoingGig = GigBase & {
  status: "ongoing";
  progress: number;
  milestonesDone: number;
  milestonesTotal: number;
};

export type FailedGig = GigBase & {
  status: "failed";
  progress: number;
  failedAt: string;
  reason: GigFailureReason;
  failureReason?: string;
};

export type CompletedGig = GigBase & {
  status: "completed";
  completedAt: string;
  rating: number;
  payout: number;
};

export type Gig = OngoingGig | FailedGig | CompletedGig;

export type GigStatusMeta = {
  label: string;
  tone: GigAccent;
  glyph: string;
};

export type GigGroup = {
  status: GigStatus;
  label: string;
  gigs: Gig[];
};

export type Props = {
  params: Promise<{ id: string }>;
};
