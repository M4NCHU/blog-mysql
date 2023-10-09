"use client";

import { FC } from "react";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import ContactImg from "@/assets/contact.png";
import { Input, Textarea } from "@nextui-org/react";

interface ContactProps {}

const Contact: FC<ContactProps> = ({}) => {
  return (
    <div
      className=" px-4 pb-16 pt-12 lg:px-12 md:pt-20 flex-col flex md:flex-row items-center gap-12"
      id="contact"
    >
      <div className={`w-full flex flex-col gap-8`}>
        <h3 className="text-3xl font-bold">Do you want to cooperate?</h3>
        <div className="w-full">
          <div className="w-full">
            <Image src={ContactImg} alt="contact" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <form className="w-full p-6 bg-backgroundSecond rounded-xl flex flex-col gap-4 ">
          <h4 className="text-xl font-bold">Contact</h4>
          <div className="w-full flex flex-row gap-2">
            <Input
              label="First name"
              type="text"
              labelPlacement="outside"
              placeholder="Enter first name"
              classNames={{
                input: ["text-foreground", "placeholder:text-hoverColor"],
              }}
            />
            <Input
              label="Last name"
              type="text"
              labelPlacement="outside"
              placeholder="Enter last name"
              classNames={{
                input: ["text-foreground", "placeholder:text-hoverColor"],
              }}
            />
          </div>

          <div className="w-full flex flex-row gap-2">
            <Input
              label="Phone Number"
              type="text"
              labelPlacement="outside"
              placeholder="Enter phone number"
              classNames={{
                input: ["text-foreground", "placeholder:text-hoverColor"],
              }}
            />
            <Input
              label="Email"
              type="email"
              labelPlacement="outside"
              placeholder="Enter email"
              classNames={{
                input: ["text-foreground", "placeholder:text-hoverColor"],
              }}
            />
          </div>

          <Textarea
            label="Message"
            type="text"
            labelPlacement="outside"
            placeholder="Enter message"
            classNames={{
              input: ["text-foreground", "placeholder:text-hoverColor"],
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
