import Portfolio from "@/components/Portfolio/Portfolio";
import { getAuthSession } from "@/lib/auth";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Image from "next/image";
import { MdOutlineAlternateEmail } from "react-icons/md";

import Business from "@/assets/men.png";
import { BiPhone } from "react-icons/bi";

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div className="p-6 md:p-12 flex flex-col gap-4 items-center w-full">
      <div className=" flex flex-col gap-4 items-center mb-2 p-2">
        <h1 className="text-5xl font-bold">Get in touch</h1>
        <p>do you want to cooperate? call or write to me</p>
      </div>
      <div className="flex flex-col md:flex-row container">
        <div className="flex flex-col gap-4 w-full md:w-1/2 justify-center">
          <div className="bg-transparent p-4 min-h-[12rem] min-w-[12rem] rounded-lg flex flex-col gap-2 border-1 border-default-200">
            <div className="bg-backgroundSecond w-8 h-8 border-1 border-default-200 flex justify-center items-center rounded-md mb-4">
              <MdOutlineAlternateEmail className="font-bold text-xl" />
            </div>
            <h2 className="font-bold">Email</h2>
            <p>maciejov250@gmail.com</p>
          </div>
          <div className="bg-transparent p-4 min-h-[12rem] min-w-[12rem] rounded-lg flex flex-col gap-2 border-1 border-default-200">
            <div className="bg-backgroundSecond border-1 border-default-200 w-8 h-8 flex justify-center items-center rounded-md mb-4">
              <BiPhone className="font-bold text-xl" />
            </div>
            <h2 className="font-bold">Phone number</h2>
            <p>793 659 960</p>
          </div>
        </div>
        <div className="contact-photo w-full md:w-1/2">
          <div className="px-12">
            <Image
              src={Business}
              alt="Profile image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
