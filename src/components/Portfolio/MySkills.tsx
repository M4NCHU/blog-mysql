import { FC } from "react";
import SectionHeader from "./SectionHeader";
import PortfolioCard from "./PortfolioCard";

import Men from "@/assets/men.png";
import Success from "@/assets/success.png";
import { FaReact } from "react-icons/fa";
import ReactImg from "@/assets/pngwing.png";
import JS from "@/assets/js.png";
import Node from "@/assets/node.png";
import Circle from "@/assets/circe.png";
import WEB from "@/assets/web.png";
import TailWind from "@/assets/tailwind.png";
import Image from "next/image";

interface MySkillsProps {}

const MySkills: FC<MySkillsProps> = ({}) => {
  const frameworks = [
    {
      title: "react",
      icon: ReactImg,
    },
    {
      title: "react",
      icon: Node,
    },
    {
      title: "react",
      icon: JS,
    },
    {
      title: "react",
      icon: WEB,
    },
    {
      title: "react",
      icon: TailWind,
    },
    {
      title: "react",
      icon: WEB,
    },
    {
      title: "react",
      icon: ReactImg,
    },
    {
      title: "react",
      icon: JS,
    },
    {
      title: "react",
      icon: ReactImg,
    },
    {
      title: "react",
      icon: Node,
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
          title="Full Stack Developer"
          desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi saepe vero ullam veritatis non autem beatae pariatur,"
          image={Men}
          no={1}
        />
        <PortfolioCard
          color="danger"
          title="Full Stack Developer"
          desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi saepe vero ullam veritatis non autem beatae pariatur,"
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
