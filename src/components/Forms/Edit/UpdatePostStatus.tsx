"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Post } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, startTransition, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineAdminPanelSettings, MdPublic } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";

interface UpdatePostStatusProps {
  isPrivate: boolean;
  role: string | undefined;
  postId: string;
}

interface ApiResponse {
  type: boolean;
}

const UpdatePostStatus: FC<UpdatePostStatusProps> = ({
  isPrivate,
  role,
  postId,
}) => {
  const isAdmin = role === "ADMIN";
  const router = useRouter();
  const [privatePost, setPrivatePost] = useState<boolean>(isPrivate);

  const { mutate: ChangeVisibility } = useMutation({
    mutationFn: async (type: boolean) => {
      const payload = {
        postId,
        type,
      };

      const { data } = await axios.patch(
        "/api/category/post/visibility",
        payload
      );
      return data;
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: (data) => {
      if (data.type !== undefined) {
        setPrivatePost(!data.type);
      }

      router.refresh();
      toast.success("Visibility of post changed");
    },
  });

  return (
    <>
      {isAdmin && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              className="rounded-full bg-transparent hover:bg-default-200"
            >
              {privatePost ? (
                <MdPublic className="text-xl text-foregroundSecond" />
              ) : (
                <MdOutlineAdminPanelSettings className="text-xl text-foregroundSecond" />
              )}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with icons"
            disabledKeys={[privatePost ? "public" : "private"]}
          >
            <DropdownItem
              key="private"
              startContent={<MdOutlineAdminPanelSettings />}
              onClick={() => {
                ChangeVisibility(true);
              }}
            >
              Private
            </DropdownItem>
            <DropdownItem
              key="public"
              startContent={<MdPublic />}
              onClick={() => {
                ChangeVisibility(false);
              }}
            >
              Public
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

export default UpdatePostStatus;
