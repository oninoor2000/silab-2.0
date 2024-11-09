// Note : npx tsx prisma/seed-full.ts

import {
  PrismaClient,
  Role,
  Organization,
  Unit,
  PortfolioType,
  AuthorRole,
  DayOfWeek,
  CategoryFor,
  ServiceFor,
  ServiceType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = [
    {
      name: "Admin User", //index 0
      email: "admin@example.com",
      password: await bcrypt.hash("11442233", 10),
      emailVerified: new Date(),
      role: "ADMIN" as Role,
      job: "System Administrator",
      phone: "081234567890",
      address: "Jl. Admin No. 1, Jember",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4ZnyWRwlfDkoAmJIBv51Mb3709qRaGewd4Oul",
    },
    {
      name: "Silab Admin",
      email: "testing@mail.com",
      password: await bcrypt.hash("11442233", 10),
      emailVerified: new Date(),
      role: "ADMIN" as Role,
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4ZnyWRwlfDkoAmJIBv51Mb3709qRaGewd4Oul",
      job: "System Administrator",
    },
    {
      name: "Ali Chamid", //index 0
      email: "ali@mail.com",
      password: await bcrypt.hash("11442233", 10),
      emailVerified: new Date(),
      role: "ADMIN" as Role,
      phone: "081234567890",
      address: "Jl. Geger No. 1, Madiun",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4XNLGxQJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
    },
    {
      name: "Ir. Rindiani, M.P.", // index 1
      email: "rindiani@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "KEPALA_JURUSAN" as Role,
      job: "Ketua Jurusan Kesehatan",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4vtS1AuzcrFM8uBgRKNjlxnwDVI5aeL7YqkJo",
    },
    {
      name: "Zora Olivia, S.Farm, M.Farm, Apt", // index 2
      email: "zora@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "KEPALA_LAB" as Role,
      job: "Kepala Laboratorium",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4S8WZzavh2MGzFAj3WY4aSs6yDblZIB0uHfPq",
    },
    {
      name: "Syarifuddin Nur", // index 3
      email: "syarifuddin@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "TEKNISI" as Role,
      job: "Teknisi Lab Biomedik",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4zhKT5ukskSns9JFgerz4pvDl3bKauGcNWiq2",
    },
    {
      name: "Puguh Arif Priambudi, S.ST", // index 4
      email: "puguh@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "TEKNISI" as Role,
      job: "Teknisi Lab Analisis Zat Gizi",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4FWlxjgL2OMiT8QHfgR7J3V9vxm1AcYNhoB0s",
    },
    {
      name: "Rihaanatul Humaidah, S.Gz", // index 5
      email: "rihaanatul@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "TEKNISI" as Role,
      job: "Teknisi Laboratorium NCC",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4AYs4Zo0wj3GesgoOZxt7mJ2IETfl9R6uVhHC",
    },
    {
      name: "Ratih Putri Damayati, S.Gz., M.Si", // index 6
      email: "ratih@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "KEPALA_LAB" as Role,
      job: "Kepala Laboratorium",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4OuvDujXfsKm6FWX4hbN7APjG1rCac93zTikd",
    },
    {
      name: "Mirta Dwi Yati, S.ST", // index 7
      email: "mirta@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "TEKNISI" as Role,
      job: "Teknisi Lab Pendidikan Gizi",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4JmKZ4VFDyoKNVCeRHpquvtSmkfYa1cILT2bj",
    },
    {
      name: "Ferdi Andrika Rahman, S.ST", // index 8
      email: "ferdi@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "TEKNISI" as Role,
      job: "Teknisi Lab Antropometri",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY41TcsRe0s9ZOmrwG8olQDK063nA2B5gJjcVSv",
    },
    {
      name: "Agatha Widyawati, S.ST., M.Gizi", // index 9
      email: "agatha@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "KEPALA_LAB" as Role,
      job: "Kepala Laboratorium",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY469koAHOcLBsEFfuxTUC2KVz7kNpalmH3YG15",
    },
    {
      name: "Fatatul Nikmah, A.Md", // index 10
      email: "fatatul@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "TEKNISI" as Role,
      job: "Teknisi Lab Pengolahan Pangan",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4X3gSe4JkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
    },
    {
      name: "Andi Martha Diana Sari, S.ST", // index 11
      email: "andi@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "TEKNISI" as Role,
      job: "Teknisi Lab Dietetik dan Kuliner",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4hxnuhvUMvdebMkLlZ5Vci3Ey172KwqrPshIf",
    },
    {
      name: "Dian Kartika Sari, S.ST, M.T", // index 12
      email: "dian@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "KEPALA_LAB" as Role,
      job: "Kepala Laboratorium",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4tBiIuxapsmC3t8KBUh67ainX9VuF0fcYILGz",
    },
    {
      name: "Ria Chandra Kartika, S.KM, M.Kes", // index 13
      email: "ria@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "KEPALA_LAB" as Role,
      job: "Kepala Laboratorium",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4MlyzKunxetN5ioyJPEGFkWC8T1SAwrcILuZ9",
    },
    {
      name: "Riskha Dora Candra Dewi, S.Sos, M.H.Kes", // index 14
      email: "riskha@example.com",
      password: await bcrypt.hash("harusdiganti", 10),
      emailVerified: new Date(),
      role: "KEPALA_LAB" as Role,
      job: "Kepala Laboratorium",
      organization: "POLIJE" as Organization,
      image:
        "https://utfs.io/f/P2oQLWYULKY4eqpXOLN2DOIF8eqCShBVNMXJtzd3uTQy5U7b",
    },
  ];

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({ data: user });
    createdUsers.push(createdUser);
  }

  console.log("Users seeded successfully");

  // Seed Laboratories
  const laboratories = [
    {
      //index 0
      name: "Laboratorium Komputer",
      slug: "lab-komputer",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
      description:
        "Laboratorium Komputer menyediakan fasilitas modern dengan perangkat komputer terbaru yang mendukung berbagai kebutuhan komputasi, termasuk pemrograman, pengolahan data, dan simulasi. Dilengkapi dengan jaringan internet berkecepatan tinggi dan software terkini, laboratorium ini sangat ideal untuk kegiatan akademik dan penelitian di bidang teknologi informasi.",
      address: "Gedung A, Lantai 1, Politeknik Negeri Jember",
      area: 100.0,
      capacity: 40,
      contactName: "Dr. Informatika",
      contactEmail: "lab.komputer@polije.ac.id",
      contactPhone: "081234567001",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 1
      name: "Laboratorium Rekam Medis Elektronik",
      slug: "lab-rekam-medis",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
      description:
        "Laboratorium ini menawarkan fasilitas lengkap untuk pembelajaran dan praktik sistem rekam medis elektronik. Didesain untuk mendukung pendidikan kesehatan, laboratorium ini dilengkapi dengan perangkat lunak rekam medis terkini yang memungkinkan mahasiswa mempelajari cara mengelola dan menganalisis data pasien secara digital dengan keamanan yang tinggi.",
      address: "Gedung B, Lantai 2, Politeknik Negeri Jember",
      area: 80.0,
      capacity: 30,
      contactName: "Dr. Rekam Medis",
      contactEmail: "lab.rekammedis@polije.ac.id",
      contactPhone: "081234567002",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 2
      name: "Laboratorium Koding Klinis dan Reimbursment",
      slug: "lab-koding-klinis-reimbursment",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
      description:
        "Laboratorium Koding Klinis dan Reimbursment didesain untuk simulasi prosedur klinis serta pembelajaran sistem reimbursement kesehatan. Mahasiswa dapat mempraktikkan keterampilan klinis dengan alat dan bahan yang sesuai standar industri, serta mempelajari proses reimbursement di sektor kesehatan, termasuk asuransi kesehatan dan pengelolaan klaim.",
      address: "Gedung C, Lantai 1, Politeknik Negeri Jember",
      area: 120.0,
      capacity: 25,
      contactName: "Dr. Klinis",
      contactEmail: "lab.klinis@polije.ac.id",
      contactPhone: "081234567003",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 3
      name: "Laboratorium Pengolahan Pangan",
      slug: "lab-pengolahan-pangan",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
      description:
        "Laboratorium Pengolahan Pangan menyediakan fasilitas modern untuk eksperimen dan pengembangan produk pangan. Laboratorium ini dilengkapi dengan peralatan canggih untuk proses pengolahan, pengujian, dan pengemasan produk pangan. Mahasiswa dapat mengeksplorasi teknik pengolahan yang inovatif serta mempelajari teknologi pangan terbaru.",
      address: "Gedung D, Lantai 1, Politeknik Negeri Jember",
      area: 150.0,
      capacity: 35,
      contactName: "Dr. Pangan",
      contactEmail: "lab.pangan@polije.ac.id",
      contactPhone: "081234567004",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 4
      name: "Laboratorium Assessment & Microteaching",
      slug: "lab-assessment-microteaching",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
      description:
        "Laboratorium Assessment & Microteaching adalah ruang khusus yang didesain untuk pelatihan dan evaluasi metode pengajaran. Dilengkapi dengan teknologi perekaman dan evaluasi, laboratorium ini memungkinkan mahasiswa dan dosen untuk melakukan praktik mengajar secara interaktif, mendapatkan umpan balik konstruktif, dan meningkatkan kualitas pengajaran.",
      address: "Gedung E, Lantai 2, Politeknik Negeri Jember",
      area: 90.0,
      capacity: 20,
      contactName: "Dr. Pendidikan",
      contactEmail: "lab.microteaching@polije.ac.id",
      contactPhone: "081234567005",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 5
      name: "Laboratorium Biomedik",
      slug: "lab-biomedik",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4OnjnexfsKm6FWX4hbN7APjG1rCac93zTikdo",
      description:
        "Laboratorium Biomedik menawarkan fasilitas canggih untuk penelitian dan eksperimen di bidang biomedik. Dengan peralatan laboratorium yang mutakhir, mahasiswa dapat mempelajari dan meneliti berbagai aspek biologi dan kedokteran, termasuk genetika, mikrobiologi, dan biokimia. Laboratorium ini juga mendukung penelitian interdisipliner yang menggabungkan teknologi dengan ilmu biomedis.",
      address: "Gedung F, Lantai 3, Politeknik Negeri Jember",
      area: 130.0,
      capacity: 30,
      contactName: "Dr. Biomedik",
      contactEmail: "lab.biomedik@polije.ac.id",
      contactPhone: "081234567006",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 6
      name: "Laboratorium Analis Zat Gizi",
      slug: "lab-analis-zat-gizi",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4eykjogN2DOIF8eqCShBVNMXJtzd3uTQy5U7b",
      description:
        "Laboratorium ini dirancang untuk analisis komponen gizi dalam berbagai jenis makanan. Dengan peralatan analisis kimia yang lengkap, laboratorium ini memungkinkan mahasiswa untuk mempelajari kandungan nutrisi, melakukan uji coba, dan mengembangkan produk makanan yang sehat dan sesuai dengan standar gizi.",
      address: "Gedung G, Lantai 1, Politeknik Negeri Jember",
      area: 100.0,
      capacity: 25,
      contactName: "Dr. Gizi",
      contactEmail: "lab.gizi@polije.ac.id",
      contactPhone: "081234567007",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 7
      name: "Laboratorium Fotografi",
      slug: "lab-fotografi",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4AHUZDSwj3GesgoOZxt7mJ2IETfl9R6uVhHCd",
      description:
        "Laboratorium Fotografi merupakan studio yang lengkap dengan peralatan profesional untuk keperluan fotografi. Mahasiswa dapat mengasah keterampilan fotografi mereka, mulai dari teknik dasar hingga lanjutan, serta memanfaatkan berbagai alat seperti kamera profesional, pencahayaan, dan software pengolahan gambar.",
      address: "Gedung H, Lantai 2, Politeknik Negeri Jember",
      area: 80.0,
      capacity: 20,
      contactName: "Prof. Fotografi",
      contactEmail: "lab.foto@polije.ac.id",
      contactPhone: "081234567008",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 8
      name: "Laboratorium Videografi dan Film",
      slug: "lab-videografi-film",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY47n7LQEIZE8dLhqjuUPWISgOzcpafNKD2i3vC",
      description:
        "Laboratorium ini adalah studio produksi video dan film yang dilengkapi dengan peralatan terkini. Dari pre-produksi hingga pasca-produksi, laboratorium ini memungkinkan mahasiswa untuk mengeksplorasi berbagai aspek pembuatan film, termasuk pengambilan gambar, editing video, dan pengembangan naskah.",
      address: "Gedung H, Lantai 3, Politeknik Negeri Jember",
      area: 120.0,
      capacity: 25,
      contactName: "Prof. Videografi",
      contactEmail: "lab.video@polije.ac.id",
      contactPhone: "081234567009",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 9
      name: "Laboratorium Komputer Promosi Kesehatan",
      slug: "lab-komputer-promosi-kesehatan",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4X5HOI1yJkDOIl8YmBGWFEhMVPstf49UQSC1A",
      description:
        "Laboratorium ini khusus untuk pengembangan media promosi kesehatan berbasis komputer. Dilengkapi dengan perangkat lunak desain dan multimedia, laboratorium ini mendukung mahasiswa dalam menciptakan konten edukasi yang efektif dan menarik untuk kampanye kesehatan.",
      address: "Gedung I, Lantai 1, Politeknik Negeri Jember",
      area: 90.0,
      capacity: 30,
      contactName: "Dr. Promkes",
      contactEmail: "lab.promkes@polije.ac.id",
      contactPhone: "081234567010",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 10
      name: "Laboratorium Multimedia Kesehatan",
      slug: "lab-multimedia-kesehatan",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4McFMOQnxetN5ioyJPEGFkWC8T1SAwrcILuZ9",
      description:
        "Laboratorium Multimedia Kesehatan menyediakan fasilitas untuk produksi konten multimedia yang berkaitan dengan kesehatan. Dengan berbagai perangkat lunak dan peralatan multimedia, laboratorium ini memungkinkan mahasiswa untuk membuat video, animasi, dan presentasi interaktif yang mendukung edukasi kesehatan.",
      address: "Gedung I, Lantai 2, Politeknik Negeri Jember",
      area: 100.0,
      capacity: 25,
      contactName: "Dr. Multimedia",
      contactEmail: "lab.multimedia@polije.ac.id",
      contactPhone: "081234567011",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 11
      name: "Laboratorium Desain Grafis Kesehatan",
      slug: "lab-desain-grafis-kesehatan",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4XXGddNJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
      description:
        "Laboratorium ini merupakan ruang kreatif yang didedikasikan untuk pengembangan desain grafis terkait kesehatan. Mahasiswa dapat memanfaatkan berbagai alat desain grafis dan software editing untuk membuat poster, brosur, dan materi promosi lainnya yang efektif dan menarik.",
      address: "Gedung I, Lantai 3, Politeknik Negeri Jember",
      area: 85.0,
      capacity: 25,
      contactName: "Prof. Desain",
      contactEmail: "lab.desain@polije.ac.id",
      contactPhone: "081234567012",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 12
      name: "Laboratorium Antropometri",
      slug: "lab-antropometri",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4JdwroiVFDyoKNVCeRHpquvtSmkfYa1cILT2b",
      description:
        "Laboratorium Antropometri dirancang untuk pengukuran dan analisis dimensi tubuh manusia. Laboratorium ini menyediakan berbagai alat ukur yang presisi untuk studi antropometri, yang penting dalam bidang ergonomi, desain produk, dan kesehatan.",
      address: "Gedung J, Lantai 1, Politeknik Negeri Jember",
      area: 70.0,
      capacity: 20,
      contactName: "Dr. Antropometri",
      contactEmail: "lab.antropometri@polije.ac.id",
      contactPhone: "081234567013",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 13
      name: "Laboratorium Pendidikan Gizi",
      slug: "lab-pendidikan-gizi",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4YclVcYkxqsScMPRthZoLKTDOeXJzkCmFIQHl",
      description:
        "Laboratorium ini menyediakan fasilitas untuk pembelajaran dan penelitian di bidang pendidikan gizi. Dilengkapi dengan peralatan yang mendukung simulasi dan eksperimen, laboratorium ini membantu mahasiswa dalam memahami prinsip-prinsip gizi dan aplikasinya dalam program edukasi masyarakat.",
      address: "Gedung K, Lantai 1, Politeknik Negeri Jember",
      area: 95.0,
      capacity: 30,
      contactName: "Dr. Pendidikan Gizi",
      contactEmail: "lab.pendgizi@polije.ac.id",
      contactPhone: "081234567014",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 14
      name: "Laboratorium Rekam Medis Manual",
      slug: "lab-rekam-medis-manual",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY43aaTKjN4QwSxsBqaY9rv8ldWhAuNTOtCeg46",
      description:
        "Laboratorium Rekam Medis Manual menyediakan fasilitas untuk pembelajaran sistem rekam medis konvensional. Mahasiswa dapat mempelajari prosedur pencatatan dan pengarsipan data medis secara manual, yang masih relevan di beberapa fasilitas kesehatan.",
      address: "Gedung B, Lantai 1, Politeknik Negeri Jember",
      area: 75.0,
      capacity: 25,
      contactName: "Dr. Rekam Medis Manual",
      contactEmail: "lab.rekammedismanual@polije.ac.id",
      contactPhone: "081234567015",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 15
      name: "Laboratorium Anatomi Fisiologi",
      slug: "lab-anatomi-fisiologi",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4DPTtEu383vmitwubQALC4aTyX1qfFOVpzG5o",
      description:
        "Laboratorium Anatomi Fisiologi adalah fasilitas lengkap yang mendukung studi mendalam tentang struktur dan fungsi tubuh manusia. Dilengkapi dengan model anatomi, simulasi digital, dan peralatan laboratorium, mahasiswa dapat mempelajari berbagai aspek anatomi dan fisiologi dengan metode praktis.",
      address: "Gedung L, Lantai 2, Politeknik Negeri Jember",
      area: 110.0,
      capacity: 30,
      contactName: "Dr. Anatomi",
      contactEmail: "lab.anatomi@polije.ac.id",
      contactPhone: "081234567016",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 16
      name: "Laboratorium Dietetik dan Kuliner",
      slug: "lab-dietetik-kuliner",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4jq2V0MAKmrs8RA0vCqQTDcjXJbZSonkUlhEw",
      description:
        "Laboratorium Dietetik dan Kuliner menyediakan fasilitas modern untuk praktik dietetik serta eksperimen kuliner. Mahasiswa dapat mempelajari pengembangan menu diet yang seimbang dan inovatif serta mempraktikkan teknik memasak yang sesuai dengan standar gizi.",
      address: "Gedung M, Lantai 1, Politeknik Negeri Jember",
      area: 140.0,
      capacity: 35,
      contactName: "Dr. Dietetik",
      contactEmail: "lab.dietetik@polije.ac.id",
      contactPhone: "081234567017",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
    {
      //index 17
      name: "Laboratorium Analisis Data",
      slug: "lab-analisis-data",
      coverImg:
        "https://utfs.io/f/P2oQLWYULKY4Z3PZzwlfDkoAmJIBv51Mb3709qRaGewd4Oul",
      description:
        "Laboratorium ini dirancang khusus untuk analisis data dan statistik. Dilengkapi dengan perangkat komputer dan software statistik yang canggih, laboratorium ini mendukung mahasiswa dalam melakukan analisis data yang kompleks, baik untuk penelitian akademik maupun untuk aplikasi praktis di berbagai bidang.",
      address: "Gedung N, Lantai 2, Politeknik Negeri Jember",
      area: 95.0,
      capacity: 30,
      contactName: "Dr. Analisis Data",
      contactEmail: "lab.analisisdata@polije.ac.id",
      contactPhone: "081234567018",
      floorPlanUrl:
        "https://utfs.io/f/P2oQLWYULKY4dPn5fLjnQrpF2V4R8HBcXo1PuhbA9tTvx7JU",
      isDraft: false,
    },
  ];

  const createdLabs = [];
  for (const lab of laboratories) {
    const createdLab = await prisma.laboratory.create({ data: lab });
    createdLabs.push(createdLab);
  }

  console.log("Laboratories seeded successfully");

  if (createdLabs.length === 0 || createdUsers.length === 0) {
    throw new Error(
      "Required data is missing. Please check if laboratories and users were created successfully.",
    );
  }

  // Seed Facilities
  if (createdLabs.length > 2) {
    const facilities = [
      {
        name: "30 Komputer",
        image: "/assets/images/lab-images/facilities/komputer.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "4 Pendingin Ruangan",
        image: "/assets/images/lab-images/facilities/ac.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "Local Area Network",
        image: "/assets/images/lab-images/facilities/lan.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "Proyektor",
        image: "/assets/images/lab-images/facilities/proyektor.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "Layar Proyektor",
        image: "/assets/images/lab-images/facilities/layar-project.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "Stop Kontak",
        image: "/assets/images/lab-images/facilities/stop-kontak.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "Sound System",
        image: "/assets/images/lab-images/facilities/sound-system.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "Wifi 100Gb",
        image: "/assets/images/lab-images/facilities/wifi.jpg",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        name: "Oscilloscope",
        image: "/assets/images/lab-images/facilities/oscilloscope.jpg",
        laboratoryId: createdLabs[1]!.id,
      },
      {
        name: "Spectrometer",
        image: "/assets/images/lab-images/facilities/spectrometer.jpg",
        laboratoryId: createdLabs[1]!.id,
      },
      {
        name: "Incubator",
        image: "/assets/images/lab-images/facilities/incubator.jpg",
        laboratoryId: createdLabs[2]!.id,
      },
      {
        name: "Centrifuge",
        image: "/assets/images/lab-images/facilities/centrifuge.jpg",
        laboratoryId: createdLabs[2]!.id,
      },
    ];

    for (const facility of facilities) {
      await prisma.facility.create({ data: facility });
    }

    console.log("Facilities seeded successfully");
  } else {
    console.log("Skipping Facilities seeding due to insufficient data");
  }

  // Seed Laboratory Services
  const createdServices = [];
  if (createdLabs.length > 17) {
    const services = [
      {
        name: "Peminjaman Ruang Fullboard",
        price: 300000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Pelatihan Jaringan / Networking Komputer",
        price: 1500000,
        unit: "PER_14_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Pelatihan Pemrograman Pascal Dasar",
        price: 500000,
        unit: "PER_14_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Pelatihan Pemrograman Java Dasar",
        price: 1000000,
        unit: "PER_14_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Pelatihan Pemrograman Java Lanjutan",
        price: 2000000,
        unit: "PER_14_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Fullboard Pelatihan Pemrograman Dasar dan Lanjutan ",
        price: 2500000,
        unit: "PER_14_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Pelatihan Pemrograman Berbasis Website",
        price: 2500000,
        unit: "PER_14_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Pelatihan Pemrograman Berbasis Android",
        price: 3500000,
        unit: "PER_14_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[0]!.id, // Laboratorium Komputer
      },
      {
        name: "Peminjaman Ruang Laboratorium Fullboard",
        price: 300000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Bimbingan Pembuatan Aplikasi Basik Android / WEB",
        price: 3000000,
        unit: "STARTING_FROM" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Pelatihan Perancangan Flowchart Sistem",
        price: 250000,
        unit: "PER_7_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Pelatihan Perancangan DFD Sistem",
        price: 250000,
        unit: "PER_7_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Pelatihan Perancangan ERD Sistem",
        price: 250000,
        unit: "PER_7_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Pelatihan Perancangan Desain Interface menggunakan Figma",
        price: 1000000,
        unit: "PER_7_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Pelatihan Metode Kecerdasan Buatan",
        price: 300000,
        unit: "PER_1_METHOD_3_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Pelatihan Sistem Informasi Geografis",
        price: 2000000,
        unit: "PER_12_MEETINGS" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Pengambilan Video dan Audio",
        price: 100000,
        unit: "STARTING_FROM" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Editing Video",
        price: 100000,
        unit: "STARTING_FROM" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Editing Audio",
        price: 50000,
        unit: "PER_HOUR" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Desain Grafis dan cetak banner",
        price: 300000,
        unit: "PER_DESIGN_METER" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Service Computer",
        price: 75000,
        unit: "PER_PACKAGE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Pemasangan dan Aktivasi Licensi Windows Original",
        price: 250000,
        unit: "PER_PACKAGE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Pemasangan dan Aktivasi Licensi Office Original",
        price: 250000,
        unit: "PER_PACKAGE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Pembuatan Aplikasi Basik Andorid",
        price: 1500000,
        unit: "STARTING_FROM" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Jasa Pembuatan Aplikasi Basik Web",
        price: 1250000,
        unit: "STARTING_FROM" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[1]!.id, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Peminjaman Ruang Laboratorium Fullboard",
        price: 300000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[2]!.id, // Laboratorium Koding Klinis dan Reimbursment
      },
      {
        name: "Pelatihan Kodefikasi",
        price: 100000,
        unit: "PER_STUDENT" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[2]!.id, // Laboratorium Koding Klinis dan Reimbursment
      },
      {
        name: "Sewa Laboratorium dan Alat untuk Mahasiswa Jurusan Kesehatan",
        price: 100000,
        unit: "PER_3_MONTHS" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[3]!.id, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Sewa Laboratorium dan Alat untuk Mahasiswa Jurusan Kesehatan melakukan pra penelitian",
        price: 30000,
        unit: "PER_1_7_DAYS" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[3]!.id, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Sewa Laboratorium dan Alat untuk Dosen atau Peneliti dari Jurusan Kesehatan",
        price: 30000,
        unit: "PER_1_7_DAYS" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[3]!.id, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Peminjaman Alat Tanpa Sewa Laboratorium untuk 1 Alat",
        price: 50000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[3]!.id, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Sewa Laboratorium dan Alat untuk Doseen atau peneliti atau umum dari luar Jurusan Kesehatan",
        price: 30000,
        unit: "PER_1_7_DAYS" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[3]!.id, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Peminjaman Alat Tanpa Sewa Laboratorium untuk 1 Alat",
        price: 50000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[3]!.id, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Peminjaman Ruang Laboratorium",
        price: 150000,
        unit: "PER_MONTH" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Panggung Boneka",
        price: 100000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Flipchart",
        price: 50000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Microphone Wireless",
        price: 50000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Media Edukasi Poster",
        price: 10000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Media Edukasi Games Ular Tangga",
        price: 2000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Media Alat Peraga Gigi",
        price: 15000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Speaker Portable Bluetooth",
        price: 15000,
        unit: "PER_DAY" as Unit,
        isRange: true,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Analisis Data Kualitatif Kesehatan 60 Menit",
        price: 150000,
        unit: "PER_PACKAGE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Analisis Data Kualitatif Kesehatan 120 Menit",
        price: 275000,
        unit: "PER_PACKAGE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Interpretasi Data Kualitatif",
        price: 150000,
        unit: "PER_PACKAGE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Analisis Data Kuantitatif Kesehatan - Bivariate",
        price: 35000,
        unit: "PER_ANALYSIS" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Analisis Data Kuantitatif Kesehatan - Mulivariat",
        price: 50000,
        unit: "PER_ANALYSIS" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Analisis Data Kuantitatif Kesehatan - Univariat",
        price: 50000,
        unit: "PER_ANALYSIS" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Survey Komunitas Dalam Kota Jember",
        price: 25000,
        unit: "PER_RESPONDENT" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Survey Komunitas Luar Jember - Pulau Jawa",
        price: 40000,
        unit: "PER_RESPONDENT" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Survey Komunitas Luar Jawa",
        price: 60000,
        unit: "PER_RESPONDENT" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Survey Komunitas Online",
        price: 30000,
        unit: "PER_RESPONDENT" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Paket 1 - Fasilitator FGD",
        description:
          "Paket Focus Group Disscussion (FGD) untuk 3-6 orang, durasi max 90 menit",
        price: 500000,
        unit: "PER_ANALYSIS" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Paket 2 - Fasilitator FGD",
        description:
          "Paket Focus Group Disscussion (FGD) untuk 7-12 orang, durasi max 90 menit",
        price: 750000,
        unit: "PER_ANALYSIS" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Jasa Pembuatan Instrumen Survey / Wawancara",
        price: 250000,
        unit: "PER_ANALYSIS" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[4]!.id, // Laboratorium Assessment & Microteaching
      },
      {
        name: "Sewa Laboratorium Paket 1",
        description:
          "Waktu < 1 bulan - Termasuk kandang bak dan kawat , rak, tempat minum dan pakan",
        price: 125000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Sewa Laboratorium Paket 2",
        description:
          "Waktu > 1-2 bulan - Termasuk kandang bak dan kawat , rak, tempat minum dan pakan",
        price: 175000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Sewa Laboratorium Paket 3",
        description:
          "Waktu > 2-4 bulan - Termasuk kandang bak dan kawat , rak, tempat minum dan pakan",
        price: 250000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Sewa Laboratorium Paket 4",
        description:
          "Waktu > 4-5 bulan - Termasuk kandang bak dan kawat , rak, tempat minum dan pakan",
        price: 350000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Sewa Laboratorium Paket 5",
        description:
          "Waktu > 5-6 bulan - Termasuk kandang bak dan kawat , rak, tempat minum dan pakan",
        price: 400000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Kelas Paket 1",
        description: "Waktu < 1 bulan",
        price: 100000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Kelas Paket 2",
        description: "Waktu > 1-2 bulan",
        price: 100000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Kelas Paket 3",
        description: "Waktu > 2-4 bulan",
        price: 125000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Kelas Paket 4",
        description: "Waktu > 4-5 bulan",
        price: 150000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Kelas Paket 5",
        description: "Waktu > 5-6 bulan",
        price: 175000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman LCD",
        price: 20000,
        unit: "PER_DAY" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Mannequin Besar",
        price: 100000,
        unit: "PER_DAY" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Mannequin Kecil",
        price: 50000,
        unit: "PER_DAY" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Pengambilan Darah Ekor",
        price: 5000,
        unit: "PER_MOUSE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Peminjaman Darah Lewat Mata Atau Jantung",
        description: "Minimal 20 ekor per hari",
        price: 30000,
        unit: "PER_MOUSE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Sonde",
        price: 5000,
        unit: "PER_SAMPLE" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Pemusnahan Tikus",
        price: 5000,
        unit: "PER_ANIMAL" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Pemeliharaan Tikus",
        description: "Pemberian makan dan minum serta pembersihan kandang",
        price: 30000,
        unit: "PER_DAY" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[5]!.id, // Laboratorium Biomedik
      },
      {
        name: "Sewa Laboratorium Paket 1",
        description: "Waktu sewa < 1 bulan",
        price: 125000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[6]!.id, // Laboratorium Analis Zat Gizi
      },
      {
        name: "Sewa Laboratorium Paket 2",
        description: "Waktu sewa > 1-2 bulan",
        price: 175000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[6]!.id, // Laboratorium Analis Zat Gizi
      },
      {
        name: "Sewa Laboratorium Paket 3",
        description: "Waktu sewa > 2-4 bulan",
        price: 250000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[6]!.id, // Laboratorium Analis Zat Gizi
      },
      {
        name: "Sewa Laboratorium Paket 4",
        description: "Waktu sewa > 4-5 bulan",
        price: 350000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[6]!.id, // Laboratorium Analis Zat Gizi
      },
      {
        name: "Sewa Laboratorium Paket 5",
        description: "Waktu sewa > 5-6 bulan",
        price: 400000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[6]!.id, // Laboratorium Analis Zat Gizi
      },
      {
        name: "Peminjaman Lab Studio Fotografi untuk Mahasiswa Polije",
        description: "Termasuk properti standar fotografi",
        price: 150000,
        unit: "PER_HOUR" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Peminjaman Lab Studio Fotografi untuk Internal Polije",
        description: "Termasuk properti standar fotografi",
        price: 200000,
        unit: "PER_HOUR" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Peminjaman Lab Studio Fotografi untuk Umum",
        description: "Termasuk properti standar fotografi",
        price: 250000,
        unit: "PER_HOUR" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Sewa Paket Alat Fotografi untuk Mahasiswa Polije",
        description: "DSLR/Mirorless dll",
        price: 500000,
        unit: "PER_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Sewa Paket Alat Fotografi untuk Internal Polije",
        description: "DSLR/Mirorless dll",
        price: 600000,
        unit: "PER_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Sewa Paket Alat Fotografi untuk Eksternal Polije",
        description: "DSLR/Mirorless dll",
        price: 750000,
        unit: "PER_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Sewa Properti Tambahan Fotografi untuk Mahasiswa Polije",
        description:
          "Properti seperti topi, jas lab, cattlepack, kacamata kerja, dll",
        price: 25000,
        unit: "PER_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Sewa Properti Tambahan Fotografi untuk Internal Polije",
        description:
          "Properti seperti topi, jas lab, cattlepack, kacamata kerja, dll",
        price: 50000,
        unit: "PER_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Sewa Properti Tambahan Fotografi untuk Eksternal Polije",
        description:
          "Properti seperti topi, jas lab, cattlepack, kacamata kerja, dll",
        price: 75000,
        unit: "PER_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Pelatihan Fotografi Kesehatan untuk Mahasiswa Polije",
        price: 250000,
        unit: "PER_HOUR" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Pelatihan Fotografi Kesehatan untuk Internal Polije",
        price: 250000,
        unit: "PER_HOUR" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Pelatihan Fotografi Kesehatan untuk Eksternal Polije",
        price: 250000,
        unit: "PER_HOUR" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Jasa Fotografi untuk Mahasiswa Polije",
        price: 75000,
        unit: "PER_HOUR" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Jasa Fotografi untuk Intenal Polije",
        price: 100000,
        unit: "PER_HOUR" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Jasa Fotografi untuk Eksternal Polije",
        price: 150000,
        unit: "PER_HOUR" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Jasa Talent/Model Fotografi untuk Mahasiswa Polije",
        price: 150000,
        unit: "PER_PERSON_2_HOURS" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Jasa Talent/Model Fotografi untuk Internal Polije",
        price: 200000,
        unit: "PER_PERSON_2_HOURS" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Jasa Talent/Model Fotografi untuk Eksternal Polije",
        price: 250000,
        unit: "PER_PERSON_2_HOURS" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[7]!.id, // Laboratorium Fotografi
      },
      {
        name: "Peminjaman Lab Studio Podcast, Videografi, dan Film untuk Mahasiswa Polije",
        description: "Termasuk properti standar",
        price: 150000,
        unit: "PER_HOUR" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Peminjaman Lab Studio Podcast, Videografi, dan Film untuk Internal Polije",
        description: "Termasuk properti standar",
        price: 200000,
        unit: "PER_HOUR" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Peminjaman Lab Studio Podcast, Videografi, dan Film untuk Eksternal Polije",
        description: "Termasuk properti standar",
        price: 250000,
        unit: "PER_HOUR" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Paket Alat Videografi untuk Mahasiswa Polije",
        description: "Camcorder dll",
        price: 500000,
        unit: "PER_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Paket Alat Videografi untuk Internal Polije",
        description: "Camcorder dll",
        price: 600000,
        unit: "PER_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Paket Alat Videografi untuk Eksternal Polije",
        description: "Camcorder dll",
        price: 750000,
        unit: "PER_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Paket Podcast untuk Mahasiswa Polije",
        description: "Mic, Mixer dll",
        price: 350000,
        unit: "PER_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Paket Podcast untuk Internal Polije",
        description: "Mic, Mixer dll",
        price: 400000,
        unit: "PER_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Paket Podcast untuk Eksternal Polije",
        description: "Mic, Mixer dll",
        price: 500000,
        unit: "PER_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Drone DJI untuk Mahasiswa Polije",
        price: 500000,
        unit: "PER_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Drone DJI untuk Internal Polije",
        price: 600000,
        unit: "PER_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Drone DJI untuk Eksternal Polije",
        price: 750000,
        unit: "PER_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Drone Biasa untuk Mahasiswa Polije",
        price: 200000,
        unit: "PER_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Drone Biasa untuk Internal Polije",
        price: 300000,
        unit: "PER_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Drone Biasa untuk Eksternal Polije",
        price: 400000,
        unit: "PER_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Properti Tambahan Videografi untuk Mahasiswa Polije",
        description: "Topi, jas lab, cattlepack, kacamata kerja, dll",
        price: 25000,
        unit: "PER_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Properti Tambahan Videografi untuk Internal Polije",
        description: "Topi, jas lab, cattlepack, kacamata kerja, dll",
        price: 50000,
        unit: "PER_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Sewa Properti Tambahan Videografi untuk Eksternal Polije",
        description: "Topi, jas lab, cattlepack, kacamata kerja, dll",
        price: 75000,
        unit: "PER_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Pelatihan Public Speaking untuk Mahasiswa Polije",
        price: 250000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Pelatihan Public Speaking untuk Internal Polije",
        price: 250000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Pelatihan Public Speaking untuk Eksternal Polije",
        price: 300000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Pelatihan Videografi Kesehatan untuk Mahasiswa Polije",
        price: 250000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Pelatihan Videografi Kesehatan untuk Internal Polije",
        price: 250000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Pelatihan Videografi Kesehatan untuk Eksternal Polije",
        price: 300000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Videografi untuk Mahasiswa Polije",
        description: "Syuting dan pengambilan gambar maksimal durasi 15 menit",
        price: 750000,
        unit: "PER_VIDEO" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Videografi untuk Internal Polije",
        description: "Syuting dan pengambilan gambar maksimal durasi 15 menit",
        price: 750000,
        unit: "PER_VIDEO" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Videografi untuk Eksternal Polije",
        description: "Syuting dan pengambilan gambar maksimal durasi 15 menit",
        price: 900000,
        unit: "PER_VIDEO" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Operator Drone untuk Mahasiswa Polije",
        price: 75000,
        unit: "PER_HOUR" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Operator Drone untuk Internal Polije",
        price: 100000,
        unit: "PER_HOUR" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Operator Drone untuk Eksternal Polije",
        price: 150000,
        unit: "PER_HOUR" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Talent untuk Mahasiswa Polije",
        price: 150000,
        unit: "PER_PERSON_2_HOURS" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Talent untuk Internal Polije",
        price: 200000,
        unit: "PER_PERSON_2_HOURS" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Talent untuk Eksternal Polije",
        price: 250000,
        unit: "PER_PERSON_2_HOURS" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Storyboard/Script untuk Mahasiswa Polije",
        price: 200000,
        unit: "PER_MATERIAL" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Storyboard/Script untuk Internal Polije",
        price: 200000,
        unit: "PER_MATERIAL" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Storyboard/Script untuk Eksternal Polije",
        price: 300000,
        unit: "PER_MATERIAL" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Feed Media Sosial untuk Mahasiswa Polije",
        price: 150000,
        unit: "PER_VIDEO" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Feed Media Sosial untuk Internal Polije",
        price: 150000,
        unit: "PER_VIDEO" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Feed Media Sosial untuk Eksternal Polije",
        price: 200000,
        unit: "PER_VIDEO" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Materi Publikasi untuk Mahasiswa Polije",
        price: 200000,
        unit: "PER_MATERIAL" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Materi Publikasi untuk Internal Polije",
        price: 200000,
        unit: "PER_MATERIAL" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Jasa Pembuatan Materi Publikasi untuk Eksternal Polije",
        price: 250000,
        unit: "PER_MATERIAL" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Jember untuk Mahasiswa Polije",
        description: "Contoh video pembelajaran, video penyuluhan, dll",
        price: 5000000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Jember untuk Internal Polije",
        description: "Contoh video pembelajaran, video penyuluhan, dll",
        price: 5000000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Jember untuk Eksternal Polije",
        description: "Contoh video pembelajaran, video penyuluhan, dll",
        price: 6000000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Non Jember untuk Mahasiswa Polije",
        price: 5000000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Non Jember untuk Internal Polije",
        price: 6000000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Non Jember untuk Eksternal Polije",
        price: 7000000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Jember untuk Mahasiswa Polije",
        price: 3000000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Jember untuk Internal Polije",
        price: 3000000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Jember untuk Eksternal Polije",
        price: 4000000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Non Jember untuk Mahasiswa Polije",
        price: 4000000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Non Jember untuk Internal Polije",
        price: 4000000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Non Jember untuk Eksternal Polije",
        price: 5000000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Live Streaming untuk Mahasiswa Polije",
        description: "Seminar, workshop, kuliah umum, dll",
        price: 3000000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Live Streaming untuk Internal Polije",
        description: "Seminar, workshop, kuliah umum, dll",
        price: 3000000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Video Live Streaming untuk Eksternal Polije",
        description: "Seminar, workshop, kuliah umum, dll",
        price: 3500000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Dokumentasi Acara/Liputan Acara Area Jember untuk Mahasiswa Polije",
        price: 2000000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Dokumentasi Acara/Liputan Acara Area Jember untuk Internal Polije",
        price: 2000000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Paket Pembuatan Dokumentasi Acara/Liputan Acara Area Jember untuk Eksternal Polije",
        price: 2500000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[8]!.id, // Laboratorium Videografi dan Film
      },
      {
        name: "Peminjaman Lab Komputer untuk Mahasiswa Polije",
        price: 500000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Peminjaman Lab Komputer untuk Internal Polije",
        price: 750000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Peminjaman Lab Komputer untuk Eksternal Polije",
        price: 1000000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Sewa PC Standar untuk Mahasiswa Polije",
        price: 50000,
        unit: "PER_PC_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Sewa PC Standar untuk Internal Polije",
        price: 75000,
        unit: "PER_PC_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Sewa PC Standar untuk Eksternal Polije",
        price: 100000,
        unit: "PER_PC_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Pelatihan Pembuatan Web Berbasis Wordpress",
        description:
          "Minimal 10 peserta. termasuk sertifikat, seminar kit, konsumsi dan ruangan.",
        price: 15000000,
        unit: "PER_PACKAGE" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Pelatihan Pemrograman HTML, CSS, Javascript",
        description:
          "Minimal 10 peserta. termasuk sertifikat, seminar kit, konsumsi dan ruangan.",
        price: 15000000,
        unit: "PER_PACKAGE" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Pelatihan Desain UI/UX",
        description:
          "Minimal 10 peserta. termasuk sertifikat, seminar kit, konsumsi dan ruangan.",
        price: 15000000,
        unit: "PER_PACKAGE" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Jasa Pembuatan Aplikasi Multimedia Interaktif untuk Mahasiswa Polije",
        price: 15000000,
        unit: "PER_PROTOTYPE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Jasa Pembuatan Aplikasi Multimedia Interaktif untuk Internal Polije",
        price: 15000000,
        unit: "PER_PROTOTYPE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Jasa Pembuatan Aplikasi Multimedia Interaktif untuk Eksternal Polije",
        price: 20000000,
        unit: "PER_PROTOTYPE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[9]!.id, // Laboratorium Komputer Promosi Kesehatan
      },
      {
        name: "Peminjaman Lab Multimedia Kesehatan untuk Mahasiswa Polije",
        price: 500000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Peminjaman Lab Multimedia Kesehatan untuk Internal Polije",
        price: 750000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Peminjaman Lab Multimedia Kesehatan untuk Eksternal Polije",
        price: 1000000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Sewa PC Multimedia + Editing untuk Mahasiswa Polije",
        price: 100000,
        unit: "PER_PC_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Sewa PC Multimedia + Editing untuk Internal Polije",
        price: 200000,
        unit: "PER_PC_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Sewa PC Multimedia + Editing untuk Eksternal Polije",
        price: 250000,
        unit: "PER_PC_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Pelatihan Pembuatan Animasi 2D/3D untuk Mahasiswa Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 200000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Pelatihan Pembuatan Animasi 2D/3D untuk Internal Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 250000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Pelatihan Pembuatan Animasi 2D/3D untuk Eksternal Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 300000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Pelatihan Editing Video untuk Mahasiswa Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 200000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Pelatihan Editing Video untuk Internal Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 250000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Pelatihan Editing Video untuk Eksternal Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 300000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Jasa Pembuatan Video Animasi untuk Mahasiswa Polije",
        price: 350000,
        unit: "PER_VIDEO" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Jasa Pembuatan Video Animasi untuk Internal Polije",
        price: 350000,
        unit: "PER_VIDEO" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Jasa Pembuatan Video Animasi untuk Eksternal Polije",
        price: 500000,
        unit: "PER_VIDEO" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Jasa Editing Video untuk Mahasiswa Polije",
        price: 150000,
        unit: "PER_VIDEO" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Jasa Editing Video untuk Internal Polije",
        price: 200000,
        unit: "PER_VIDEO" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Jasa Editing Video untuk Eksternal Polije",
        price: 250000,
        unit: "PER_VIDEO" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Jember untuk Mahasiswa Polije",
        description: "Contoh: video pembelajaran, video penyuluhan, dll",
        price: 6000000,
        unit: "PER_VIDEO" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Jember untuk Internal Polije",
        description: "Contoh: video pembelajaran, video penyuluhan, dll",
        price: 6000000,
        unit: "PER_VIDEO" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Jember untuk Eksternal Polije",
        description: "Contoh: video pembelajaran, video penyuluhan, dll",
        price: 7000000,
        unit: "PER_VIDEO" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Non Jember untuk Mahasiswa Polije",
        price: 8000000,
        unit: "PER_VIDEO" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Non Jember untuk Internal Polije",
        price: 8000000,
        unit: "PER_VIDEO" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Video Profil dan Video non Komersial Area Non Jember untuk Eksternal Polije",
        price: 9000000,
        unit: "PER_VIDEO" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Jember untuk Mahasiswa Polije",
        price: 4000000,
        unit: "PER_AD" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Jember untuk Internal Polije",
        price: 4000000,
        unit: "PER_AD" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Jember untuk Eksternal Polije",
        price: 5000000,
        unit: "PER_AD" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Non Jember untuk Mahasiswa Polije",
        price: 5000000,
        unit: "PER_AD" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Non Jember untuk Internal Polije",
        price: 5000000,
        unit: "PER_AD" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Iklan Kesehatan Area Non Jember untuk Eksternal Polije",
        price: 6000000,
        unit: "PER_AD" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Bumper Acara",
        price: 1000000,
        unit: "PER_VIDEO" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Paket Pembuatan Teaser Acara",
        price: 1500000,
        unit: "PER_VIDEO" as Unit,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[10]!.id, // Laboratorium Multimedia Kesehatan
      },
      {
        name: "Peminjaman Lab Desain Grafis untuk Mahasiswa Polije",
        price: 500000,
        unit: "PER_PACKAGE" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Peminjaman Lab Desain Grafis untuk Internal Polije",
        price: 750000,
        unit: "PER_PACKAGE" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Peminjaman Lab Desain Grafis untuk Eksternal Polije",
        price: 1000000,
        unit: "PER_PACKAGE" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Sewa PC Grafis + Editing untuk Mahasiswa Polije",
        price: 100000,
        unit: "PER_PC_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Sewa PC Grafis + Editing untuk Internal Polije",
        price: 200000,
        unit: "PER_PC_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Sewa PC Grafis + Editing untuk Eksternal Polije",
        price: 250000,
        unit: "PER_PC_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Pelatihan Desain Grafis untuk Mahasiswa Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 150000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Pelatihan Desain Grafis untuk Internal Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 200000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Pelatihan Desain Grafis untuk Eksternal Polije",
        description: "Durasi 3 jam, termasuk sertifikat",
        price: 250000,
        unit: "PER_PERSON_DAY" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Brosur/Leaflet untuk Mahasiswa Polije",
        price: 150000,
        unit: "PER_DESIGN" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Brosur/Leaflet untuk Internal Polije",
        price: 150000,
        unit: "PER_DESIGN" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Brosur/Leaflet untuk Eksternal Polije",
        price: 200000,
        unit: "PER_DESIGN" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Poster Kesehatan untuk Mahasiswa Polije",
        price: 150000,
        unit: "PER_DESIGN" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Poster Kesehatan untuk Internal Polije",
        price: 150000,
        unit: "PER_DESIGN" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Poster Kesehatan untuk Eksternal Polije",
        price: 200000,
        unit: "PER_DESIGN" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Infografis Kesehatan untuk Mahasiswa Polije",
        price: 250000,
        unit: "PER_DESIGN" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Infografis Kesehatan untuk Internal Polije",
        price: 250000,
        unit: "PER_DESIGN" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Infografis Kesehatan untuk Eksternal Polije",
        price: 350000,
        unit: "PER_DESIGN" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Desain Alat/Media tentang Promosi Kesehatan untuk Mahasiswa Polije",
        price: 500000,
        unit: "PER_DESIGN" as Unit,
        for: "STUDENT" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Desain Alat/Media tentang Promosi Kesehatan untuk Internal Polije",
        price: 500000,
        unit: "PER_DESIGN" as Unit,
        for: "INTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Jasa Pembuatan Desain Alat/Media tentang Promosi Kesehatan untuk Eksternal Polije",
        price: 750000,
        unit: "PER_DESIGN" as Unit,
        for: "EKSTERNAL" as ServiceFor,
        type: "SERVICE" as ServiceType,
        laboratoryId: createdLabs[11]!.id, // Laboratorium Desain Grafis Kesehatan
      },
      {
        name: "Ruangan Laboratorium untuk Kegiatan Penelitian Pengabdian",
        price: 100000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Timbangan digital",
        description: "Maksimal 30 responden",
        price: 15000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Microtoice",
        price: 20000,
        unit: "PER_MONTH" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Infantometer",
        price: 15000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Metline",
        price: 10000,
        unit: "PER_MONTH" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Pengukur Tinggi Lutut",
        price: 10000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman BIA Tanita, Omron",
        price: 25000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Sphygmometer",
        price: 25000,
        unit: "PER_MONTH" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Tensi Digital",
        price: 10000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Alat Ukur Lemak Omron HBF 306 Body Fat",
        price: 25000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Boneka Bayi",
        price: 10000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman HB Meter",
        price: 20000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Peminjaman Alat Pengecekan Gula Darah",
        price: 25000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[12]!.id, // Laboratorium Antropometri
      },
      {
        name: "Penyewaan Ruangan Laboratorium untuk Kegiatan Penelitian Pengabdian",
        price: 100000,
        unit: "PER_MONTH" as Unit,
        type: "RENT" as ServiceType,
        laboratoryId: createdLabs[13]!.id, // Laboratorium Pendidikan Gizi
      },
      {
        name: "Peminjaman Food Model",
        description: "Untuk 4 item",
        price: 20000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[13]!.id, // Laboratorium Pendidikan Gizi
      },
      {
        name: "Peminjaman Modul dan Alat Emo Demo",
        price: 25000,
        unit: "PER_MONTH" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[13]!.id, // Laboratorium Pendidikan Gizi
      },
      {
        name: "Peminjaman Buku Foto Makanan",
        price: 25000,
        unit: "PER_MONTH" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[13]!.id, // Laboratorium Pendidikan Gizi
      },
      {
        name: "Peminjaman alat K3",
        price: 150000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[14]!.id, // Laboratorium Rekam Medis Manual
      },
      {
        name: "Pelatihan pendampingan pembuatan formulir dan rekam medis pasien rawat inap, rawat jalan, IGD",
        price: 150000,
        unit: "PER_PERSON" as Unit,
        type: "TRAINING" as ServiceType,
        laboratoryId: createdLabs[14]!.id, // Laboratorium Rekam Medis Manual
      },
      {
        name: "Peminjaman Mannequin Besar",
        price: 100000,
        unit: "PER_DAY" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[15]!.id, // Laboratorium Anatomi Fisiologi
      },
      {
        name: "Peminjaman Mannequin Kecil",
        price: 50000,
        unit: "PER_DAY" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[15]!.id, // Laboratorium Anatomi Fisiologi
      },
      {
        name: "Peminjaman Alat Tanpa Sewa Laboratorium untuk 1 Alat",
        price: 50000,
        unit: "PER_WEEK" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[16]!.id, // Laboratorium Dietetik dan Kuliner
      },
      {
        name: "Sewa Komputer",
        price: 1000,
        unit: "PER_HOUR" as Unit,
        type: "LEND" as ServiceType,
        laboratoryId: createdLabs[17]!.id, // Laboratorium Analisis Data
      },
    ];

    for (const service of services) {
      const createdService = await prisma.service.create({
        data: service,
      });
      createdServices.push(createdService);
    }

    console.log("Services seeded successfully");
  } else {
    console.log("Skipping Services seeding due to insufficient data");
  }

  // Seed LaboratoryImages
  if (createdLabs.length > 2) {
    const laboratoryImages = [
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[0]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[1]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[1]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[1]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[1]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[1]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[2]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[2]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[2]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[2]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[2]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[3]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[3]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[3]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[3]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[3]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[4]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[4]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[4]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[4]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[4]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[5]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[5]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[5]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[5]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[5]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[6]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[6]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[6]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[6]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[6]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[7]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[7]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[7]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[7]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[7]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[8]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[8]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[8]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[8]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[8]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[9]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[9]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[9]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[9]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[9]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[10]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[10]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[10]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[10]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[10]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[11]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[11]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[11]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[11]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[11]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[12]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[12]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[12]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[12]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[12]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[13]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[13]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[13]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[13]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[13]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[14]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[14]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[14]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[14]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[14]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[15]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[15]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[15]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[15]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[15]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[16]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[16]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[16]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[16]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[16]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4XElYiHJkDOIl8YmBGWFEhMVPstf49UQSC1Ad",
        title: "Laboratory image",
        laboratoryId: createdLabs[17]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY45bzeboR0inEzw36YkJVyxqo9f1HW8IDhTl4j",
        title: "Laboratory image",
        laboratoryId: createdLabs[17]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4ljYAsMZT9GuhbT0y8RVcJf4MoxdKOeNvlFXP",
        title: "Laboratory image",
        laboratoryId: createdLabs[17]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4h2OQJgMvdebMkLlZ5Vci3Ey172KwqrPshIfz",
        title: "Laboratory image",
        laboratoryId: createdLabs[17]!.id,
      },
      {
        imageUrl:
          "https://utfs.io/f/P2oQLWYULKY4PjI1SwYULKY4sqwdBlrSk9DoWOHRpfzmZc8M",
        title: "Laboratory image",
        laboratoryId: createdLabs[17]!.id,
      },
    ];

    for (const image of laboratoryImages) {
      await prisma.laboratoryImage.create({ data: image });
    }

    console.log("LaboratoryImages seeded successfully");
  } else {
    console.log("Skipping LaboratoryImages seeding due to insufficient data");
  }

  // Seed LaboratoryManagers
  if (createdLabs.length > 2) {
    const laboratoryManagers = [
      {
        userId: createdUsers.find((u) => u.role === "KEPALA_LAB")!.id,
        laboratoryId: createdLabs[0]!.id,
      },
      {
        userId: createdUsers.find((u) => u.role === "KEPALA_LAB")!.id,
        laboratoryId: createdLabs[1]!.id,
      },
      {
        userId: createdUsers.find((u) => u.role === "KEPALA_LAB")!.id,
        laboratoryId: createdLabs[2]!.id,
      },
    ];

    for (const manager of laboratoryManagers) {
      await prisma.laboratoryManager.create({ data: manager });
    }

    console.log("LaboratoryManagers seeded successfully");
  } else {
    console.log("Skipping LaboratoryManagers seeding due to insufficient data");
  }

  // Seed ResearchPortfolios
  const createdPortfolios = [];
  if (createdLabs.length > 11) {
    const researchPortfolios = [
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4llowb3T9GuhbT0y8RVcJf4MoxdKOeNvlFXPA",
        title: "Nutritional Analysis of Traditional Indonesian Foods",
        slug: "nutritional-analysis-of-traditional-indonesian-foods",
        abstract:
          "This research focuses on the nutritional analysis of traditional Indonesian dishes to evaluate their contribution to daily nutritional intake, with a detailed study on macronutrients and micronutrients across various regions.",
        content: `
        {"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstrak"}]},{"type":"paragraph","content":[{"type":"text","text":"Makanan tradisional Indonesia, yang dikenal dengan keragamannya yang kaya dan signifikansi budaya, memainkan peran penting dalam pola makan jutaan orang. Penelitian ini berfokus pada analisis nutrisi beberapa hidangan tradisional Indonesia untuk menilai kontribusinya terhadap asupan nutrisi harian. Studi ini mengevaluasi makronutrien dan mikronutrien dalam hidangan dari berbagai daerah, memberikan wawasan tentang manfaat kesehatannya serta potensi kekurangan gizi."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pendahuluan"}]},{"type":"paragraph","content":[{"type":"text","text":"Indonesia, dengan ribuan pulau dan berbagai suku bangsa, memiliki kekayaan ragam makanan tradisional dengan bahan dan metode memasak yang unik. Meskipun populer, kandungan gizi dari hidangan-hidangan ini masih belum banyak didokumentasikan. Memahami komposisi nutrisi penting untuk mendorong kebiasaan makan yang sehat dan mengatasi masalah malnutrisi. Penelitian ini bertujuan mengisi kesenjangan tersebut dengan memberikan analisis komprehensif tentang makanan tradisional Indonesia, khususnya kandungan makro dan mikronutriennya."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Material dan Metode"}]},{"type":"paragraph","content":[{"type":"text","text":"Sampel hidangan tradisional, termasuk Gado-Gado, Rendang, dan Soto, dikumpulkan dari berbagai daerah di Indonesia. Analisis nutrisi dilakukan di Laboratorium Analis Zat Gizi di Politeknik Negeri Jember dengan menggunakan metode standar. Kandungan makronutrien, seperti karbohidrat, protein, dan lemak, diukur menggunakan analisis proksimat, sedangkan mikronutrien, seperti vitamin dan mineral, dianalisis menggunakan teknik HPLC dan AAS."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Hasil dan Pembahasan"}]},{"type":"paragraph","content":[{"type":"text","text":"Analisis mengungkapkan bahwa makanan tradisional Indonesia umumnya kaya akan karbohidrat dan lemak, dengan kandungan protein yang bervariasi tergantung pada hidangan. Misalnya, Rendang, hidangan berbahan dasar daging sapi dan santan, ditemukan memiliki kadar lemak jenuh dan kalori yang tinggi, sedangkan Gado-Gado, salad sayuran dengan saus kacang, memberikan asupan protein, lemak, dan karbohidrat yang seimbang. Analisis mikronutrien menunjukkan bahwa hidangan ini merupakan sumber vitamin A dan C yang baik, namun beberapa, seperti Soto, rendah akan mineral esensial seperti zat besi dan seng. Temuan ini menyoroti perlunya diversifikasi makanan dan strategi fortifikasi untuk mengatasi potensi kekurangan gizi."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Kesimpulan"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini memberikan wawasan berharga tentang kandungan nutrisi makanan tradisional Indonesia, menawarkan panduan bagi konsumen dan profesional kesehatan. Meskipun hidangan ini berkontribusi secara signifikan terhadap asupan energi dan beberapa nutrisi, diperlukan edukasi untuk menyeimbangkan makanan ini dengan pilihan lain yang kaya nutrisi. Penelitian lebih lanjut perlu mengeksplorasi dampak metode memasak terhadap retensi nutrisi dan menyelidiki makanan tradisional dari daerah lain di Indonesia."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Referensi"}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Soekirman, et al. (2007). Nutritional Values of Indonesian Foods. "},{"type":"text","marks":[{"type":"italic"}],"text":"Ministry of Health, Indonesia"},{"type":"text","text":"."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Widya, S. P., & Fatimah, D. (2015). Nutrient Analysis of Traditional Foods in Java. "},{"type":"text","marks":[{"type":"italic"}],"text":"Journal of Indonesian Nutrition"},{"type":"text","text":", 12(3), 45-60."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Winarno, F. G. (1997). "},{"type":"text","marks":[{"type":"italic"}],"text":"Food and Nutrition in Indonesia"},{"type":"text","text":". Jakarta: Gramedia Pustaka Utama."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Artikel ini menyoroti pentingnya memahami kandungan nutrisi dari makanan tradisional Indonesia, serta potensi manfaat dan kekurangan yang mungkin muncul, untuk mendukung pola makan sehat dalam masyarakat."}]}]}`,
        publishedDate: new Date("2023-06-12"),
        researchLocation:
          "Laboratorium Analis Zat Gizi, Politeknik Negeri Jember",
        researchDate: new Date("2022-12-01"),
        correspondenceEmail: "researcher3@polije.ac.id",
        studyProgram: "Nutritional Science",
        laboratoryId: createdLabs[6]!.id,
        doi: "10.1234/example-doi-3",
        type: "RESEARCH" as PortfolioType,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4urXWUlBc9YOk6qKpDnysvCNThiEURoVeA1H8",
        title: "Clinical Procedure Simulation in Nursing Education",
        slug: "clinical-procedure-simulation-in-nursing-education",
        abstract:
          "This research examines the effectiveness of clinical procedure simulations in nursing education, focusing on the impact of simulation-based learning on students' clinical competencies and decision-making abilities.",
        content: `
        {"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstrak"}]},{"type":"paragraph","content":[{"type":"text","text":"Simulasi klinis telah menjadi komponen penting dalam pendidikan keperawatan, memungkinkan mahasiswa untuk berlatih keterampilan klinis dalam lingkungan yang terkendali dan aman. Penelitian ini mengevaluasi efektivitas simulasi prosedur klinis dalam meningkatkan kompetensi mahasiswa keperawatan di Politeknik Negeri Jember. Studi ini mengukur dampak pembelajaran berbasis simulasi terhadap kepercayaan diri, kemampuan pengambilan keputusan, dan kinerja klinis secara keseluruhan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pendahuluan"}]},{"type":"paragraph","content":[{"type":"text","text":"Pendidikan keperawatan secara tradisional mengandalkan penempatan klinis di rumah sakit dan fasilitas kesehatan untuk memberikan pengalaman langsung kepada mahasiswa. Namun, kompleksitas yang meningkat dalam sistem kesehatan, ditambah dengan terbatasnya kesempatan penempatan, telah mendorong adopsi simulasi klinis sebagai metode alternatif untuk mengembangkan kompetensi klinis. Penelitian ini bertujuan untuk menilai efektivitas simulasi dalam meningkatkan keterampilan praktis dan pengetahuan teoretis mahasiswa keperawatan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Material dan Metode"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini dilakukan di Laboratorium Klinis dan Reimbursement Politeknik Negeri Jember, di mana serangkaian simulasi klinis dirancang untuk mereplikasi skenario dunia nyata. Partisipan adalah mahasiswa keperawatan tahun akhir yang dibagi menjadi dua kelompok: satu kelompok menerima pelatihan klinis tradisional, sementara kelompok lainnya mengikuti pembelajaran berbasis simulasi. Simulasi mencakup berbagai prosedur, seperti perawatan luka, terapi intravena, dan respons darurat. Penilaian sebelum dan sesudah simulasi dilakukan untuk mengukur perubahan dalam kepercayaan diri, pengambilan keputusan, dan keterampilan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Hasil Penelitian"}]},{"type":"paragraph","content":[{"type":"text","text":"Hasil penelitian menunjukkan bahwa mahasiswa yang mengikuti pembelajaran berbasis simulasi mengalami peningkatan keterampilan klinis yang signifikan dibandingkan dengan mereka yang menerima pelatihan tradisional. Kelompok simulasi menunjukkan tingkat kepercayaan diri yang lebih tinggi dalam melakukan prosedur, terutama dalam skenario tekanan tinggi seperti perawatan darurat. Selain itu, kemampuan pengambilan keputusan mahasiswa dalam kelompok simulasi juga meningkat, karena mereka mampu menerapkan pengetahuan teoretis secara lebih efektif dalam lingkungan klinis yang disimulasikan. Penelitian ini juga menemukan bahwa paparan berulang terhadap simulasi membantu memperkuat pembelajaran dan mengurangi kecemasan, yang pada akhirnya meningkatkan kinerja secara keseluruhan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pembahasan"}]},{"type":"paragraph","content":[{"type":"text","text":"Hasil penelitian ini mendukung bukti yang berkembang bahwa simulasi klinis merupakan alat yang berharga dalam pendidikan keperawatan. Dengan menyediakan lingkungan yang realistis dan terkendali, simulasi memungkinkan mahasiswa untuk berlatih dan menyempurnakan keterampilan mereka tanpa risiko bagi pasien. Penggunaan mannequin fidelity tinggi dan pelatihan berbasis skenario memungkinkan mahasiswa mengalami berbagai situasi klinis yang mungkin tidak dapat dilakukan selama penempatan tradisional. Namun, penelitian ini juga menekankan pentingnya pendekatan yang seimbang, yang menggabungkan simulasi dan pengalaman klinis dunia nyata untuk memastikan pelatihan yang komprehensif."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Kesimpulan"}]},{"type":"paragraph","content":[{"type":"text","text":"Simulasi klinis merupakan metode yang efektif untuk meningkatkan kompetensi klinis mahasiswa keperawatan. Penelitian ini menunjukkan bahwa pembelajaran berbasis simulasi tidak hanya meningkatkan keterampilan praktis tetapi juga meningkatkan kepercayaan diri dan kemampuan pengambilan keputusan. Dengan meningkatnya permintaan terhadap perawat yang terampil, mengintegrasikan simulasi ke dalam kurikulum keperawatan dapat membantu mempersiapkan mahasiswa untuk tantangan dalam sistem kesehatan modern. Studi lanjutan harus mengeksplorasi dampak jangka panjang simulasi terhadap praktik klinis dan hasil pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Referensi"}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Jeffries, P. R. (2005). "},{"type":"text","marks":[{"type":"italic"}],"text":"A Framework for Designing, Implementing, and Evaluating Simulations Used as Teaching Strategies in Nursing"},{"type":"text","text":". "},{"type":"text","marks":[{"type":"italic"}],"text":"Nursing Education Perspectives"},{"type":"text","text":", 26(2), 96-103."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Hayden, J. K., et al. (2014). "},{"type":"text","marks":[{"type":"italic"}],"text":"The NCSBN National Simulation Study: A Longitudinal, Randomized, Controlled Study Replacing Clinical Hours with Simulation in Prelicensure Nursing Education"},{"type":"text","text":". "},{"type":"text","marks":[{"type":"italic"}],"text":"Journal of Nursing Regulation"},{"type":"text","text":", 5(2), S3-S40."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Cant, R. P., & Cooper, S. J. (2010). "},{"type":"text","marks":[{"type":"italic"}],"text":"Simulation-Based Learning in Nurse Education: Systematic Review"},{"type":"text","text":". "},{"type":"text","marks":[{"type":"italic"}],"text":"Journal of Advanced Nursing"},{"type":"text","text":", 66(1), 3-15."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Artikel ini menggambarkan peran penting simulasi klinis dalam meningkatkan keterampilan mahasiswa keperawatan, dengan fokus pada dampaknya terhadap kepercayaan diri, kemampuan pengambilan keputusan, dan peningkatan kinerja klinis secara keseluruhan."}]}]}
        `,
        publishedDate: new Date("2023-05-10"),
        researchLocation:
          "Laboratorium Klinis dan Reimbursement, Politeknik Negeri Jember",
        researchDate: new Date("2022-11-20"),
        correspondenceEmail: "researcher4@polije.ac.id",
        studyProgram: "Nursing",
        laboratoryId: createdLabs[2]!.id,
        doi: "10.1234/example-doi-4",
        type: "RESEARCH" as PortfolioType,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4vLgYnrzcrFM8uBgRKNjlxnwDVI5aeL7YqkJo",
        title: "Biometric Analysis for Ergonomic Design in Workspaces",
        slug: "biometric-analysis-for-ergonomic-design-in-workspaces",
        abstract:
          "This study applies biometric analysis to assess and improve ergonomic design in workspaces, aiming to develop guidelines for ergonomic furniture and layouts that accommodate diverse populations.",
        content: `
        {"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstrak"}]},{"type":"paragraph","content":[{"type":"text","text":"Desain ergonomis sangat penting dalam menciptakan ruang kerja yang mendukung kenyamanan, efisiensi, dan kesehatan. Penelitian ini menerapkan analisis biometrik untuk mengevaluasi dan memperbaiki desain ergonomis di berbagai lingkungan ruang kerja. Dengan menganalisis pengukuran tubuh dan data postur, penelitian ini bertujuan untuk mengembangkan pedoman dalam merancang furnitur dan tata letak ergonomis yang dapat mengakomodasi berbagai pengguna."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pendahuluan"}]},{"type":"paragraph","content":[{"type":"text","text":"Dalam lingkungan kerja modern, desain ergonomis berperan penting dalam meningkatkan produktivitas dan mengurangi risiko gangguan muskuloskeletal. Namun, pendekatan desain tradisional sering kali gagal mempertimbangkan variasi ukuran dan bentuk tubuh manusia. Penelitian ini berusaha menjembatani kesenjangan tersebut dengan menggunakan data biometrik untuk memandu desain ergonomis, memastikan bahwa ruang kerja disesuaikan dengan kebutuhan populasi yang beragam."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Material dan Metode"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini dilakukan di Laboratorium Antropometri Politeknik Negeri Jember dengan melibatkan 200 partisipan yang mewakili populasi yang beragam. Pengukuran tubuh secara rinci, termasuk tinggi badan, berat badan, panjang anggota tubuh, dan sudut sendi, dikumpulkan menggunakan alat antropometri canggih. Analisis postur dilakukan menggunakan teknologi motion capture untuk menilai postur terkait pekerjaan. Data yang dikumpulkan kemudian dianalisis untuk mengidentifikasi tren dan outlier, yang menjadi dasar dalam pengembangan pedoman desain ergonomis."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Hasil Penelitian"}]},{"type":"paragraph","content":[{"type":"text","text":"Analisis biometrik menunjukkan adanya variasi signifikan dalam dimensi tubuh partisipan, terutama dalam panjang anggota tubuh dan fleksibilitas sendi. Perbedaan ini menunjukkan pentingnya furnitur yang dapat disesuaikan, seperti kursi dengan ketinggian tempat duduk dan sandaran yang dapat diatur. Analisis postur mengidentifikasi beberapa faktor risiko untuk ketegangan muskuloskeletal, termasuk duduk terlalu lama dan postur yang tidak nyaman. Berdasarkan temuan ini, penelitian ini mengusulkan pedoman ergonomis, termasuk rekomendasi tentang ketinggian meja, desain kursi, dan tata letak ruang kerja yang dapat meminimalkan ketegangan dan meningkatkan kenyamanan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pembahasan"}]},{"type":"paragraph","content":[{"type":"text","text":"Hasil penelitian ini menekankan pentingnya memasukkan data biometrik ke dalam proses desain ergonomis. Dengan memahami karakteristik fisik pengguna, desainer dapat menciptakan ruang kerja yang tidak hanya nyaman tetapi juga aman dan efisien. Penelitian ini juga menunjukkan bahwa intervensi ergonomis, seperti furnitur yang dapat disesuaikan dan tata letak ruang kerja yang tepat, dapat secara signifikan mengurangi risiko cedera terkait pekerjaan. Namun, penelitian ini juga menggarisbawahi perlunya pemantauan dan penyesuaian ruang kerja secara berkelanjutan untuk mengakomodasi perubahan kebutuhan dan preferensi pengguna."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Kesimpulan"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini menunjukkan nilai penting analisis biometrik dalam mengembangkan ruang kerja ergonomis yang sesuai untuk populasi yang beragam. Pedoman yang diusulkan dalam studi ini menawarkan solusi praktis untuk meningkatkan kenyamanan dan mengurangi risiko cedera di berbagai lingkungan kerja. Penelitian di masa depan harus mengeksplorasi integrasi data biometrik dengan teknologi yang sedang berkembang, seperti realitas virtual, untuk lebih meningkatkan praktik desain ergonomis."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Referensi"}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Pheasant, S., & Haslegrave, C. M. (2006). "},{"type":"text","marks":[{"type":"italic"}],"text":"Bodyspace: Anthropometry, Ergonomics and the Design of Work"},{"type":"text","text":". CRC Press."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Helander, M. G. (2006). "},{"type":"text","marks":[{"type":"italic"}],"text":"A Guide to the Ergonomics of Manufacturing"},{"type":"text","text":". CRC Press."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Straker, L., et al. (2013). "},{"type":"text","marks":[{"type":"italic"}],"text":"Evaluation of Ergonomic and Biometric Factors in Office Workstations"},{"type":"text","text":". Ergonomics, 56(2), 293-305."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Artikel ini menyajikan pendekatan berbasis data biometrik dalam desain ergonomis untuk ruang kerja, menekankan pentingnya menyesuaikan desain dengan karakteristik fisik yang berbeda guna menciptakan lingkungan kerja yang lebih sehat dan nyaman."}]},{"type":"paragraph","content":[{"type":"text","text":"4o"}]}]}
        `,
        publishedDate: new Date("2023-04-18"),
        researchLocation: "Laboratorium Antropometri, Politeknik Negeri Jember",
        researchDate: new Date("2022-09-25"),
        correspondenceEmail: "researcher5@polije.ac.id",
        studyProgram: "Industrial Design",
        laboratoryId: createdLabs[12]!.id,
        doi: "10.1234/example-doi-5",
        type: "RESEARCH" as PortfolioType,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4Vhucna5edEpMCLvjIRyQb7Sc48mngsTwPAzB",
        title:
          "Enhancing Cybersecurity Education through Virtual Lab Environments",
        slug: "enhancing-cybersecurity-education-through-virtual-lab-environments",
        abstract:
          "This research explores the development and implementation of virtual lab environments for cybersecurity education, focusing on enhancing students' practical skills and readiness for real-world challenges.",
        content: `
        {"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstrak"}]},{"type":"paragraph","content":[{"type":"text","text":"Seiring dengan berkembangnya ancaman keamanan siber, permintaan terhadap profesional yang terlatih dalam melindungi aset digital terus meningkat. Pendidikan berbasis kelas tradisional seringkali kurang memberikan pengalaman langsung menghadapi tantangan keamanan dunia nyata. Penelitian ini mengeksplorasi pengembangan dan implementasi lingkungan laboratorium virtual yang dirancang untuk meningkatkan pendidikan keamanan siber. Dengan mensimulasikan berbagai skenario serangan dan pertahanan siber, laboratorium virtual ini memungkinkan siswa untuk mendapatkan pengalaman praktis dalam lingkungan yang terkendali dan aman, sehingga meningkatkan kesiapan mereka untuk peran di dunia nyata."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pendahuluan"}]},{"type":"paragraph","content":[{"type":"text","text":"Bidang keamanan siber berkembang pesat, didorong oleh peningkatan jumlah dan kompleksitas ancaman siber. Mendidik generasi profesional keamanan siber berikutnya membutuhkan lebih dari sekadar pengetahuan teoretis; diperlukan pengalaman langsung dengan alat, teknik, dan strategi yang digunakan untuk melawan serangan siber. Program ilmu komputer tradisional sering kali tidak memiliki sumber daya untuk memberikan pengalaman semacam itu dalam lingkungan yang bebas risiko. Lingkungan laboratorium virtual, yang meniru konfigurasi jaringan dan sistem dunia nyata, menawarkan solusi menjanjikan dengan memungkinkan siswa terlibat dalam latihan keamanan siber yang realistis tanpa risiko yang terkait."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Material dan Metode"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini dilakukan di Laboratorium Komputer Politeknik Negeri Jember, di mana lingkungan laboratorium virtual dikembangkan menggunakan alat virtualisasi open-source seperti VirtualBox dan VMWare. Lingkungan laboratorium ini mencakup jaringan, server, dan mesin klien yang disimulasikan, yang dikonfigurasi untuk meniru infrastruktur TI organisasi. Latihan keamanan siber dirancang untuk mencakup berbagai aspek keamanan jaringan, termasuk konfigurasi firewall, deteksi intrusi, analisis malware, dan peretasan etis. Siswa berpartisipasi dalam latihan ini sebagai bagian dari kurikulum keamanan siber mereka, dan kinerja mereka dievaluasi berdasarkan kemampuan mereka dalam mengidentifikasi, merespons, dan mengurangi ancaman siber yang disimulasikan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Hasil Penelitian"}]},{"type":"paragraph","content":[{"type":"text","text":"Implementasi lingkungan laboratorium virtual menghasilkan peningkatan yang signifikan dalam hasil pembelajaran siswa. Siswa melaporkan pemahaman yang lebih mendalam tentang konsep keamanan siber dan peningkatan kepercayaan diri dalam menerapkan konsep-konsep tersebut dalam praktik. Penilaian kinerja menunjukkan bahwa siswa yang berpartisipasi dalam latihan laboratorium virtual lebih siap menghadapi tantangan keamanan siber dunia nyata dibandingkan dengan mereka yang menerima instruksi berbasis ceramah tradisional. Laboratorium virtual juga memungkinkan eksplorasi topik lanjutan seperti pengujian penetrasi dan respons insiden, yang sulit dilakukan di lingkungan jaringan nyata karena kekhawatiran keamanan dan etika."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pembahasan"}]},{"type":"paragraph","content":[{"type":"text","text":"Temuan penelitian ini menunjukkan bahwa lingkungan laboratorium virtual adalah alat yang efektif untuk meningkatkan pendidikan keamanan siber. Dengan memberikan pengalaman belajar langsung dan imersif, laboratorium ini menjembatani kesenjangan antara teori dan praktik, mempersiapkan siswa untuk kompleksitas pekerjaan keamanan siber di dunia nyata. Fleksibilitas laboratorium virtual memungkinkan pendidik untuk merancang latihan yang disesuaikan dengan tujuan pembelajaran khusus kursus mereka, serta menyesuaikan dengan berbagai tingkat keterampilan siswa. Selain itu, pendekatan laboratorium virtual dapat diskalakan dan diadaptasi ke area lain dalam pendidikan ilmu komputer, seperti pengembangan perangkat lunak dan administrasi jaringan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Kesimpulan"}]},{"type":"paragraph","content":[{"type":"text","text":"Lingkungan laboratorium virtual merupakan alat pedagogis yang kuat untuk pendidikan keamanan siber, memberikan siswa kesempatan untuk mengembangkan dan mengasah keterampilan mereka dalam pengaturan yang realistis namun terkendali. Penelitian ini menunjukkan bahwa lingkungan semacam itu tidak hanya meningkatkan keterlibatan dan pemahaman siswa, tetapi juga meningkatkan kesiapan mereka untuk berkarir di bidang keamanan siber. Penelitian di masa depan harus mengeksplorasi integrasi teknologi yang sedang berkembang, seperti komputasi awan dan kecerdasan buatan, ke dalam laboratorium virtual untuk semakin memperkaya pengalaman pendidikan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Referensi"}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bishop, M. (2005). "},{"type":"text","marks":[{"type":"italic"}],"text":"Introduction to Computer Security"},{"type":"text","text":". Addison-Wesley Professional."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bratus, S., et al. (2010). "},{"type":"text","marks":[{"type":"italic"}],"text":"The Art of War: Offensive Security from the Perspective of Computer Science"},{"type":"text","text":". Proceedings of the ACM Workshop on Offensive Technologies (WOOT)."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Olalere, M., et al. (2015). "},{"type":"text","marks":[{"type":"italic"}],"text":"Cybersecurity Education in Developing Nations: A Case Study of Nigeria"},{"type":"text","text":". Journal of Information Security Education, 10(1), 45-62."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Artikel ini memberikan wawasan mengenai bagaimana laboratorium virtual dapat digunakan sebagai solusi praktis untuk meningkatkan pendidikan keamanan siber di lingkungan akademis. Dengan pendekatan ini, para siswa mendapatkan keterampilan yang diperlukan untuk menghadapi ancaman keamanan dunia nyata di masa depan."}]}]}
        `,
        publishedDate: new Date("2023-07-15"),
        researchLocation: "Laboratorium Komputer, Politeknik Negeri Jember",
        researchDate: new Date("2023-03-01"),
        correspondenceEmail: "researcher6@polije.ac.id",
        studyProgram: "Computer Science",
        laboratoryId: createdLabs[0]!.id,
        doi: "10.1234/example-doi-6",
        type: "RESEARCH" as PortfolioType,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4EijSzxDKvWbp7kPZMHS2OcT5r8m4BjwsdxVe",
        title:
          "Implementing Health Management Information Systems: Challenges and Solutions",
        slug: "implementing-health-management-information-systems",
        abstract:
          "This research investigates the implementation of Health Management Information Systems (HMIS), focusing on the challenges faced and the solutions adopted to improve healthcare delivery and management.",
        content: `
        {"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstrak"}]},{"type":"paragraph","content":[{"type":"text","text":"Sistem Informasi Manajemen Kesehatan (HMIS) telah menjadi komponen penting dalam kesehatan modern, menyediakan alat esensial untuk pengelolaan data pasien, pemantauan layanan kesehatan, serta mendukung proses pengambilan keputusan. Penelitian ini mengeksplorasi implementasi HMIS di berbagai pengaturan layanan kesehatan, menyoroti tantangan yang dihadapi dan solusi yang dikembangkan untuk meningkatkan efektivitas dan efisiensi sistem tersebut."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pendahuluan"}]},{"type":"paragraph","content":[{"type":"text","text":"Integrasi teknologi informasi dalam layanan kesehatan telah merevolusi cara layanan kesehatan disampaikan dan dikelola. HMIS memungkinkan penyedia layanan kesehatan untuk menyimpan, mengambil, dan menganalisis data pasien, yang berujung pada peningkatan hasil pasien dan penyampaian layanan kesehatan yang lebih efisien. Namun, implementasi HMIS tidak terlepas dari tantangan, terutama di negara dengan keterbatasan sumber daya. Penelitian ini bertujuan mengidentifikasi tantangan utama dalam implementasi HMIS dan mengeksplorasi strategi yang digunakan untuk mengatasi hambatan tersebut."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Material dan Metode"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini dilakukan di berbagai fasilitas kesehatan di Indonesia, termasuk rumah sakit pemerintah, klinik swasta, dan puskesmas. Data dikumpulkan melalui wawancara dengan profesional kesehatan, staf IT, dan vendor HMIS. Proses implementasi dianalisis dalam hal desain sistem, pelatihan pengguna, migrasi data, serta integrasi dengan alur kerja layanan kesehatan yang ada. Selain itu, studi ini juga memeriksa peran kebijakan dan regulasi pemerintah dalam mendorong adopsi HMIS."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Hasil Penelitian"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini mengidentifikasi beberapa tantangan dalam implementasi HMIS, termasuk keterbatasan infrastruktur IT, resistensi terhadap perubahan di kalangan staf kesehatan, serta kekhawatiran tentang privasi dan keamanan data. Meskipun demikian, implementasi yang berhasil dicapai di banyak fasilitas melalui kombinasi strategi seperti implementasi bertahap, pelatihan pengguna yang intensif, dan pengembangan antarmuka yang ramah pengguna. Selain itu, kepemimpinan yang kuat dan dukungan dari administrator layanan kesehatan ditemukan sebagai faktor kunci dalam mendorong adopsi HMIS."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pembahasan"}]},{"type":"paragraph","content":[{"type":"text","text":"Temuan ini menyoroti pentingnya mengatasi faktor teknis dan manusia dalam implementasi HMIS. Meskipun teknologi merupakan penggerak utama manajemen kesehatan yang efektif, kesuksesan HMIS juga bergantung pada kesediaan tenaga kesehatan untuk menerima sistem dan proses baru. Studi ini menyarankan bahwa dukungan dan pelatihan yang berkelanjutan sangat penting agar HMIS dapat terintegrasi sepenuhnya dalam operasi harian layanan kesehatan. Selain itu, kerangka tata kelola data yang kuat diperlukan untuk melindungi informasi pasien dan mempertahankan kepercayaan terhadap sistem."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Kesimpulan"}]},{"type":"paragraph","content":[{"type":"text","text":"Implementasi Sistem Informasi Manajemen Kesehatan menghadirkan tantangan sekaligus peluang. Penelitian ini menunjukkan bahwa dengan strategi yang tepat, hambatan dalam adopsi HMIS dapat diatasi, yang pada akhirnya akan meningkatkan penyampaian dan manajemen layanan kesehatan secara signifikan. Penelitian masa depan harus fokus pada evaluasi dampak jangka panjang HMIS terhadap perawatan pasien dan mengeksplorasi potensi teknologi yang sedang berkembang, seperti kecerdasan buatan (AI) dan analitik big data, untuk lebih meningkatkan manajemen kesehatan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Referensi"}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"WHO. (2019). Health Management Information Systems: A Guide to Design and Implementation. "},{"type":"text","marks":[{"type":"italic"}],"text":"World Health Organization"},{"type":"text","text":"."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Iyer, P. (2017). Challenges in Health Information System Implementation in Developing Countries. "},{"type":"text","marks":[{"type":"italic"}],"text":"Journal of Health Informatics"},{"type":"text","text":", 10(2), 67-79."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Khoumbati, K., Themistocleous, M., & Irani, Z. (2006). Evaluating the Adoption of Health Management Information Systems in Developing Countries. "},{"type":"text","marks":[{"type":"italic"}],"text":"Journal of Information Technology for Development"},{"type":"text","text":", 12(3), 175-188."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Artikel ini memberikan gambaran jelas tentang penerapan HMIS di Indonesia, tantangan yang ditemui, serta solusi yang digunakan untuk meningkatkan efektivitas sistem ini dalam lingkungan kesehatan yang dinamis."}]}]}
        `,
        publishedDate: new Date("2023-09-01"),
        researchLocation:
          "Laboratorium Sistem Informasi Kesehatan, Universitas Negeri XYZ",
        researchDate: new Date("2023-05-15"),
        correspondenceEmail: "researcher7@xyzuniversity.ac.id",
        studyProgram: "Health Informatics",
        laboratoryId: createdLabs[0]!.id,
        doi: "10.1234/example-doi-7",
        type: "RESEARCH" as PortfolioType,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4pfxKR8y6UkpQueJC1Y970hXxfEzHsNVt6P4a",
        title:
          "Digital Transformation in Public Health: A Comprehensive Review",
        slug: "digital-transformation-in-public-health",
        abstract:
          "This study reviews the impact of digital transformation on public health systems, exploring how technology is reshaping healthcare delivery and outcomes.",
        content: `
        {"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstrak"}]},{"type":"paragraph","content":[{"type":"text","text":"Perkembangan teknologi digital yang pesat telah berdampak signifikan pada berbagai sektor, termasuk kesehatan masyarakat. Penelitian ini memberikan tinjauan komprehensif tentang transformasi digital dalam kesehatan masyarakat, mengevaluasi dampaknya terhadap layanan kesehatan, keterlibatan pasien, dan hasil kesehatan. Studi ini juga mengidentifikasi faktor kunci yang mendorong adopsi teknologi digital serta tantangan yang dihadapi oleh institusi kesehatan masyarakat dalam mengimplementasikan teknologi ini."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pendahuluan"}]},{"type":"paragraph","content":[{"type":"text","text":"Transformasi digital mengacu pada integrasi teknologi digital ke dalam semua aspek operasional organisasi, secara mendasar mengubah cara mereka beroperasi dan memberikan nilai. Dalam kesehatan masyarakat, transformasi digital telah memunculkan alat dan sistem baru yang meningkatkan pengawasan penyakit, komunikasi kesehatan, serta perawatan pasien. Namun, proses adopsi digital sangat kompleks dan bervariasi secara signifikan di berbagai wilayah dan sistem kesehatan. Studi ini bertujuan memberikan gambaran umum tentang kondisi terkini transformasi digital dalam kesehatan masyarakat, dengan menyoroti manfaat dan tantangan yang terkait."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Material dan Metode"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini melibatkan tinjauan sistematis terhadap literatur akademis, laporan pemerintah, dan studi kasus yang terkait dengan transformasi digital dalam kesehatan masyarakat. Data dianalisis untuk mengidentifikasi tema umum, faktor kesuksesan, serta hambatan dalam adopsi digital. Tinjauan difokuskan pada area utama seperti rekam medis elektronik (EHR), telemedicine, aplikasi kesehatan mobile (mHealth), dan analitik data dalam kesehatan masyarakat."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Hasil Penelitian"}]},{"type":"paragraph","content":[{"type":"text","text":"Hasil tinjauan menunjukkan bahwa transformasi digital telah membawa peningkatan signifikan dalam hasil kesehatan masyarakat, terutama dalam pencegahan penyakit, pemantauan kesehatan, dan keterlibatan pasien. EHR telah mempercepat pengelolaan data pasien, sehingga memudahkan penyedia layanan kesehatan untuk mengakses dan berbagi informasi. Telemedicine memperluas akses terhadap layanan kesehatan, terutama di daerah terpencil dan kurang terlayani. Aplikasi mHealth memberdayakan pasien untuk lebih mengendalikan kesehatannya melalui alat-alat seperti pelacak kebugaran dan pengingat obat. Namun, penelitian ini juga menemukan beberapa tantangan, termasuk masalah privasi data, kesenjangan digital, serta kebutuhan akan pelatihan dan dukungan berkelanjutan bagi tenaga kesehatan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pembahasan"}]},{"type":"paragraph","content":[{"type":"text","text":"Temuan penelitian ini menunjukkan bahwa meskipun transformasi digital memiliki potensi untuk merevolusi kesehatan masyarakat, kesuksesannya bergantung pada beberapa faktor. Ini termasuk ketersediaan infrastruktur yang andal, pengembangan teknologi yang ramah pengguna, serta pembentukan kerangka regulasi yang jelas untuk melindungi data pasien. Penelitian ini juga menyoroti pentingnya mengatasi kesenjangan digital, memastikan bahwa semua populasi memiliki akses ke manfaat teknologi kesehatan digital."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Kesimpulan"}]},{"type":"paragraph","content":[{"type":"text","text":"Transformasi digital menghadirkan peluang dan tantangan bagi sistem kesehatan masyarakat. Penelitian ini menegaskan perlunya pendekatan strategis dalam adopsi digital, yang menyeimbangkan inovasi dengan realitas praktis dalam pemberian layanan kesehatan. Penelitian masa depan harus mengeksplorasi dampak jangka panjang dari transformasi digital terhadap kesetaraan kesehatan dan bagaimana teknologi yang sedang berkembang, seperti kecerdasan buatan (AI) dan blockchain, dapat lebih meningkatkan hasil kesehatan masyarakat."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Referensi"}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Fagerlund, A. J., & Holmström, H. (2020). The Impact of Digital Transformation on Public Health: A Literature Review. "},{"type":"text","marks":[{"type":"italic"}],"text":"Journal of Public Health Informatics"},{"type":"text","text":", 12(4), e1-e10."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"McGinnis, J. M. (2018). Digital Transformation in Healthcare: Challenges and Opportunities. "},{"type":"text","marks":[{"type":"italic"}],"text":"Health Policy and Technology"},{"type":"text","text":", 7(2), 174-180."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"World Health Organization. (2021). Digital Health: A Global Perspective. "},{"type":"text","marks":[{"type":"italic"}],"text":"WHO Press"},{"type":"text","text":"."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Artikel ini memberikan perspektif mendalam mengenai peran teknologi digital dalam meningkatkan kualitas layanan kesehatan masyarakat. Ini menguraikan manfaat nyata dari adopsi teknologi, sambil mengidentifikasi area di mana tantangan tetap ada, yang perlu diperhatikan dalam pengembangan lebih lanjut."}]}]}
        `,
        publishedDate: new Date("2023-08-10"),
        researchLocation:
          "Laboratorium Kesehatan Masyarakat, Universitas Negeri XYZ",
        researchDate: new Date("2023-04-20"),
        correspondenceEmail: "researcher8@xyzuniversity.ac.id",
        studyProgram: "Public Health Informatics",
        laboratoryId: createdLabs[0]!.id,
        doi: "10.1234/example-doi-8",
        type: "RESEARCH" as PortfolioType,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4v1r1CSzcrFM8uBgRKNjlxnwDVI5aeL7YqkJo",
        title:
          "Leveraging Big Data for Predictive Analytics in Healthcare Management",
        slug: "leveraging-big-data-for-predictive-analytics-in-healthcare",
        abstract:
          "This research explores the use of big data analytics in healthcare management, focusing on predictive models that can improve patient outcomes and resource allocation.",
        content: `
        {"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstrak"}]},{"type":"paragraph","content":[{"type":"text","text":"Kehadiran big data telah membuka peluang baru dalam analitik prediktif untuk manajemen kesehatan. Penelitian ini mengeksplorasi bagaimana institusi kesehatan dapat memanfaatkan big data untuk mengembangkan model prediktif yang meningkatkan perawatan pasien dan mengoptimalkan alokasi sumber daya. Studi ini meneliti penerapan algoritma machine learning pada kumpulan data besar, mengidentifikasi pola dan tren yang dapat digunakan dalam proses pengambilan keputusan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pendahuluan"}]},{"type":"paragraph","content":[{"type":"text","text":"Analitik prediktif adalah penggunaan teknik statistik dan algoritma machine learning untuk memprediksi kejadian masa depan berdasarkan data historis. Dalam bidang kesehatan, analitik prediktif dapat digunakan untuk memperkirakan hasil pasien, mengidentifikasi individu berisiko tinggi, serta mengoptimalkan penggunaan sumber daya seperti tempat tidur rumah sakit dan tenaga medis. Namun, keberhasilan penerapan analitik prediktif membutuhkan akses ke volume data yang besar dan berkualitas tinggi serta keahlian untuk menganalisis dan menafsirkan data tersebut. Penelitian ini bertujuan untuk mengeksplorasi potensi big data dalam manajemen kesehatan, dengan fokus pada analitik prediktif."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Material dan Metode"}]},{"type":"paragraph","content":[{"type":"text","text":"Penelitian ini menggunakan data dari beberapa penyedia layanan kesehatan, termasuk rumah sakit, klinik, dan perusahaan asuransi. Data yang digunakan mencakup catatan pasien, riwayat pengobatan, dan metrik pemanfaatan sumber daya. Algoritma machine learning, seperti decision trees, random forests, dan neural networks, diterapkan pada data untuk mengembangkan model prediktif. Model tersebut kemudian divalidasi menggunakan dataset uji untuk menilai tingkat akurasi dan keandalannya."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Hasil Penelitian"}]},{"type":"paragraph","content":[{"type":"text","text":"Hasil penelitian menunjukkan bahwa model prediktif berbasis analitik big data dapat secara signifikan meningkatkan manajemen kesehatan. Sebagai contoh, model yang dikembangkan untuk memprediksi readmisi pasien mampu mengidentifikasi pasien berisiko tinggi dengan tingkat akurasi yang tinggi, sehingga memungkinkan penyedia layanan kesehatan untuk melakukan intervensi dini dan mengurangi angka readmisi. Demikian pula, model prediktif untuk alokasi sumber daya membantu rumah sakit mengoptimalkan penggunaan fasilitas mereka, mengurangi waktu tunggu, dan meningkatkan kepuasan pasien. Penelitian ini juga menemukan beberapa tantangan, termasuk kebutuhan untuk standarisasi data, integrasi data dari berbagai sumber, dan pertimbangan etis terkait penggunaan data pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Pembahasan"}]},{"type":"paragraph","content":[{"type":"text","text":"Temuan penelitian ini menyoroti potensi transformatif dari analitik big data dalam manajemen kesehatan. Dengan memanfaatkan kekuatan model prediktif, institusi kesehatan dapat meningkatkan hasil pasien, mengurangi biaya, dan meningkatkan efisiensi operasional. Namun, penelitian ini juga menekankan pentingnya mengatasi tantangan yang terkait dengan big data, terutama dalam hal kualitas data, integrasi, dan privasi. Pengembangan kerangka tata kelola data yang kuat serta adopsi praktik terbaik dalam manajemen data sangat penting untuk kesuksesan penerapan analitik prediktif dalam manajemen kesehatan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Kesimpulan"}]},{"type":"paragraph","content":[{"type":"text","text":"Analitik big data menawarkan alat yang kuat untuk analitik prediktif dalam manajemen kesehatan. Penelitian ini menunjukkan bahwa dengan data dan teknik analisis yang tepat, penyedia layanan kesehatan dapat membuat keputusan yang lebih baik yang menghasilkan peningkatan hasil pasien dan penggunaan sumber daya yang lebih efisien. Penelitian lebih lanjut harus fokus pada pengembangan model prediktif yang lebih canggih dan eksplorasi sumber data baru, seperti data genomik dan determinan sosial kesehatan, untuk lebih meningkatkan kemampuan analitik prediktif di bidang kesehatan."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Referensi"}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Obermeyer, Z., & Emanuel, E. J. (2016). Predictive Analytics in Healthcare: Using Big Data to Forecast Patient Outcomes. "},{"type":"text","marks":[{"type":"italic"}],"text":"Journal of the American Medical Association"},{"type":"text","text":", 315(5), 461-462."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Raghupathi, W., & Raghupathi, V. (2014). Big Data Analytics in Healthcare: Promise and Potential. "},{"type":"text","marks":[{"type":"italic"}],"text":"Health Information Science and Systems"},{"type":"text","text":", 2(1), 3-10."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Topol, E. J. (2019). High-Performance Medicine: The Convergence of Human and Artificial Intelligence. "},{"type":"text","marks":[{"type":"italic"}],"text":"Nature Medicine"},{"type":"text","text":", 25(1), 44-56."}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Artikel ini dirancang untuk menggambarkan pemanfaatan big data dan analitik prediktif yang efektif dalam manajemen kesehatan dengan penekanan pada potensi dan tantangan yang dihadapi."}]}]}
        `,
        publishedDate: new Date("2023-07-20"),
        researchLocation:
          "Laboratorium Manajemen Kesehatan, Universitas Negeri XYZ",
        researchDate: new Date("2023-02-25"),
        correspondenceEmail: "researcher9@xyzuniversity.ac.id",
        studyProgram: "Health Informatics",
        laboratoryId: createdLabs[0]!.id,
        doi: "10.1234/example-doi-9",
        type: "RESEARCH" as PortfolioType,
      },
    ];

    for (const portfolio of researchPortfolios) {
      const createdPortfolio = await prisma.researchPortfolio.create({
        data: portfolio,
      });
      createdPortfolios.push(createdPortfolio);
    }

    console.log("ResearchPortfolios seeded successfully");
  } else {
    console.log("Skipping ResearchPortfolios seeding due to insufficient data");
  }

  // Seed ResearchPortfolioAuthors
  if (createdPortfolios.length > 1 && createdUsers.length > 2) {
    const portfolioAuthors = [
      {
        researchPortfolioId: createdPortfolios[0]!.id,
        userId: createdUsers[1]!.id,
        role: "PRIMARY" as AuthorRole,
        orderNumber: 1,
      },
      {
        researchPortfolioId: createdPortfolios[1]!.id,
        userId: createdUsers[2]!.id,
        role: "PRIMARY" as AuthorRole,
        orderNumber: 1,
      },
    ];

    for (const author of portfolioAuthors) {
      await prisma.researchPortfolioAuthor.create({ data: author });
    }

    console.log("ResearchPortfolioAuthors seeded successfully");
  } else {
    console.log(
      "Skipping ResearchPortfolioAuthors seeding due to insufficient data",
    );
  }

  // Seed Articles
  if (createdLabs.length > 1) {
    const articles = [
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY47w1qNGIZE8dLhqjuUPWISgOzcpafNKD2i3vC",
        title: "The Rise of AI in Healthcare: Revolutionizing Patient Care",
        slug: "the-rise-of-ai-in-healthcare",
        summary:
          "Exploring how AI is transforming healthcare, this article discusses its impact on diagnostics, personalized medicine, and administrative tasks.",
        content: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"textStyle","attrs":{"color":"#E00000"}},{"type":"highlight","attrs":{"color":"var(--novel-highlight-red)"}}],"text":"Artificial intelligence (AI)"},{"type":"text","text":" is rapidly transforming the healthcare industry, ushering in a new era of patient care and medical research.            "}]},{"type":"taskList","content":[{"type":"taskItem","attrs":{"checked":true},"content":[{"type":"paragraph","content":[{"type":"text","text":"From enhancing diagnostic accuracy to streamlining administrative tasks, AI has proven to be a powerful tool in improving healthcare outcomes.            "}]}]},{"type":"taskItem","attrs":{"checked":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"One of the most significant applications of AI in healthcare is in medical imaging. AI-powered algorithms can analyze medical images, such as X-rays, MRIs, and CT scans, with remarkable accuracy, often surpassing human radiologists in detecting anomalies.            "}]}]}]},{"type":"bulletList","attrs":{"tight":true},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"This has led to earlier and more accurate diagnoses, which are crucial for effective treatmentn."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Another area where AI is making a substantial impact is in personalized medicine. By analyzing vast amounts of patient data, including genetic information, AI can help doctors develop customized treatment plans tailored to the individual needs of each patient.            "}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"This approach not only improves the efficacy of treatments but also reduces the risk of adverse side effects.            "}]},{"type":"paragraph"}]}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"AI is also revolutionizing the way healthcare providers manage patient records and administrative tasks.            "}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Natural language processing (NLP) technologies enable AI systems to extract relevant information from unstructured data, such as doctor's notes or medical literature, making it easier for healthcare professionals to access the information they need.      "}]}]}]},{"type":"codeBlock","attrs":{"language":null},"content":[{"type":"text","text":"h1.nv-font-title {\n  @apply !my-4 !text-3xl !font-bold;\n}\n\nh2.nv-font-title {\n  @apply !my-4 !text-2xl !font-bold;\n}\n\nh3.nv-font-title {\n  @apply !my-4 !text-xl !font-bold;\n}\n\np.nv-font-p {\n  @apply !my-4 !text-lg;\n}\n\np.nv-font-p:empty {\n  @apply !my-4 !h-4 !text-lg;\n}\n\n.nv-font-task-item > div > p.nv-font-p {\n  @apply !my-0 !text-lg;\n}\n\nblockquote {\n  @apply my-4 border-s-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800;\n}\n\nblockquote > p {\n  @apply text-xl font-medium italic leading-relaxed text-gray-900 dark:text-white;\n}\n      "}]},{"type":"paragraph","content":[{"type":"text","text":"Additionally, AI-driven chatbots and virtual assistants are becoming increasingly common in healthcare settings, helping to reduce the workload on staff by handling routine inquiries and appointment scheduling.            "}]},{"type":"paragraph","content":[{"type":"text","text":"Despite these advancements, the integration of AI into healthcare is not without challenges.            Concerns about data privacy, the ethical implications of AI decision-making, and the need for regulatory frameworks are just a few of the issues that need to be addressed as AI continues to evolve in the healthcare sector.            "}]},{"type":"paragraph","content":[{"type":"text","text":"Nevertheless, the potential benefits of AI in healthcare are undeniable, and as technology continues to advance, we can expect to see even more groundbreaking developments in the years to come."}]}]}`,
        author: createdUsers[0]!.id,
        publishedDate: new Date(),
        laboratoryId: createdLabs[0]!.id,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4uvxg5olBc9YOk6qKpDnysvCNThiEURoVeA1H",
        title: "The Future of Electronic Health Records: Trends and Challenges",
        slug: "the-future-of-electronic-health-records",
        summary: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Revolusi Rekam Medis Elektronik (EHR) dalam Sistem Kesehatan Modern: Tren, Tantangan, dan Masa Depan"}]},{"type":"paragraph","content":[{"type":"text","text":"Rekam Medis Elektronik (EHR) telah menjadi bagian tak terpisahkan dari sistem kesehatan modern. EHR menawarkan versi digital dari catatan kertas pasien, yang memungkinkan informasi tersebut diakses oleh penyedia layanan kesehatan yang berwenang di berbagai tempat. Adopsi EHR telah membawa perubahan signifikan dalam cara informasi pasien disimpan, diambil, dan dibagikan, yang pada akhirnya meningkatkan kualitas perawatan."}]},{"type":"paragraph"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Integrasi AI dan Machine Learning dalam EHR"}]},{"type":"paragraph","content":[{"type":"text","text":"Salah satu tren utama dalam pengembangan EHR adalah integrasi kecerdasan buatan (AI) dan machine learning untuk menganalisis data pasien serta memprediksi hasil kesehatan. Dengan memanfaatkan AI, sistem EHR dapat memberikan wawasan yang membantu tenaga medis membuat keputusan yang lebih baik, seperti mengidentifikasi pasien yang berisiko mengalami kondisi tertentu atau merekomendasikan langkah pencegahan. Teknologi ini memungkinkan perawatan yang lebih proaktif dan personal."}]},{"type":"paragraph"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Interoperabilitas Antar Sistem EHR"}]},{"type":"paragraph","content":[{"type":"text","text":"Tren penting lainnya adalah peningkatan interoperabilitas antara berbagai sistem EHR. Seiring dengan meningkatnya kolaborasi antar penyedia layanan kesehatan, kemampuan untuk membagikan informasi pasien secara mulus di berbagai platform menjadi sangat krusial. Upaya untuk menciptakan format data dan protokol komunikasi yang terstandarisasi sedang berlangsung, sehingga sistem EHR dari berbagai vendor dapat saling berkomunikasi. Hal ini diharapkan akan mengurangi risiko kesalahan dan meningkatkan hasil kesehatan pasien."}]},{"type":"paragraph"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Tantangan: Privasi Data dan Kompleksitas Sistem"}]},{"type":"paragraph","content":[{"type":"text","text":"Meskipun EHR menawarkan banyak manfaat, ada beberapa tantangan yang masih perlu diatasi. Salah satu kekhawatiran utama adalah privasi dan keamanan data, terutama dengan meningkatnya serangan siber yang menargetkan organisasi kesehatan. Menjaga agar data pasien tetap terlindungi namun dapat diakses oleh pihak yang memerlukan adalah tugas yang memerlukan kewaspadaan terus-menerus."}]},{"type":"paragraph","content":[{"type":"text","text":"Selain itu, kompleksitas sistem EHR sering kali menjadi hambatan bagi penggunaannya secara efektif. Penyedia layanan kesehatan sering menghadapi kurva pembelajaran yang curam ketika mengadopsi teknologi EHR baru, yang dapat menyebabkan frustrasi dan penurunan efisiensi. Penyederhanaan antarmuka pengguna dan pelatihan yang komprehensif dapat membantu mengatasi masalah ini."}]},{"type":"paragraph"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Masa Depan EHR: Kemajuan AI, Interoperabilitas, dan Keamanan"}]},{"type":"paragraph","content":[{"type":"text","text":"Ke depan, masa depan EHR kemungkinan akan mencakup kemajuan lanjutan dalam AI, interoperabilitas yang lebih besar, dan langkah-langkah keamanan yang ditingkatkan. Seiring dengan evolusi sistem ini, EHR akan memainkan peran yang semakin penting dalam meningkatkan perawatan dan hasil kesehatan pasien, membantu menciptakan sistem kesehatan yang lebih efisien dan efektif."}]},{"type":"paragraph","content":[{"type":"text","text":"Dengan potensi besar yang dimilikinya, EHR akan terus berkembang menjadi alat yang lebih canggih dan berperan vital dalam transformasi layanan kesehatan di masa depan."}]}]}`,
        author: createdUsers[0]!.id,
        publishedDate: new Date(),
        laboratoryId: createdLabs[1]!.id,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4JrAFQjVFDyoKNVCeRHpquvtSmkfYa1cILT2b",
        title:
          "AI-Powered Diagnostics: How Technology is Enhancing Early Detection",
        slug: "ai-powered-diagnostics",
        summary:
          "This article explores how AI is being used to improve diagnostic tools and techniques, leading to early detection of diseases.",
        content: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Peran Diagnostik Berbasis AI dalam Meningkatkan Kesehatan Modern"}]},{"type":"paragraph","content":[{"type":"text","text":"Diagnostik berbasis kecerdasan buatan (AI) dengan cepat menjadi salah satu alat paling penting dalam sistem kesehatan modern. Teknologi ini secara signifikan meningkatkan kemampuan tenaga medis untuk mendeteksi penyakit pada tahap awal, bahkan sebelum gejala mulai muncul. Dengan kemampuan yang luar biasa ini, AI membuka jalan untuk perawatan yang lebih dini dan efektif, yang sangat penting untuk meningkatkan hasil perawatan pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"AI dalam Radiologi: Deteksi Dini Penyakit"}]},{"type":"paragraph","content":[{"type":"text","text":"Di bidang radiologi, sistem berbasis AI digunakan untuk menganalisis gambar medis seperti X-ray, CT scan, dan MRI. Dengan kemampuan untuk mengidentifikasi pola-pola halus yang mungkin tidak terlihat oleh mata manusia, AI mampu mendiagnosis kondisi seperti kanker, tumor, atau penyakit jantung pada tahap awal. Deteksi dini ini sangat penting, karena memungkinkan intervensi yang dapat menghentikan atau memperlambat perkembangan penyakit, sehingga meningkatkan peluang kesembuhan pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Peran AI dalam Diagnostik Laboratorium"}]},{"type":"paragraph","content":[{"type":"text","text":"Selain dalam pencitraan medis, AI juga memainkan peran penting dalam diagnostik laboratorium. Algoritma machine learning digunakan untuk menganalisis sampel darah, data genetik, dan hasil laboratorium lainnya dengan cepat dan lebih akurat. Alat berbasis AI ini mampu mendeteksi biomarker spesifik yang terkait dengan penyakit seperti diabetes atau kondisi kardiovaskular, sehingga dokter dapat memulai pengobatan lebih cepat dan dengan tingkat keyakinan yang lebih tinggi."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Transformasi Diagnostik dengan Perangkat Wearable"}]},{"type":"paragraph","content":[{"type":"text","text":"Perangkat wearable, seperti jam tangan pintar dan pelacak kebugaran yang dilengkapi dengan AI, juga mengubah dunia diagnostik. Perangkat ini dapat memantau tanda-tanda vital seperti detak jantung, tekanan darah, dan kadar oksigen. Dengan memanfaatkan data ini, perangkat dapat memperingatkan pengguna dan penyedia layanan kesehatan tentang ketidakteraturan, memungkinkan intervensi dini untuk kondisi seperti aritmia atau hipertensi."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Tantangan dan Masa Depan Diagnostik Berbasis AI"}]},{"type":"paragraph","content":[{"type":"text","text":"Meskipun AI menunjukkan potensi besar dalam diagnostik, masih ada tantangan yang harus diatasi. Salah satunya adalah integrasi hasil AI ke dalam alur kerja klinis. Tenaga medis perlu dilatih untuk menginterpretasikan dan menerapkan wawasan yang diberikan oleh AI dengan tepat. Selain itu, kurangnya data yang terstandarisasi di berbagai sistem kesehatan dapat menghambat efektivitas model AI."}]},{"type":"paragraph","content":[{"type":"text","text":"Namun, seiring dengan perkembangan teknologi AI yang semakin canggih, diagnostik berbasis AI kemungkinan akan memainkan peran yang semakin penting dalam dunia kesehatan. Teknologi ini tidak hanya membantu menyelamatkan nyawa, tetapi juga mengurangi beban pada sistem kesehatan di seluruh dunia."}]},{"type":"paragraph","content":[{"type":"text","text":"Diagnostik yang lebih cepat, akurat, dan berbasis AI menjanjikan masa depan yang lebih cerah dalam perawatan kesehatan global."}]}]}`,
        author: createdUsers[0]!.id,
        publishedDate: new Date(),
        laboratoryId: createdLabs[2]!.id,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4jsXa2dAKmrs8RA0vCqQTDcjXJbZSonkUlhEw",
        title:
          "The Role of AI in Personalized Medicine: Tailoring Treatments for Optimal Outcomes",
        slug: "ai-in-personalized-medicine",
        summary:
          "This article discusses how AI is enabling personalized treatment plans based on individual genetic profiles and medical history.",
        content: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Revolusi AI dalam Pengobatan Personal: Memanfaatkan Teknologi untuk Perawatan yang Lebih Tepat Sasaran"}]},{"type":"paragraph","content":[{"type":"text","text":"Pengobatan personal menjadi salah satu bidang paling menarik di mana kecerdasan buatan (AI) memberikan dampak signifikan. Dengan memanfaatkan algoritma machine learning, AI memungkinkan penyedia layanan kesehatan untuk menciptakan rencana perawatan yang disesuaikan dengan profil genetik dan riwayat medis unik setiap pasien. Pendekatan ini menandai pergeseran dari strategi pengobatan \"satu untuk semua\" menuju perawatan yang lebih spesifik dan individual."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"AI dan Farmakogenomik: Menentukan Pengobatan Berdasarkan Genetik"}]},{"type":"paragraph","content":[{"type":"text","text":"Salah satu bidang utama dalam pengobatan personal di mana AI membuat perbedaan adalah farmakogenomik. Bidang ini mempelajari bagaimana gen pasien memengaruhi respons mereka terhadap obat-obatan. Dengan menganalisis data genetik, AI dapat memprediksi bagaimana seorang pasien akan merespons obat tertentu, memungkinkan dokter untuk meresepkan obat yang paling efektif dengan efek samping yang minimal. Ini sangat penting dalam pengobatan penyakit seperti kanker, di mana terapi yang ditargetkan menjadi semakin umum."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Deteksi Risiko Penyakit yang Lebih Awal dengan AI"}]},{"type":"paragraph","content":[{"type":"text","text":"Selain menentukan pengobatan, AI juga berperan penting dalam mengidentifikasi pasien yang berisiko tinggi terkena penyakit tertentu. Dengan menganalisis informasi genetik bersamaan dengan data lain seperti faktor gaya hidup dan riwayat medis, AI dapat mendeteksi pola yang menunjukkan peningkatan risiko terhadap penyakit seperti diabetes, Alzheimer, atau penyakit jantung. Hal ini memungkinkan penyedia layanan kesehatan untuk mengambil langkah pencegahan, seperti merekomendasikan perubahan gaya hidup atau intervensi dini, sebelum penyakit berkembang."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"AI dalam Uji Klinis: Mempercepat Proses Pengembangan Obat"}]},{"type":"paragraph","content":[{"type":"text","text":"AI juga mengubah cara uji klinis dilakukan. Secara tradisional, menemukan peserta untuk uji klinis adalah proses yang lambat dan mahal. Namun, AI dapat menganalisis dataset besar untuk mengidentifikasi individu yang memenuhi kriteria spesifik untuk uji klinis, sehingga mempercepat proses rekrutmen dan membuatnya lebih hemat biaya. Ini membantu mempercepat pengenalan perawatan baru ke pasar, memberikan manfaat bagi pasien yang sangat membutuhkan pengobatan tersebut."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Tantangan dalam Pengobatan Personal Berbasis AI"}]},{"type":"paragraph","content":[{"type":"text","text":"Meskipun pengobatan personal berbasis AI menjanjikan banyak hal, ada juga tantangan yang perlu dipertimbangkan. Salah satunya adalah masalah privasi dan keamanan data. Penggunaan AI dalam pengobatan personal melibatkan data genetik yang sangat sensitif, sehingga memastikan bahwa informasi ini terlindungi dengan baik sangat penting untuk menjaga kepercayaan pasien. Tanpa perlindungan data yang kuat, penerimaan terhadap pengobatan personal bisa terhambat."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Masa Depan Pengobatan Personal"}]},{"type":"paragraph","content":[{"type":"text","text":"Pengobatan personal berbasis AI membawa harapan besar bagi masa depan kesehatan. Dengan teknologi yang semakin canggih, perawatan yang lebih efektif, tepat sasaran, dan berbasis data menjadi lebih mungkin untuk semua pasien. Dengan menangani tantangan seperti privasi data dan meningkatkan keahlian klinis dalam menggunakan AI, pengobatan personal memiliki potensi untuk merevolusi cara kita mendekati kesehatan dan perawatan."}]}]}`,
        author: createdUsers[0]!.id,
        publishedDate: new Date(),
        laboratoryId: createdLabs[3]!.id,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4EBPt9iDKvWbp7kPZMHS2OcT5r8m4BjwsdxVe",
        title:
          "AI in Healthcare Administration: Streamlining Operations and Reducing Costs",
        slug: "ai-in-healthcare-administration",
        summary:
          "An exploration of how AI is being used to improve administrative efficiency in healthcare systems.",
        content: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Penerapan AI dalam Administrasi Kesehatan: Meningkatkan Efisiensi dan Menurunkan Biaya"}]},{"type":"paragraph","content":[{"type":"text","text":"Meskipun banyak perhatian tertuju pada peran kecerdasan buatan (AI) dalam diagnostik dan perawatan medis, dampaknya pada administrasi kesehatan juga sangat signifikan. Rumah sakit dan klinik semakin mengadopsi solusi AI untuk memperlancar operasional mereka, mengurangi biaya, dan meningkatkan kualitas perawatan pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Automasi Tugas Rutin dengan AI"}]},{"type":"paragraph","content":[{"type":"text","text":"Salah satu penerapan AI yang paling penting dalam administrasi kesehatan adalah otomatisasi tugas-tugas rutin. AI-powered chatbots, misalnya, dapat menangani pertanyaan pasien, menjadwalkan janji temu, bahkan memproses klaim asuransi. Dengan mengambil alih tugas-tugas administratif yang berulang ini, AI mengurangi beban kerja staf administrasi, sehingga mereka dapat fokus pada tugas-tugas yang lebih kompleks dan membutuhkan intervensi manusia. Ini tidak hanya meningkatkan efisiensi, tetapi juga mempercepat layanan kepada pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Optimalisasi Alokasi Sumber Daya di Rumah Sakit"}]},{"type":"paragraph","content":[{"type":"text","text":"AI juga digunakan untuk mengoptimalkan alokasi sumber daya di rumah sakit. Dengan menganalisis data seperti jumlah pasien yang masuk, ketersediaan staf, dan penggunaan peralatan, AI membantu penyedia layanan kesehatan membuat keputusan yang lebih baik tentang bagaimana sumber daya dialokasikan. Ini sangat penting dalam situasi di mana lonjakan pasien terjadi, seperti selama musim flu atau pandemi. Dengan perencanaan yang lebih baik, rumah sakit dapat lebih siap untuk menghadapi lonjakan pasien dan memastikan bahwa perawatan yang dibutuhkan tersedia tepat waktu."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Pengurangan Biaya Operasional dengan AI"}]},{"type":"paragraph","content":[{"type":"text","text":"Peran AI dalam menurunkan biaya operasional sangat penting. Dengan mengotomatisasi tugas administratif dan mengoptimalkan penggunaan sumber daya, AI membantu penyedia layanan kesehatan mengurangi biaya tanpa mengorbankan kualitas perawatan. Sebagai contoh, AI dapat menggunakan analisis prediktif untuk mengidentifikasi pasien yang berisiko tinggi untuk dirawat kembali, sehingga rumah sakit dapat melakukan intervensi dini dan mencegah rawat inap yang mahal di kemudian hari. Ini tidak hanya mengurangi biaya perawatan, tetapi juga meningkatkan hasil kesehatan pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Tantangan Implementasi AI dalam Administrasi Kesehatan"}]},{"type":"paragraph","content":[{"type":"text","text":"Meskipun banyak manfaat yang ditawarkan, penerapan AI dalam administrasi kesehatan juga menghadapi tantangan. Salah satu kekhawatiran utama adalah potensi penggantian pekerjaan manusia saat AI mengambil alih tugas-tugas rutin. Penting bagi penyedia layanan kesehatan untuk menemukan keseimbangan antara memanfaatkan AI guna meningkatkan efisiensi dan memastikan bahwa pekerja manusia tetap menjadi bagian penting dari sistem kesehatan. Alih-alih menggantikan sepenuhnya, AI seharusnya menjadi alat yang mendukung pekerjaan manusia, memungkinkan mereka fokus pada tugas-tugas yang lebih strategis dan berbasis empati."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Masa Depan AI dalam Administrasi Kesehatan"}]},{"type":"paragraph","content":[{"type":"text","text":"Dengan kemampuan untuk mengotomatiskan proses, mengoptimalkan sumber daya, dan menurunkan biaya, AI memiliki peran besar dalam meningkatkan efisiensi di sektor kesehatan. Di masa depan, integrasi AI dalam administrasi kesehatan akan terus berkembang, membantu rumah sakit dan klinik menyediakan layanan yang lebih baik bagi pasien, sambil menjaga biaya operasional tetap terkendali. Namun, tantangan terkait dengan implementasi dan pengelolaan tenaga kerja harus tetap diperhatikan untuk menciptakan lingkungan kerja yang seimbang dan berfokus pada peningkatan kualitas perawatan pasien."}]}]}`,
        author: createdUsers[0]!.id,
        publishedDate: new Date(),
        laboratoryId: createdLabs[4]!.id,
      },
      {
        coverImg:
          "https://utfs.io/f/P2oQLWYULKY4aHicChA1whGIk3mnvqc6iJeNurWHg1YdMoOB",
        title:
          "Challenges of Integrating AI in Healthcare: Ethics and Data Privacy",
        slug: "ai-ethics-and-data-privacy",
        summary:
          "This article explores the ethical and privacy concerns surrounding the use of AI in healthcare, including potential solutions.",
        content: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Tantangan Etika dan Privasi dalam Penggunaan AI di Industri Kesehatan"}]},{"type":"paragraph","content":[{"type":"text","text":"Seiring dengan revolusi kecerdasan buatan (AI) di industri kesehatan, kekhawatiran terkait etika dan privasi semakin menjadi perhatian utama. Meskipun AI menawarkan banyak manfaat, seperti peningkatan diagnostik dan pengobatan personal, penggunaannya juga memunculkan pertanyaan etika yang kompleks yang harus dijawab agar teknologi ini dapat digunakan secara bertanggung jawab."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Privasi Data Pasien: Tantangan Utama"}]},{"type":"paragraph","content":[{"type":"text","text":"Salah satu kekhawatiran paling mendesak terkait dengan privasi data. AI bergantung pada sejumlah besar data untuk berfungsi secara efektif, dan sebagian besar data ini sangat sensitif, terutama dalam konteks kesehatan. Menjaga kerahasiaan data pasien sangatlah penting, terutama ketika serangan siber terhadap organisasi kesehatan semakin umum terjadi. Penyedia layanan kesehatan harus menerapkan langkah-langkah keamanan yang kuat untuk melindungi data pasien dan mematuhi peraturan privasi seperti "},{"type":"text","marks":[{"type":"bold"}],"text":"HIPAA"},{"type":"text","text":" (Health Insurance Portability and Accountability Act) di Amerika Serikat. Jika tidak, risiko pelanggaran data bisa menimbulkan dampak serius terhadap kepercayaan pasien dan keselamatan mereka."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Potensi Bias dalam Algoritma AI"}]},{"type":"paragraph","content":[{"type":"text","text":"Kekhawatiran etika lain yang signifikan adalah potensi bias dalam algoritma AI. Sistem AI hanya sebaik data yang digunakan untuk melatihnya, dan jika data tersebut memiliki bias, hasil prediksi dan rekomendasi AI juga akan bias. Hal ini dapat menyebabkan perlakuan yang tidak adil terhadap pasien, terutama dari kelompok minoritas yang mungkin kurang terwakili dalam data kesehatan. Untuk menghindari memperburuk kesenjangan kesehatan yang sudah ada, penyedia layanan kesehatan harus memastikan bahwa data yang digunakan untuk melatih sistem AI beragam dan mewakili seluruh populasi."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Masalah Akuntabilitas dalam Penggunaan AI"}]},{"type":"paragraph","content":[{"type":"text","text":"AI juga memunculkan pertanyaan tentang akuntabilitas. Jika sebuah sistem AI membuat diagnosis atau rekomendasi yang salah, siapa yang harus bertanggung jawab? Apakah dokter yang mengandalkan AI, atau pengembang yang membuat sistem tersebut? Masalah ini harus diatasi seiring dengan semakin terintegrasinya AI dalam praktik medis. Menetapkan tanggung jawab yang jelas sangat penting untuk memastikan bahwa kesalahan dalam perawatan kesehatan dapat ditangani dengan baik, tanpa mengorbankan keselamatan pasien."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Solusi Potensial: Pedoman Etika dan Transparansi AI"}]},{"type":"paragraph","content":[{"type":"text","text":"Meskipun tantangan ini kompleks, ada beberapa solusi potensial. Penyedia layanan kesehatan dapat mengembangkan pedoman etika yang jelas untuk penggunaan AI, serta membentuk komite pengawas yang memantau implementasi sistem AI di lingkungan klinis. Selain itu, para peneliti terus bekerja untuk mengembangkan algoritma AI yang transparan dan dapat dijelaskan (explainable AI), yang memungkinkan tenaga medis memahami proses pengambilan keputusan oleh AI. Hal ini akan membantu mengurangi risiko kesalahan yang disebabkan oleh kurangnya pemahaman tentang cara kerja AI."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Menyeimbangkan Manfaat dan Risiko di Masa Depan"}]},{"type":"paragraph","content":[{"type":"text","text":"Masa depan AI di bidang kesehatan tidak hanya bergantung pada kemajuan teknologi, tetapi juga pada kemampuan kita untuk menangani tantangan etika dan privasi ini dengan serius. Dengan memastikan bahwa sistem AI diterapkan secara etis, transparan, dan aman, kita dapat memanfaatkan manfaat AI secara optimal untuk semua pasien, sambil meminimalkan risiko yang mungkin timbul."}]},{"type":"paragraph","content":[{"type":"text","text":"Menghadapi tantangan ini adalah langkah penting dalam memastikan bahwa AI dapat terus berkembang sebagai alat yang bermanfaat dalam meningkatkan perawatan kesehatan, mengurangi kesenjangan, dan memastikan kepercayaan serta keamanan pasien tetap terjaga."}]}]}`,
        author: createdUsers[0]!.id,
        publishedDate: new Date(),
        laboratoryId: createdLabs[5]!.id,
      },
    ];

    for (const article of articles) {
      await prisma.article.create({ data: article });
    }

    console.log("Articles seeded successfully");
  } else {
    console.log("Skipping Articles seeding due to insufficient data");
  }

  // Seed Categories
  const categories = [
    { for: "ARTICLE" as CategoryFor, name: "Technology" },
    { for: "ARTICLE" as CategoryFor, name: "Health" },
    { for: "ARTICLE" as CategoryFor, name: "Science" },
    { for: "RESEARCH" as CategoryFor, name: "Computer Science" },
    { for: "RESEARCH" as CategoryFor, name: "Biomedical" },
    { for: "RESEARCH" as CategoryFor, name: "Nutrition" },
    { for: "RESEARCH" as CategoryFor, name: "Public Health" },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const createdCategory = await prisma.category.create({ data: category });
    createdCategories.push(createdCategory);
  }

  console.log("Categories seeded successfully");

  // Add categories to articles
  if (createdCategories.length > 0) {
    const articleCategories = [
      {
        articleId: 1, // Assuming this matches the ID of the first article
        categoryId: createdCategories.find(
          (c) => c.name === "Science" && c.for === "ARTICLE",
        )!.id,
      },
      {
        articleId: 2, // Assuming this matches the ID of the second article
        categoryId: createdCategories.find(
          (c) => c.name === "Science" && c.for === "ARTICLE",
        )!.id,
      },
      {
        articleId: 3, // Assuming this matches the ID of the third article
        categoryId: createdCategories.find(
          (c) => c.name === "Technology" && c.for === "ARTICLE",
        )!.id,
      },
      {
        articleId: 3,
        categoryId: createdCategories.find(
          (c) => c.name === "Health" && c.for === "ARTICLE",
        )!.id,
      },
      {
        articleId: 4, // Assuming this matches the ID of the fourth article
        categoryId: createdCategories.find(
          (c) => c.name === "Technology" && c.for === "ARTICLE",
        )!.id,
      },
      {
        articleId: 4,
        categoryId: createdCategories.find(
          (c) => c.name === "Health" && c.for === "ARTICLE",
        )!.id,
      },
      {
        articleId: 5,
        categoryId: createdCategories.find(
          (c) => c.name === "Technology" && c.for === "ARTICLE",
        )!.id,
      },
      {
        articleId: 6,
        categoryId: createdCategories.find(
          (c) => c.name === "Technology" && c.for === "ARTICLE",
        )!.id,
      },
    ];

    for (const articleCategory of articleCategories) {
      await prisma.categoryArticle.create({ data: articleCategory });
    }

    console.log("Article categories seeded successfully");
  }

  // Add categories to research portfolios
  if (createdCategories.length > 0 && createdPortfolios.length > 0) {
    const researchCategories = [
      {
        articleId: createdPortfolios[0]!.id,
        categoryId: createdCategories.find(
          (c) => c.name === "Nutrition" && c.for === "RESEARCH",
        )!.id,
      },
      {
        articleId: createdPortfolios[1]!.id,
        categoryId: createdCategories.find(
          (c) => c.name === "Public Health" && c.for === "RESEARCH",
        )!.id,
      },
      {
        articleId: createdPortfolios[2]!.id,
        categoryId: createdCategories.find(
          (c) => c.name === "Public Health" && c.for === "RESEARCH",
        )!.id,
      },
      {
        articleId: createdPortfolios[3]!.id,
        categoryId: createdCategories.find(
          (c) => c.name === "Computer Science" && c.for === "RESEARCH",
        )!.id,
      },
      {
        articleId: createdPortfolios[4]!.id,
        categoryId: createdCategories.find(
          (c) => c.name === "Public Health" && c.for === "RESEARCH",
        )!.id,
      },
      {
        articleId: createdPortfolios[5]!.id,
        categoryId: createdCategories.find(
          (c) => c.name === "Computer Science" && c.for === "RESEARCH",
        )!.id,
      },
      {
        articleId: createdPortfolios[6]!.id,
        categoryId: createdCategories.find(
          (c) => c.name === "Public Health" && c.for === "RESEARCH",
        )!.id,
      },
    ];

    for (const researchCategory of researchCategories) {
      await prisma.categoryResearch.create({ data: researchCategory });
    }

    console.log("Research categories seeded successfully");
  }

  // Seed AddOns
  if (createdLabs.length > 1) {
    const addOns = [
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[0]?.id ?? 0, // Laboratorium Komputer
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[1]?.id ?? 0, // Laboratorium Rekam Medis Elektronik
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[2]?.id ?? 0, // Laboratorium Koding Klinis dan Reimbursment
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[3]?.id ?? 0, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Sewa Penggunaan Kompor 1 Tungku dan Gas",
        price: 6000,
        laboratoryId: createdLabs[3]?.id ?? 0, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Sewa Oven Api Atas atau Bawah",
        price: 12000,
        laboratoryId: createdLabs[3]?.id ?? 0, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[4]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[5]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[6]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[7]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[8]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[9]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[10]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[11]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[12]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[13]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[14]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[15]?.id ?? 0,
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[16]?.id ?? 0,
      },
      {
        name: "Sewa Penggunaan Kompor 1 Tungku dan Gas",
        price: 6000,
        laboratoryId: createdLabs[16]?.id ?? 0, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Sewa Oven Api Atas atau Bawah",
        price: 12000,
        laboratoryId: createdLabs[16]?.id ?? 0, // Laboratorium Pengolahan Pangan
      },
      {
        name: "Technical Assistance",
        description: "Expert technical assistance during the experiment",
        price: 50000,
        laboratoryId: createdLabs[17]?.id ?? 0,
      },
    ];

    for (const addOn of addOns) {
      await prisma.addOn.create({ data: addOn });
    }

    console.log("AddOns seeded successfully");
  } else {
    console.log("Skipping AddOns seeding due to insufficient data");
  }

  // // Seed Reservations
  // const createdReservations = [];
  // if (
  //   createdUsers.length > 1 &&
  //   createdLabs.length > 1 &&
  //   createdServices.length > 1
  // ) {
  //   const reservations = [
  //     {
  //       userId: createdUsers[2]!.id, // Regular user
  //       laboratoryId: createdLabs[0]!.id,
  //       serviceId: createdServices[0]!.id,
  //       startDate: new Date("2023-04-01"),
  //       endDate: new Date("2023-04-01"),
  //       startTime: new Date("2023-04-01T09:00:00"),
  //       endTime: new Date("2023-04-01T12:00:00"),
  //       status: "CONFIRMED" as ReservationStatus,
  //       reviewed: false,
  //     },
  //     {
  //       userId: createdUsers[2]!.id, // Regular user
  //       laboratoryId: createdLabs[1]!.id,
  //       serviceId: createdServices[2]!.id,
  //       startDate: new Date("2023-04-01"),
  //       endDate: new Date("2023-04-01"),
  //       startTime: new Date("2023-04-05T10:00:00"),
  //       endTime: new Date("2023-04-06T10:00:00"),
  //       status: "PENDING" as ReservationStatus,
  //       reviewed: false,
  //     },
  //   ];

  //   for (const reservation of reservations) {
  //     const createdReservation = await prisma.reservation.create({
  //       data: reservation,
  //     });
  //     createdReservations.push(createdReservation);
  //   }

  //   console.log("Reservations seeded successfully");
  // } else {
  //   console.log("Skipping Reservations seeding due to insufficient data");
  // }

  // // Seed Reviews
  // if (
  //   createdUsers.length > 1 &&
  //   createdLabs.length > 1 &&
  //   createdReservations.length > 1
  // ) {
  //   const reviews = [
  //     {
  //       userId: createdUsers[2]!.id,
  //       laboratoryId: createdLabs[0]!.id,
  //       reservationId: createdReservations[0]!.id,
  //       rating: 5,
  //       title: "Excellent Lab Experience",
  //       description:
  //         "The Chemistry Lab was well-equipped and the staff was very helpful.",
  //       reviewDate: new Date("2023-04-02"),
  //       isAnonymous: false,
  //     },
  //   ];

  //   for (const review of reviews) {
  //     await prisma.review.create({ data: review });
  //   }

  //   console.log("Reviews seeded successfully");
  // } else {
  //   console.log("Skipping Reviews seeding due to insufficient data");
  // }

  // Seed OperationalHours
  if (createdLabs.length > 1) {
    const operationalHours = [
      {
        laboratoryId: createdLabs[0]!.id,
        dayOfWeek: "MONDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T08:00:00"),
        endTime: new Date("2023-01-01T17:00:00"),
      },
      {
        laboratoryId: createdLabs[0]!.id,
        dayOfWeek: "TUESDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T08:00:00"),
        endTime: new Date("2023-01-01T17:00:00"),
      },
      {
        laboratoryId: createdLabs[0]!.id,
        dayOfWeek: "WEDNESDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T08:00:00"),
        endTime: new Date("2023-01-01T17:00:00"),
      },
      {
        laboratoryId: createdLabs[0]!.id,
        dayOfWeek: "THURSDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T08:00:00"),
        endTime: new Date("2023-01-01T17:00:00"),
      },
      {
        laboratoryId: createdLabs[0]!.id,
        dayOfWeek: "FRIDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T08:00:00"),
        endTime: new Date("2023-01-01T17:00:00"),
      },
      {
        laboratoryId: createdLabs[0]!.id,
        dayOfWeek: "SATURDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T08:00:00"),
        endTime: new Date("2023-01-01T17:00:00"),
      },
      {
        laboratoryId: createdLabs[1]!.id,
        dayOfWeek: "MONDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T09:00:00"),
        endTime: new Date("2023-01-01T18:00:00"),
      },
      {
        laboratoryId: createdLabs[1]!.id,
        dayOfWeek: "TUESDAY" as DayOfWeek,
        startTime: new Date("2023-01-01T09:00:00"),
        endTime: new Date("2023-01-01T18:00:00"),
      },
    ];

    for (const hour of operationalHours) {
      await prisma.operationalHour.create({ data: hour });
    }

    console.log("OperationalHours seeded successfully");
  } else {
    console.log("Skipping OperationalHours seeding due to insufficient data");
  }

  // // Seed Notifications
  // if (createdUsers.length > 1 && createdReservations.length > 1) {
  //   const notifications = [
  //     {
  //       userId: createdUsers[2]!.id,
  //       type: "INFO" as NotificationType,
  //       message: "Your reservation for Chemistry Lab has been confirmed.",
  //       isRead: false,
  //       reservationId: createdReservations[0]!.id,
  //     },
  //     {
  //       userId: createdUsers[2]!.id,
  //       type: "ALERT" as NotificationType,
  //       message: "Your reservation for Physics Lab is pending approval.",
  //       isRead: false,
  //       reservationId: createdReservations[1]!.id,
  //     },
  //   ];

  //   for (const notification of notifications) {
  //     await prisma.notification.create({ data: notification });
  //   }

  //   console.log("Notifications seeded successfully");
  // } else {
  //   console.log("Skipping Notifications seeding due to insufficient data");
  // }

  // // Seed Payments
  // if (createdReservations.length > 1) {
  //   const payments = [
  //     {
  //       reservationId: createdReservations[0]!.id,
  //       amount: 100000, // Assuming this matches the service price
  //       status: "COMPLETED" as PaymentStatus,
  //       paymentDate: new Date("2023-03-31"),
  //       paymentMethod: "Bank Transfer",
  //     },
  //   ];

  //   for (const payment of payments) {
  //     await prisma.payment.create({ data: payment });
  //   }

  //   console.log("Payments seeded successfully");
  // } else {
  //   console.log("Skipping Payments seeding due to insufficient data");
  // }

  // // Seed ReservationHistories
  // if (createdUsers.length > 1 && createdReservations.length > 1) {
  //   const reservationHistories = [
  //     {
  //       reservationId: createdReservations[0]!.id,
  //       changeType: "CREATE" as ChangeType,
  //       oldData: {},
  //       newData: { status: "PENDING" },
  //       changedById: createdUsers[2]!.id,
  //       changedAt: new Date("2023-03-30"),
  //     },
  //     {
  //       reservationId: createdReservations[0]!.id,
  //       changeType: "UPDATE" as ChangeType,
  //       oldData: { status: "PENDING" },
  //       newData: { status: "CONFIRMED" },
  //       changedById: createdUsers[1]!.id, // Assuming this is the manager
  //       changedAt: new Date("2023-03-31"),
  //     },
  //   ];

  //   for (const history of reservationHistories) {
  //     await prisma.reservationHistory.create({ data: history });
  //   }

  //   console.log("ReservationHistories seeded successfully");
  // } else {
  //   console.log(
  //     "Skipping ReservationHistories seeding due to insufficient data",
  //   );
  // }

  // // Seed Files
  // if (createdUsers.length > 1 && createdPortfolios.length > 0) {
  //   const files = [
  //     {
  //       fileName: "research_report.pdf",
  //       fileType: "application/pdf",
  //       fileUrl: "/assets/files/research_report.pdf",
  //       uploadedById: createdUsers[1]!.id,
  //       researchPortfolioId: createdPortfolios[0]!.id,
  //     },
  //     {
  //       fileName: "payment_receipt.pdf",
  //       fileType: "application/pdf",
  //       fileUrl: "/assets/files/payment_receipt.pdf",
  //       uploadedById: createdUsers[2]!.id,
  //       paymentId: 1, // Assuming this matches the ID of the payment we created
  //     },
  //   ];

  //   for (const file of files) {
  //     await prisma.file.create({ data: file });
  //   }

  //   console.log("Files seeded successfully");
  // } else {
  //   console.log("Skipping Files seeding due to insufficient data");
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
