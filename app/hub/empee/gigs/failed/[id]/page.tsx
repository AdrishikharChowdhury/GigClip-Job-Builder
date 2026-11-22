import { auth } from "@/auth";
import {
  getFailedGigDates,
  getFailedGigFacts,
  GIG_ACCENT_CLASS,
  GIG_FAILURE_COPY,
  GIG_FAILURE_REASON_LABELS,
  GIG_SKILL_TONES,
  SAMPLE_GIGS,
} from "@/constants";
import { dateFormatter } from "@/lib/db/utils";
import { FailedGig as FailedGigRecord, Props } from "@/types/type";
import {
  AlarmClockOff,
  ChevronRight,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const FailedGig = async ({ params }: Props) => {
  const { id } = await params;
  const failedGig = SAMPLE_GIGS.find(
    (gig): gig is FailedGigRecord => gig.status === "failed" && gig.id === id,
  );

  if (!failedGig) {
    redirect("/hub/empee/gigs/");
  }

  const session = await auth();
  const hubHref = session?.user?.encodedId
    ? `/hub/empee/${session.user.encodedId}`
    : "/sign-in";

  const accentText =
    failedGig.accent === "voltage-violet" ? "text-paper-white" : "text-carbon";

  const facts = getFailedGigFacts(failedGig);
  const dates = getFailedGigDates(failedGig);

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-24 px-6 py-48">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-3 text-[12px] font-bold uppercase tracking-[0.032em]">
          <li>
            <Link
              href={hubHref}
              className="rounded-pills border border-carbon bg-paper-white px-6 py-2 text-carbon transition-colors hover:bg-sunburst"
            >
              Hub
            </Link>
          </li>
          <li aria-hidden="true" className="text-carbon/40">
            <ChevronRight size={14} strokeWidth={2.5} />
          </li>
          <li>
            <Link
              href={hubHref}
              className="rounded-pills border border-carbon bg-paper-white px-6 py-2 text-carbon transition-colors hover:bg-mint-pop"
            >
              Gigs
            </Link>
          </li>
          <li aria-hidden="true" className="text-carbon/40">
            <ChevronRight size={14} strokeWidth={2.5} />
          </li>
          <li>
            <span className="rounded-pills border border-carbon bg-ember px-6 py-2 text-carbon">
              Failed
            </span>
          </li>
          <li aria-hidden="true" className="text-carbon/40">
            <ChevronRight size={14} strokeWidth={2.5} />
          </li>
          <li className="min-w-0">
            <span
              aria-current="page"
              className="block max-w-[36ch] truncate text-carbon/50"
            >
              {failedGig.title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <article className="flex flex-col gap-10 rounded-cards border border-carbon bg-paper-white p-6 md:p-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-pills border border-carbon bg-carbon px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em] text-paper-white">
                Gig closed
              </span>
              <span
                className={`rounded-pills border border-carbon px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em] ${GIG_ACCENT_CLASS[failedGig.accent]} ${accentText}`}
              >
                {failedGig.client}
              </span>
            </div>

            <h1 className="font-lateral text-4xl leading-[0.8] break-words sm:text-6xl xl:text-7xl 2xl:text-8xl">
              {failedGig.title}
            </h1>

            <p className="max-w-2xl text-body-lg font-medium text-carbon/70">
              {failedGig.blurb}
            </p>
          </div>
          <div className="flex flex-col gap-12">
            <h1 className="font-lateral text-2xl" >At a glance</h1>
            <article className="grid grid-cols-2 gap-16">
              {facts.map(({ label, value, icon: Icon = Sparkles }) => (
                <div className="flex items-center gap-4" key={label}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-carbon bg-paper-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <p className="mt-1 text-lg font-bold tracking-[-0.01px]">
                    {value}
                  </p>
                </div>
              ))}
            </article>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {failedGig.skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`rounded-pills border border-carbon px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em] text-carbon ${
                      GIG_SKILL_TONES[index % GIG_SKILL_TONES.length]
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <aside className="flex flex-col gap-6">
          <article className="flex flex-col gap-6 rounded-cards border border-carbon bg-ember p-6 text-carbon">
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/70">
                <AlarmClockOff size={16} strokeWidth={2} />
                Why it failed
              </span>
              <h2 className="font-lateral text-3xl leading-[0.8] md:text-4xl">
                {GIG_FAILURE_REASON_LABELS[failedGig.reason]}
              </h2>
              <p className="text-body-lg font-medium text-carbon/80">
                {failedGig.failureReason ?? GIG_FAILURE_COPY[failedGig.reason]}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-pills border border-carbon bg-paper-white px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em] text-carbon">
                Deadline {dateFormatter(failedGig.deadline)}
              </span>
              <span className="rounded-pills border border-carbon bg-carbon px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em] text-paper-white">
                Failed {dateFormatter(failedGig.failedAt)}
              </span>
            </div>
          </article>

          <article className="flex flex-col gap-5 rounded-cards border border-carbon bg-sky-wash p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/60">
                  Work banked
                </p>
                <p className="mt-1 font-lateral text-4xl leading-[0.8]">
                  {failedGig.progress}%
                </p>
              </div>
              <TrendingDown size={28} strokeWidth={1.75} />
            </div>

            <div
              role="progressbar"
              aria-label="Work completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={failedGig.progress}
              className="h-16 w-full rounded-pills border border-carbon bg-paper-white p-0.75"
            >
              <div
                className="h-full rounded-pills bg-ember"
                style={{ width: `${failedGig.progress}%` }}
              />
            </div>

            <p className="text-caption font-medium text-carbon/60">
              Progress at the moment the gig was marked failed.
            </p>
            <div className="flex flex-col gap-5">
              <h1 className="font-lateral text-2xl" >The Paper Trail</h1>
              <article className="grid grid-cols-2 gap-16">
                {dates.map(({ label, value }) => (
                  <div className="flex justify-center gap-2 flex-col" key={label}>
                    <p className="text-caption font-bold uppercase tracking-[0.032em] text-carbon/60">
                      {label}
                    </p>
                    <p className="font-lateral text-xl leading-[0.8]">
                      {value}
                    </p>
                  </div>
                ))}
              </article>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default FailedGig;
