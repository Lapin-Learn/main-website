import { FetchingData, PagedData, PagingSchema } from "@/lib/types";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";
import { SimulatedTestCollection } from "@/lib/types/simulated-test.type";

export type CollectionParams = {
  keyword?: string;
} & PagingSchema;

export const getSimulatedTestCollections = async (payload: CollectionParams) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get("simulated-test/collections", {
        searchParams,
      })
      .json<FetchingData<PagedData<SimulatedTestCollection>>>()
  ).data;
};
