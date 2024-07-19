"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "../lib/utils";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "../lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (type === "sign-up") {
        const userData: any = {
          firstName: values.firstName!,
          lastName: values.lastName!,
          address1: values.address1!,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          dateOfBirth: values.dateOfBirth!,
          ssn: values.ssn!,
          email: values.email,
          password: values.password,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn(values);
        if (response.code === 401) {
          toast({
            title: response.message,
            variant: "destructive",
          });
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error.response.code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign up"}
            <p className="text-16 font-normal text-gray-600 ">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant={"primary"} />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"firstName"}
                      placeholder={"ex: Jhon"}
                      label={"First Name"}
                      type="text"
                    />
                    <CustomInput
                      control={form.control}
                      name={"lastName"}
                      placeholder={"ex: Doe"}
                      label={"Last Name"}
                      type="text"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name={"address1"}
                    placeholder={"Enter your specific address"}
                    label={"Address"}
                    type="text"
                  />
                  <CustomInput
                    control={form.control}
                    name={"city"}
                    placeholder={"Enter your city"}
                    label={"City"}
                    type="text"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"state"}
                      placeholder={"ex: NY"}
                      label={"State"}
                      type="text"
                    />
                    <CustomInput
                      control={form.control}
                      name={"postalCode"}
                      placeholder={"ex: 11101"}
                      label={"Postal Code"}
                      type="text"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"dateOfBirth"}
                      placeholder={"ex: yyyy-dd-mm"}
                      label={"Date of Birth"}
                      type="string"
                    />
                    <CustomInput
                      control={form.control}
                      name={"ssn"}
                      placeholder={"ex: 1234"}
                      label={"SSN"}
                      type="text"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name={"email"}
                placeholder={"enter your email"}
                label={"Email"}
                type="email"
              />
              <CustomInput
                control={form.control}
                name={"password"}
                placeholder={"enter your password"}
                label={"Password"}
                type="password"
              />
              <div className="flex flex-col gap-1">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...{" "}
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have account"
                : "Already have an account"}
              <Link
                className="form-link"
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              >
                {type === "sign-in" ? " sign-up" : " sign-in"}
              </Link>
            </p>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
