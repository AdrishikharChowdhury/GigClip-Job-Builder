import { AuthForm } from "@/components/auth/AuthForm";
import Poster from "@/components/auth/Poster";
import ProfileErrorToast from "@/components/profile/ProfileErrorToast";

type Props = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const message = Array.isArray(error) ? error[0] : error;

  return (
    <section className="w-full h-screen flex">
      {message && <ProfileErrorToast message={message} />}
      <article className="w-1/2 flex justify-center items-center">
        <AuthForm type="SIGN_IN" />
      </article>
      <aside className="relative h-screen w-1/2 overflow-hidden">
        <Poster />
      </aside>
    </section>
  );
}
