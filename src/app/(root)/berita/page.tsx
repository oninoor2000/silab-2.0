import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

import type { Metadata } from "next";
import type { Params, SearchParams } from "~/typeSchema/global-types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent } from "~/components/ui/card";
import { SitePagination } from "~/components/root/pagination";

import Footer from "~/components/root/footer";
import SearchForm from "~/components/root/search-form";
import SortSelect from "~/components/root/sort-select";
import formatLocalDate from "~/hooks/get-local-date-format";
import ArticleCarousel from "~/components/article/article-carousel";

export const metadata: Metadata = {
  title: "Berita",
  description: "Baca kabar terkini dari Silab",
};

const Articles = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const searchParams = await props.searchParams;

  const itemsPerPage = 6;
  const sort = searchParams.sort as string | undefined;
  const currentPage = searchParams.page
    ? parseFloat(searchParams.page.toString())
    : 1;
  const query = searchParams.query as string | undefined;

  const getArticles = unstable_cache(
    async () => {
      const articles = await db.article.findMany({
        relationLoadStrategy: "join",
        select: {
          id: true,
          slug: true,
          title: true,
          summary: true,
          coverImg: true,
          publishedDate: true,
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: getWhereClause(query),
        orderBy: getOrderByPrisma(sort),
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage + 3,
      });

      return articles;
    },
    ["articles", query ?? "", sort ?? "", currentPage.toString()],
    { revalidate: 3600 * 24, tags: ["articles"] },
  );

  const getArticlesHeadlines = unstable_cache(
    async () => {
      const articleHeadlines = await db.article.findMany({
        relationLoadStrategy: "join",
        select: {
          id: true,
          slug: true,
          title: true,
          summary: true,
          user: {
            select: {
              name: true,
            },
          },
          publishedDate: true,
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          coverImg: true,
        },
        where: {
          publishedDate: {
            not: null,
          },
        },
        orderBy: {
          publishedDate: "desc",
        },
        take: 3,
      });

      return articleHeadlines;
    },
    ["articleHeadlines", query ?? "", sort ?? "", currentPage.toString()],
    { revalidate: 3600, tags: ["articleHeadlines"] },
  );

  const articles = await getArticles();
  const articlesHeadlines = await getArticlesHeadlines();

  return (
    <>
      <ArticleCarousel articlesHeadline={articlesHeadlines} />

      <section>
        <div className="my-10 flex flex-col items-center justify-between gap-8 px-5 md:flex-row lg:my-20 lg:px-20">
          <div className="w-full text-center md:w-1/2 lg:w-2/5">
            <h1 className="text-muted-foreground md:text-left">Berita</h1>
            <p className="mt-2 text-center text-2xl leading-snug md:mt-4 md:text-left md:text-3xl lg:mt-1 lg:text-4xl lg:leading-normal">
              Baca kabar terkini dari kami
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
                  <BreadcrumbPage>Berita</BreadcrumbPage>
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
              baseActionUrl="berita"
              options={[
                { value: "newest", label: "Terbaru" },
                { value: "oldest", label: "Terlama" },
                { value: "popular", label: "Terpopuler" },
              ]}
            />

            <SearchForm
              query={query}
              sort={sort}
              baseActionUrl="berita"
              placeholder="berita"
            />
          </div>

          <Separator className="my-10 w-full" />

          {articles.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Tidak ada berita yang sesuai dengan pencarian Anda
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
                {articles.map((article) => (
                  <Card
                    key={article.slug}
                    className="col-span-1 rounded-md border-none bg-transparent shadow-none"
                  >
                    <CardContent className="flex flex-col gap-4 p-0">
                      <Link
                        href={`/berita/${article.slug}`}
                        aria-label={article.title}
                      >
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={article.coverImg}
                            alt=""
                            fill
                            className="object-cover brightness-90 transition-transform duration-700 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </Link>

                      <div className="flex items-center gap-2">
                        {article.categories[0] && (
                          <Badge variant="outline">
                            {article.categories[0].category.name}
                          </Badge>
                        )}
                        <p>
                          {formatLocalDate({ date: article.publishedDate })}
                        </p>
                      </div>

                      <Link href={`/berita/${article.slug}`} className="group">
                        <h2 className="line-clamp-2 text-xl group-hover:underline">
                          {article.title}
                        </h2>
                      </Link>
                      <p className="line-clamp-2 text-muted-foreground">
                        {article.summary ?? "Deskripsi tidak tersedia"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-20 flex justify-center">
                <SitePagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(articles.length / itemsPerPage)}
                  baseActionUrl="berita"
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
): Prisma.ArticleOrderByWithAggregationInput {
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

function getWhereClause(query: string | undefined): Prisma.ArticleWhereInput {
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
