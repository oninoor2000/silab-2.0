import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { unstable_cache } from "next/cache";

import type { testimonialItemTypes } from "~/typeSchema/landing-page-types";

import Footer from "~/components/root/footer";

import { cn } from "~/lib/utils";
import { ButtonLink } from "~/components/ui/button-link";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ArrowRight, ImageIcon, Mail, Maximize, Users } from "lucide-react";

const getLaboratories = unstable_cache(
  async () => {
    const res = await db.laboratory.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        area: true,
        capacity: true,
        images: true,
        coverImg: true,
      },
      take: 3,
    });

    const labs = res.map((lab) => ({
      ...lab,
      area: Number(lab.area),
      images: lab.images.length,
    }));

    return labs;
  },
  ["laboratories"],
  { revalidate: 3600 * 24, tags: ["laboratories"] },
);
const getResearchs = unstable_cache(
  async () => {
    const researchs = await db.researchPortfolio.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        title: true,
        abstract: true,
        slug: true,
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    return researchs;
  },
  ["researchs"],
  { revalidate: 3600 * 24, tags: ["researchs"] },
);
const getArticles = unstable_cache(
  async () => {
    const researchs = await db.article.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        title: true,
        slug: true,
        coverImg: true,
        laboratory: {
          select: {
            name: true,
          },
        },
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    return researchs;
  },
  ["researchs"],
  { revalidate: 3600 * 24, tags: ["researchs"] },
);

const testimonialItems: testimonialItemTypes[] = [
  {
    icon: Mail,
    imgUrl: "/assets/images/static/testi-1.jpg",
    altImg: "ilustrasi testimonial",
    title: "Fasilitas Lengkap dan Modern",
    desc: "Laboratorium ini sangat lengkap dengan perangkat lunak terbaru yang kami butuhkan. Ruangannya bersih dan nyaman.",
    reviewer: "Shinta Pridani Putri",
    occupancy: "Umum",
  },
  {
    icon: Mail,
    imgUrl: "/assets/images/static/testi-2.jpg",
    altImg: "ilustrasi testimonial",
    title: "Pemesanan Cepat",
    desc: "Respon dari para petugas cepat sekali, penyewaan lab terasa mudah.",
    reviewer: "Hadi Kurniawan",
    occupancy: "Peneliti",
  },
  {
    icon: Mail,
    imgUrl: "/assets/images/static/testi-3.jpg",
    altImg: "ilustrasi testimonial",
    title: "Informasi Laboratorium Cukup Lengkap",
    desc: "Memudahkan sekali dalam menentukan laboratorium mana yang sesuai untuk kebutuhan saya.",
    reviewer: "Ali Chamid",
    occupancy: "Peneliti",
  },
];

