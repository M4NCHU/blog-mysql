import { Button, Card, CardBody } from "@nextui-org/react";
import { Category } from "@prisma/client";
import { Session } from "next-auth";
import { FC } from "react";
import SubscribeLeaveToggle from "./SubsctibeLeaveToggle";
import { format } from "date-fns";

interface CategoryDetailsProps {
  category: Category;
  session?: Session | null;
  isSubscribed?: boolean;
  memberCount: number;
}

const CategoryDetails: FC<CategoryDetailsProps> = ({
  category,
  session,
  isSubscribed,
  memberCount,
}) => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-6">
      <CardBody className="py-5 gap-6">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              {"⭐"}
              {category.name}
            </span>
          </div>
        </div>

        <div className="flex  gap-6 flex-col">
          <span className="text-xs">
            Meet your agenda and see their ranks to get the best results
          </span>
          {category.creatorId !== session?.user.id ? (
            <div>
              <SubscribeLeaveToggle
                categoryId={category.id}
                isSubscribed={isSubscribed ? isSubscribed : null}
                categoryName={category.name}
              />
            </div>
          ) : null}

          {category.creatorId === session?.user.id
            ? "You created this community"
            : category.creatorId}

          <div className="flex flex-row gap-4 justify-between mt-4">
            <div className="flex flex-col items-center">
              <h2>{memberCount ? memberCount : 0}</h2>
              <span className="text-xs text-default-400">followers</span>
            </div>
            <div className="flex flex-col items-center">
              <h2>5</h2>
              <span className="text-xs text-default-400">posts</span>
            </div>
            <div className="flex flex-col items-center">
              <h2>1</h2>
              <span className="text-xs text-default-400">ranking</span>
            </div>
          </div>
          <time dateTime={category.createdAt.toDateString()}>
            Created at: {format(category.createdAt, "MMMM d, yyyy")}
          </time>
        </div>
      </CardBody>
    </Card>
  );
};

export default CategoryDetails;
