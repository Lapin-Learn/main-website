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
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { KeyRound, Loader2, MoveLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/react-query/useAuth";

const formSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      return ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type FormInputs = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const { t } = useTranslation("auth");
  const form = useForm<FormInputs>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });
  const updatePassword = useUpdatePassword();
  const { accessToken } = useLocation().state as { accessToken: string };
  const navigate = useNavigate();

  function onSubmit(data: FormInputs) {
    updatePassword.mutate({
      newPassword: data.newPassword,
      accessToken,
    });
  }

  useEffect(() => {
    if (!accessToken) navigate({ to: "/log-in" });
  });

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div className="-mb-8 w-80">
          <Link
            to="/log-in"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors duration-150 ease-in hover:cursor-pointer hover:text-black"
          >
            <MoveLeft size={16} />
            <p className="text-sm font-medium">{t("backBtn")}</p>
          </Link>
        </div>
        <div>
          <div className="mb-3 text-center text-3xl font-bold">{t("resetPassword.title")}</div>
          <div className="max-w-80 text-wrap text-center text-sm">
            {t("resetPassword.description")}
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-80 flex-col gap-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("resetPassword.newPassword")}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("resetPassword.newPassword")}
                      error={Boolean(form.formState.errors.newPassword)}
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
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="mt-4 w-full bg-primary"
              disabled={updatePassword.isPending}
            >
              {updatePassword.isPending && (
                <Loader2 className="mr-1 size-5 animate-spin text-white" />
              )}
              {t("resetPassword.resetPasswordBtn")}
            </Button>
          </form>
        </Form>
      </div>
      <div />
    </>
  );
}
