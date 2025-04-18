import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { OffsetSchema } from "@/lib/types";
import {
  cancelTransaction,
  createLink,
  getPaymentLink,
  getUserTransactionDetail,
  getUserTransactionsHistory,
} from "@/services/payment.ts";

export const transactionKeys = {
  key: ["transactions"] as const,
  transactionList: (filter: OffsetSchema) => [...transactionKeys.key, filter] as const,
  detail: (id: number) => [...transactionKeys.key, id] as const,
};

export const useCreateLink = () => {
  return useMutation({
    mutationFn: createLink,
  });
};

export const useGetPaymentLink = (orderCode: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["payment-link", orderCode],
    queryFn: () => getPaymentLink(orderCode),
    enabled,
  });
};

export const useGetUserTransactionHistory = (filter: OffsetSchema) => {
  return useQuery({
    queryKey: transactionKeys.transactionList(filter),
    queryFn: async () => getUserTransactionsHistory(filter),
    placeholderData: keepPreviousData,
  });
};

export const useGetUserTransactionDetail = (transactionId: number) => {
  return useQuery({
    queryKey: transactionKeys.detail(transactionId),
    queryFn: async () => getUserTransactionDetail(transactionId),
    enabled: !!transactionId,
  });
};

export const useCancelTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.key });
    },
  });
};
