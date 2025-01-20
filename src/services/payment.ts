import { FetchingData } from "@/lib/types";
import { CheckoutResponseDataType } from "@/lib/types/shop.type.ts";
import api from "@/services/kyInstance.ts";

export enum PaymentTypeEnum {
  CARROTS = "carrots",
}

type CreateLinkPayload = {
  type: PaymentTypeEnum;
  quantity: number;
};

export const createLink = async (payload: CreateLinkPayload) => {
  return (
    await api
      .post("payment/payment-link", { json: payload })
      .json<FetchingData<CheckoutResponseDataType>>()
  ).data;
};
