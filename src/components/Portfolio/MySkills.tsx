import { FC } from "react";
import PortfolioCard from "./PortfolioCard";
import SectionHeader from "./SectionHeader";

import JS from "@/assets/js.png";
import Men from "@/assets/men.png";
import Node from "@/assets/node.png";
import ReactImg from "@/assets/pngwing.png";
import Success from "@/assets/success.png";
import TailWind from "@/assets/tailwind.png";
import WEB from "@/assets/web.png";
import Csharp from "@/assets/csharp.png";
import Sql from "@/assets/mysql.png";
import postgres from "@/assets/postgres.png";
import python from "@/assets/python.png";
import java from "@/assets/java.png";
import next from "@/assets/nextjs.png";
import Image from "next/image";

interface MySkillsProps {}

const MySkills: FC<MySkillsProps> = ({}) => {
  const frameworks = [
    {
      title: "react",
      icon: ReactImg,
    },
    {
      title: "Node",
      icon: Node,
    },
    {
      title: "JS",
      icon: JS,
    },
    {
      title: "C#",
      icon: Csharp,
    },
    {
      title: "react",
      icon: TailWind,
    },
    {
      title: "WEB",
      icon: WEB,
    },
    {
      title: "python",
      icon: python,
    },
    {
      title: "MySql",
      icon: Sql,
    },
    {
      title: "postgres",
      icon: postgres,
    },
    {
      title: "java",
      icon: java,
    },
    {
      title: "next",
      icon: next,
    },
  ];

  return (
    <div
      className="min-h-screen  px-2 pb-16 pt-20 flex items-center flex-col gap-4"
      id="skills"
    >
      <SectionHeader title="My Skills" />
      <div className="flex w-full flex-col md:flex-row items-center justify-center gap-4">
        <PortfolioCard
          color="warning"
          title="Frontend Development"
          desc="HTML, CSS, JavaScript, React"
          image={Men}
          no={1}
        />
        <PortfolioCard
          color="danger"
          title="Backend Development"
          desc="Node.js, Java, C#, MySQL, Postgres MongoDB"
          image={Success}
          no={2}
        />
      </div>
      <PortfolioCard
        content={
          <div className="flex flex-row flex-wrap items-center justify-center pb-4 gap-6">
            {frameworks &&
              frameworks.map((item, i) => (
                <div key={i} className="w-[4rem] h-[4rem]">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="object-cover hover:rotate-12 cursor-pointer"
                  />
                </div>
              ))}
          </div>
        }
        no={3}
      />
    </div>
  );
};

export default MySkills;
