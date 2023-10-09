"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { BiLock, BiMailSend, BiSearch } from "react-icons/bi";
import { useQuery } from "react-query";
import axios from "axios";
import { Prisma, Category } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

// import Link from 'next/link';

interface SearchSectionProps {}

const SearchSection: FC<SearchSectionProps> = ({}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Category & {
        _count: Prisma.CategoryCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);
  return (
    <>
      <Button isIconOnly onPress={onOpen} variant="flat" color="primary">
        <BiSearch />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Search</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <BiSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Search"
                  placeholder="What you need..."
                  variant="bordered"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    debounceRequest();
                  }}
                />

                {input.length > 0 ? (
                  <div>
                    {isFetched && "No results"}
                    {queryResults?.length ?? 0 ? (
                      <div>
                        {queryResults?.map((category) => (
                          <div
                            key={category.id}
                            onSelect={(e) => {
                              router.push(`/blog/category/${e}`);
                              router.refresh();
                            }}
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </ModalBody>
              <ModalFooter>Your results</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchSection;
