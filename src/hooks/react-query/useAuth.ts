import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HistoryState, useNavigate } from "@tanstack/react-router";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useTranslation } from "react-i18next";

import { EnumActionOTP } from "@/lib/enums";
import {
  getOtp,
  resetPassword,
  signIn,
  signInWithGoogle,
  signOut,
  signUp,
  signUpWithGoogle,
  verifyOtp,
} from "@/services/auth";

import { useToast } from "../use-toast";
import { useAuthStore } from "../useAuthStore";

export const authKeys = {
  key: ["authUser"] as const,
  detail: () => [...authKeys.key, "detail"] as const,
};

export const useSignIn = () => {
  const { t } = useTranslation("error");
  const { toast } = useToast();
  const navigate = useNavigate();
  const analytics = getAnalytics();
  const { setAccessToken } = useAuthStore();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data, variables) => {
      if (!data) {
        navigate({
          to: "/verify-otp",
          search: {
            email: variables.email,
            action: EnumActionOTP.verifyEmail,
          },
        });
      } else {
        setAccessToken(data.accessToken);
        navigate({ to: "/practice" });
        toast({
          title: t("success", { ns: "common" }),
          description: t("success.login", { ns: "auth" }),
          variant: "default",
        });
      }
      logEvent(analytics, "login", {
        method: "email",
        email: variables.email,
      });
    },
    onError: (error) => {
      toast({
        title: t("error", { ns: "common" }),
        description: t(error.message),
        variant: "destructive",
      });
    },
  });
};

export const useSignUp = () => {
  const { t } = useTranslation("error");
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (_, variables) => {
      navigate({
        to: "/verify-otp",
        search: {
          email: variables.email,
          action: EnumActionOTP.verifyEmail,
        },
      });
      toast({
        title: t("success", { ns: "common" }),
        description: t("VERIFY_EMAIL"),
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: t("error", { ns: "common" }),
        description: t(error.message),
        variant: "destructive",
      });
    },
  });
};

export const useSignOut = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate({ to: "/log-in" });
      queryClient.clear();
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: t(error.message, { ns: "error" }),
        variant: "destructive",
      });
    },
  });
};

export const useSignInWithGoogle = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: (data) => {
      if (data) {
        setAccessToken(data.accessToken);
        navigate({ to: "/daily-lesson" });
      }
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: t(error.message, { ns: "error" }),
        variant: "destructive",
      });
    },
  });
};

export const useSignUpWithGoogle = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async () => {
      const res = await signUpWithGoogle();
      if (!res) throw new Error("SIGN_UP_PROVIDER");
      // TODO: May update on BE side or storing data on local storage (not prefer)
      // const { user } = res;
      // const avatar = user.photoURL;
      // let avatarInfo;
      // if (avatar) {
      //   const response = await fetch(avatar);
      //   const blob = await response.blob();
      //   const file = new File([blob], "avatar.jpg", { type: blob.type });
      //   avatarInfo = await createAvatar.mutateAsync(file);
      // }
      // if (user.displayName && user.email && avatarInfo) {
      //   await updateUserProfile({
      //     username: user.email.split("@")[0],
      //     fullName: user.displayName,
      //     avatarId: avatarInfo.id,
      //   });
      // }
    },
    onSuccess: () => {
      navigate({ to: "/daily-lesson" });
      toast({
        title: t("success"),
        description: t("SIGN_UP", { ns: "success" }),
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: t(error.message, { ns: "error" }),
        variant: "destructive",
      });
    },
  });
};

export const useGetOtp = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: getOtp,
    onError: (error) => {
      toast({
        title: t("error"),
        description: t(error.message, { ns: "error" }),
        variant: "destructive",
      });
    },
  });
};

type OTPState = HistoryState & { accessToken: string };
export const useVerifyOtp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data, variables) => {
      if (variables.action == EnumActionOTP.verifyEmail) {
        toast({
          variant: "default",
          title: t("VERIFY_EMAIL", { ns: "success" }),
        });
        navigate({ to: "/log-in" });
      } else {
        navigate({ to: "/reset-password", state: { accessToken: data.accessToken } as OTPState });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("VERIFY_OTP", { ns: "error" }),
      });
    },
  });
};

export const useUpdatePassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate({ to: "/log-in" });
      toast({
        title: t("success", { ns: "common" }),
        description: t("RESET_PASSWORD", { ns: "success" }),
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: t(error.message, { ns: "error" }),
        variant: "destructive",
      });
    },
  });
};
