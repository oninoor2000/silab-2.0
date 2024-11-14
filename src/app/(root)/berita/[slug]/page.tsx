import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

import type { Params, SearchParams } from "~/typeSchema/global";
import type { articleStaticSlugType } from "~/typeSchema/article-detail-types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { ChevronLeft } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import Footer from "~/components/root/footer";
import ShareButtons from "~/components/root/share-button";
import ShareDropdown from "~/components/root/share-dropdown";
import RenderJsonToHtmlContent from "~/components/root/render-json-to-html-content";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const articleSlug: articleStaticSlugType[] = await db.article.findMany({
    select: {
      slug: true,
    },
  });

  return articleSlug.map((article) => ({
    slug: String(article.slug),
  }));
}

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const article = await db.article.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      coverImg: true,
    },
  });

  return {
    title: article?.title,
    openGraph: {
      images: [article?.coverImg],
    },
  };
}

const ArticleDetail = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;

  const article = await db.article.findUnique({
    where: { slug: params.slug },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      categories: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!article) {
    return notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="mt-10 grid grid-cols-1 content-center gap-5 px-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-2 lg:px-20">
        <div className="flex w-full items-center justify-between md:justify-start">
          <Button asChild variant="link" className="px-0">
            <Link href="/berita">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Kembali
            </Link>
          </Button>

          <ShareDropdown text={`Baca berita ${article.title}`} />
        </div>

        <div className="flex w-full items-center justify-center md:justify-end">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/berita">Berita</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate">
                  Baca berita
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Title */}
      <section className="my-10 px-5 lg:px-20">
        <h1 className="text-center text-2xl !leading-snug md:text-left md:text-3xl lg:text-4xl">
          {article?.title}
        </h1>
      </section>

      {/* Cover Image */}
      <section className="mb-10 px-5 lg:mb-20 lg:px-20">
        <div className="relative h-[60vh] w-full md:h-[50vh] lg:h-[85vh]">
          <Image
            src={article?.coverImg ?? ""}
            alt={`${article?.title} image`}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 80vw"
            className="-z-10 object-cover brightness-90"
          />

          <div className="z-10 flex h-full w-full items-end justify-between gap-10 p-5 lg:p-10">
            {/* Lef Col */}
            <div className="h-full w-full">
              <div className="flex h-full w-full items-end justify-between gap-10 md:justify-start">
                <div>
                  <Badge
                    variant={"secondary"}
                    className="dark:bg-zinc-300 dark:text-zinc-900"
                  >
                    {article?.categories[0]?.category.name}
                  </Badge>

                  <div className="mt-5 flex flex-col gap-2 lg:gap-3">
                    <span className="font-medium text-zinc-200 dark:text-zinc-300">
                      Ditulis oleh
                    </span>
                    <span className="text-lg font-semibold text-zinc-50 dark:text-zinc-200">
                      {article?.user.name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:gap-3">
                  <span className="font-medium text-zinc-200 dark:text-zinc-300">
                    Diterbikan pada
                  </span>
                  <span className="text-lg font-semibold text-zinc-50 dark:text-zinc-200">
                    {new Date(
                      article?.publishedDate ?? new Date(),
                    ).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            {/* End Left Col */}

            {/* Right Col */}
            <div className="hidden h-full w-full items-end gap-5 md:flex">
              <ShareButtons text={`Baca berita ${article.title}`} />
            </div>
            {/* End Right Col */}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mb-32 flex justify-center px-5">
        <div className="max-w-3xl">
          {article?.content?.length === 0 && (
            <p className="text-justify !leading-loose dark:text-zinc-300">
              Tidak ada konten yang ditemukan
            </p>
          )}

          {article?.content && article.content.length > 0 && (
            <RenderJsonToHtmlContent content={article.content} />
          )}
        </div>
      </section>
      {/* End Content */}

      <Footer />
    </>
  );
};

export default ArticleDetail;
