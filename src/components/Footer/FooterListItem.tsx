import { FC } from "react";

interface FooterListItemProps {
  href: string;
  title: string;
}

const FooterListItem: FC<FooterListItemProps> = ({ href, title }) => {
  return (
    <li className="w-full ">
      <a href={href} className="text-foreground hover:text-hoverColor">
        {title}
      </a>
    </li>
  );
};

export default FooterListItem;
