import { FetchingData, UserProfile } from "@/lib/types";

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
