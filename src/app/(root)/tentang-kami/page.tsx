import React from "react";

import { db } from "~/server/db";
import { Role } from "@prisma/client";
import { unstable_cache } from "next/cache";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import DataTable from "~/components/ui/data-table";
import AboutUsDtColumn from "~/components/about-us/about-us-dt-col";
import LabManagersCarousel from "~/components/about-us/about-us-carousel";

const getLabsContactInfo = unstable_cache(
  async () => {
    const labsContactInfo = await db.laboratory.findMany({
      select: {
        id: true,
        name: true,
        contactEmail: true,
        contactName: true,
        contactPhone: true,
      },
    });

    return labsContactInfo;
  },
  ["labsContactInfo"],
  { revalidate: 3600 * 24, tags: ["labsContactInfo"] },
);

const getLabsManager = unstable_cache(
  async () => {
    const labsManager = await db.user.findMany({
      where: {
        OR: [
          {
            role: Role.KEPALA_JURUSAN,
          },
          {
            role: Role.KEPALA_LAB,
          },
          {
            role: Role.TEKNISI,
          },
        ],
      },
      select: {
        job: true,
        name: true,
        image: true,
      },
    });

    return labsManager;
  },
  ["aboutUsLabManagers"],
  { revalidate: 3600 * 24, tags: ["aboutUsLabManagers"] },
);

const AboutUs = async () => {
  const labsContactInfo = await getLabsContactInfo();
  const labsManagers = await getLabsManager();

  return (
    <>
      <section className="mt-20 lg:mt-28">
        <h1 className="text-center text-muted-foreground">Tentang Kami</h1>
        <p className="mt-5 text-center text-2xl leading-snug md:mt-4 md:text-3xl lg:mt-1 lg:text-4xl lg:leading-normal">
          Kenali tim dibalik Silab
        </p>
        <div className="flex items-center justify-center">
          <Breadcrumb className="mt-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tentang Kami</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="my-20 px-5 lg:px-20">
        <div className="flex justify-center">
          <p className="max-w-3xl text-center text-muted-foreground">
            Selamat datang di Silab, platform unggulan untuk layanan penyewaan
            laboratorium. SILAB, atau Sistem Informasi Laboratorium, dirancang
            untuk menyederhanakan pengelolaan dan komersialisasi fasilitas
            laboratorium. Apakah Anda seorang peneliti, akademisi, atau
            profesional industri, Silab menawarkan kemudahan untuk penyewaan
            laboratorium di lingkungan Jurusaan Kesehatan Politeknik Negeri
            Jember.
          </p>
        </div>
      </section>

      <LabManagersCarousel labManagers={labsManagers} />

      <section className="my-20 px-5 lg:px-20">
        <DataTable columns={AboutUsDtColumn} data={labsContactInfo} />
      </section>
    </>
  );
};

export default AboutUs;
