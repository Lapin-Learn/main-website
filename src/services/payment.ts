import { FetchingData, PaymentLinkInfo } from "@/lib/types";
import { CheckoutResponseDataType } from "@/lib/types/shop.type.ts";
import api from "@/services/kyInstance.ts";

export enum PaymentTypeEnum {
  CARROTS = "carrots",
}

type CreateLinkPayload = {
  type: PaymentTypeEnum;
  quantity: number;
  redirectUrl: string;
};

export const createLink = async (payload: CreateLinkPayload) => {
  return (
    await api
      .post("payment/payment-link", { json: payload })
      .json<FetchingData<CheckoutResponseDataType>>()
  ).data;
};

export const getPaymentLink = async (orderCode: number) => {
  return (await api.get(`payment/payment-link/${orderCode}`).json<FetchingData<PaymentLinkInfo>>())
    .data;
};
