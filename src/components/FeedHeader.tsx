import { Button, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from '@nextui-org/react'
import { Subreddit } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'

import { FC } from 'react'
import { BiSearch } from 'react-icons/bi'

interface FeedHeaderProps {
    href: string | ""
    subCategoriesNames: string[] | null
}

const FeedHeader: FC<FeedHeaderProps> = ({href, subCategoriesNames}) => {
    const router = useRouter()
    const pathname = usePathname()
    console.log("pathname", pathname)

  return (
    <div className='flex flex-row justify-between items-center mb-6 gap-2'>
        {href ? (
          <Button color="primary" variant="flat" className="capitalize" onClick={()=>router.push(href)}>
            Create post
          </Button>
        ) : (
        <Popover
          showArrow
          offset={10}
          placement="bottom"
          backdrop="blur"
        >
          <PopoverTrigger>
            <Button color="primary" variant="flat" className="capitalize">
              Create post
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            {(titleProps) => (
              <div className="px-1 py-2 w-full">
                <p className="text-small font-bold text-foreground" {...titleProps}>
                  Choose category
                </p>
                <div className="mt-2 flex flex-col gap-2 w-full">
                <Input
                  label="Search"
                  isClearable
                  radius="lg"
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-xl",
                      "bg-default-200/50",
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "dark:hover:bg-default/70",
                      "group-data-[focused=true]:bg-default-200/50",
                      "dark:group-data-[focused=true]:bg-default/60",
                      "!cursor-text",
                    ],
                  }}
                  placeholder="Type to search..."
                  startContent={
                    <BiSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
                  {subCategoriesNames ? subCategoriesNames.map((item, i) => (
                    <Button key={i} onClick={()=>router.push(`/r/${item}/submit`)}>
                      {item}
                    </Button>
                  )) : null}
                    
                  
                  
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
        )}
        
        

        <div className='w-full justify-end flex flex-row flex-wrap gap-4 max-w-12'>
        <Select color='secondary' size='sm' label="Filter posts" className="max-w-xs">
            <SelectItem key="cat" value="cat">
            Cat
            </SelectItem>
        </Select>
        </div>
    </div>
  )
}




export default FeedHeader