"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  employeeProfiles,
  employerProfiles,
  users,
} from "@/lib/db/schema";
import { getUserById } from "@/lib/db/user.db";
import { dicebearAvatar } from "@/lib/avatar";
import { deleteAvatar, uploadAvatar } from "@/lib/cloudinary";
import {
  employeeProfileSchema,
  employerProfileSchema,
} from "@/lib/schema";

export type ProfileFailure = {
  success: false;
  message: string;
};

export type EmployeeProfile = {
  role: "employee";
  name: string;
  email: string;
  jobTitle: string;
  skills: string[];
  bio: string;
  image: string;
};

export type EmployerProfile = {
  role: "employer";
  name: string;
  email: string;
  company: string;
  bio: string;
  image: string;
};

export type EmployeeProfileResult =
  | ProfileFailure
  | { success: true; data: EmployeeProfile; message: string };

export type EmployerProfileResult =
  | ProfileFailure
  | { success: true; data: EmployerProfile; message: string };

export type UpdateProfileResult =
  | { success: true; message: string; image: string }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

function stringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function resolveAvatar(formData: FormData, userId: string) {
  const user = await getUserById(userId);

  if (!user) {
    return { ok: false as const, message: "Account not found." };
  }

  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return {
      ok: true as const,
      image: user.image ?? dicebearAvatar(userId),
      imagePublicId: user.imagePublicId,
    };
  }

  if (!file.type.startsWith("image/")) {
    return {
      ok: false as const,
      message: "Choose an image file (PNG, JPG, WebP or GIF).",
    };
  }

  if (file.size > MAX_AVATAR_BYTES) {
    return { ok: false as const, message: "Image must be 5 MB or smaller." };
  }

  try {
    const uploaded = await uploadAvatar(
      Buffer.from(await file.arrayBuffer()),
    );

    await deleteAvatar(user.imagePublicId);

    return {
      ok: true as const,
      image: uploaded.url,
      imagePublicId: uploaded.publicId,
    };
  } catch (error) {
    return {
      ok: false as const,
      message:
        error instanceof Error
          ? `Image upload failed: ${error.message}`
          : "Image upload failed.",
    };
  }
}

export async function fetchProfileById(
  profileId: string,
  role: "employee",
): Promise<EmployeeProfileResult>;
export async function fetchProfileById(
  profileId: string,
  role: "employer",
): Promise<EmployerProfileResult>;
export async function fetchProfileById(
  profileId: string,
  role: "employee" | "employer",
): Promise<EmployeeProfileResult | EmployerProfileResult> {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: "Not authenticated." };
  }

  if (session.user.role !== role || session.user.id !== profileId) {
    return { success: false, message: "Not authorized." };
  }

  if (role === "employee") {
    const [profile] = await db
      .select({
        name: users.name,
        email: users.email,
        image: users.image,
        jobTitle: employeeProfiles.jobTitle,
        skills: employeeProfiles.skills,
        bio: employeeProfiles.bio,
      })
      .from(employeeProfiles)
      .innerJoin(users, eq(users.id, employeeProfiles.userId))
      .where(eq(employeeProfiles.userId, profileId))
      .limit(1);

    if (!profile) {
      return { success: false, message: "Profile not found." };
    }

    return {
      success: true,
      data: {
        ...profile,
        role: "employee",
        image: profile.image ?? dicebearAvatar(profileId),
      },
      message: "Profile fetched.",
    };
  }

  const [profile] = await db
    .select({
      name: users.name,
      email: users.email,
      image: users.image,
      company: employerProfiles.company,
      bio: employerProfiles.bio,
    })
    .from(employerProfiles)
    .innerJoin(users, eq(users.id, employerProfiles.userId))
    .where(eq(employerProfiles.userId, profileId))
    .limit(1);

  if (!profile) {
    return { success: false, message: "Profile not found." };
  }

  return {
    success: true,
    data: {
      ...profile,
      role: "employer",
      image: profile.image ?? dicebearAvatar(profileId),
    },
    message: "Profile fetched.",
  };
}

export async function updateProfile(
  formData: FormData,
): Promise<UpdateProfileResult> {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: "Not authenticated." };
  }

  const userId = session.user.id;

  if (session.user.role === "employee") {
    const parsed = employeeProfileSchema.safeParse({
      name: stringField(formData, "name"),
      jobTitle: stringField(formData, "jobTitle"),
      skills: stringField(formData, "skills"),
      bio: stringField(formData, "bio"),
    });

    if (!parsed.success) {
      return {
        success: false,
        message: "Please check your details.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const avatar = await resolveAvatar(formData, userId);

    if (!avatar.ok) {
      return { success: false, message: avatar.message };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          name: parsed.data.name,
          image: avatar.image,
          imagePublicId: avatar.imagePublicId,
        })
        .where(eq(users.id, userId));

      await tx
        .update(employeeProfiles)
        .set({
          jobTitle: parsed.data.jobTitle,
          skills: parsed.data.skills,
          bio: parsed.data.bio,
        })
        .where(eq(employeeProfiles.userId, userId));
    });

    revalidatePath(`/hub/empee/${userId}`);
    revalidatePath(`/hub/empee/${userId}/edit`);

    return {
      success: true,
      message: "Profile updated.",
      image: avatar.image,
    };
  }

  const parsed = employerProfileSchema.safeParse({
    name: stringField(formData, "name"),
    company: stringField(formData, "company"),
    bio: stringField(formData, "bio"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check your details.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const avatar = await resolveAvatar(formData, userId);

  if (!avatar.ok) {
    return { success: false, message: avatar.message };
  }

  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({
        name: parsed.data.name,
        image: avatar.image,
        imagePublicId: avatar.imagePublicId,
      })
      .where(eq(users.id, userId));

    await tx
      .update(employerProfiles)
      .set({
        company: parsed.data.company,
        bio: parsed.data.bio,
      })
      .where(eq(employerProfiles.userId, userId));
  });

  revalidatePath(`/hub/emper/${userId}`);
  revalidatePath(`/hub/emper/${userId}/edit`);

  return {
    success: true,
    message: "Profile updated.",
    image: avatar.image,
  };
}
