"use client";

import { Card, CardBody } from "@nextui-org/react";

const items = [
  {
    name: "Jose Perez",
    picture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    amount: "4500 USD",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    picture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    amount: "4500 USD",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    picture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    amount: "4500 USD",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    picture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    amount: "4500 USD",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    picture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    amount: "4500 USD",
    date: "9/20/2021",
  },
];

export const CardTransactions = () => {
  return (
    <Card className=" bg-default-50/60 dark:bg-default-100/503 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Popular categories
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 "></div>
      </CardBody>
    </Card>
  );
};
