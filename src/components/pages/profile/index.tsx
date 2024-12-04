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
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { useUserProfile } from "@/hooks/react-query/useUsers";
import { EnumGender } from "@/lib/enums";
import { FormDatePicker } from "@/components/mocules/form-inputs/form-date-picker";
import FormSelect from "@/components/mocules/form-inputs/form-select";

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

  function onSubmit(_: FormInputs) {}

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data.gender);
      form.reset({
        email: data.email,
        fullName: data.fullName ?? "",
        username: data.username ?? "",
        dob: data.dob ? new Date(data.dob) : "",
        gender: data.gender ? data.gender : undefined,
      });
    }
  }, [data, isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 overflow-hidden">
      <div className="z-10 w-full">
        {isLoading ? (
          <Loader2 className="mx-auto size-12 animate-spin" />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        error={Boolean(form.formState.errors.username)}
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        error={Boolean(form.formState.errors.fullName)}
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
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="example@gmail.com"
                        error={Boolean(form.formState.errors.email)}
                        {...field}
                        onChange={field.onChange}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormDatePicker name="dob" label="Ngày sinh" />
              <FormSelect
                name="gender"
                label="Giới tính"
                placeholder="Chọn giới tính"
                options={Object.values(EnumGender).map((item) => ({
                  label: item.charAt(0).toUpperCase() + item.slice(1),
                  value: item,
                }))}
              />
              <Button disabled className="w-fit" size="lg">
                Lưu thay đổi
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
