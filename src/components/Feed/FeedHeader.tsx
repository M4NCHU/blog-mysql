import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

import { FC } from "react";
import { BiSearch } from "react-icons/bi";

interface FeedHeaderProps {
  href: string | "";
  subCategoriesNames: string[] | null;
}

const FeedHeader: FC<FeedHeaderProps> = ({ href, subCategoriesNames }) => {
  const router = useRouter();
  const pathname = usePathname();
  const firstCategory = subCategoriesNames ? subCategoriesNames[0] : null;

  return (
    <div className="flex flex-row justify-between items-center mb-6 gap-2">
      <Button
        className="capitalize rounded-full bg-transparent border-default-200 border-2 hover:bg-default-100"
        onClick={() => {
          if (href) {
            router.push(href);
          } else if (firstCategory) {
            router.push(`/blog/category/${firstCategory}/submit`);
          } else {
            router.push("/blog");
          }
        }}
      >
        Create post +
      </Button>
    </div>
  );
};

export default FeedHeader;
