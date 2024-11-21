"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

const NavbarSignOutDropdownItems = () => {
  return (
    <DropdownMenuItem
      onClick={() => signOut()}
      className="gap-2 hover:cursor-pointer hover:bg-secondary"
    >
      <LogOut className="h-4 w-4 text-muted-foreground" />
      Log out
    </DropdownMenuItem>
  );
};

export default NavbarSignOutDropdownItems;
