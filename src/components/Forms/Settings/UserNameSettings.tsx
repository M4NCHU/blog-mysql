"use client";

import { UsernameRequest, UsernameValidator } from "@/lib/validators/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { BsCheck2 } from "react-icons/bs";

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

  const { mutate: changeUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameRequest) => {
      const payload: UsernameRequest = { name };

      const { data } = await axios.patch(`/api/usersettings/username`, payload);
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
      className="flex flex-row items-center gap-2"
    >
      <Input {...register("name")} />
      <Button isIconOnly type="submit" className="bg-default-100">
        {isLoading ? (
          <Spinner
            size="sm"
            color="default"
            className="text-default-100 text-sm"
          />
        ) : (
          <BsCheck2 />
        )}
      </Button>

      {errors?.name && <p>{errors.name.message}</p>}
    </form>
  );
};

export default UserNameSettings;
