import { dateFormatter } from "@/lib/db/utils";
import { CardProps } from "@/types/type";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const OngoingCard = ({ id, startedAt, title, blurb, deadline }: CardProps) => {
  return (
    <div
      className="w-[calc(50%-4px)] shrink-0 rounded-2xl border border-carbon bg-electric-blue-300 p-6 flex flex-col justify-center gap-12"
      key={id}
    >
      <div className="rounded-pills border border-carbon bg-sunburst px-3 py-2 text-[13px] font-bold tracking-[0.03em] text-carbon transition-opacity hover:opacity-80 w-fit">
        {dateFormatter(startedAt)}
      </div>
      <div>
        <h3 className="text-lg font-extrabold">{title}</h3>
        <p className="">{blurb}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="rounded-pills border border-carbon bg-ember px-3 py-2 text-[13px] font-bold tracking-[0.03em] text-white transition-opacity hover:opacity-80 w-fit">
          Deadline: {dateFormatter(deadline)}
        </div>
        <Link
          title="View More"
          className="text-sm mr-5"
          href={`/hub/empee/gigs/ongoing/${id}`}
        >
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default OngoingCard;
