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
    <li
      className={`flex basis-0 w-full sm:py-0 justify-center items-center flex-row flex-grow flex-nowrap rounded-lg no-underline text-md box-border gap-1 ${
        path === href ? "bg-backgroundSecond" : "bg-transparent"
      }`}
    >
      <Link
        href={href}
        className={`menu-link w-full py-[0.4rem] px-3 rounded-lg flex justify-center items-center tap-highlight-transparent transition-opacity active:opacity-50 text-foreground hover:text-foregroundSecond`}
      >
        {title}
      </Link>
    </li>
  );
};

export default HeaderLink;
