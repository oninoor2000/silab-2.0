"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Facility } from "@prisma/client";

export default function FacilityDialogTrigger({
  facilities,
}: {
  facilities: Facility[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Lihat Detail Fasilitas</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto sm:max-h-[80vh] sm:max-w-[80vw]">
        <DialogHeader>
          <DialogTitle className="mb-8 text-center text-3xl font-bold">
            Fasilitas Laboratorium
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow duration-300 hover:shadow-lg">
      <div className="p-0">
        <div className="relative w-full pt-[75%]">
          <Image
            src={
              facility.image ??
              "https://utfs.io/f/P2oQLWYULKY4IDeehh4rEsQ4Jc2gkvtSzdDoVXhT3nLjay6K"
            }
            alt={facility.name}
            layout="fill"
            objectFit="cover"
            className="absolute left-0 top-0 h-full w-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-semibold">{facility.name}</h3>
      </div>
    </div>
  );
}
