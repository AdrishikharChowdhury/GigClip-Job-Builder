import { auth } from "@/auth";
import GigCard from "@/components/profile/GigCard";
import {
  GIG_ACCENT_CLASS,
  GIG_STATUS_META,
  SAMPLE_GIGS,
  SAMPLE_GIG_GROUPS,
} from "@/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const PAGE_SIZE = 6;

type AllGigsProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

const pageHref = (page: number) =>
  page === 1 ? "/hub/empee/gigs" : `/hub/empee/gigs?page=${page}`;

const AllGigs = async ({ searchParams }: AllGigsProps) => {
  const { page } = await searchParams;
  const requestedPage = Number(Array.isArray(page) ? page[0] : page);

  const gigs = [...SAMPLE_GIGS].sort((a, b) =>
    b.postedAt.localeCompare(a.postedAt),
  );
  const totalPages = Math.max(1, Math.ceil(gigs.length / PAGE_SIZE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(Math.trunc(requestedPage), 1), totalPages)
    : 1;

  const firstIndex = (currentPage - 1) * PAGE_SIZE;
  const pageGigs = gigs.slice(firstIndex, firstIndex + PAGE_SIZE);
  const firstGig = firstIndex + 1;
  const lastGig = firstIndex + pageGigs.length;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const session = await auth();
  const hubHref = session?.user?.encodedId
    ? `/hub/empee/`
    : "/sign-in";

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-24 px-6 py-48">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-3 text-[12px] font-bold uppercase tracking-[0.032em]">
          <li>
            <Link
              href={hubHref}
              className="rounded-pills border border-carbon bg-paper-white px-6 py-2 text-carbon transition-colors hover:bg-sunburst"
            >
              Hub
            </Link>
          </li>
          <li aria-hidden="true" className="text-carbon/40">
            <ChevronRight size={14} strokeWidth={2.5} />
          </li>
          <li>
            <span aria-current="page" className="px-1 text-carbon/50">
              Gigs
            </span>
          </li>
        </ol>
      </nav>

      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-pills border border-carbon bg-sunburst px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em]">
              Gig board
            </span>
            <h1 className="font-lateral text-6xl leading-[0.8] sm:text-7xl xl:text-8xl">
              All gigs
            </h1>
            <p className="max-w-2xl text-body-lg font-medium text-carbon/70">
              Every gig on your board — in progress, failed, and completed.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-pills border border-carbon bg-paper-white px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em]">
              {gigs.length} total
            </span>
            {SAMPLE_GIG_GROUPS.map(({ status, gigs: groupGigs }) => {
              const meta = GIG_STATUS_META[status];

              return (
                <span
                  key={status}
                  className={`rounded-pills border border-carbon px-6 py-2 text-[12px] font-bold uppercase tracking-[0.032em] text-carbon ${GIG_ACCENT_CLASS[meta.tone]}`}
                >
                  {groupGigs.length} {meta.label}
                </span>
              );
            })}
          </div>
        </div>
      </header>

      <section
        aria-label="All gigs"
        className="grid gap-16 sm:grid-cols-2 xl:grid-cols-3"
      >
        {pageGigs.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </section>

      <nav
        aria-label="Pagination"
        className="flex flex-col gap-6 rounded-cards border border-carbon bg-paper-white p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-caption font-medium text-carbon/60">
          Showing{" "}
          <span className="font-bold text-carbon">
            {firstGig}–{lastGig}
          </span>{" "}
          of <span className="font-bold text-carbon">{gigs.length}</span> gigs
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {currentPage > 1 ? (
            <Link
              href={pageHref(currentPage - 1)}
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-pills border border-carbon bg-paper-white transition-colors hover:bg-sunburst"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="flex h-10 w-10 items-center justify-center rounded-pills border border-carbon bg-paper-white opacity-40"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </span>
          )}

          {pages.map((pageNumber) => {
            const isCurrent = pageNumber === currentPage;

            return (
              <Link
                key={pageNumber}
                href={pageHref(pageNumber)}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex h-10 min-w-10 items-center justify-center rounded-pills border border-carbon px-5 text-[13px] font-bold transition-colors ${
                  isCurrent
                    ? "bg-carbon text-paper-white"
                    : "bg-paper-white text-carbon hover:bg-sunburst"
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}

          {currentPage < totalPages ? (
            <Link
              href={pageHref(currentPage + 1)}
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-pills border border-carbon bg-paper-white transition-colors hover:bg-sunburst"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="flex h-10 w-10 items-center justify-center rounded-pills border border-carbon bg-paper-white opacity-40"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </span>
          )}
        </div>
      </nav>
    </section>
  );
};

export default AllGigs;
