import { EnumItemShop, EnumRandomGiftType } from "../enums";
import { IBucket } from "../interfaces";

export type Shop = {
  id: string;
  name: EnumItemShop;
  description: string;
  price: {
    [key: string]: number;
  };
  duration: number;
  imageId: string;
  image: IBucket;
  popular: string;
  isPopular: boolean;
};

export type Item = {
  id: string;
  itemId: string;
  profileId: string;
  quantity: number;
  expAt: string;
  inUseQuantity: number;
};

export type Inventory = Pick<Item, "quantity" | "expAt"> & Omit<Shop, "popular" | "isPopular">;

export type RandomGift = {
  type: EnumRandomGiftType;
  value: number | Omit<Shop, "popular" | "isPopular">;
};

export type Reward =
  | {
      message: string;
    }
  | RandomGift;
