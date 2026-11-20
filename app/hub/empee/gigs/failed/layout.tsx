import { Layout } from "@/types/type";
import { FaceSlightlyFrowning } from "lucide-react";
import React from "react";

const FailedLayout = ({ children }: Layout) => {
  return <main className="root-container">
    <section className="bg-ember text-white p-6 flex items-center gap-6">
      <FaceSlightlyFrowning size={100} />
      <p className="font-lateral text-6xl" >FAILED GIG</p>
    </section>
    {children}
  </main>;
};

export default FailedLayout;
