import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

import type { Metadata } from "next";
import type { Params, SearchParams } from "~/typeSchema/global";
import type { laboratory } from "~/typeSchema/laboratory-page-types";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { ImageIcon, Maximize, Users } from "lucide-react";
import { SitePagination } from "~/components/root/pagination";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

import Footer from "~/components/root/footer";
import SortSelect from "~/components/root/sort-select";
import SearchForm from "~/components/root/search-form";

export const metadata: Metadata = {
  title: "Laboratorium",
  description: "Laboratorium yang bisa disewa di Jurusan Kesehatan Polije",
};

const Laboratories = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const searchParams = await props.searchParams;

  const itemsPerPage = 6;
  const sort = searchParams.sort;
  const currentPage = searchParams.page
    ? parseFloat(searchParams.page.toString())
    : 1;
  const query = searchParams.query;

  const getLaboratories = unstable_cache(
    async () => {
      const res = await db.laboratory.findMany({
        relationLoadStrategy: "join",
        select: {
          id: true,
          name: true,
          slug: true,
          area: true,
          images: true,
          capacity: true,
          coverImg: true,
          description: true,
        },
        where: getWhereClause(query),
        orderBy: getOrderByPrisma(sort),
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
      });

      const labs = res.map((lab) => ({
        ...lab,
        area: Number(lab.area),
        images: lab.images.length,
      }));

      return labs;
    },
    ["laboratories", query ?? "", sort ?? "", currentPage.toString()],
    { revalidate: 3600 * 24, tags: ["laboratories"] },
  );

  const getCountAllLabs = unstable_cache(
    async () => {
      const count = await db.laboratory.count({
        where: getWhereClause(query),
      });

      return count;
    },
    ["laboratories-count", query ?? ""],
    { revalidate: 3600 * 24, tags: ["laboratories-count"] },
  );

  const laboratories = await getLaboratories();
  const countAllLabs = await getCountAllLabs();

  return (
    <>
      <main>
        <div className="my-10 flex flex-col items-center justify-between gap-8 px-5 md:flex-row lg:my-20 lg:px-20">
          <div className="w-full text-center md:w-1/2 lg:w-2/5">
            <h1 className="text-muted-foreground md:text-left">Laboratorium</h1>
            <p
              className={cn(
                "mt-2 text-center text-2xl leading-snug md:mt-4 md:text-left md:text-3xl lg:mt-1 lg:text-4xl lg:leading-normal",
                query && "lg:text-3xl lg:leading-relaxed",
              )}
            >
              {query
                ? `Menampilkan hasil pencarian dari "${query}"`
                : "Daftar laboratorium yang bisa disewa"}
            </p>
          </div>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Laboratorium</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="mb-10 px-5 lg:mb-32 lg:px-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SortSelect
              sort={sort}
              query={query}
              defaultSort="a-z"
              baseActionUrl="laboratorium"
              options={[
                { value: "widest", label: "Ruangan terbesar" },
                { value: "narrowest", label: "Ruangan terkecil" },
                { value: "biggest", label: "Kapasitas terbesar" },
                { value: "smallest", label: "Kapasitas terkecil" },
                { value: "a-z", label: "Nama lab (A-Z)" },
                { value: "z-a", label: "Nama lab (Z-A)" },
              ]}
            />

            <SearchForm
              query={query}
              sort={sort}
              baseActionUrl="laboratorium"
              placeholder="laboratorium"
            />
          </div>

          <Separator className="my-10 w-full" />

          {laboratories.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Tidak ada laboratorium yang sesuai dengan pencarian Anda
            </p>
          ) : (
            <>
              <div
                className={
                  "grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3"
                }
              >
                {laboratories.map((lab) => (
                  <ContentCard key={lab.id} lab={lab} />
                ))}
              </div>
              <div className="mt-20 flex justify-center">
                <SitePagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(countAllLabs / itemsPerPage)}
                  baseActionUrl="laboratorium"
                  query={query}
                  sort={sort}
                />
              </div>
            </>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Laboratories;

function ContentCard({ lab }: { lab: laboratory }) {
  return (
    <Card
      className={cn(
        "col-span-1 flex h-full flex-col items-start justify-between rounded-md border-none bg-transparent shadow-none",
      )}
    >
      <CardContent className="flex flex-col justify-between px-0">
        <div className="relative h-96 w-full overflow-hidden lg:h-[26rem]">
          <Link href={`/laboratorium/${lab.slug}`}>
            <Image
              src={lab.coverImg ?? "/hero.jpg"}
              alt={`${lab.name ?? "Laboratory"} image`}
              className="h-full object-cover transition-transform duration-700 hover:scale-110"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </Link>
        </div>

        <div className="mt-5">
          <h2 className="line-clamp-2 text-xl">
            {lab.name ?? "Unnamed Laboratory"}
          </h2>
          <p className="mt-4 line-clamp-2 text-muted-foreground">
            {lab.description ?? "No description available"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="w-full p-0">
        <div className="flex w-full flex-col items-center justify-between gap-5 lg:flex-row lg:flex-wrap">
          <div className="flex w-full items-start justify-evenly gap-1 border-b border-t border-zinc-200 py-2 dark:border-zinc-800 lg:w-3/6 lg:justify-between lg:py-[9px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-pointer items-center justify-start gap-2">
                    <Maximize className="h-3 w-3 stroke-zinc-500" />
                    <span className="text-sm text-muted-foreground">
                      {lab.area} m²
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Luas laboratorium {lab.area} m²</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-pointer items-center justify-start gap-2">
                    <Users className="h-3 w-3 stroke-zinc-500" />
                    <span className="text-sm text-muted-foreground">
                      {lab.capacity}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kapasitas laboratorium hingga {lab.capacity} orang</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-pointer items-center justify-start gap-2">
                    <ImageIcon className="h-3 w-3 stroke-zinc-500" />
                    <span className="text-sm text-muted-foreground">
                      {lab.images}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {lab.images > 0
                      ? "Gallery foto tersedia"
                      : "Tidak tersedia gallery foto"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Button
            asChild
            variant="outline"
            className="w-full bg-transparent transition-colors duration-500 hover:bg-zinc-900 hover:text-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-zinc-900 lg:w-max"
          >
            <Link href={`/laboratorium/${lab.slug}`}>Lihat Lab</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function getOrderByPrisma(
  sort: string | string[] | undefined,
): Prisma.LaboratoryOrderByWithAggregationInput {
  switch (sort) {
    case "widest":
      return { area: Prisma.SortOrder.desc };
    case "narrowest":
      return { area: Prisma.SortOrder.asc };
    case "biggest":
      return { capacity: Prisma.SortOrder.desc };
    case "smallest":
      return { capacity: Prisma.SortOrder.asc };
    case "a-z":
      return { name: Prisma.SortOrder.asc };
    case "z-a":
      return { name: Prisma.SortOrder.desc };
    default:
      return { name: Prisma.SortOrder.asc };
  }
}

function getWhereClause(
  query: string | undefined,
): Prisma.LaboratoryWhereInput {
  if (!query?.trim()) {
    return {};
  }

  return {
    AND: [
      {
        name: {
          mode: "insensitive",
          contains: query.trim(),
        },
      },
      {
        isDraft: false,
      },
    ],
  };
}
