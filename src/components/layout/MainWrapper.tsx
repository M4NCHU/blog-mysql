"use client";
import { Session } from "next-auth";
import React, { FC } from "react";

interface MainWrapperProps {
  children: React.ReactNode;
  session: Session | null;
}

const MainWrapper: FC<MainWrapperProps> = ({ children, session }) => {
  return <></>;
};

export default MainWrapper;
