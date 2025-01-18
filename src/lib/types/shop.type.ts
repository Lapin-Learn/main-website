import { ItemEnum, RandomGiftTypeEnum } from "../enums";
import { IBucket } from "../interfaces";

export type Shop = {
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

export type Item = {
  id: string;
  itemId: string;
  profileId: string;
  quantity: number;
  expAt: string;
  inUseQuantity: number;
};

export type ItemSubscription = {
  id: string;
  name: ItemEnum;
  description: string;
  price: {
    [key: string]: number;
  };
  image: {
    name: string;
    url: string;
  };
  popular: string;
  isPopular: boolean;
};

export type Inventory = Pick<Item, "quantity" | "expAt"> & Omit<Shop, "popular" | "isPopular">;

export type RandomGift = {
  type: RandomGiftTypeEnum;
  value: number | Omit<Shop, "popular" | "isPopular">;
};

export type Reward =
  | {
      message: string;
    }
  | RandomGift;
