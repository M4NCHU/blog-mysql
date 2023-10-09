"use client";

import { UsernameRequest, UsernameValidator } from "@/lib/validators/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface UserNameSettingsProps {
  user: Pick<User, "id" | "username">;
}

const UserNameSettings: FC<UserNameSettingsProps> = ({ user }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });

  const { mutate: changeUsername } = useMutation({
    mutationFn: async ({ name }: UsernameRequest) => {
      const payload: UsernameRequest = { name };

      const { data } = await axios.patch(`api/username`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error("Username already exists.");
        }

        if (err.response?.status === 422) {
          toast.error("Invalid name.");
        }

        if (err.response?.status === 401) {
          toast.error("Unauthorized");
        }
      }

      toast.error("There was an error");
    },
    onSuccess: (data) => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((e) => {
        changeUsername(e);
      })}
    >
      <p>Username</p>
      <Input {...register("name")} />

      {errors?.name && <p>{errors.name.message}</p>}

      <Button type="submit">Change name</Button>
    </form>
  );
};

export default UserNameSettings;
