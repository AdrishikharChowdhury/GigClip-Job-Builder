"use client";
import { SECTION_TITLES } from "@/constants";
import React, { useState } from "react";
import GigCard from "./GigCard";
import { GigGroup as GigGroupType } from "@/types/type";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 3;

const GigGroup = ({ status, gigs }: GigGroupType) => {
  const [start, setStart] = useState(0);
  const end = start + ITEMS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(gigs.length / ITEMS_PER_PAGE));
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrev = () => {
    setStart((prev) => Math.max(0, prev - ITEMS_PER_PAGE));
  };

  const handleNext = () => {
    if (end >= gigs.length) return;
    setStart((prev) => prev + ITEMS_PER_PAGE);
  };
  return (
    <article className="flex flex-col gap-12 border border-carbon bg-paper-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold leading-[0.9]">
          {SECTION_TITLES[status]}:
        </h2>
        <span className="text-[11px] font-bold uppercase tracking-[0.032em] text-carbon/50">
          {gigs.length} gigs
        </span>
      </div>

      <div className="flex w-full items-center justify-center flex-col gap-6">
        <div className="grid grid-cols-3 align-middle justify-center gap-6">
          {gigs.slice(start, end).map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              className="w-[min(100%,400px)] shrink-0"
            />
          ))}
        </div>
        <div className="flex gap-5 items-center">
          <Button
            className="rounded-cards bg-voltage-violet text-white px-6 py-6 text-lg"
            onClick={handlePrev}
          >
            <ChevronLeft className="size-6!" strokeWidth={2} />
          </Button>
          <div className="flex gap-4">
            {pages.map((page) => (
              <Button className="px-5 text-lg font-semibold hover:bg-black hover:text-paper-white py-5 border border-carbon" key={page}>{page}</Button>
            ))}
          </div>
          <Button
            className="rounded-cards bg-voltage-violet text-white px-6 py-6 text-lg"
            onClick={handleNext}
          >
            <ChevronRight className="size-6!" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default GigGroup;
