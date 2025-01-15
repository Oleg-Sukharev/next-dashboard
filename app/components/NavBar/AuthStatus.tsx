"use client";

import { Skeleton, Box, DropdownMenu, Avatar, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton aria-label='Loading auth status...' className="rounded-full size-8" />;

  if (status === "unauthenticated") return <Link className="nav-link" href="/api/auth/signin">Login</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger role="button">
          <div>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            // referrerPolicy="no-referrer"
            />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default AuthStatus;