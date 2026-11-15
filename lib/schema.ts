import * as z from "zod";
import { normalizeSkills } from "./db/utils";

const BIO = z
  .string()
  .min(20, "Bio must be at least 20 characters.")
  .max(100, "Bio must be at most 100 characters.");

const PASSWORD = z
  .string()
  .min(8, "Password must be at least 8 characters.");

const SKILLS = z.preprocess(
  normalizeSkills,
  z.array(z.string()).min(1, "Add at least one skill.")
);

export const employeeSchema = z.object({
  name: z.string().min(5).max(32),
  email: z.string().email(),
  password: PASSWORD,
  jobTitle: z.string().min(2, "Job title is required."),
  skills: SKILLS,
  bio: BIO,
  role: z.literal("employee"),
});

export const employerSchema = z.object({
  name: z.string().min(5).max(32),
  email: z.string().email(),
  password: PASSWORD,
  company: z.string().min(2, "Company name is required."),
  bio: BIO,
  role: z.literal("employer"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required."),
});

export const employeeProfileSchema = z.object({
  name: z.string().min(5).max(32),
  jobTitle: z.string().min(2, "Job title is required."),
  skills: SKILLS,
  bio: BIO,
});

export const employerProfileSchema = z.object({
  name: z.string().min(5).max(32),
  company: z.string().min(2, "Company name is required."),
  bio: BIO,
});

export type EmployeeValues = z.infer<typeof employeeSchema>;
export type EmployerValues = z.infer<typeof employerSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type EmployeeProfileValues = z.infer<typeof employeeProfileSchema>;
export type EmployerProfileValues = z.infer<typeof employerProfileSchema>;
