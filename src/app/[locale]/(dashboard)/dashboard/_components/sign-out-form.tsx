"use client";

import { signOut } from "@/app/[locale]/(auth)/auth/sign-in/action";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { TActionResult } from "@/types";
import React, { useActionState } from "react";

const initialState: TActionResult = {
  success: false,
  message: "",
};

const SignOutForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signOut, initialState);

  React.useEffect(() => {
    if (state.success) {
      router.replace("/auth/sign-in");
    }
  }, [state, router]);
  return (
    <form action={formAction}>
      <Button>{isPending ? "Signing out..." : "Sign out"}</Button>
    </form>
  );
};

export default SignOutForm;
