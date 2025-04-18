import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";

import ChangeImageDialog from "@/components/organisms/change-image-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateBucket, useUpdateBucket } from "@/hooks/react-query/useBuckets";
import {
  userKeys,
  useUpdateUserProfile,
  useUserAvatar,
  useUserProfile,
} from "@/hooks/react-query/useUsers";
import { cn } from "@/lib/utils";

export default function Avatar() {
  const { data: user } = useUserProfile();
  const { avatar, isLoading } = useUserAvatar();
  const updateBucket = useUpdateBucket();
  const createBucket = useCreateBucket();
  const updateAvatar = useUpdateUserProfile();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <Skeleton className="size-24 rounded-full border-4 border-white md:size-32" />;
  }
  const handleChangeImage = (files: File[]) => {
    const file: File = files[0];
    if (avatar) {
      updateBucket.mutate(
        {
          id: avatar.id,
          file,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: userKeys.profile(),
            });
          },
        }
      );
    } else {
      createBucket.mutate(file, {
        onSuccess: (data) => {
          updateAvatar.mutate({
            avatarId: data.id,
          });
        },
      });
    }
  };
  return (
    <ChangeImageDialog onSubmit={handleChangeImage}>
      <div
        className={cn(
          "relative box-content grid size-24 md:size-32 place-items-center overflow-hidden rounded-full border-4 border-white bg-neutral-200 transition-all duration-200 hover:cursor-pointer",
          updateBucket.isPending || createBucket.isPending || isLoading
            ? ""
            : "[&_div]:invisible [&_div]:hover:visible"
        )}
      >
        {updateBucket.isPending || createBucket.isPending || isLoading ? (
          <Skeleton className="size-24 md:size-32" />
        ) : (
          <>
            {avatar?.url ? (
              <img
                key={avatar.id}
                className="absolute left-0 top-0 size-24 rounded-full bg-white object-cover md:size-32"
                src={avatar.url}
                loading="lazy"
                alt={user?.fullName ?? "Avatar"}
              />
            ) : (
              <span className="text-5xl uppercase text-white">
                {user?.fullName?.charAt(0) || "--"}
              </span>
            )}
            <div className="absolute left-0 top-0 grid size-24 place-items-center bg-black/40 md:size-32">
              <Camera size={32} className="text-white" />
            </div>
          </>
        )}
      </div>
    </ChangeImageDialog>
  );
}
