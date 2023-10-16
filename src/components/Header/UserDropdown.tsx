"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  session: Session;
}

export const UserDropdown = ({ session }: UserDropdownProps) => {
  const router = useRouter();
  if (!session) return;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          color="secondary"
          size="md"
          src={session.user.image ? session.user.image : ""}
        />
      </DropdownTrigger>

      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
          onClick={() => {
            router.push(`/profile/${session.user.id}`);
          }}
        >
          <p>Good Morning,</p>
          <p>{session.user.username ? session.user.username : "user"}</p>
        </DropdownItem>
        {/* <hr /> */}
        <DropdownItem
          key="settings"
          onClick={() => {
            router.push(`/profile/${session.user.id}/settings`);
          }}
        >
          My Settings
        </DropdownItem>
        <DropdownItem
          key="configurations"
          onClick={() => {
            router.push(`/profile/${session.user.id}/posts`);
          }}
        >
          Your posts
        </DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger "
          onClick={() => signOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
