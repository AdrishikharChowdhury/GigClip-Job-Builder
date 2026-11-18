"use server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { employeeProfiles, employerProfiles } from "@/lib/db/schema";
import { createUserWithProfile, getUserByEmail } from "@/lib/db/user.db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { employeeSchema, employerSchema } from "@/lib/schema";
import type { AuthResult, Values } from "@/types/type";
import { encodeDbUid } from "../sqidsHelper";

export async function registerUser(values: unknown): Promise<AuthResult> {
  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return {
      success: false,
      message: "Invalid registration data.",
    };
  }

  const role = (values as { role?: unknown }).role;

  if (role === "employee") {
    const parsed = employeeSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please check your registration details.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const { name, email, password, jobTitle, skills, bio } = parsed.data;

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await getUserByEmail(normalizedEmail);

      if (existingUser) {
        return {
          success: false,
          message: "An account with this email already exists.",
        };
      }

      const passwordHash = await hashPassword(password);

      const user = await createUserWithProfile({
        name,
        email: normalizedEmail,
        passwordHash,
        role: "employee",
        jobTitle,
        skills,
        bio,
      });

      return {
        success: true,
        data: { id: encodeDbUid(user.id), role: user.role },
        message: "Employee account created successfully!",
      };
    } catch {
      return {
        success: false,
        message: "Unable to create your account. Please try again.",
      };
    }
  }

  if (role === "employer") {
    const parsed = employerSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please check your registration details.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const { name, email, password, company, bio } = parsed.data;

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await getUserByEmail(normalizedEmail);

      if (existingUser) {
        return {
          success: false,
          message: "An account with this email already exists.",
        };
      }

      const passwordHash = await hashPassword(password);

      const user = await createUserWithProfile({
        name,
        email: normalizedEmail,
        passwordHash,
        role: "employer",
        company: company,
        bio,
      });

      return {
        success: true,
        data: { id: encodeDbUid(user.id), role: user.role },
        message: "Employer account created successfully!",
      };
    } catch {
      return {
        success: false,
        message: "Unable to create your account. Please try again.",
      };
    }
  }

  return {
    success: false,
    message: "Invalid account role.",
  };
}

export async function loginUser(values: Values): Promise<AuthResult> {
  const email =
    typeof values?.email === "string" ? values.email.trim().toLowerCase() : "";
  const password =
    typeof values?.password === "string" ? values.password : "";

  if (!email || !password) {
    return {
      success: false,
      message: "Email or Password Not Entered",
    };
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "Email Not Found",
      };
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid Email or Password",
      };
    }

    const [profile] =
      user.role === "employee"
        ? await db
            .select({ id: employeeProfiles.id })
            .from(employeeProfiles)
            .where(eq(employeeProfiles.userId, user.id))
            .limit(1)
        : await db
            .select({ id: employerProfiles.id })
            .from(employerProfiles)
            .where(eq(employerProfiles.userId, user.id))
            .limit(1);

    if (!profile) {
      return {
        success: false,
        message: "Something Went Wrong!!",
      };
    }

    return {
      success: true,
      data: { id: encodeDbUid(user.id), role: user.role },
      message:
        user.role === "employee"
          ? "Logged in as a candidate."
          : "Logged in as an employer.",
    };
  } catch {
    return {
      success: false,
      message: "Unable to login. Please try again.",
    };
  }
}
