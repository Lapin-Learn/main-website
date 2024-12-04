import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAccountIdentifier } from "@/services";
import { getUserProfile, updateUserPassword, updateUserProfile } from "@/services/user";
import { useToast } from "../use-toast";
import { useTranslation } from "react-i18next";

export const userKeys = {
  key: ["account"] as const,
  identifier: () => [...userKeys.key, "identifier"] as const,
  profile: () => [...userKeys.key, "profile"] as const,
};

export const useAccountIdentifier = () => {
  return useQuery({
    queryKey: userKeys.identifier(),
    queryFn: getAccountIdentifier,
    staleTime: Infinity,
    retry: false,
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: getUserProfile,
    staleTime: Infinity,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      toast({
        title: t("toast.update.success", {
          item: t("tab_profile", { ns: "profile" }),
        }),
      });
      queryClient.setQueryData(userKeys.profile(), { ...data });
    },
    onError: (error) => {
      toast({
        title: t("toast.update.error", {
          item: t("tab_profile", { ns: "profile" }),
        }),
        description: t(`error.${error.message}`),
        variant: "destructive",
      });
    },
  });
};

export const useUpdateUserPassword = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast({
        title: t("toast.update.success", {
          item: t("password"),
        }),
      });
    },
    onError: (error) => {
      toast({
        title: t("toast.update.error", {
          item: t("password"),
        }),
        description: t(`error.${error.message}`),
        variant: "destructive",
      });
    },
  });
};
