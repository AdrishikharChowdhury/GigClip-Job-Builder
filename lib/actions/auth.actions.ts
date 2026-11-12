"use server";

import { employeeSchema, employerSchema } from "@/lib/schema";

import {
  getUserByEmail,
  createUserWithProfile,
  getUserById,
} from "@/lib/db/user.db";

import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { AuthResult, Data, UserProfile, Values } from "@/types/type";
import { console } from "node:inspector/promises";
import { db } from "../db";
import { employeeProfiles, employerProfiles } from "../db/schema";
import { eq } from "drizzle-orm";

export async function registerUser(values: unknown): Promise<AuthResult> {
  // Make sure the submitted value is an object
  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return {
      success: false,
      message: "Invalid registration data.",
    };
  }

  const role = (values as { role?: unknown }).role;

  // Employee registration
  if (role === "employee") {
    const parsed = employeeSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please check your registration details.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    if (parsed.data.role !== "employee") {
      return {
        success: false,
        message: "Invalid account role.",
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

      const data: Data = await createUserWithProfile({
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
        data: data,
        message: "Employee account created successfully!",
      };
    } catch (error) {
      console.error("Employee registration error:", error);

      return {
        success: false,
        message: "Unable to create your account. Please try again.",
      };
    }
  }

  // Employer registration
  if (role === "employer") {
    const parsed = employerSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please check your registration details.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    if (parsed.data.role !== "employer") {
      return {
        success: false,
        message: "Invalid account role.",
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

      const data: Data = await createUserWithProfile({
        name,
        email: normalizedEmail,
        passwordHash,
        role: "employer",
        company,
        bio,
      });

      return {
        success: true,
        data,
        message: "Employer account created successfully!",
      };
    } catch (error) {
      console.error("Employer registration error:", error);

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
  try {
    if (!values || typeof values !== "object" || Array.isArray(values)) {
      return {
        success: false,
        message: "Invalid registration data.",
      };
    }
    const { email, password } = values;

    if (email == "" || password == "") {
      return {
        success: false,
        message: "Email or Password Not Entered",
      };
    }

    const normalizedEmail = email.trim().toLowerCase();

    const data: Data = await getUserByEmail(normalizedEmail);

    if (!data) {
      return {
        success: false,
        message: "Email Not Found",
      };
    }

    const isValid = await verifyPassword(password, data.passwordHash);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid Email or Password",
      };
    }

    const userProfile: UserProfile =
      data.role === "employee"
        ? await db
            .select()
            .from(employeeProfiles)
            .where(eq(employeeProfiles.userId, data.id))
        : data.role === "employer"
          ? await db
              .select()
              .from(employerProfiles)
              .where(eq(employerProfiles.userId, data.id))
          : null;

    if (!userProfile) {
      return {
        success: false,
        message: "Something Went Wrong!!",
      };
    }

    const updatedUserProfile = {
      ...userProfile,
      role: data.role,
    };

    return {
      success: true,
      data: updatedUserProfile,
      message: "Employer logged in successfully!",
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Unable to login. Please try again.",
    };
  }
}
