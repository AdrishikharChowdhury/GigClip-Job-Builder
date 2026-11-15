import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { fetchProfileById } from "@/lib/actions/profile.actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EmployerDashBoard({ params }: Props) {
  const { id } = await params;
  const result = await fetchProfileById(id, "employer");

  if (!result.success) {
    if (result.message === "Not authenticated.") {
      redirect("/sign-in");
    }

    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-[15px] font-medium text-ember">{result.message}</p>
      </section>
    );
  }

  const { data } = result;

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/60">
          Employer hub
        </p>
        <Link
          href={`/hub/emper/${id}/edit`}
          className="rounded-pills border border-carbon bg-sunburst px-4 py-2 text-[13px] font-bold tracking-[0.03em] text-carbon transition-opacity hover:opacity-80"
        >
          Edit profile
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Image
          unoptimized
          src={data.image}
          alt={data.name}
          width={80}
          height={80}
          className="size-20 rounded-full border border-carbon bg-paper-white object-cover"
        />
        <div>
          <h1 className="font-lateral text-4xl leading-[0.9]">{data.name}</h1>
          <p className="mt-2 text-[15px] font-medium tracking-[-0.01px] text-carbon/60">
            {data.email}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-cards border border-carbon bg-paper-white p-6">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/60">
            Company
          </p>
          <p className="text-[17px] font-semibold">{data.company}</p>
        </div>

        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/60">
            About
          </p>
          <p className="text-[15px] font-medium leading-[1.56] tracking-[-0.01px]">
            {data.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
