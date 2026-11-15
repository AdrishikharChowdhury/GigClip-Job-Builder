
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";

import { db } from "@/lib/db";
import {
  users,
  employeeProfiles,
  employerProfiles,
} from "@/lib/db/schema";
import { dicebearAvatar } from "@/lib/avatar";

// Find a user by email
export async function getUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  return user ?? null;
}

// Find a user by ID
export async function getUserById(id: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return user ?? null;
}

// Create an employee or employer account and profile
export async function createUserWithProfile(data: {
  name: string;
  email: string;
  passwordHash: string;
  role: "employee" | "employer";
  jobTitle?: string;
  skills?: string[];
  company?: string;
  bio: string;
}) {
  return await db.transaction(async (tx) => {
    const id = randomUUID();

    const [user] = await tx
      .insert(users)
      .values({
        id,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        passwordHash: data.passwordHash,
        role: data.role,
        image: dicebearAvatar(id),
      })
      .returning();

    if (data.role === "employee") {
      await tx.insert(employeeProfiles).values({
        userId: user.id,
        jobTitle: data.jobTitle!,
        skills: data.skills!,
        bio: data.bio,
      });
    } else {
      await tx.insert(employerProfiles).values({
        userId: user.id,
        company: data.company!,
        bio: data.bio,
      });
    }

    return user;
  });
}
