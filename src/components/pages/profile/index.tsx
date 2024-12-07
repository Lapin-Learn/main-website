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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { useUpdateUserProfile, useUserProfile } from "@/hooks/react-query/useUsers";
import { EnumGender } from "@/lib/enums";
import { FormDatePicker } from "@/components/mocules/form-inputs/form-date-picker";
import FormSelect from "@/components/mocules/form-inputs/form-select";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1, "Full name must be at least 1 characters long"),
  username: z.string().min(1, "Username must be at least 1 characters long"),
  dob: z.date().or(z.string()),
  gender: z.nativeEnum(EnumGender),
});

type FormInputs = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });
  const { data, isLoading, isSuccess } = useUserProfile();
  const updateProfile = useUpdateUserProfile();
  const { t } = useTranslation("profile");

  const onSubmit = (data: FormInputs) => {
    updateProfile.mutate({
      ...data,
      dob: new Date(data.dob),
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      form.reset({
        email: data.email,
        fullName: data.fullName ?? "",
        username: data.username ?? "",
        dob: data.dob ? new Date(data.dob) : "",
        gender: data.gender ? data.gender : undefined,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    console.log("isValid", form.formState.isValid);
    console.log("isDiry", form.formState.isDirty);
  }, [form.formState]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formProfile.username.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("formProfile.username.placeholder")}
                      error={Boolean(form.formState.errors.username)}
                      {...field}
                      onChange={field.onChange}
                      loading={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formProfile.fullName.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("formProfile.fullName.placeholder")}
                      error={Boolean(form.formState.errors.fullName)}
                      {...field}
                      onChange={field.onChange}
                      loading={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>{t("formProfile.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("formProfile.email.placeholder")}
                      error={Boolean(form.formState.errors.email)}
                      {...field}
                      onChange={field.onChange}
                      disabled
                      loading={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDatePicker
              name="dob"
              label={t("formProfile.dob.label")}
              placeholder={t("formProfile.dob.placeholder")}
            />
            <FormSelect
              name="gender"
              label="Giới tính"
              placeholder="Chọn giới tính"
              options={Object.values(EnumGender).map((item) => ({
                label: t(`formProfile.gender.options.${item}`),
                value: item,
              }))}
              loading={isLoading}
            />
            <Button
              disabled={
                updateProfile.isPending ||
                isLoading ||
                !form.formState.isDirty ||
                !form.formState.isValid
              }
              className="w-fit"
              size="lg"
              isLoading={updateProfile.isPending || isLoading}
            >
              {t("saveBtn")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
