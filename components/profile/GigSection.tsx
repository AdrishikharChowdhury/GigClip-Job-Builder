import { SAMPLE_GIG_GROUPS } from "@/constants";
import { dateFormatter } from "@/lib/db/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import OngoingSection from "./OngoingSection";
import CompletedSection from "./CompletedSection";
import FailedSection from "./FailedSection";

const GigSection = () => {
  
  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-lateral text-3xl leading-[0.9]">Your Gigs:</h1>
      <article className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <h2 className="text-xl font-semibold leading-[0.9]">Ongoing Tasks:</h2>
        <OngoingSection />
      </article>
      <article className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <h2 className="text-xl font-semibold leading-[0.9]">
          Completed Tasks:
        </h2>
        <CompletedSection />
      </article>
      <article className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <h2 className="text-xl font-semibold leading-[0.9]">Failed Tasks:</h2>
        <FailedSection />
      </article>
    </section>
  );
};

export default GigSection;
