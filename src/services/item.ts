import { ItemEnum } from "@/lib/enums";
import { FetchingData } from "@/lib/types";
import { Inventory, Item, Reward, Shop } from "@/lib/types/shop.type";

import api from "./kyInstance";

export type BuyItemPayload = {
  id: string;
  quantity: number;
};

export const getShop = async () => {
  const response = (await api.get("shops").json<FetchingData<Shop[]>>()).data;
  return response;
};

export const buyItem = async (payload: BuyItemPayload) => {
  const response = (
    await api.post("inventories/buy-item", { json: payload }).json<FetchingData<Item>>()
  ).data;

  return response;
};

export const getInventory = async () => {
  const response = (await api.get("inventories").json<FetchingData<Inventory[]>>()).data;
  return response.filter((item) => item.quantity > 0 || item.expAt);
};

export type UseItemPayload = {
  itemId: string;
};
export const useItem = async (payload: UseItemPayload) => {
  const response = (
    await api
      .put("inventories/use-item", {
        json: payload,
      })
      .json<FetchingData<Reward | { type: ItemEnum }>>()
  ).data;
  return response;
};
