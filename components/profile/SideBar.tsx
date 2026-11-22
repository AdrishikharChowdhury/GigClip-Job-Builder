"use client";

import { SidebarLink } from "@/constants";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  LayoutGrid,
  UserRoundPen,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_ICONS: Record<SidebarLink["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  briefcase: BriefcaseBusiness,
  grid: LayoutGrid,
  "edit-profile": UserRoundPen,
};

type SideBarProps = {
  links: SidebarLink[];
};

const SideBar = ({ links }: SideBarProps) => {
  const pathname = usePathname();

  const activeLink = links.reduce<string | null>((best, { link }) => {
    const matches = pathname === link || pathname.startsWith(`${link}/`);
    if (!matches) return best;
    return !best || link.length > best.length ? link : best;
  }, null);

  return (
    <aside className="flex w-[280px] flex-col gap-6 h-full">
      <Link
        href="/"
        className="flex items-center gap-4 border border-carbon bg-paper-white p-5 transition-colors hover:bg-soft-mist"
      >
        <Image
          unoptimized
          src="/logo.svg"
          alt="Gigclip logo"
          width={56}
          height={56}
          className="rounded-full border border-carbon bg-paper-white object-cover"
        />
        <span className="font-lateral text-3xl leading-none">Gigclip</span>
      </Link>

      <nav
        aria-label="Hub navigation"
        className="flex flex-col border border-carbon bg-paper-white p-3"
      >
        {links.map(({ label, link, icon }) => {
          const Icon = SIDEBAR_ICONS[icon];
          const isActive = activeLink === link;

          return (
            <Link
              key={label}
              href={link}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 border px-4 py-3 text-[13px] font-bold tracking-[0.03em] transition-colors ${
                isActive
                  ? "border-carbon bg-sunburst text-carbon"
                  : "border-transparent text-carbon/70 hover:border-carbon/20 hover:bg-soft-mist hover:text-carbon"
              }`}
            >
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
