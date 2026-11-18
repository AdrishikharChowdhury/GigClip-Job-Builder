import Background from "@/components/profile/Background";
import { Layout } from "@/types/type";

const EmployeeLayout = ({ children }: Layout) => {
  return (
    <main className="root-container">
      <Background />
      {children}
    </main>
  );
};

export default EmployeeLayout;
