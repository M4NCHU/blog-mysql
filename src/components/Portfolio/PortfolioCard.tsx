import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface PortfolioCardProps {
  no?: number;
  title?: string;
  desc?: string;
  image?: StaticImageData;
  color?: string;
  content?: React.ReactNode;
}

const PortfolioCard: FC<PortfolioCardProps> = ({
  no,
  title,
  desc,
  image,
  color,
  content,
}) => {
  return (
    <div className="w-full min-h-[10rem] bg-backgroundSecond flex flex-col gap-6 rounded-lg p-6 relative">
      <div className="flex flex-row justify-between">
        <div
          className={`top-5 left-5 card-number rounded-full border-dotted border-5 border-background flex items-center justify-center w-[3.5rem] h-[3.5rem]`}
        >
          <span className="p-4 font-bold">{no}</span>
        </div>
        {image && (
          <div className="card-image flex justify-end pr-4">
            <div className="image w-[12rem] h-[12rem]">
              <Image src={image} alt="image" className="object-cover" />
            </div>
          </div>
        )}
      </div>
      {title && (
        <div className="card-title">
          <h4 className="text-xl font-semibold">{title}</h4>
        </div>
      )}
      {desc && (
        <div className="card-desc">
          <p className="text-sm md:text-base">{desc}</p>
        </div>
      )}
      {content && content}
    </div>
  );
};

export default PortfolioCard;
