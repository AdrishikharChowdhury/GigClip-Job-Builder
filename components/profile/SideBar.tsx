import { empeeLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const SideBar = async () => {
  return (
    <nav className="flex flex-col gap-12">
      <header className="flex items-center gap-6 border border-carbon bg-paper-white p-6">
        <Image
          unoptimized
          src="/logo.svg"
          alt="logo"
          width={80}
          height={80}
          className="rounded-full border border-carbon bg-paper-white object-cover"
        />
        <h1 className="font-lateral text-4xl">Gigclip</h1>
      </header>
      <main className="flex items-center gap-6 border border-carbon bg-paper-white p-6">
        {empeeLinks.map(({ label, link }) => (
          <Link key={label} href={link}>{label}</Link>
        ))}
      </main>
    </nav>
  );
};

export default SideBar;
