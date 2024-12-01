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
import * as z from "zod";

import GoogleLogo from "@/assets/GoogleLogo";
import { Input } from "@/components/ui/input";
import { useSignIn, useSignInWithGoogle } from "@/hooks/react-query/useAuth";

import { Separator } from "../ui";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormInputs = z.infer<typeof formSchema>;

export default function LogInPage() {
  const form = useForm<FormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  const signInMutation = useSignIn();
  const signInWithGoogleMutation = useSignInWithGoogle();

  function onSubmit(data: FormInputs) {
    signInMutation.mutate(data);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div>
          <div className="mb-3 text-center text-3xl font-bold">Welcome Back!</div>
          <div className="text-center text-sm">
            Enter your email and password to access your account.
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-80 flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
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
            <Link to="/log-in" className="text-right text-sm hover:underline">
              Forgot password?
            </Link>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="mt-4 w-full bg-primary"
                disabled={signInMutation.isPending}
              >
                {signInMutation.isPending && (
                  <Loader2 className="mr-1 size-5 animate-spin text-white" />
                )}
                Log in
              </Button>
              <div className="flex w-full flex-row items-center gap-2">
                <Separator orientation="horizontal" className="flex-1" />
                <p>or</p>
                <Separator orientation="horizontal" className="flex-1" />
              </div>
              <Button
                variant="outline"
                type="button"
                size="lg"
                className="inline-flex flex-row items-center"
                onClick={() => signInWithGoogleMutation.mutate()}
              >
                Sign in with&nbsp;
                <span>
                  <GoogleLogo />
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don't have account?&nbsp;
        <Link to="/sign-up" className="font-bold">
          Sign up
        </Link>
      </div>
    </>
  );
}
