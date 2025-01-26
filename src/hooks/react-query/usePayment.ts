import { useMutation, useQuery } from "@tanstack/react-query";

import { createLink, getPaymentLink } from "@/services/payment.ts";

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
