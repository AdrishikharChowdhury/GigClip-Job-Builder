import Background from "@/components/profile/Background";
import SideBar from "@/components/profile/SideBar";
import { Layout } from "@/types/type";

const EmployeeLayout = ({ children }: Layout) => {
  return (
    <main className="root-container">
      <Background />
      <div className="mx-auto flex w-full max-w-[1800px] items-start justify-center">
        <div className="hidden shrink-0 lg:sticky lg:top-6 lg:block lg:pl-6">
          <SideBar />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
};

export default EmployeeLayout;
