import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { KeyRound, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

import GoogleLogo from "@/assets/icons/GoogleLogo";
import { Input } from "@/components/ui/input";
import { useSignUp, useSignUpWithGoogle } from "@/hooks/react-query/useAuth";

import { Separator } from "../ui/separator";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      return ctx.addIssue({
        message: "Passwords do not match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
    return true;
  });

type FormInputs = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const { t } = useTranslation("auth");
  const form = useForm<FormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });
  const signUpMutation = useSignUp();
  const signUpWithGoogleMutation = useSignUpWithGoogle();

  function onSubmit(data: FormInputs) {
    signUpMutation.mutate({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div>
          <div className="mb-3 text-center text-3xl font-bold">{t("signUp.title")}</div>
          <div className="text-center text-sm">{t("signUp.description")}</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-80 flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("email", { ns: "common" })}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="example@gmail.com"
                      error={Boolean(form.formState.errors.email)}
                      {...field}
                      onChange={field.onChange}
                      StartIcon={Mail}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("password", { ns: "common" })}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("password", { ns: "common" })}
                      error={Boolean(form.formState.errors.password)}
                      {...field}
                      type="password"
                      onChange={field.onChange}
                      StartIcon={KeyRound}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("confirmPassword", { ns: "common" })}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("confirmPassword", { ns: "common" })}
                      error={Boolean(form.formState.errors.confirmPassword)}
                      {...field}
                      type="password"
                      onChange={field.onChange}
                      StartIcon={KeyRound}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                variant="default"
                className="mt-4 w-full bg-primary"
                size="lg"
                disabled={signUpMutation.isPending}
              >
                {signUpMutation.isPending && (
                  <Loader2 className="mr-1 size-5 animate-spin text-white" />
                )}
                {t("signUp.signUpBtn")}
              </Button>
              <div className="flex w-full flex-row items-center gap-2">
                <Separator orientation="horizontal" className="flex-1" />
                <p className="text-sm">{t("or")}</p>
                <Separator orientation="horizontal" className="flex-1" />
              </div>
              <Button
                variant="outline"
                type="button"
                className="inline-flex flex-row items-center"
                size="lg"
                onClick={() => signUpWithGoogleMutation.mutate()}
              >
                {t("signUp.anotherSignUp")}&nbsp;
                <span>
                  <GoogleLogo />
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        {t("signUp.alreadyHadAccount")}&nbsp;
        <Link to="/log-in" className="font-bold">
          {t("logIn.logInBtn")}
        </Link>
      </div>
    </>
  );
}
