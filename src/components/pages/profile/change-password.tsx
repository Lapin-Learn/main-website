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
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useUpdateUserPassword } from "@/hooks/react-query/useUsers";

const formSchema = z
  .object({
    oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type FormInputs = z.infer<typeof formSchema>;

export default function ChangePasswordPage() {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });
  const updatePassword = useUpdateUserPassword();
  const { t } = useTranslation("profile");

  const onSubmit = (data: FormInputs) => {
    updatePassword.mutate(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          form.reset({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 overflow-hidden">
      <div className="z-10 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formUpdatePassword.oldPassword.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("formUpdatePassword.oldPassword.placeholder")}
                      error={Boolean(form.formState.errors.oldPassword)}
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formUpdatePassword.newPassword.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("formUpdatePassword.newPassword.placeholder")}
                      error={Boolean(form.formState.errors.newPassword)}
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                        form.trigger("confirmPassword");
                      }}
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
                  <FormLabel>{t("formUpdatePassword.confirmPassword.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("formUpdatePassword.confirmPassword.placeholder")}
                      error={Boolean(form.formState.errors.confirmPassword)}
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                        form.trigger("confirmPassword");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={
                updatePassword.isPending || !form.formState.isDirty || !form.formState.isValid
              }
              className="w-fit"
              size="lg"
              isLoading={updatePassword.isPending}
            >
              {t("saveBtn")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
