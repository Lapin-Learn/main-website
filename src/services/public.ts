import { FetchingData, LandingPageCollection, SimulatedTestCollection } from "@/lib/types";

import { apiPublic } from "./kyInstance";

export const searchCollections = async (keyword: string) => {
  return (
    await apiPublic
      .get("collections/searching", {
        searchParams: { keyword },
      })
      .json<FetchingData<SimulatedTestCollection[]>>()
  ).data;
};

export const getCollectionIntroduction = async () => {
  return (
    await apiPublic.get("collections/introduction").json<FetchingData<LandingPageCollection[]>>()
  ).data;
};
