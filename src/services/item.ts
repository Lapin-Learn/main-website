import { EnumItemShop } from "@/lib/enums";
import { FetchingData } from "@/lib/types";
import { Inventory, Item, Reward, Shop } from "@/lib/types/shop.type";

import api from "./kyInstance";

export type BuyItemPayload = {
  id: string;
  quantity: number;
};

export const getShop = async () => {
  return (await api.get("shops").json<FetchingData<Shop[]>>()).data;
};

export const buyItem = async (payload: BuyItemPayload) => {
  return (await api.post("shops/buy", { json: payload }).json<FetchingData<Item>>()).data;
};

export const getInventory = async () => {
  const response = (await api.get("inventories").json<FetchingData<Inventory[]>>()).data;
  return response.filter((item) => item.quantity > 0 || item.expAt);
};

export type UseItemPayload = {
  itemId: string;
};
export const useItem = async (payload: UseItemPayload) => {
  return (
    await api
      .put("inventories/use-item", {
        json: payload,
      })
      .json<FetchingData<Reward | { type: EnumItemShop }>>()
  ).data;
};
