import type { Metadata } from "next";
import React from "react";
import AuthForm from "../../../../components/AuthForm";

export const metadata: Metadata = {
  title: "Horizon | sign-in ",
  description: "Horizon is a modren backing for everyone",
  icons: {
    icon: "icons/logo.svg",
  },
};

const SignIn = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default SignIn;
