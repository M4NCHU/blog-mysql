import { FC } from "react";

interface FooterSectionTitleTitleProps {
  title: string;
}

const FooterSectionTitleTitle: FC<FooterSectionTitleTitleProps> = ({
  title,
}) => {
  return <h4 className="text-foreground text-xl font-semibold ">{title}</h4>;
};

export default FooterSectionTitleTitle;
