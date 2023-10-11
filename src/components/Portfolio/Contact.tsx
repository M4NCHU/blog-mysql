"use client";

import ContactImg from "@/assets/contact.png";
import { EmailRequest } from "@/lib/validators/email";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface ContactProps {}

const initValues = { name: "", surname: "", email: "", phone: "", message: "" };

const initState = { values: initValues };

const Contact: FC<ContactProps> = ({}) => {
  const router = useRouter();
  const [state, setState] = useState(initState);

  const { values } = state;

  const handleChange = ({ target }: any) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      const payload: EmailRequest = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        message: values.message,
      };
      const { data } = await axios.post("/api/email", payload);
      return data;
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      router.refresh();

      toast.success("Your email successfully sent");
    },
  });

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
          <div className="w-full flex flex-col md:flex-row gap-2 border-b-1 border-default-100 pb-2">
            <Input
              label="First name"
              type="text"
              labelPlacement="outside"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter first name"
              classNames={{
                input: ["text-foreground", "placeholder:text-hoverColor"],
              }}
            />
            <Input
              label="Last name"
              type="text"
              labelPlacement="outside"
              name="surname"
              value={values.surname}
              onChange={handleChange}
              placeholder="Enter last name"
              classNames={{
                input: ["text-foreground", "placeholder:text-hoverColor"],
              }}
            />
          </div>

          <div className="w-full flex flex-col md:flex-row gap-2 border-b-1 border-default-100 pb-2">
            <Input
              label="Phone Number"
              type="text"
              labelPlacement="outside"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              classNames={{
                input: ["text-foreground", "placeholder:text-hoverColor"],
              }}
            />
            <Input
              label="Email"
              type="email"
              labelPlacement="outside"
              name="email"
              value={values.email}
              onChange={handleChange}
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
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Enter message"
            classNames={{
              input: ["text-foreground", "placeholder:text-hoverColor"],
            }}
          />

          <Button
            className="bg-default-100 hover:bg-default-200"
            onClick={() => onSubmit()}
          >
            Send email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
