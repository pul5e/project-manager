import { signUpSchema } from "@/lib/schema";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useSignUpMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

export type SignUpFormData = z.infer<typeof signUpSchema>;
const SignUp = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUpMutation();

  const handleOnSubmit = (values: SignUpFormData) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Account is created successfully");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "An error occured";
        console.log(error);
        toast.error(error.message);
      },
    });
  };
  return (
    <div
      className="
  min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4"
    >
      <Card className=" w-full shadow-xl">
        <CardHeader className="text-center mb-3">
          <CardTitle className="text-2xl font-bold">
            Create your account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Please create an account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              //Gap between the two fields
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="input w-full border border-muted-background rounded-sm text-sm placeholder-gray-400 placeholder-italic px-1 py-1 focus outline-none focus:ring-0 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.email?.message}
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Jean Bon"
                        className="input w-full border border-muted-background rounded-sm text-sm placeholder-gray-400 placeholder-italic px-1 py-1 focus outline-none focus:ring-0 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.email?.message}
                    </p>
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
                      <input
                        type="password"
                        placeholder="**********"
                        className="input w-full border border-muted-background rounded-sm text-sm placeholder-gray-400 placeholder-italic px-1 py-1 focus outline-none focus:ring-0 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.password?.message}
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        placeholder="**********"
                        className="input w-full border border-muted-background rounded-sm text-sm placeholder-gray-400 placeholder-italic px-1 py-1 focus outline-none focus:ring-0 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.password?.message}
                    </p>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg text-white py-2 rounded-md hover:bg-blue-700 transition"
                disabled={isPending}
              >
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <CardFooter className="flex items-center justify-center mt-6">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?&nbsp;{""}
                <Link
                  to="/sign-in"
                  className="text-blue-500 underline hover:text-black"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
