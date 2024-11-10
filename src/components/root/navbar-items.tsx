"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import type { NavbarItem } from "~/typeSchema/landing-page-types";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { getNameInitials } from "~/hooks/get-initial-name";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BadgeCheck, LayoutDashboard, LogOut, Menu } from "lucide-react";
import type { Session } from "next-auth";

const navbarItems: NavbarItem[] = [
  {
    name: "Beranda",
    url: "/",
  },
  {
    name: "Laboratorium",
    url: "/laboratorium",
  },
  {
    name: "Berita",
    url: "/berita",
  },
  {
    name: "Penelitian",
    url: "/penelitian",
  },
  {
    name: "Tentang Kami",
    url: "/tentang-kami",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

export const NavbarItems = () => {
  const pathname = usePathname();
  const sections = pathname.split("/");
  const pathNameFirstSection = "/" + sections[1];

  return (
    <>
      {navbarItems.map((item, index) => (
        <li key={index}>
          <Link
            href={item.url}
            className={cn(
              "font-normal text-zinc-500",
              pathNameFirstSection === item.url &&
                "font-medium text-zinc-900 dark:text-zinc-100",
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export const NavbarMobileSheet = ({ session }: { session: Session | null }) => {
  const [isSidebarSheetOpen, setisSidebarSheetOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const sections = pathname.split("/");
  const pathNameFirstSection = "/" + sections[1];

  return (
    <>
      {session?.user.id && (
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
      )}

      <ModeToggle />

      <Button
        variant="outline"
        size="icon"
        onClick={() => setisSidebarSheetOpen(true)}
      >
        <Menu className="h-[1.2rem] w-[1.2rem]" />
      </Button>

      <Sheet open={isSidebarSheetOpen} onOpenChange={setisSidebarSheetOpen}>
        <SheetContent className="bg-background border-l-zinc-200 dark:border-l-zinc-900">
          <VisuallyHidden.Root>
            <SheetHeader>
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Sidebar Silab.</SheetDescription>
            </SheetHeader>
          </VisuallyHidden.Root>
          <ul className="mt-5 flex flex-col gap-5">
            {navbarItems.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className={cn(
                    "font-normal text-zinc-500",
                    pathNameFirstSection === item.url &&
                      "font-medium text-zinc-900 dark:text-zinc-100",
                  )}
                  onClick={() => setisSidebarSheetOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {!session && (
            <div className="mt-5">
              <Button asChild variant="outline" className="w-full">
                <Link href="/masuk">Masuk</Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
