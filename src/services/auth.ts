import { FetchingData } from "@/lib/types";
import { AccountIdentifier } from "@/lib/types/user.type";
import { generateSearchParams } from "@/lib/utils";
import api, { apiAuth } from "@/services/kyInstance";

const delay = 500;
const localStorageTokenKey = "auth_client_token";

export type AuthInfo = {
  accessToken: string;
  refreshToken: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

export const getAuthValueFromStorage = () => {
  return localStorage.getItem(localStorageTokenKey)
    ? (JSON.parse(localStorage.getItem(localStorageTokenKey) ?? "") as AuthInfo)
    : null;
};

export const signIn = async (payload: SignInPayload) => {
  const data = (await apiAuth.post("auth/signin", { json: payload }).json<FetchingData<AuthInfo>>())
    .data;
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));
  return data;
};

type SignUpPayload = {
  email: string;
  password: string;
};

export const signUp = async (payload: SignUpPayload) => {
  const data = (await apiAuth.post("auth/signup", { json: payload }).json<FetchingData<AuthInfo>>())
    .data;
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));
  return data;
};

export const signOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.clear();
      resolve(void 0);
    }, delay)
  );
};

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  return (await api.post("auth/otp", { json: payload }).json<FetchingData<AuthInfo>>()).data;
};

type ForgotPasswordPayload = Pick<VerifyOtpPayload, "email">;
export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const searchParams = generateSearchParams(payload);
  return (await api.get("auth/otp", { searchParams }).json<FetchingData<AuthInfo>>()).data;
};

type ResetPasswordPayload = {
  newPassword: string;
};
export const resetPassword = async (payload: ResetPasswordPayload) => {
  return (await api.post("auth/password-update", { json: payload }).json<FetchingData<AuthInfo>>())
    .data;
};

export const refreshToken = async (refreshToken: string) => {
  const data = (
    await api.post("auth/refresh", {
      json: { refreshToken },
    })
  ).json<FetchingData<AuthInfo>>();
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));
  return data;
};

export const getAccountIdentifier = async () => {
  return (await api.get("users/account").json<FetchingData<AccountIdentifier>>()).data;
};
