"use client";
import { FC } from "react";
import ResumeHeader from "./ResumeHeader";
import SkillsCard from "./SkillsCard";
import { MdJavascript } from "react-icons/md";

// images
import MySql from "@/assets/mysql.png";
import Postgres from "@/assets/postgres.png";
import MongoDB from "@/assets/mongo.png";
import Firebase from "@/assets/firebase.png";

interface DatabasesProps {}

const Databases: FC<DatabasesProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Databases" id="databases" />
      <div className="w-full flex flex-row gap-2 flex-wrap">
        <SkillsCard title="MySql" icon={MySql} />
        <SkillsCard title="Postgres" icon={Postgres} />
        <SkillsCard title="MongoDB" icon={MongoDB} />
        <SkillsCard title="Firebase" icon={Firebase} />
        {/* <SkillsCard title="NextJS" icon={Python} /> */}
      </div>
    </>
  );
};

export default Databases;
