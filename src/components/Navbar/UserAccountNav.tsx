"use client";

import { FC } from "react";
import { User } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const router = useRouter();

  // function which logging out user
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <Link href="/">Feed</Link>
      <Link href="/blog/category/create">Create Community</Link>
      <Link href="/settings">Settings</Link>
      <Link href="#" onClick={handleSignOut}>
        Sign out
      </Link>
      <div className="h-12 w-12  relative aspect-square">
        <Image
          fill
          src={user.image!}
          alt="profile picture"
          referrerPolicy="no-referrer"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default UserAccountNav;