const LandingPage = async () => {
  const laboratories = await getLaboratories();
  const researchs = await getResearchs();
  const articles = await getArticles();

  return (
    <>
      {/* Hero */}
      <section className="bg flex min-h-screen flex-col justify-center gap-10 bg-background px-5 py-20 md:h-[calc(100vh-89px)] md:px-20 lg:flex-row lg:items-center lg:justify-between lg:py-5 lg:pr-5">
        <div className="flex basis-1/2 flex-col justify-end gap-y-10 md:h-min lg:items-start lg:justify-between">
          <div>
            <h1 className="animate-fade-right font-medium animate-duration-1000 animate-ease-in-out">
              Sistem Informasi Laboratorium
            </h1>
            <h2 className="mt-5 animate-fade-right text-4xl font-medium tracking-tighter animate-delay-500 animate-duration-1000 animate-ease-in-out md:text-6xl">
              Sewa Laboratorium Mudah dan Cepat
            </h2>
            <p className="mt-5 animate-fade-right text-muted-foreground animate-delay-1000 animate-duration-1000 animate-ease-in-out">
              Silab menyediakan platform terpadu yang memudahkan proses
              pemesanan, penggunaan, dan komunikasi dalam satu tempat. Kami
              berkomitmen untuk memberikan layanan terbaik dengan fasilitas
              laboratorium yang lengkap dan modern.
            </p>
            <div className="mt-10 flex animate-fade-right items-center justify-start gap-5 animate-delay-[1500ms] animate-duration-1000 animate-ease-in-out">
              <ButtonLink href="/laboratorium" size="lg">
                Sewa Laboratorium
              </ButtonLink>
              <p className="text-sm">
                <span className="font-semibold">10+ </span>
                Klien puas dengan pelayanan kami
              </p>
            </div>
          </div>
          <div className="mt-12 flex w-full animate-fade-right items-start justify-between gap-5 animate-delay-[2000ms] animate-duration-1000 animate-ease-in-out lg:mt-0">
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold md:text-3xl">19</span>
              <span className="text-muted-foreground">
                Laboratorium tersedia
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold md:text-3xl">30+</span>
              <span className="text-muted-foreground">
                Paket pilihan layanan
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold md:text-3xl">10+</span>
              <span className="text-muted-foreground">
                Kegiatan telah digelar
              </span>
            </div>
          </div>
        </div>

        <div className="basis-1/2 animate-fade-left overflow-hidden animate-delay-[2500ms] animate-duration-1000 animate-ease-in-out md:h-full">
          <Image
            src="/assets/images/static/hero.jpg"
            width={716}
            height={800}
            alt="hero image"
            style={{ objectFit: "cover" }}
            className="h-60 transition-transform duration-700 hover:scale-110 lg:h-full"
            priority
          />
        </div>
      </section>

      {/* About Us */}
      <section className="relative px-5 py-10 dark:bg-zinc-900 md:px-20 md:py-32">
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-zinc-100 bg-[linear-gradient(to_right,#EEEEEF_1px,transparent_1px),linear-gradient(to_bottom,#EEEEEF_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#1F1F1F_1px,transparent_1px),linear-gradient(to_bottom,#1F1F1F_1px,transparent_1px)]" />

        {/* About Us */}
        <div className="flex flex-col items-center justify-start gap-10 lg:flex-row lg:justify-between lg:gap-20">
          <div>
            <h2 className="text-center text-lg font-medium md:font-normal md:text-muted-foreground lg:text-left">
              Tentang Kami
            </h2>
            <p className="mt-4 text-center text-xl font-light text-zinc-900 dark:text-zinc-100 lg:text-left lg:text-2xl lg:leading-10">
              Kami menyediakan solusi manajemen peminjaman laboratorium yang
              efisien untuk jurusan kesehatan Politeknik Negeri Jember. Platform
              kami mempermudah proses peminjaman dan penggunaan laboratorium.
            </p>
          </div>

          <div className="flex h-72 w-72 flex-col items-center justify-center gap-5 bg-background dark:bg-zinc-800 lg:min-w-72">
            <div className="flex w-[152px]">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14 -translate-x-6 transform">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14 -translate-x-12 transform">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14 -translate-x-[72px] transform">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col justify-center gap-2">
              <span className="text-center text-xl font-semibold">
                Tim ahli kami
              </span>
              <span className="text-center text-zinc-900 dark:text-zinc-100">
                Selalu siap membantu anda!
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-20 lg:mt-32">
          {/* Title */}
          <div className="flex flex-col items-center justify-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:basis-1/2">
              <h2 className="text-center text-lg text-muted-foreground lg:text-left">
                Temukan
              </h2>
              <p className="mt-4 text-center text-2xl text-zinc-900 dark:text-zinc-100 md:text-3xl lg:text-left lg:text-4xl lg:leading-normal">
                Daftar Laboratorium yang Bisa Disewa
              </p>
            </div>

            <div className="flex flex-col lg:max-w-96 lg:items-end">
              <p className="text-center text-muted-foreground lg:text-right">
                Konsultasikan kegiatan anda dengan staff kami untuk mendapatkan
                laboratorium yang sesuai{" "}
              </p>
              <ButtonLink href="/laboratorium" className="mt-5 w-full lg:w-max">
                Pelajari Lebih Lanjut
              </ButtonLink>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-y-20 lg:grid-cols-3">
              {laboratories.map((lab, index) => (
                <Card
                  key={lab.id}
                  className={cn(
                    "col-span-1 flex h-full flex-col items-start justify-between rounded-md border-none bg-transparent shadow-none",
                    index === 3 && "hidden",
                  )}
                >
                  <CardContent className="flex flex-col justify-between px-0">
                    <div className="relative h-96 w-full overflow-hidden lg:h-[26rem]">
                      <Link href={`/laboratorium/${lab.slug ?? ""}`}>
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
                        <div className="flex items-center justify-start gap-2">
                          <Maximize className="h-3 w-3 stroke-zinc-500" />
                          <span className="text-sm text-muted-foreground">
                            {lab.area} m²
                          </span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <Users className="h-3 w-3 stroke-zinc-500" />
                          <span className="text-sm text-muted-foreground">
                            {lab.capacity}
                          </span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <ImageIcon className="h-3 w-3 stroke-zinc-500" />
                          <span className="text-sm text-muted-foreground">
                            {lab.images}
                          </span>
                        </div>
                      </div>

                      <ButtonLink
                        variant="outline"
                        href={`/laboratorium/${lab.slug}`}
                        className="w-full bg-transparent transition-colors duration-500 hover:bg-zinc-900 hover:text-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-zinc-900 lg:w-max"
                      >
                        Lihat Lab
                      </ButtonLink>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="min-h-screen px-5 py-20 md:px-20 md:py-32">
        <div className="grid w-full grid-cols-6 gap-y-10 lg:gap-x-20">
          <div className="col-span-6 flex flex-col items-start justify-between gap-10 lg:col-span-3">
            <div>
              <h2 className="text-center text-lg text-muted-foreground lg:text-left">
                Penelitian
              </h2>
              <p className="mt-3 text-center text-2xl text-zinc-900 dark:text-zinc-100 md:text-3xl lg:text-left lg:text-4xl lg:leading-normal">
                Kegiatan Penelitian yang Telah Kami Laksanakan
              </p>
            </div>

            <div className="relative h-60 w-full overflow-hidden md:h-80 lg:h-full">
              <Image
                src="/assets/images/static/research-section.jpg"
                alt="hero image"
                fill={true}
                priority
                className="object-cover transition-transform duration-700 hover:scale-110 lg:h-auto"
              />
            </div>
          </div>
          <div className="col-span-6 lg:col-span-3">
            <ul className="flex w-full flex-col justify-start gap-y-5">
              {researchs.map((research) => (
                <li
                  key={research.id}
                  className="flex flex-col justify-start gap-3 border border-zinc-200 p-5 dark:border-zinc-800"
                >
                  <Link href={`/penelitian/${research.slug}`}>
                    <h3 className="line-clamp-2 text-lg md:text-xl">
                      {research.title}
                    </h3>
                  </Link>
                  <p className="line-clamp-1 text-muted-foreground">
                    {research.abstract}
                  </p>
                  <ButtonLink
                    href={`/penelitian/${research.slug}`}
                    variant={"link"}
                    className="group flex w-min items-center gap-x-2 p-0 text-sm"
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight className="hidden h-5 w-5 animate-fade-right !animate-delay-0 !animate-duration-300 group-hover:block" />
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-10 lg:py-32">
        <div className="flex flex-col-reverse items-end justify-between gap-10 px-5 md:flex-row md:px-20">
          <div className="w-full">
            <p className="text-center md:text-left">
              Merasa pelayanan kami kurang memuaskan?
            </p>
            <ButtonLink
              href="/tentang-kami"
              variant={"outline"}
              className="mt-3 md:w-min"
            >
              Beritahu Kami
            </ButtonLink>
          </div>

          <div className="flex w-full justify-center">
            <div className="max-w-lg">
              <h2 className="text-center text-lg font-normal text-muted-foreground md:text-right">
                Tentang Kami
              </h2>
              <p className="mt-3 text-center text-2xl md:text-right lg:text-4xl">
                Dengar ulasan para client kami yang puas
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-10 grid max-w-[100vw] grid-cols-1 overflow-hidden md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {testimonialItems.map((item, index) => (
            <li
              key={index}
              className={cn(
                "col-span-1 flex w-full flex-col",
                index === 2 && "md:hidden lg:block",
                index === 1 && "md:flex-col-reverse",
              )}
            >
              <div className="relative h-[calc(100vw)] w-[calc(100vw)] md:h-[calc(50vw)] md:w-[calc(50vw)] lg:h-[calc(100vw/3)] lg:w-[calc(100vw/3)]">
                <Image
                  src={item.imgUrl}
                  alt={item.altImg}
                  fill={true}
                  priority
                  className="h-full w-full object-cover dark:brightness-90"
                />
              </div>
              <div className="relative flex h-[calc(100vw)] w-[calc(100vw)] flex-col items-center justify-center gap-5 bg-zinc-50 p-10 dark:bg-zinc-900 md:h-[calc(50vw)] md:w-[calc(50vw)] lg:h-[calc(100vw/3)] lg:w-[calc(100vw/3)] lg:p-20">
                {<item.icon />}

                <div>
                  <p className="text-center text-lg lg:text-xl">{item.title}</p>
                  <p className="mt-3 text-center text-muted-foreground">
                    {item.desc}
                  </p>
                </div>

                <div>
                  <p className="text-center font-medium">{item.reviewer}</p>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {item.occupancy}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* News */}
      <section className="flex flex-col items-center justify-center px-5 py-10 md:px-20 md:py-32">
        <div className="w-full">
          <h2 className="text-center text-lg text-muted-foreground">Berita</h2>
          <p className="text-center text-2xl text-zinc-900 dark:text-zinc-100 md:mt-4 md:text-3xl lg:text-4xl lg:leading-normal">
            Kabar Terbaru dari Kami
          </p>
        </div>

        <div>
          <ul className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <li
                key={article.id}
                className={cn(
                  "col-span-1",
                  index == 3 && "hidden md:block lg:hidden",
                )}
              >
                <Card className="rounded-md border-none bg-transparent shadow-none">
                  <CardContent className="px-0">
                    <div className="relative h-96 w-full overflow-hidden lg:h-[26rem]">
                      <Link href={`/berita/${article.slug}`}>
                        <Image
                          src={article.coverImg ?? ""}
                          alt="hero image"
                          className="object-cover transition-transform duration-700 hover:scale-110"
                          fill={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 50vw"
                          priority
                        />
                      </Link>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted-foreground lg:text-sm">
                        {article.laboratory?.name ?? ""}
                      </p>
                      <Link href={`/berita/${article.slug}`}>
                        <h3 className="mt-2 line-clamp-2 text-lg hover:underline md:text-xl">
                          {article.title}
                        </h3>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
