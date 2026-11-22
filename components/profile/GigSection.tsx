import { SAMPLE_GIG_GROUPS } from "@/constants";
import { GigStatus } from "@/types/type";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import GigCard from "./GigCard";

const SECTION_ORDER: GigStatus[] = ["ongoing", "completed", "failed"];

const SECTION_TITLES: Record<GigStatus, string> = {
  ongoing: "Ongoing Tasks",
  completed: "Completed Tasks",
  failed: "Failed Tasks",
};

const GigSection = () => {
  const groups = SECTION_ORDER.flatMap((status) => {
    const group = SAMPLE_GIG_GROUPS.find((item) => item.status === status);

    return group ? [group] : [];
  });

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-lateral text-3xl leading-[0.9]">Your Gigs:</h1>
        <Link
          href="/hub/empee/gigs"
          className="flex items-center gap-2 rounded-pills border border-carbon bg-paper-white px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em] text-carbon transition-colors hover:bg-sunburst"
        >
          View all gigs
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </Link>
      </div>

      {groups.map((group) => (
        <article
          key={group.status}
          className="flex flex-col gap-12 border border-carbon bg-paper-white p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold leading-[0.9]">
              {SECTION_TITLES[group.status]}:
            </h2>
            <span className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
              {group.gigs.length} gigs
            </span>
          </div>

          <div className="flex w-full gap-6 overflow-x-auto py-2">
            {group.gigs.map((gig) => (
              <GigCard
                key={gig.id}
                gig={gig}
                className="w-[min(100%,390px)] shrink-0"
              />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
};

export default GigSection;
