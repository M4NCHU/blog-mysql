import { FC } from "react";

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: FC<CardWrapperProps> = ({ children }) => {
  return (
    <div className="w-full bg-backgroundSecond flex flex-col rounded-lg p-4">
      {children}
    </div>
  );
};

export default CardWrapper;
