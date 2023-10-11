import { getAuthSession } from "@/lib/auth";
import { FC } from "react";

interface UpdatePostStatusServerProps {
  isPrivate: boolean;
  role: string;
  postId: string;
}

const UpdatePostStatusServer = async ({
  isPrivate,
  role,
  postId,
}: UpdatePostStatusServerProps) => {
  const session = await getAuthSession();

  if (!session) return;

  const isAdmin = session.user.role;
  if (!isAdmin) return;

  return (
    <UpdatePostStatusServer role={role} isPrivate={isPrivate} postId={postId} />
  );
};

export default UpdatePostStatusServer;
