"use client";

import { PostWithUser } from "@/types/db";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Post, User } from "@prisma/client";

import { IoIosNotificationsOutline } from "react-icons/io";

interface NotificationsDropdownProps {
  notifications: PostWithUser[] | null;
}

export const NotificationsDropdown = ({
  notifications,
}: NotificationsDropdownProps) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          className="flex rounded-full  bg-transparent hover:bg-default-100 text-xl"
        >
          <IoIosNotificationsOutline size={24} />
        </Button>
      </DropdownTrigger>

      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Latest posts (7 days)">
          {notifications ? (
            notifications.map((item, i) => (
              <DropdownItem
                classNames={{
                  base: "py-2",
                  title: "text-base font-semibold",
                }}
                key={i}
                description={item.author.name}
              >
                {item.title}
              </DropdownItem>
            ))
          ) : (
            <p>Nothing to read</p>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
