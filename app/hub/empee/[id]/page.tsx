import Image from "next/image";
import Link from "next/link";

import ProfileErrorToast from "@/components/profile/ProfileErrorToast";
import { fetchProfileById } from "@/lib/actions/profile.actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeDashBoard({ params }: Props) {
  const { id } = await params;
  const result = await fetchProfileById(id, "employee");

  if (!result.success) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <ProfileErrorToast message={result.message} />
        <p className="text-[15px] font-medium text-ember">{result.message}</p>
      </section>
    );
  }

  const { data } = result;

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/60">
          Candidate hub
        </p>
        <Link
          href={`/hub/empee/${id}/edit`}
          className="rounded-pills border border-carbon bg-sunburst px-6 py-2 text-[13px] font-bold tracking-[0.03em] text-carbon transition-opacity hover:opacity-80"
        >
          Edit profile
        </Link>
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
          <h1 className="font-lateral text-4xl leading-[0.9]">{data.name}</h1>
          <p className="mt-2 text-[15px] font-medium tracking-[-0.01px] text-carbon/60">
            {data.email}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <p className="text-xl font-semibold">{data.jobTitle}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-pills border border-carbon bg-sunburst px-3 py-1 text-sm font-bold tracking-[0.03em]"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="italic text-sm text-gray-600 font-medium leading-caption tracking-[-0.01px]">
          {data.bio}
        </p>
      </div>

      <section>
        <h1 className="font-lateral text-3xl leading-[0.9]">Your Gigs:</h1>
        
      </section>
    </section>
  );
}
