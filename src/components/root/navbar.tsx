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

import { ModeToggle } from "../ui/mode-toggle";
import { ButtonLink } from "../ui/button-link";
import { getNameInitials } from "~/hooks/get-initial-name";
import { NavbarItems, NavbarMobileSheet } from "./navbar-items";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BadgeCheck, LayoutDashboard, LogOut } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  return (
    <section className="sticky top-0 z-20 flex items-center justify-between gap-x-5 border-b border-b-zinc-100 bg-background px-5 py-3 dark:border-b-zinc-800">
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
            <DropdownMenuTrigger className="rounded-md outline-none ring-ring focus-visible:ring-2 data-[state=open]:bg-accent">
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
                    <div className="overflow-hidden text-xs text-muted-foreground">
                      <div className="line-clamp-1">{session?.user.email}</div>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard">
                  <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer hover:bg-secondary">
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    Dashborad
                  </DropdownMenuItem>
                </Link>

                <Link href="/dashboard/user/akun-saya">
                  <DropdownMenuItem className="gap-2 hover:cursor-pointer hover:bg-secondary">
                    <BadgeCheck className="h-4 w-4 text-muted-foreground" />
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
                className="gap-2 hover:cursor-pointer hover:bg-secondary"
              >
                <LogOut className="h-4 w-4 text-muted-foreground" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <ButtonLink href="/masuk" variant="outline">
            Masuk
          </ButtonLink>
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
