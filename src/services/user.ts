import {
  FetchingData,
  OffsetSchema,
  Order,
  PagedData,
  TransactionHistory,
  UserProfile,
} from "@/lib/types";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

export const getUserProfile = async () => {
  return (await api.get("users/profile").json<FetchingData<UserProfile>>()).data;
};

export const updateUserProfile = async (payload: Partial<UserProfile>) => {
  return (
    await api.put("users/profile", { json: { body: payload } }).json<FetchingData<UserProfile>>()
  ).data;
};

type UpdateUserPasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export const updateUserPassword = async (payload: UpdateUserPasswordPayload) => {
  return await api.put("users/profile/password", { json: payload }).json();
};

export const getUserTransactionsHistory = async (payload: OffsetSchema) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get("payment/transactions", { searchParams })
      .json<FetchingData<PagedData<TransactionHistory>>>()
  ).data;
};

export const getUserTransactionDetail = async (transactionId: number) => {
  return (await api.get(`payment/transactions/${transactionId}`).json<FetchingData<Order>>()).data;
};
