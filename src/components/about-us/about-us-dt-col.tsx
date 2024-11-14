"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Laboratory } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "~/components/ui/data-table-column-header";

const AboutUsDtColumn: ColumnDef<Partial<Laboratory>>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Laboratorium" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "contactName",
    header: "Narahubung",
  },
  {
    accessorKey: "contactEmail",
    header: "Email",
  },
  {
    accessorKey: "contactPhone",
    header: "No Telp",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lab = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(lab.contactEmail ?? "")
              }
              className="hidden md:block"
            >
              Salin email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(lab.contactPhone ?? "")
              }
            >
              Salin no telp
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default AboutUsDtColumn;
