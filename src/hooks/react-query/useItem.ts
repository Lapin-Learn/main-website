import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { buyItem, getInventory, getShop, useItem } from "@/services/item";

import { useToast } from "../use-toast";
import { gamificationKeys } from "./useGamification";

export const itemKeys = {
  key: ["item"] as const,
  shop: () => [itemKeys.key, "shop"] as const,
  inventory: () => [itemKeys.key, "inventory"] as const,
};

export const useShop = () => {
  return useQuery({
    queryKey: itemKeys.shop(),
    queryFn: getShop,
    staleTime: Infinity,
  });
};

export const useBuyShopItem = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: buyItem,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: itemKeys.inventory() });
      client.invalidateQueries({ queryKey: gamificationKeys.gamificationProfile });
    },
  });
};

export const useInventory = () => {
  return useQuery({
    queryKey: itemKeys.inventory(),
    queryFn: getInventory,
    staleTime: Infinity,
  });
};

export const useUseInventoryItem = () => {
  const client = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation("item");

  return useMutation({
    mutationFn: useItem,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: itemKeys.inventory() });
    },
    onError: (response) => {
      toast({
        title: t("error", { ns: "common" }),
        description: t(response.message),
        variant: "destructive",
      });
    },
  });
};
