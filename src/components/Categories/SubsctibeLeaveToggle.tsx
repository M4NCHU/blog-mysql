"use client";

import { SubscribeToCategoryPayload } from "@/lib/validators/category";
import { Button } from "@nextui-org/react";
import axios, { Axios, AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, startTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";

interface SubscribeLeaveToggleProps {
  categoryId: string;
  isSubscribed: boolean | null;
  categoryName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  categoryId,
  isSubscribed,
  categoryName,
}) => {
  const router = useRouter();

  const { mutate: subscribeToCategory, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCategoryPayload = {
        categoryId,
      };

      const { data } = await axios.post("/api/category/subscribe", payload);
      return data as string;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error("Unauthorized");
        }
      }
      toast.error("There was an error");
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      toast.success(`You've just subscribed to category: ${categoryName}`);
    },
  });

  const { mutate: unsubscribeToCategory, isLoading: isUnsubLoading } =
    useMutation({
      mutationFn: async () => {
        const payload: SubscribeToCategoryPayload = {
          categoryId,
        };

        const { data } = await axios.post("/api/category/unsubscribe", payload);
        return data as string;
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            toast.error("Unauthorized");
          }
        }
        toast.error("There was an error");
      },
      onSuccess: () => {
        startTransition(() => {
          router.refresh();
        });

        toast.success(
          `You've just unsubscribed from category: ${categoryName}`
        );
      },
    });

  return (
    <div>
      <div>
        {isSubscribed ? (
          <Button
            className="w-full"
            variant="flat"
            color="danger"
            onClick={() => unsubscribeToCategory()}
          >
            Leave
          </Button>
        ) : (
          <Button
            className="w-full"
            variant="flat"
            color="success"
            onClick={() => subscribeToCategory()}
          >
            Join
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubscribeLeaveToggle;
