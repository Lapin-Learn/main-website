import { createFileRoute, Outlet } from "@tanstack/react-router";

const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-4 bg-[#F8F8F8]">
      <div></div>
      <div className="col-span-3 p-8">
        <h1 className="mb-6 text-2xl font-semibold">Quản lý tài khoản</h1>
        <div className="overflow-hidden rounded-3xl bg-white pb-8">
          <img
            className="h-52 w-full object-cover"
            src="https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="grid grid-cols-4 gap-8 px-4 pt-4">
            <nav className="border-r"></nav>
            <div className="relative col-span-3 pt-16">
              <div className="absolute top-0 -mt-4 flex -translate-y-1/2 flex-row items-end gap-4">
                <img
                  className="size-32 rounded-full border-4 border-white object-cover"
                  src="https://plus.unsplash.com/premium_photo-1684377477658-a627ed46949d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
                />
                <div>
                  <h5 className="text-xl font-semibold">Lê Vũ Ngân Trúc</h5>
                  <h6 className="text-muted-foreground">@ngantruc2003</h6>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/_profile")({
  component: ProfileLayout,
});
