"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useWatch,
  type Resolver,
} from "react-hook-form";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  employeeProfileSchema,
  employerProfileSchema,
} from "@/lib/schema";
import { updateProfile } from "@/lib/actions/profile.actions";

type EmployeeDefaults = {
  name: string;
  jobTitle: string;
  skills: string;
  bio: string;
};

type EmployerDefaults = {
  name: string;
  company: string;
  bio: string;
};

type Props =
  | {
      role: "employee";
      userId: string;
      image: string;
      defaults: EmployeeDefaults;
    }
  | {
      role: "employer";
      userId: string;
      image: string;
      defaults: EmployerDefaults;
    };

type FormValues = {
  name: string;
  jobTitle?: string;
  skills?: string;
  company?: string;
  bio: string;
};

const LABEL_CLASS = "text-[12px] font-bold uppercase tracking-[0.032em]";
const INPUT_CLASS =
  "rounded-cards border border-carbon bg-paper-white px-4 py-3 text-[15px] font-medium tracking-[-0.01px] placeholder:text-carbon/40 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:opacity-60";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export default function ProfileEditForm(props: Props) {
  const { role, userId, image, defaults } = props;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(image);
  const [imageError, setImageError] = useState<string | null>(null);

  const isEmployee = role === "employee";

  const form = useForm<FormValues>({
    resolver: (isEmployee
      ? zodResolver(employeeProfileSchema)
      : zodResolver(employerProfileSchema)) as unknown as Resolver<FormValues>,
    mode: "onBlur",
    defaultValues: defaults as unknown as FormValues,
  });

  type FieldPath = Parameters<typeof form.register>[0];

  const bioLength =
    (useWatch({ control: form.control, name: "bio" }) as string | undefined)
      ?.length ?? 0;

  function fieldError(name: string): string | undefined {
    const errors = form.formState.errors as Record<
      string,
      { message?: string } | undefined
    >;
    return errors[name]?.message;
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];

    if (!selected) {
      return;
    }

    if (!selected.type.startsWith("image/")) {
      setImageError("Choose an image file (PNG, JPG, WebP or GIF).");
      return;
    }

    if (selected.size > MAX_IMAGE_BYTES) {
      setImageError("Image must be 5 MB or smaller.");
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(selected);
    objectUrlRef.current = objectUrl;

    setImageError(null);
    setFile(selected);
    setPreview(objectUrl);
  }

  async function onSubmit(values: FormValues) {
    const formData = new FormData();

    formData.set("name", values.name);
    formData.set("bio", values.bio);

    if (isEmployee) {
      const skills: unknown = (values as EmployeeDefaults).skills;

      formData.set("jobTitle", values.jobTitle ?? "");
      formData.set(
        "skills",
        Array.isArray(skills) ? skills.join(", ") : String(skills ?? ""),
      );
    } else {
      formData.set("company", values.company ?? "");
    }

    if (file) {
      formData.set("image", file);
    }

    const result = await updateProfile(formData);

    if (!result.success) {
      if (result.fieldErrors) {
        for (const [name, messages] of Object.entries(result.fieldErrors)) {
          const message = messages?.[0];
          if (message) {
            form.setError(name as FieldPath, { message });
          }
        }
      }

      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setPreview(result.image);
    setFile(null);
    router.push(isEmployee ? `/hub/empee/${userId}` : `/hub/emper/${userId}`);
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className={LABEL_CLASS}>Profile image</p>

        <div className="flex items-center gap-4">
          <Image
            key={preview}
            unoptimized
            src={preview}
            alt="Profile preview"
            width={88}
            height={88}
            className="size-22 rounded-full border border-carbon bg-paper-white object-cover"
          />

          <div className="flex flex-col gap-1">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-fit rounded-pills border border-carbon bg-paper-white px-4 py-2 text-[13px] font-bold tracking-[0.03em] text-carbon transition-colors hover:bg-soft-mist"
            >
              <ImagePlus className="size-4" />
              {file ? "Choose another" : "Upload photo"}
            </Button>
            <p className="text-[12px] font-medium leading-[1.56] tracking-[-0.01px] text-carbon/50">
              PNG, JPG, WebP or GIF · up to 5 MB
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />

        {imageError && (
          <p className="text-[13px] font-medium leading-[1.39] text-ember">
            {imageError}
          </p>
        )}
      </div>

      <FieldGroup className="gap-5">
        <Field data-invalid={Boolean(fieldError("name"))}>
          <FieldLabel htmlFor="edit-name" className={LABEL_CLASS}>
            Name
          </FieldLabel>
          <Input
            {...form.register("name" as FieldPath)}
            id="edit-name"
            placeholder="Your name"
            aria-invalid={Boolean(fieldError("name"))}
            className={INPUT_CLASS}
          />
          {fieldError("name") && (
            <p className="text-[13px] font-medium leading-[1.39] text-ember">
              {fieldError("name")}
            </p>
          )}
        </Field>

        {isEmployee ? (
          <>
            <Field data-invalid={Boolean(fieldError("jobTitle"))}>
              <FieldLabel htmlFor="edit-job-title" className={LABEL_CLASS}>
                Job title
              </FieldLabel>
              <Input
                {...form.register("jobTitle" as FieldPath)}
                id="edit-job-title"
                placeholder="Product Designer"
                aria-invalid={Boolean(fieldError("jobTitle"))}
                className={INPUT_CLASS}
              />
              {fieldError("jobTitle") && (
                <p className="text-[13px] font-medium leading-[1.39] text-ember">
                  {fieldError("jobTitle")}
                </p>
              )}
            </Field>

            <Field data-invalid={Boolean(fieldError("skills"))}>
              <FieldLabel htmlFor="edit-skills" className={LABEL_CLASS}>
                Skills
              </FieldLabel>
              <Input
                {...form.register("skills" as FieldPath)}
                id="edit-skills"
                placeholder="Figma, Prototyping, Research"
                aria-invalid={Boolean(fieldError("skills"))}
                className={INPUT_CLASS}
              />
              {fieldError("skills") ? (
                <p className="text-[13px] font-medium leading-[1.39] text-ember">
                  {fieldError("skills")}
                </p>
              ) : (
                <p className="text-[12px] font-medium leading-[1.56] tracking-[-0.01px] text-carbon/50">
                  Separate skills with commas
                </p>
              )}
            </Field>
          </>
        ) : (
          <Field data-invalid={Boolean(fieldError("company"))}>
            <FieldLabel htmlFor="edit-company" className={LABEL_CLASS}>
              Company
            </FieldLabel>
            <Input
              {...form.register("company" as FieldPath)}
              id="edit-company"
              placeholder="Nova Studio"
              aria-invalid={Boolean(fieldError("company"))}
              className={INPUT_CLASS}
            />
            {fieldError("company") && (
              <p className="text-[13px] font-medium leading-[1.39] text-ember">
                {fieldError("company")}
              </p>
            )}
          </Field>
        )}

        <Field data-invalid={Boolean(fieldError("bio"))}>
          <FieldLabel htmlFor="edit-bio" className={LABEL_CLASS}>
            Bio
          </FieldLabel>
          <div className="relative">
            <Textarea
              {...form.register("bio" as FieldPath)}
              id="edit-bio"
              placeholder="Tell people what you do..."
              rows={4}
              aria-invalid={Boolean(fieldError("bio"))}
              className={`${INPUT_CLASS} min-h-24 resize-none pb-9`}
            />
            <span className="absolute bottom-3 right-4 text-[12px] font-medium tabular-nums tracking-[-0.01px] text-carbon/40">
              {bioLength}/100 characters
            </span>
          </div>
          {fieldError("bio") && (
            <p className="text-[13px] font-medium leading-[1.39] text-ember">
              {fieldError("bio")}
            </p>
          )}
        </Field>
      </FieldGroup>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="rounded-pills bg-carbon px-6 py-3 text-[15px] font-extrabold tracking-[0.03em] text-paper-white transition-opacity hover:opacity-80 disabled:opacity-60"
        >
          {form.formState.isSubmitting ? "Saving..." : "Save changes"}
        </Button>

        <Link
          href={isEmployee ? `/hub/empee/${userId}` : `/hub/emper/${userId}`}
          className="text-[14px] font-bold text-carbon underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
