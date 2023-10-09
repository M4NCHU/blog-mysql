import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface HeaderLinkProps {
  title: string;
  href: string;
}

const HeaderLink: FC<HeaderLinkProps> = ({ title, href }) => {
  const path = usePathname();

  return (
    <li className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-md whitespace-nowrap box-border gap-3 max-w-fit">
      <Link
        href={href}
        className="flex justify-start items-center gap-2 tap-highlight-transparent transition-opacity active:opacity-50 text-foreground hover:text-foregroundSecond"
      >
        {title}
      </Link>
    </li>
  );
};

export default HeaderLink;
