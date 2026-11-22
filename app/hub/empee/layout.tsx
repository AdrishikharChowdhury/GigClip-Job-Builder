import Background from "@/components/profile/Background";
import SideBar from "@/components/profile/SideBar";
import { empeeLinks } from "@/constants";
import { Layout } from "@/types/type";

const EmployeeLayout = ({ children }: Layout) => {
  return (
    <main className="root-container">
      <Background />
      <div className="mx-auto flex w-full max-w-[1800px] items-start gap-6 px-6 py-6 h-full">
        <div className="hidden shrink-0 lg:sticky lg:top-6 lg:block h-full">
          <SideBar links={empeeLinks} />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
};

export default EmployeeLayout;
