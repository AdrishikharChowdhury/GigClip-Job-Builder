import { SAMPLE_GIG_GROUPS } from "@/constants";
import { dateFormatter } from "@/lib/db/utils";
import Link from "next/link";
import React from "react";

const GigSection = () => {
  const ongoingGigs =
    SAMPLE_GIG_GROUPS.find((group) => group.status === "ongoing")?.gigs ?? [];
  const failedGigs =
    SAMPLE_GIG_GROUPS.find((group) => group.status === "failed")?.gigs ?? [];
  const completedGigs =
    SAMPLE_GIG_GROUPS.find((group) => group.status === "completed")?.gigs ?? [];

  console.log(ongoingGigs);
  console.log(failedGigs);
  console.log(completedGigs);

  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-lateral text-3xl leading-[0.9]">Your Gigs:</h1>
      <article className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <h2 className="text-xl font-semibold leading-[0.9]">Ongoing Tasks:</h2>
        <section className="flex w-full gap-4 overflow-x-scroll pb-2">
          {ongoingGigs.map((gig) => (
            <div
              className="w-[calc(50%-4px)] shrink-0 rounded-2xl border border-carbon bg-electric-blue-300 p-6 flex flex-col justify-center gap-12"
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
                <div className="rounded-pills border border-carbon bg-ember px-3 py-2 text-[13px] font-bold tracking-[0.03em] text-white transition-opacity hover:opacity-80 w-fit">
                  Deadline: {dateFormatter(gig.deadline)}
                </div>
                <Link className="text-sm" href={`/hub/empee/gigs/ongoing/${gig.id}`} >View More</Link>
              </div>
            </div>
          ))}
        </section>
      </article>
      <article className="ml-6">
        <h2 className="text-xl font-semibold leading-[0.9]">
          Completed Tasks:
        </h2>
      </article>
      <article className="ml-6">
        <h2 className="text-xl font-semibold leading-[0.9]">Failed Tasks:</h2>
      </article>
    </section>
  );
};

export default GigSection;
