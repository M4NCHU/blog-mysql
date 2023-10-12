import { Accordion, AccordionItem, Selection } from "@nextui-org/react";
import React, { useState } from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isCollapseMenuOpen: boolean;
}

export const CollapseItems = ({
  icon,
  children,
  title,
  isCollapseMenuOpen,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([title]));

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion
        selectedKeys={isCollapseMenuOpen ? selectedKeys : ""}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
        className="px-0"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: "auto",
              transition: {
                height: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 1,
                },
                opacity: {
                  easings: "ease",
                  duration: 1,
                },
              },
            },
            exit: {
              y: -10,
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  easings: "ease",
                  duration: 0.25,
                },
                opacity: {
                  easings: "ease",
                  duration: 0.3,
                },
              },
            },
          },
        }}
      >
        <AccordionItem
          key={title}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-backgroundSecond rounded-xl active:scale-[0.98] transition-transform px-3.5",

            title: "px-0 flex text-sm gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2 items-center ">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-6 flex flex-col justify-start  ">{children}</div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
