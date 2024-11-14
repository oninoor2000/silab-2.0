import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

import type { Params, SearchParams } from "~/typeSchema/global";
import type { researchStaticSlugType } from "~/typeSchema/research-detail-types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { cn } from "~/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ButtonLink } from "~/components/ui/button-link";

import Footer from "~/components/root/footer";
import ShareButtons from "~/components/root/share-button";
import ShareDropdown from "~/components/root/share-dropdown";
import RenderJsonToHtmlContent from "~/components/root/render-json-to-html-content";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const researchSlug: researchStaticSlugType[] =
    await db.researchPortfolio.findMany({
      select: {
        slug: true,
      },
    });

  return researchSlug.map((research) => ({
    slug: String(research.slug),
  }));
}

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const research = await db.researchPortfolio.findFirst({
    where: {
      AND: [{ slug: params.slug }, { publishedDate: { not: null } }],
    },
    select: {
      title: true,
      coverImg: true,
    },
  });

  return {
    title: research?.title,
    openGraph: {
      images: [research?.coverImg],
    },
  };
}

const researchDetail = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;

  const research = await db.researchPortfolio.findFirst({
    where: { AND: [{ slug: params.slug }, { publishedDate: { not: null } }] },
    include: {
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

  if (!research) {
    return notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="mt-10 grid grid-cols-1 content-center gap-5 px-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-2 lg:px-20">
        <div className="flex w-full items-center justify-between md:justify-start">
          <ButtonLink href="/penelitian" variant="link" className="px-0">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Kembali
          </ButtonLink>

          <ShareDropdown
            text={`Baca penelitian tentang "${research.title}" di Silab`}
            className="md:hidden"
          />
        </div>

        <div className="flex w-full items-center justify-center md:justify-end">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/penelitian">Penelitian</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate">
                  Baca penelitian
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Title */}
      <section className="my-10 px-5 lg:px-20">
        <h1 className="text-center text-2xl !leading-snug md:text-left md:text-3xl lg:text-4xl">
          {research?.title}
        </h1>
        <div className="flex items-center justify-center md:justify-start">
          {research?.authors.map((author, index) => (
            <span
              key={index}
              className={cn(
                "mt-4 text-lg text-muted-foreground",
                author.orderNumber === 1 && "order-first",
                author.orderNumber === 2 && "order-2",
                author.orderNumber === 3 && "order-3",
              )}
            >
              {author.user.name}
              {index < research?.authors.length - 1 && <>,&nbsp; </>}
            </span>
          ))}
        </div>
      </section>

      {/* Cover Image */}
      <section className="mb-10 px-5 lg:px-20">
        <div className="relative h-[60vh] w-full md:h-[50vh] lg:h-[85vh]">
          <Image
            src={research?.coverImg ?? ""}
            alt={`${research?.title} image`}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 80vw"
            className="-z-10 object-cover brightness-75"
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
                    {research?.categories[0]?.category.name}
                  </Badge>

                  <div className="mt-5 flex flex-col gap-2 lg:gap-3">
                    <span className="font-medium text-zinc-200 dark:text-zinc-300">
                      Ditulis oleh
                    </span>
                    <span className="text-lg font-semibold text-zinc-50 dark:text-zinc-200">
                      {research?.authors[0]?.user.name ?? "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:gap-3">
                  <span className="font-medium text-zinc-200 dark:text-zinc-300">
                    Diterbikan pada
                  </span>
                  <span className="text-lg font-semibold text-zinc-50 dark:text-zinc-200">
                    {new Date(
                      research?.publishedDate ?? new Date(),
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
              <ShareButtons
                text={`Baca penelitian tentang "${research.title}" di Silab`}
              />
            </div>
            {/* End Right Col */}
          </div>
        </div>
      </section>

      {/* Research Content */}
      <section className="mb-10 px-5 lg:mb-20 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:grid-cols-6">
          <div className="md:col-span-7 lg:col-span-4">
            <RenderJsonToHtmlContent content={research?.content ?? ""} />
          </div>

          <aside className="relative md:col-span-5 lg:col-span-2">
            <div className="sticky top-28 flex flex-col items-start justify-evenly gap-5 border p-5">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Lokasi</span>
                <span className="text-sm font-medium">
                  {research?.researchLocation ?? "---"}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  Pelaksanaan
                </span>
                <span className="text-sm font-medium">
                  {research?.publishedDate &&
                    new Date(research.publishedDate).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}

                  {!research?.publishedDate && "---"}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Kontak</span>
                <span className="text-sm font-medium">
                  {research?.correspondenceEmail ?? "---"}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  Program Studi
                </span>
                <span className="text-sm font-medium">
                  {research?.studyProgram ?? "---"}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">DOI</span>
                <Link
                  href={`https://doi.org/${research?.doi}`}
                  referrerPolicy="no-referrer"
                  className="text-sm font-medium"
                >
                  {research?.doi}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default researchDetail;
