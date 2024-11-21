import React from "react";
import Link from "next/link";
import { db } from "~/server/db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

import type { Metadata } from "next";
import type { Params, SearchParams } from "~/typeSchema/global";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { cn } from "~/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { ButtonLink } from "~/components/ui/button-link";
import { Card, CardContent } from "~/components/ui/card";
import { SitePagination } from "~/components/root/pagination";

import Footer from "~/components/root/footer";
import SearchForm from "~/components/root/search-form";
import SortSelect from "~/components/root/sort-select";
import ResearchCarousel from "~/components/research/research-carousel";

export const metadata: Metadata = {
  title: "Penelitian",
  description: "Pelajari riset yang kami lakukan di Jursan Kesehatan Polije",
};

const Articles = async (props: {
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

  const getResearchs = unstable_cache(
    async () => {
      const researchs = await db.researchPortfolio.findMany({
        relationLoadStrategy: "join",
        select: {
          id: true,
          title: true,
          abstract: true,
          publishedDate: true,
          studyProgram: true,
          type: true,
          slug: true,
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          authors: {
            select: {
              userId: true,
              role: true,
              orderNumber: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
          viewCount: true,
        },
        where: getWhereClause(query),
        orderBy: getOrderByPrisma(sort),
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
      });

      return researchs;
    },
    ["researchs", query ?? "", sort ?? "", currentPage.toString()],
    { revalidate: 3600 * 24, tags: ["researchs"] },
  );

  const getResearchHeadlines = unstable_cache(
    async () => {
      const researchHeadlines = await db.researchPortfolio.findMany({
        relationLoadStrategy: "join",
        select: {
          id: true,
          slug: true,
          title: true,
          abstract: true,
          type: true,
          authors: {
            select: {
              userId: true,
              role: true,
              orderNumber: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
          publishedDate: true,
          coverImg: true,
        },
        where: {
          publishedDate: { not: null },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });

      return researchHeadlines;
    },
    ["researchHeadlines", query ?? "", sort ?? "", currentPage.toString()],
    { revalidate: 3600, tags: ["researchHeadlines"] },
  );

  const researchs = await getResearchs();
  const researchHeadlines = await getResearchHeadlines();

  return (
    <>
      <ResearchCarousel researchHeadlines={researchHeadlines} />

      <section>
        <div className="my-10 flex flex-col items-center justify-between gap-8 px-5 md:flex-row lg:my-20 lg:px-20">
          <div className="w-full text-center md:w-1/2 lg:w-2/5">
            <h1 className="text-muted-foreground md:text-left">
              Project dan Penelitian
            </h1>
            <p className="mt-2 text-center text-2xl leading-snug md:mt-4 md:text-left md:text-3xl lg:mt-1 lg:text-4xl lg:leading-normal">
              Pelajari riset yang kami lakukan
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
                  <BreadcrumbPage>Penelitian</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div id="lab-content" className="mb-20 px-5 lg:mb-32 lg:px-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SortSelect
              sort={sort}
              query={query}
              page={currentPage}
              defaultSort="newest"
              baseActionUrl="penelitian"
              options={[
                { value: "newest", label: "Terbaru" },
                { value: "oldest", label: "Terlama" },
                { value: "popular", label: "Terpopuler" },
              ]}
            />

            <SearchForm
              query={query}
              sort={sort}
              baseActionUrl="penelitian"
              placeholder="penelitian"
            />
          </div>

          <Separator className="my-10 w-full" />

          {researchs.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Tidak ada penelitian atau project yang sesuai dengan pencarian
              Anda
            </p>
          ) : (
            <>
              <div className="flex flex-col items-center gap-10">
                {researchs.map((research) => (
                  <Card
                    key={research.slug}
                    className="rounded-md border-l-0 border-r-0 border-t-0 pb-10 shadow-none md:max-w-2xl lg:max-w-4xl"
                  >
                    <CardContent className="p-0">
                      <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row md:gap-10">
                        <div>
                          <Link href={`/penelitian/${research.slug}`}>
                            <h2 className="line-clamp-2 text-xl font-semibold hover:underline">
                              {research.title}
                            </h2>
                          </Link>
                          <div className="flex items-center">
                            {research.authors.map((author, index) => (
                              <span
                                key={index}
                                className={cn(
                                  "mt-4 text-lg",
                                  author.orderNumber === 1 && "order-first",
                                  author.orderNumber === 2 && "order-2",
                                  author.orderNumber === 3 && "order-3",
                                )}
                              >
                                {author.user.name}
                                {index < research.authors.length - 1 && (
                                  <>,&nbsp; </>
                                )}
                              </span>
                            ))}
                          </div>
                          <p className="mt-4 line-clamp-2 text-muted-foreground">
                            {research.abstract}
                          </p>
                        </div>

                        <div>
                          <ButtonLink
                            href={`/penelitian/${research.slug}`}
                            className="px-0"
                            variant={"link"}
                          >
                            Baca sekarang
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </ButtonLink>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-20 flex justify-center">
                <SitePagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(researchs.length / itemsPerPage)}
                  baseActionUrl="penelitian"
                  query={query}
                  sort={sort}
                />
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Articles;

function getOrderByPrisma(
  sort: string | string[] | undefined,
): Prisma.ResearchPortfolioOrderByWithAggregationInput {
  switch (sort) {
    case "newest":
      return { publishedDate: Prisma.SortOrder.desc };
    case "oldest":
      return { publishedDate: Prisma.SortOrder.asc };
    case "popular":
      return { viewCount: Prisma.SortOrder.desc };
    default:
      return { publishedDate: Prisma.SortOrder.desc };
  }
}

function getWhereClause(
  query: string | undefined,
): Prisma.ResearchPortfolioWhereInput {
  if (!query?.trim()) {
    return {};
  }

  return {
    AND: [
      { title: { contains: query, mode: "insensitive" } },
      { publishedDate: { not: null } },
    ],
  };
}
