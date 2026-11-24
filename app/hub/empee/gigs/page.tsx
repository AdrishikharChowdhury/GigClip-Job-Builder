import { auth } from "@/auth";
import GigCard from "@/components/profile/GigCard";
import GigFilters from "@/components/profile/GigFilters";
import {
  GIG_ACCENT_CLASS,
  GIG_STATUS_META,
  SAMPLE_GIGS,
  SAMPLE_GIG_GROUPS,
} from "@/constants";
import { GigStatus } from "@/types/type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const PAGE_SIZE = 9;

type AllGigsProps = {
  searchParams: Promise<{
    page?: string | string[];
    status?: string | string[];
    q?: string | string[];
  }>;
};

const getParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const isGigStatus = (value: string | undefined): value is GigStatus =>
  value === "ongoing" || value === "completed" || value === "failed";

const pageHref = (page: number, status: string, query: string) => {
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/hub/empee/gigs?${qs}` : "/hub/empee/gigs";
};

const AllGigs = async ({ searchParams }: AllGigsProps) => {
  const params = await searchParams;
  const requestedPage = Number(getParam(params.page));
  const statusParam = getParam(params.status);
  const status = isGigStatus(statusParam) ? statusParam : "all";
  const query = (getParam(params.q) ?? "").trim();

  const normalizedQuery = query.toLowerCase();
  const gigs = [...SAMPLE_GIGS]
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
    .filter((gig) => (status === "all" ? true : gig.status === status))
    .filter((gig) => {
      if (!normalizedQuery) return true;
      const haystack = [
        gig.title,
        gig.client,
        gig.blurb,
        gig.location,
        ...gig.skills,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });

  const totalPages = Math.max(1, Math.ceil(gigs.length / PAGE_SIZE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(Math.trunc(requestedPage), 1), totalPages)
    : 1;

  const firstIndex = (currentPage - 1) * PAGE_SIZE;
  const pageGigs = gigs.slice(firstIndex, firstIndex + PAGE_SIZE);
  const firstGig = gigs.length === 0 ? 0 : firstIndex + 1;
  const lastGig = firstIndex + pageGigs.length;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const session = await auth();
  const hubHref = session?.user?.encodedId ? `/hub/empee/` : "/sign-in";

  return (
    <section className="mx-auto flex w-full max-w-360 flex-col gap-24 px-6 py-2">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-3 text-caption font-bold uppercase tracking-[0.032em]">
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
          <div className="flex flex-col gap-6">
            <h1 className="font-lateral text-6xl leading-[0.8] sm:text-7xl xl:text-8xl">
              My gigs
            </h1>
            <p className="max-w-2xl text-body-lg font-medium text-carbon/70">
              Every gig on your board — in progress, failed, and completed.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-pills border border-carbon bg-paper-white px-6 py-2 text-caption font-bold uppercase tracking-[0.032em]">
                {gigs.length} {status === "all" ? "total" : "matching"}
              </span>
              {SAMPLE_GIG_GROUPS.map(({ status: groupStatus, gigs: groupGigs }) => {
                const meta = GIG_STATUS_META[groupStatus];
                const isActive = status === groupStatus;

                return (
                  <Link
                    key={groupStatus}
                    href={pageHref(1, groupStatus, query)}
                    className={`rounded-pills border border-carbon px-6 py-2 text-caption font-bold uppercase tracking-[0.032em] text-carbon transition-opacity hover:opacity-85 ${GIG_ACCENT_CLASS[meta.tone]} ${
                      isActive ? "ring-2 ring-carbon ring-offset-2 ring-offset-paper-white" : ""
                    }`}
                  >
                    {groupGigs.length} {meta.label}
                  </Link>
                );
              })}
              {status !== "all" ? (
                <Link
                  href={pageHref(1, "all", query)}
                  className="rounded-pills border border-carbon bg-paper-white px-6 py-2 text-caption font-bold uppercase tracking-[0.032em] text-carbon transition-colors hover:bg-soft-mist"
                >
                  Clear filter
                </Link>
              ) : null}
            </div>
            <GigFilters query={query} />
            
          </div>
        </div>
      </header>

      <section
        aria-label="All gigs"
        className="grid gap-16 sm:grid-cols-2 xl:grid-cols-3"
      >
        {pageGigs.length > 0 ? (
          pageGigs.map((gig) => <GigCard key={gig.id} gig={gig} />)
        ) : (
          <div className="col-span-full rounded-cards border border-carbon bg-paper-white p-8 text-center">
            <p className="font-lateral text-2xl leading-tight">No gigs found</p>
            <p className="mt-2 text-body-lg text-carbon/60">
              Try a different search or clear the status filter.
            </p>
          </div>
        )}
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
              href={pageHref(currentPage - 1, status, query)}
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
                href={pageHref(pageNumber, status, query)}
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
              href={pageHref(currentPage + 1, status, query)}
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
