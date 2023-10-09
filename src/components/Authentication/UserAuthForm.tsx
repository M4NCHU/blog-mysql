"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast.error("This didn't work.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex justify-center w-full items-center flex-col gap-4",
        className
      )}
      {...props}
    >
      <Button
        isLoading={isLoading}
        startContent={!isLoading && <FcGoogle />}
        type="button"
        className="w-full bg-background"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        Google
      </Button>

      <p className="text-hoverColor">
        {`dont't have a account?`}
        <a href="/sign-up" className="text-foreground">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default UserAuthForm;
