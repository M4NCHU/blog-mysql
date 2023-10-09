"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface CreatePostHeaderProps {
  slug: string;
  names: string[];
}

const CreatePostHeader: FC<CreatePostHeaderProps> = ({ slug, names }) => {
  const router = useRouter();

  return (
    <>
      <h3 className="ml-2 mt-2 font-semibold leading-6 text-5xl text-foreground">
        Create Post
      </h3>
      <p className="ml-2 mt-1 truncate text-base text-default-400">
        in r/{slug}
      </p>
      <Select
        color="secondary"
        label="Choose category"
        placeholder="Choose category"
        defaultSelectedKeys={[`${slug}`]}
        className="max-w-xs"
      >
        {names.map((item, i) => (
          <SelectItem
            key={item}
            value={item}
            onClick={() => router.push(`/blog/category/${item}/submit`)}
          >
            {item}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default CreatePostHeader;
