import { SAMPLE_GIGS } from "@/constants";
import { dateFormatter } from "@/lib/db/utils";
import { Props } from "@/types/type";
import { redirect } from "next/navigation";
import React from "react";

const FailedGig = async ({ params }: Props) => {
  const { id } = await params;
  const failedGig =
    SAMPLE_GIGS.find((g) => g.status === "failed" && g.id === id) || null;

  if (!failedGig) {
    redirect("/hub/empee/gigs/");
  }

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <p className=" bg-red-700 pl-10 py-5 text-lg font-bold tracking-[0.03em] text-white transition-opacity hover:opacity-80 font-lateral w-full">
        Reason: Deadline Ended At {dateFormatter(failedGig.deadline)}
      </p>
      <section className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6 mt-10">
        <h1 className="text-6xl font-lateral">{failedGig.title}</h1>
        <p>{ failedGig.blurb}</p>
      </section>
    </section>
  );
};

export default FailedGig;
