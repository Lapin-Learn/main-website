import { PropsWithChildren } from "react";

import SideBar from "@/components/organisms/sidebar/side-bar";

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-screen bg-[#F8F8F8]">
      <div className="sticky top-0 z-10 h-screen">
        <SideBar />
      </div>

      <main className="z-0 flex-1 overflow-y-auto pt-12 sm:pt-0">{children}</main>
    </div>
  );
}
