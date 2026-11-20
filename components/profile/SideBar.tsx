import { fetchProfileById } from "@/lib/actions/profile.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";


const SideBar = async () => {
  return (
    <nav className="flex flex-col gap-12">
      <header className="flex items-center gap-6 rounded-cards border border-carbon bg-paper-white p-6">
        <Image
          unoptimized
          src="/logo.svg"
          alt="logo"
          width={80}
          height={80}
          className="rounded-full border border-carbon bg-paper-white object-cover"
        />
        <h1 className="font-lateral text-4xl" >Gigclip</h1>
      </header>
      <main className="flex items-center gap-6 rounded-cards border border-carbon bg-paper-white p-6">
        
      </main>
    </nav>
  );
};

export default SideBar;
