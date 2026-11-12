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

export type AuthResult =
  | {
      success: true;
      data: EmployeeData;
      message: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

// Type '{ name: string; email: string; role: "employee" | "employer"; id: string; passwordHash: string; createdAt: Date; updatedAt: Date; }' is missing the following properties from type 'EmployeeData': jobTitle, skills, bio

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
