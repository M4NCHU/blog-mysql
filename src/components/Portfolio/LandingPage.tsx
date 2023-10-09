"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";
import profileImage from "@/assets/IMG_20210606_111743.jpg";
import ReactImg from "@/assets/pngwing.png";
import JS from "@/assets/js.png";
import Node from "@/assets/node.png";
import Circle from "@/assets/circe.png";
import WEB from "@/assets/web.png";
import TailWind from "@/assets/tailwind.png";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Balancer } from "react-wrap-balancer";
interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <div
      id="landing"
      className="portfolio-landing px-2 p-2 lg:p-4 flex flex-col gap-12 lg:gap-6 lg:flex-row justify-center items-center"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="portfolio-landing__desc w-full lg:w-3/5 flex flex-col px-2 lg:px-6 gap-6 border-b-2 border-r-0 lg:border-b-0 lg:border-r-2 border-default-100 h-full justify-center items-center relative ">
        <div className="absolute z-50 -bottom-6 right-auto lg:bottom-auto lg:-right-5 bg-background flex flex-row lg:flex-col gap-6 px-2 py-4 text-xl">
          <a href="">
            <FaGithub />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
          <a href="">
            <FaFacebook />
          </a>
          <a href="">
            <FaTwitter />
          </a>
        </div>
        <div className="flex flex-col px-0 lg:px-8 gap-6  w-full justify-center ">
          <div className="portfolio-landing__header flex flex-col gap-2 justify-start">
            <h1 className="text-5xl lg:text-7xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              <Balancer>{`Hello, I'm Maciek`}</Balancer>
            </h1>
            <h2 className="text-4xl lg:text-5xl font-semibold ">
              Web Developer
            </h2>
          </div>
          <div className=" text-sm md:text-base">
            <p>
              <Balancer>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur quibusdam, sint expedita temporibus vero a nostrum,
                optio autem velit nulla error id odio deleniti officiis, ullam
                eaque omnis in quod.
              </Balancer>
            </p>
          </div>
          <div className="flex gap-4  w-full items-center">
            <Button
              className=" rounded-full w-full sm:w-auto text-sm text-white lg:text-base bg-gradient-to-br from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-500 ease-in-out "
              size="lg"
            >
              Download CV
            </Button>
            <Button
              className=" rounded-full w-full sm:w-auto  text-sm lg:text-base hover:bg-default-100 transition-all duration-500 ease-in-out "
              size="lg"
            >
              About me
            </Button>
          </div>
        </div>
      </div>

      <div className="portfolio-landing__photo flex justify-center items-center w-full py-12 lg:w-2/5 relative p-2 ">
        <div className="relative">
          <Image
            src={TailWind}
            alt="adsf"
            className=" absolute z-[50] bottom-0 right-0 w-16 "
          />
          <Image
            src={ReactImg}
            alt="adsf"
            className=" absolute z-[50] -top-2 -right-2 lg:-top-20 lg:-right-12 w-20  xl:w-40 "
          />
          <Image
            src={JS}
            alt="adsf"
            className=" absolute z-[50] top-0 left-0 w-12 lg:w-16 "
          />
          <Image
            src={WEB}
            alt="adsf"
            className=" absolute z-[50] -bottom-2 -left-2 lg:-bottom-12 lg:-left-16 w-16 lg:w-32 "
          />
          <Image
            src={Circle}
            alt="adsf"
            className=" absolute z-[50] -bottom-2 -left-2 lg:-bottom-12 lg:-left-16 w-16 lg:w-32 "
          />
          <div className="w-[15rem] lg:w-[20rem] lg:h-[20rem] h-[15rem] rounded-full overflow-hidden  ">
            <Image
              src={profileImage}
              alt="Profile image"
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
            {/* <div className="absolute inset-0 bg-gradient-to-br z-10 min-w-[25rem] max-w-[25rem] rounded-full from-blue-500 to-purple-500 blur-md"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
