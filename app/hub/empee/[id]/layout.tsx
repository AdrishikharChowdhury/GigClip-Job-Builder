import SideBar from "@/components/profile/SideBar";

type Props = { children: React.ReactNode };

export default async function HubLayout({ children }: Props) {
  return (
    <div className="flex justify-center items-center gap-6">
      <SideBar />
      <div>{children}</div>
    </div>
  );
}
