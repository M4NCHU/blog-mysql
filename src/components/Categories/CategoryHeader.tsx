import { FC } from "react";

interface CategoryHeaderProps {
  categoryName: string;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({ categoryName }) => {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">{categoryName}</h1>
      </div>
    </>
  );
};

export default CategoryHeader;
