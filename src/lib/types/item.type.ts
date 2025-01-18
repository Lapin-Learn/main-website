import { ItemEnum, RandomGiftTypeEnum } from "../enums";
import { IBucket } from "../interfaces";

export type IShop = {
  id: string;
  name: ItemEnum;
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

export type IItem = {
  id: string;
  itemId: string;
  profileId: string;
  quantity: number;
  expAt: string;
  inUseQuantity: number;
};

export type IInventory = Pick<IItem, "quantity" | "expAt"> & Omit<IShop, "popular" | "isPopular">;

export type IRandomGift = {
  type: RandomGiftTypeEnum;
  value: number | Omit<IShop, "popular" | "isPopular">;
};

export type IReward =
  | {
      message: string;
    }
  | IRandomGift;
