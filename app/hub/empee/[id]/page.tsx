import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { fetchProfileById } from "@/lib/actions/profile.actions";
import { Props } from "@/types/type";
import GigSection from "@/components/profile/GigSection";
import Skills from "@/components/profile/Skills";
import { UserRoundPen } from "lucide-react";

export default async function EmployeeDashBoard({ params }: Props) {
  const { id } = await params;
  const result = await fetchProfileById(id, "employee");

  if (!result.success) {
    redirect(`/sign-in?error=${encodeURIComponent(result.message)}`);
  }

  const { data } = result;

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <p className="text-caption font-bold uppercase tracking-[0.032em] text-carbon/60">
          Candidate hub
        </p>
      </div>

      <div className="flex items-center gap-20">
        <Image
          unoptimized
          src={data.image}
          alt={data.name}
          width={80}
          height={80}
          className="rounded-full border border-carbon bg-paper-white object-cover"
        />
        <div>
          <span className="flex items-center gap-6">
            <h1 className="font-lateral text-4xl leading-[0.9]">{data.name}</h1>
            <Link
              href={`/hub/empee/${id}/edit`}
              className="rounded-pills border border-carbon bg-sunburst px-6 py-2 text-[13px] font-bold tracking-[0.03em] text-carbon transition-opacity hover:opacity-80"
            >
              <UserRoundPen />
            </Link>
          </span>
          <p className="mt-2 text-body-lg font-medium tracking-[-0.01px] text-carbon/60">
            {data.email}
          </p>
        </div>
      </div>

      <Skills skills={data.skills} bio={data.bio} jobTitle={data.jobTitle} />
      <GigSection />
    </section>
  );
}
