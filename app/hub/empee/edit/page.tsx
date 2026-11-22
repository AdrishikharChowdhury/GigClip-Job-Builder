import { redirect } from "next/navigation";

import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { fetchProfileById } from "@/lib/actions/profile.actions";
import { auth } from "@/auth";

export default async function EmployeeProfileEditPage() {
  const session = await auth();
  if (!session) redirect("/");
  const result = await fetchProfileById(session?.user?.encodedId, "employee");

  if (!result.success) {
    if (result.message === "Not authenticated.") {
      redirect("/sign-in");
    }

    redirect(`/hub/empee`);
  }

  const { data } = result;

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/60">
          Candidate hub
        </p>
        <h1 className="font-lateral text-4xl leading-[0.9]">Edit profile</h1>
      </div>

      <ProfileEditForm
        role="employee"
        userId={session?.user?.encodedId}
        image={data.image}
        defaults={{
          name: data.name,
          jobTitle: data.jobTitle,
          skills: data.skills.join(", "),
          bio: data.bio,
        }}
      />
    </section>
  );
}
