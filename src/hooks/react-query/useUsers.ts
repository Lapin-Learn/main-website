import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { EnumRole } from "@/lib/enums";
import { Image } from "@/lib/types";
import { getAccountIdentifier } from "@/services";
import {
  getUserProfile,
  getUserTransactionDetail,
  getUserTransactionsHistory,
  updateUserPassword,
  updateUserProfile,
} from "@/services/user";

import { useToast } from "../use-toast";

export const userKeys = {
  key: ["account"] as const,
  identifier: () => [...userKeys.key, "identifier"] as const,
  profile: () => [...userKeys.key, "profile"] as const,
  avatar: () => [...userKeys.key, "avatar"] as const,
};

const baseKey = ["transactions"] as const;

export const transactionKeys = {
  key: baseKey,
  lists: [...baseKey, "lists"] as const,
  list: (filter: object) => [...baseKey, "lists", filter] as const,
  detail: (id: number) => [...baseKey, id] as const,
};

export const useAccountIdentifier = () => {
  const result = useQuery({
    queryKey: userKeys.identifier(),
    queryFn: getAccountIdentifier,
    staleTime: Infinity,
    retry: false,
  });

  const checkRole = (role: EnumRole) => {
    if (!result.isSuccess || !result.data) return false;
    return result.data.role === role;
  };

  return {
    ...result,
    checkRole,
  };
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: getUserProfile,
    staleTime: Infinity,
  });
};

export const useUserAvatar = () => {
  const { data, isLoading } = useUserProfile();
  return {
    avatar: data?.avatar ? (data.avatar as Image) : null,
    isLoading,
  };
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast({
        title: t("toast.update.success", {
          item: t("tab_profile", { ns: "profile" }),
        }),
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(),
      });
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

export const useGetUserTransactionHistory = (offset: number, limit: number) => {
  return useQuery({
    queryKey: transactionKeys.lists,
    queryFn: async () => getUserTransactionsHistory({ offset, limit }),
    placeholderData: keepPreviousData,
  });
};

export const useGetUserTransactionDetail = (transactionId: number) => {
  return useQuery({
    queryKey: transactionKeys.detail(transactionId),
    queryFn: async () => getUserTransactionDetail(transactionId),
  });
};
