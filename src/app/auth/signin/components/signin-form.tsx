"use client";

import { type SigninInput, SigninSchema } from "@/validators/signin-validator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { SigninUserAction } from "@/actions/signin-user-action";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

export const SigninForm = () => {
  const form = useForm<SigninInput>({
    resolver: valibotResolver(SigninSchema),
    defaultValues: { email: "", password: "" },
  });

  const { control, formState, handleSubmit, setError } = form;

  const submit = async (values: SigninInput) => {
    const res = await SigninUserAction(values);
    if (res.success) {
      window.location.href = "/profile"; // improve this and uise redirect.push instead
    } else {
      switch (res.statusCode) {
        case 401:
          setError("password", { message: res.error });
        case 500:
        default:
          const error = res.error || "Internal server error";
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-[400px]"
        autoComplete="false"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example.eg@email.com"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full font-bold tracking-tight "
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};
