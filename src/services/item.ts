import BillCarrots from "@/assets/images/bill-carrots.jpg";
import { ItemEnum } from "@/lib/enums";
import { FetchingData } from "@/lib/types";
import { IInventory, IItem, IReward, IShop } from "@/lib/types/item.type";

import api from "./kyInstance";

export type BuyItemPayload = {
  id: string;
  quantity: number;
};

export const getShop = async () => {
  const response = (await api.get("shops").json<FetchingData<IShop[]>>()).data;
  const billItem: IShop = {
    id: "bill",
    name: ItemEnum.BILL,
    price: { 1: 10000 },
    image: {
      id: "bill-carrots",
      name: "Bill Carrots",
      permission: "public",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadStatus: "completed",
      url: BillCarrots,
    },
    description: "Buy bill to get more time",
    duration: 0,
    imageId: "bill-carrots",
    popular: "1",
    isPopular: false,
  };
  response.unshift(billItem);
  return response;
};

export const buyItem = async (payload: BuyItemPayload) => {
  const response = (
    await api.post("inventories/buy-item", { json: payload }).json<FetchingData<IItem>>()
  ).data;

  return response;
};

export const getInventory = async () => {
  const response = (await api.get("inventories").json<FetchingData<IInventory[]>>()).data;
  // fixme: it should be item.quantity > 0 || item.expAt
  return response.filter((item) => item.quantity > 0);
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
      .json<FetchingData<IReward | { type: ItemEnum }>>()
  ).data;
  return response;
};
