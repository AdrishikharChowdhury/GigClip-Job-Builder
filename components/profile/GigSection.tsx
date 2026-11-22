import { SAMPLE_GIG_GROUPS, SECTION_ORDER, SECTION_TITLES } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import GigCard from "./GigCard";
import { Button } from "../ui/button";
import GigGroup from "./GigGroup";

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

      {groups.map(({ status, gigs, label }, idx: number) => (
        <GigGroup label={label} status={status} gigs={gigs} key={idx} />
      ))}
    </section>
  );
};

export default GigSection;
