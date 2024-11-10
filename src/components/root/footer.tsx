import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 px-5 py-20 md:px-20 lg:py-32 dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-between gap-10 md:gap-20 lg:flex-row">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <Image
            src="/assets/images/static/silab-dark.png"
            width={145.3}
            height={64}
            alt="Silab logo"
            className="h-[44px] w-[100px]"
          />

          <p className="text-center text-zinc-200 md:w-2/3 lg:w-auto lg:max-w-2xl lg:text-left">
            Solusi manajemen laboratorium yang efisien untuk jurusan kesehatan
            Politeknik Negeri Jember.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-10 md:flex md:items-start md:justify-between lg:justify-end">
          <div className="col-span-1">
            <p className="text-lg font-semibold text-zinc-100">Tautan Cepat</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li className="leading-6 text-zinc-300">
                <Link href="/tentang-kami">Tentang Kami</Link>
              </li>
              <li className="leading-6 text-zinc-300">
                <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
              </li>
              <li className="leading-6 text-zinc-300">
                <Link href="/faq">Sering Ditanyakan</Link>
              </li>
              <li className="leading-6 text-zinc-300">
                <Link href="/berita">Berita</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-lg font-semibold text-zinc-100">
              Informasi Kontak
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              <li className="leading-6 text-zinc-300">
                Jurusan Kesehatan Polije
              </li>
              <li className="leading-6 text-zinc-300">
                <Link href="#">081299990000</Link>
              </li>
              <li className="leading-6 text-zinc-300">
                <Link href="#">info@silab.com</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-semibold text-zinc-100">Media Sosial</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li className="leading-6 text-zinc-300">
                <Link href="#">Instagram</Link>
              </li>
              <li className="leading-6 text-zinc-300">
                <Link href="#">Linkedin</Link>
              </li>
              <li className="leading-6 text-zinc-300">
                <Link href="#">Youtube</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Separator className="my-10" />
      <p className="text-center text-zinc-100">
        © Copyright <span>{new Date().getFullYear()}</span> Silab. All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;
