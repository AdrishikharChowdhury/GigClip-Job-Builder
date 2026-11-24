"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type GigFiltersProps = {
  query: string;
};

const GigFilters = ({ query }: GigFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(query);
  const [lastQuery, setLastQuery] = useState(query);

  if (query !== lastQuery) {
    setLastQuery(query);
    setSearchValue(query);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = searchValue.trim();

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <form className="w-full max-w-sm flex items-center" onSubmit={handleSubmit}>
      <Input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className="m-0 h-11 rounded-r-none border-carbon bg-paper-white py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search gigs"
        aria-label="Search gigs"
        name="q"
      />
      <Button
        type="submit"
        className="h-11 rounded-l-none rounded-r-sm border border-l-0 border-carbon bg-voltage-violet px-5 text-white hover:bg-voltage-violet/90"
        aria-label="Search"
      >
        <Search className="size-5" aria-hidden="true" />
      </Button>
    </form>
  );
};

export default GigFilters;
