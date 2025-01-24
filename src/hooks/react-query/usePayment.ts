import { useMutation } from "@tanstack/react-query";

import { createLink } from "@/services/payment.ts";

export const useCreateLink = () => {
  return useMutation({
    mutationFn: createLink,
  });
};
