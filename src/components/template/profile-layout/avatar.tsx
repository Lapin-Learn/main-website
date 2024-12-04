import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile } from "@/hooks/react-query/useUsers";
import { Camera } from "lucide-react";

export default function Avatar() {
  const { data: user, isLoading } = useUserProfile();
  if (isLoading) {
    return <Skeleton className="size-32 rounded-full border-4 border-white" />;
  }
  return (
    <div className="relative box-content grid size-32 place-items-center overflow-hidden rounded-full border-4 border-white bg-neutral-200 transition-all duration-200 hover:cursor-pointer [&_div]:invisible [&_div]:hover:visible">
      {user?.avatar?.url ? (
        <img
          className="absolute left-0 top-0 size-32 rounded-full border-4 border-white object-cover"
          src={user.avatar.url}
        />
      ) : (
        <span className="text-5xl uppercase text-white">{user?.fullName?.charAt(0) || "--"}</span>
      )}
      <div className="absolute left-0 top-0 grid size-32 place-items-center bg-black/40">
        <Camera size={32} className="text-white" />
      </div>
    </div>
  );
}
