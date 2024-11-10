import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "~/server/auth";
import { SessionProvider } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavbarItems, NavbarMobileSheet } from "./navbar-items";
import { BadgeCheck, LayoutDashboard, LogOut } from "lucide-react";

import { getNameInitials } from "~/hooks/get-initial-name";

const Navbar = async () => {
  const session = await auth();
  return (
    <section className="bg-background sticky top-0 z-20 flex items-center justify-between gap-x-5 border-b border-b-zinc-100 px-5 py-3 dark:border-b-zinc-800">
      {/* Logo */}
      <div>
        <Link href="/" className="block dark:hidden">
          <Image
            alt="logo"
            src="/assets/images/static/silab-light.png"
            width={72.66}
            height={32}
            className="height-[32px] width-[72.66px]"
            priority
          />
        </Link>
        <Link href="/" className="hidden dark:block">
          <Image
            alt="logo"
            src="/assets/images/static/silab-dark.png"
            width={72.66}
            height={32}
            className="height-[32px] width-[72.66px]"
            priority
          />
        </Link>
      </div>

      {/* Nav */}
      <header className="hidden lg:block">
        <nav>
          <ul className="flex flex-grow items-center justify-center gap-10">
            <NavbarItems />
          </ul>
        </nav>
      </header>

      {/* Utils Button */}
      <div className="hidden items-center justify-end gap-4 lg:flex">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="ring-ring data-[state=open]:bg-accent rounded-md outline-none focus-visible:ring-2">
              <Avatar className="h-10 w-10 rounded-md border">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                  className="animate-in fade-in-50 zoom-in-90"
                />
                <AvatarFallback className="rounded-md">
                  {getNameInitials(session?.user.name ?? "")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
                  <Avatar className="h-7 w-7 rounded-md border">
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt={session?.user?.name ?? ""}
                      className="animate-in fade-in-50 zoom-in-90"
                    />
                    <AvatarFallback className="rounded-md">
                      {getNameInitials(session?.user.name ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1">
                    <div className="font-medium">{session?.user.name}</div>
                    <div className="text-muted-foreground overflow-hidden text-xs">
                      <div className="line-clamp-1">{session?.user.email}</div>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard">
                  <DropdownMenuItem className="hover:bg-secondary flex items-center gap-2 hover:cursor-pointer">
                    <LayoutDashboard className="text-muted-foreground h-4 w-4" />
                    Dashborad
                  </DropdownMenuItem>
                </Link>

                <Link href="/dashboard/user/akun-saya">
                  <DropdownMenuItem className="hover:bg-secondary gap-2 hover:cursor-pointer">
                    <BadgeCheck className="text-muted-foreground h-4 w-4" />
                    Akun
                  </DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem className="gap-2 hover:cursor-pointer hover:bg-secondary">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  Notifikasi
                </DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="hover:bg-secondary gap-2 hover:cursor-pointer"
              >
                <LogOut className="text-muted-foreground h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="outline">
            <Link href="/masuk">Masuk</Link>
          </Button>
        )}
        <ModeToggle />
      </div>

      {/* Utils Button Mobile */}
      <div className="lg:hidden">
        <div className="flex items-center justify-center gap-5">
          <SessionProvider>
            <NavbarMobileSheet session={session} />
          </SessionProvider>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
