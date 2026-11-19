import { SAMPLE_GIG_GROUPS } from "@/constants";
import { dateFormatter } from "@/lib/db/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CompletedSection = () => {
  const completedGigs =
    SAMPLE_GIG_GROUPS.find((group) => group.status === "completed")?.gigs ?? [];
  return (
    <section className="flex w-full gap-4 overflow-x-scroll pb-2">
      {completedGigs.map((gig) => (
        <div
          className="w-[calc(50%-4px)] shrink-0 rounded-2xl border border-carbon bg-mint-pop-400 p-6 flex flex-col justify-center gap-12"
          key={gig.id}
        >
          <div className="rounded-pills border border-carbon bg-sunburst px-3 py-2 text-[13px] font-bold tracking-[0.03em] text-carbon transition-opacity hover:opacity-80 w-fit">
            {dateFormatter(gig.startedAt)}
          </div>
          <div>
            <h3 className="text-lg font-extrabold">{gig.title}</h3>
            <p className="">{gig.blurb}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="rounded-pills border border-carbon bg-green-700 px-3 py-2 text-[13px] font-bold tracking-[0.03em] text-white transition-opacity hover:opacity-80 w-fit">
              COMPLETED
            </div>
            <Link
              title="View More"
              className="text-sm mr-5"
              href={`/hub/empee/gigs/ongoing/${gig.id}`}
            >
              <ArrowRight />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CompletedSection;
