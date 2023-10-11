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
    <li className="flex basis-0 py-4 w-full sm:py-0 justify-center items-center flex-row flex-grow flex-nowrap  bg-transparent no-underline text-md box-border gap-3">
      <Link
        href={href}
        className="menu-link w-full  flex justify-center items-center gap-2 tap-highlight-transparent transition-opacity active:opacity-50 text-foreground hover:text-foregroundSecond"
      >
        {title}
      </Link>
    </li>
  );
};

export default HeaderLink;
