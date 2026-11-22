import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, FileText, Mail, UserRoundPen } from "lucide-react";

import { fetchProfileById } from "@/lib/actions/profile.actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EmployerDashBoard({ params }: Props) {
  const { id } = await params;
  const result = await fetchProfileById(id, "employer");

  if (!result.success) {
    if (result.message === "Not authenticated.") {
      redirect("/sign-in");
    }

    return (
      <section className="mx-auto max-w-4xl py-16">
        <div className="rounded-cards border border-carbon bg-paper-white p-6">
          <p className="text-[15px] font-medium text-ember">{result.message}</p>
        </div>
      </section>
    );
  }

  const { data } = result;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 py-8 lg:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/60">
            Employer hub
          </p>
          <h1 className="font-lateral text-4xl leading-[0.9] sm:text-5xl">
            Dashboard
          </h1>
        </div>
        <Link
          href={`/hub/emper/${id}/edit`}
          className="inline-flex items-center gap-2 rounded-pills border border-carbon bg-sunburst px-5 py-2.5 text-[13px] font-bold tracking-[0.03em] text-carbon transition-opacity hover:opacity-80"
        >
          <UserRoundPen size={16} strokeWidth={2} aria-hidden="true" />
          Edit profile
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <article className="flex flex-col gap-6 rounded-cards border border-carbon bg-paper-white p-6">
          <div className="flex items-center gap-4">
            <Image
              unoptimized
              src={data.image}
              alt={data.name}
              width={88}
              height={88}
              className="size-[88px] rounded-full border border-carbon bg-soft-mist object-cover"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
                Employer profile
              </p>
              <h2 className="truncate font-lateral text-3xl leading-[0.95]">
                {data.name}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-carbon/15 pt-5">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-carbon bg-sky-wash">
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
                  Email
                </p>
                <p className="break-words text-[15px] font-medium text-carbon/80">
                  {data.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-carbon bg-mint-pop">
                <Building2 size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
                  Company
                </p>
                <p className="break-words text-[15px] font-semibold text-carbon">
                  {data.company}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="flex flex-col gap-5 rounded-cards border border-carbon bg-paper-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-carbon bg-lavender">
              <FileText size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
                Company overview
              </p>
              <h2 className="text-xl font-semibold leading-tight">About</h2>
            </div>
          </div>

          <p className="text-[15px] font-medium leading-[1.7] tracking-[-0.01px] text-carbon/80">
            {data.bio}
          </p>

          <div className="mt-auto border-t border-carbon/15 pt-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/50">
              Quick actions
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href={`/hub/emper/${id}/edit`}
                className="inline-flex items-center gap-2 rounded-pills border border-carbon bg-paper-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.032em] text-carbon transition-colors hover:bg-sunburst"
              >
                <UserRoundPen size={14} strokeWidth={2} aria-hidden="true" />
                Update profile
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
