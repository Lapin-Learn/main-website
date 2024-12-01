import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, MoveLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

import { useGetOtp, useVerifyOtp } from "@/hooks/react-query/useAuth";
import useCountdown from "@/hooks/use-countdown";
import { useOTPPayloadStore } from "@/hooks/useOTPPayloadStore";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your OTP must be 6 characters.",
  }),
});

type FormInputs = z.infer<typeof formSchema>;

const formatEmail = (email: string) => {
  const parts = email.split("@");
  return parts[0][0] + "*****" + parts[0].slice(-1) + "@" + parts[1];
};

export default function VerifyOtpPage() {
  const { t } = useTranslation("auth");
  const form = useForm<FormInputs>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(formSchema),
  });
  const { email, action } = useOTPPayloadStore();
  const verifyOtpMutation = useVerifyOtp();
  const getOtp = useGetOtp();
  const navigate = useNavigate();
  const { time, timeLeft, restart } = useCountdown(5 * 60);

  const onSubmit = (data: FormInputs) => {
    verifyOtpMutation.mutate(data.otp);
  };

  useEffect(() => {
    if (!email) navigate({ to: "/log-in" });
  }, [email, navigate]);

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div className="-mb-8 w-80">
          <Link
            to="/log-in"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors duration-150 ease-in hover:cursor-pointer hover:text-black"
          >
            <MoveLeft size={16} />
            <p className="text-sm font-medium"> Back to Log in</p>
          </Link>
        </div>
        <div>
          <div className="mb-3 text-center text-3xl font-bold">{t("verifyOTP.title")}</div>
          <div className="max-w-96 text-center text-sm">
            {t("verifyOTP.sendTo")}&nbsp;
            <span className="text-orange-700">{formatEmail(email)}</span>.
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-80 flex-col gap-2">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              className="mt-4 w-full bg-primary"
              size="lg"
              disabled={verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending && (
                <Loader2 className="mr-1 size-5 animate-spin text-white" />
              )}
              {t("verifyOTP.verifyOTPBtn")}
            </Button>
            <div className="mt-1 text-center text-sm">
              {t("verifyOTP.receiveOTPQuestion")}&nbsp;
              <a
                className="font-bold hover:cursor-pointer"
                onClick={() => {
                  if (timeLeft > 0) return;
                  restart();
                  getOtp.mutate({
                    email,
                    action,
                  });
                }}
              >
                {t("verifyOTP.resend")}&nbsp;{time}
              </a>
            </div>
          </form>
        </Form>
      </div>
      <div />
    </>
  );
}
