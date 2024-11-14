import React from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function FAQSection() {
  const faqItems = [
    {
      question: "Apa itu SILAB?",
      answer:
        "SILAB adalah sistem informasi laboratorium yang digunakan untuk mengelola dan memesan layanan laboratorium di institusi kami.",
    },
    {
      question: "Siapa saja yang bisa menggunakan SILAB?",
      answer:
        "SILAB dapat digunakan oleh mahasiswa, dosen, peneliti, dan staf yang memerlukan akses ke layanan laboratorium.",
    },
    {
      question: "Bagaimana cara mendaftar di SILAB?",
      answer:
        "Untuk mendaftar di SILAB, kunjungi halaman pendaftaran dan ikuti petunjuk yang diberikan. Anda akan diminta untuk memberikan informasi dasar dan memverifikasi email Anda.",
    },
    {
      question: "Bagaimana cara memesan laboratorium melalui SILAB?",
      answer:
        "Setelah masuk ke akun Anda, pilih laboratorium yang ingin Anda gunakan, pilih layanan yang diperlukan, dan pilih waktu yang tersedia. Kemudian, ikuti langkah-langkah untuk menyelesaikan pemesanan Anda.",
    },
    {
      question:
        "Apa yang terjadi setelah saya mengirimkan permintaan pemesanan?",
      answer:
        "Setelah mengirimkan permintaan, Anda akan menerima konfirmasi melalui email. Staf laboratorium akan meninjau permintaan Anda dan menghubungi Anda jika diperlukan informasi tambahan.",
    },
    {
      question: "Apakah saya bisa membatalkan pemesanan?",
      answer:
        "Ya, Anda dapat membatalkan pemesanan melalui dashboard SILAB Anda. Namun, harap perhatikan kebijakan pembatalan yang mungkin berlaku tergantung pada jenis layanan dan waktu pembatalan.",
    },
    {
      question:
        "Bagaimana saya bisa berkomunikasi dengan perwakilan laboratorium sebelum melakukan pemesanan?",
      answer:
        "Anda bisa melihat kontak dari masing-masing perwakilan lab pada halaman Laboratorium, atau pada halaman Tentang Kami.",
    },
  ];

  return (
    <div className="container mx-auto mb-20 mt-10 max-w-2xl px-4 py-8">
      <nav className="mb-4 text-sm">
        <ol className="inline-flex list-none p-0">
          <li className="flex items-center">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Beranda
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
          </li>
          <li className="flex items-center">
            <span className="text-gray-700">
              Pertanyaan yang Sering Ditanyakan
            </span>
          </li>
        </ol>
      </nav>

      <h1 className="mb-4 text-4xl font-bold">
        Pertanyaan yang Sering Ditanyakan
      </h1>
      <p className="mb-8 text-lg">
        Ini adalah pertanyaan yang paling sering diajukan tentang Silab. Tidak
        dapat menemukan apa yang Anda cari?{" "}
        <Link href="/tentang-kami" className="text-blue-600 hover:underline">
          Hubungi tim kami sekarang!
        </Link>
      </p>

      <Tabs defaultValue="umum" className="w-full">
        <TabsList>
          <TabsTrigger value="umum">Umum</TabsTrigger>
          <TabsTrigger value="pembayaran">Pembayaran</TabsTrigger>
        </TabsList>
        <TabsContent value="umum">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="pembayaran">
          <p>Informasi pembayaran akan segera tersedia.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
