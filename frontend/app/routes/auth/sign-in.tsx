import { signInSchema } from "@/lib/schema";
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
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Loader, Loader2 } from "lucide-react";
import { useAuth } from "@/provider/auth-context";

type SignInFormData = z.infer<typeof signInSchema>;
const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginMutation();

  const handleOnSubmit = (values: SignInFormData) => {
    mutate(values, {
      onSuccess: (data) => {
        login(data);
        console.log(data);
        toast.success("Login Successfull");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "An error occured";
        console.log(error);
        toast.error(errorMessage);
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
            Welcome to PM Pilot
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Plese sign-in to your account to continue
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className=" flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
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
                {isPending ? <Loader2 className="w-4 h-4 mr-2" /> : "Sign-in"}
              </Button>
            </form>
          </Form>
          <CardFooter className="flex items-center justify-center mt-6">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?&nbsp;{""}
                <Link
                  to="/sign-up"
                  className="text-blue-500 underline hover:text-black"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
