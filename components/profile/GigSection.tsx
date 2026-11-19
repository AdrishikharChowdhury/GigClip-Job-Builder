import { SAMPLE_GIG_GROUPS } from "@/constants";
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
        <section className="flex w-full overflow-scroll gap-4">
          {ongoingGigs.map((gig) => (
            <div className={`bg-electric-blue p-6 text-white rounded-2xl border border-carbon w-1/2`} key={gig.id}>
              {gig.startedAt}
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
