import { FetchingData, PagedData, PagingSchema } from "@/lib/types";
import { SimulatedTest, SimulatedTestCollection } from "@/lib/types/simulated-test.type";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

export type CollectionParams = {
  keyword?: string;
} & PagingSchema;

export const getSimulatedTestCollections = async (payload: CollectionParams) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get("collections", {
        searchParams,
      })
      .json<FetchingData<PagedData<SimulatedTestCollection>>>()
  ).data;
};

export const getSimulatedTestCollectionDetail = async (
  collectionId: number,
  payload: PagingSchema
) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get(`collections/${collectionId}/simulated-tests`, {
        searchParams,
      })
      .json<FetchingData<PagedData<SimulatedTest>>>()
  ).data;
};
