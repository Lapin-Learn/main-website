import { PropsWithChildren } from "react";

import SideBar from "@/components/organisms/sidebar/side-bar";

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-screen flex-col bg-[#F8F8F8] md:flex-row">
      <div className="sticky top-0 h-fit md:h-screen">
        <SideBar />
      </div>

      <main className="z-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
