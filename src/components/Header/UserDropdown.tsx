"use client";

import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { FiSettings } from "react-icons/fi";
import { Session } from "next-auth";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface UserDropdownProps {
  session: Session;
}

export const UserDropdown = ({ session }: UserDropdownProps) => {
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
        >
          <p>Good Morning,</p>
          <p>{session.user.username ? session.user.username : "user"}</p>
        </DropdownItem>
        {/* <hr /> */}
        <DropdownItem key="settings">My Settings</DropdownItem>
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
