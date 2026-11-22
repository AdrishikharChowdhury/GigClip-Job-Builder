import {
  formatGigBudget,
  getGigHref,
  GIG_ACCENT_CLASS,
  GIG_SKILL_TONES,
  GIG_STATUS_META,
} from "@/constants";
import { dateFormatter } from "@/lib/db/utils";
import { Gig } from "@/types/type";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const getStatusDate = (gig: Gig) => {
  if (gig.status === "ongoing") {
    return { label: "Deadline", value: gig.deadline };
  }

  if (gig.status === "failed") {
    return { label: "Failed", value: gig.failedAt };
  }

  return { label: "Completed", value: gig.completedAt };
};

type GigCardProps = {
  gig: Gig;
  className?: string;
};

const GigCard = ({ gig, className = "" }: GigCardProps) => {
  const accentText =
    gig.accent === "voltage-violet" ? "text-paper-white" : "text-carbon";
  const statusMeta = GIG_STATUS_META[gig.status];
  const statusDate = getStatusDate(gig);

  return (
    <article className={`h-full ${className}`}>
      <Link
        href={getGigHref(gig)}
        className="group flex h-full flex-col overflow-hidden border border-carbon bg-paper-white transition-transform hover:-translate-y-1"
      >
        <div
          className={`flex items-center justify-between gap-4 border-b border-carbon px-6 py-5 ${GIG_ACCENT_CLASS[gig.accent]} ${accentText}`}
        >
          <span className="flex items-center gap-2 rounded-pills border border-carbon bg-paper-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.032em] text-carbon">
            <span
              className={`h-2.5 w-2.5 rounded-full border border-carbon ${GIG_ACCENT_CLASS[statusMeta.tone]}`}
            />
            {statusMeta.label}
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-carbon bg-paper-white transition-colors group-hover:bg-sunburst">
            <ArrowUpRight size={18} strokeWidth={2} color="black" />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-6">
          <div className="flex flex-col gap-3">
            <p className="text-caption font-bold uppercase tracking-[0.032em] text-carbon/60">
              {gig.client}
            </p>
            <h2 className="font-lateral text-2xl leading-display">
              {gig.title}
            </h2>
            <p className="line-clamp-2 text-body-lg font-medium text-carbon/70">
              {gig.blurb}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {gig.skills.slice(0, 3).map((skill, index) => (
              <span
                key={skill}
                className={`rounded-pills border border-carbon px-5 py-2 text-[8px] font-bold uppercase tracking-wider text-carbon ${
                  GIG_SKILL_TONES[index % GIG_SKILL_TONES.length]
                }`}
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-carbon/20 pt-5">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
                Budget
              </span>
              <span className="text-lg font-bold">
                {formatGigBudget(gig.budget.amount, gig.budget.type)}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
                {statusDate.label}
              </span>
              <span className="text-[13px] font-bold">
                {dateFormatter(statusDate.value)}
              </span>
            </div>

            
          </div>
        </div>
      </Link>
    </article>
  );
};

export default GigCard;
