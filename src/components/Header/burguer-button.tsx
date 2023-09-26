import React from "react";
import { useSidebarContext } from "@/components/layout/Layout-context";
import { StyledBurgerButton } from "./navbar.styles";
import { HiBars3BottomLeft } from "react-icons/hi2";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className="text-2xl"
      // open={collapsed}
      onClick={setCollapsed}
    >
      <HiBars3BottomLeft/>
    </div>
  );
};
