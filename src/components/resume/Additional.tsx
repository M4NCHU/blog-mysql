"use client";

import { FC } from "react";
import ResumeHeader from "./ResumeHeader";
import { FaFootballBall } from "react-icons/fa";
import { BiFootball } from "react-icons/bi";
import { MdDirectionsBike } from "react-icons/md";

interface AdditionalProps {}

const Additional: FC<AdditionalProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Hobby" id="additional-informations" />
      <div className="flex flex-row gap-4 items-center">
        <ul className="flex flex-row gap-4">
          <li className="flex flex-row gap-2 items-center rounded-full bg-backgroundSecond py-2 px-4 cursor-pointer">
            {<BiFootball />}
            Football
          </li>
          <li className="flex flex-row gap-2 items-center rounded-full bg-backgroundSecond py-2 px-4 cursor-pointer">
            {<MdDirectionsBike />}
            Bike
          </li>
        </ul>
      </div>
    </>
  );
};

export default Additional;
