import Background from "@/components/profile/Background";
import SideBar from "@/components/profile/SideBar";
import { getEmperLinks } from "@/constants";
import { Layout } from "@/types/type";

type Props = Layout & {
  params: Promise<{ id: string }>;
};

const EmployerIdLayout = async ({ children, params }: Props) => {
  const { id } = await params;

  return (
    <main className="root-container">
      <Background />
      <div className="mx-auto flex w-full max-w-[1800px] items-start gap-6 px-6 py-6">
        <div className="hidden shrink-0 lg:sticky lg:top-6 lg:block">
          <SideBar links={getEmperLinks(id)} />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
};

export default EmployerIdLayout;
