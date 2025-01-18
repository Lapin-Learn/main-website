import BillCarrots from "@/assets/images/bill-carrots.jpg";

import { ItemEnum } from "../enums";
import { ItemSubscription } from "../types/shop.type";

const carrotSubscription: ItemSubscription = {
  id: "subscription",
  name: ItemEnum.SUBSCRIPTION,
  price: { 1: 10000 },
  image: {
    name: "Bill Carrots",
    url: BillCarrots,
  },
  description: "Buy bill to get more time",
  popular: "1",
  isPopular: false,
};

export { carrotSubscription };
