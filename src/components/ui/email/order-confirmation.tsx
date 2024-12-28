import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { formatDate } from "date-fns";
import { id } from "date-fns/locale";
import { getBaseUrl } from "~/hooks/get-base-url";

interface User {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface Laboratory {
  name?: string;
  address?: string;
}

interface AddOn {
  name: string;
  quantity: number;
  price: string;
}

interface Service {
  name?: string;
  price?: string;
  unit?: string;
}

interface Payment {
  amount?: string;
  status?: string;
  paymentMethod?: string;
  paymentDate?: string;
}

interface Reservation {
  id?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  quantity?: number;
  status?: string;
  type?: string;
  totalPrice?: string;
  notes?: string;
  user?: User;
  laboratory?: Laboratory;
  service?: Service;
  payments?: Payment[];
  addOns?: AddOn[];
}

interface TemplateEmailReservasiProps {
  reservation?: Reservation;
  logoUrl?: string;
  companyName?: string;
  homeUrl?: string;
  myAccountUrl?: string;
  supportUrl?: string;
}

const baseUrl = getBaseUrl();

export const ReservationConfirmationEmail = ({
  reservation = {},
  logoUrl = `${baseUrl}/assets/images/static/silab-light.png`,
  companyName = "Silab",
  homeUrl = baseUrl,
  myAccountUrl = `${baseUrl}/dashboard/user/akun-saya`,
  supportUrl = `${baseUrl}/tentang-kami`,
}: TemplateEmailReservasiProps) => {
  const {
    id: nomorReservasi = "",
    user = {},
    laboratory = {},
    service = {},
    startDate = "",
    endDate = "",
    startTime = "",
    endTime = "",
    quantity = 0,
    status = "",
    totalPrice = "",
    notes = "",
    payments = [],
    addOns = [],
  } = reservation;

  const statusPembayaran =
    payments[0]?.status === "COMPLETED" ? "LUNAS" : "BELUM LUNAS";
  const metodePembayaran = payments[0]?.paymentMethod ?? "BANK_TRANSFER";

  const previewText = `Konfirmasi Reservasi - ${companyName}`;

  const formatPrice = (price: string) =>
    `Rp ${parseInt(price).toLocaleString("id-ID")}`;

  const calculateServiceTotal = (price: string, quantity: number) =>
    formatPrice((parseInt(price) * quantity).toString());

  const calculateAddOnTotal = (addOn: AddOn) =>
    formatPrice((parseInt(addOn.price) * addOn.quantity).toString());

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[600px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="rounded-t-lg bg-[#F2F2F2] p-5">
              <Img
                src={logoUrl}
                alt={companyName}
                width="160"
                height="auto"
                className="mx-auto"
              />
            </Section>

            <Section className="mt-8 px-5">
              <Heading className="mb-4 text-2xl font-bold text-[#09090B]">
                Konfirmasi Reservasi
              </Heading>
              <Text className="text-[#4F4F4F]">Yth. {user.name},</Text>
              <Text className="mb-6 text-[#4F4F4F]">
                Pemesanan anda telah dikonfirmasi, silakan lakukan pembayaran
                pemesanan anda.
              </Text>
            </Section>

            <Section className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <Heading className="mb-4 text-xl font-bold text-[#09090B]">
                Ringkasan Reservasi
              </Heading>
              <table className="w-full" cellPadding="0" cellSpacing="0">
                <tr>
                  <th className="border-b-2 border-[#E5E7EB] px-4 py-2 text-left text-sm font-semibold text-[#4F4F4F]">
                    Layanan
                  </th>
                  <th className="border-b-2 border-[#E5E7EB] px-4 py-2 text-right text-sm font-semibold text-[#4F4F4F]">
                    Harga
                  </th>
                </tr>
                <tr>
                  <td className="border-b border-[#E5E7EB] px-4 py-2">
                    <Text className="font-semibold text-[#4F4F4F]">
                      {service.name}
                    </Text>
                    <Text className="text-xs text-[#6B7280]">
                      Jumlah: {quantity} | Satuan: {service.unit}
                    </Text>
                  </td>
                  <td className="border-b border-[#E5E7EB] px-4 py-2 text-right">
                    <Text className="text-[#4F4F4F]">
                      {calculateServiceTotal(service.price ?? "0", quantity)}
                    </Text>
                  </td>
                </tr>
                {addOns.map((addOn, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#E5E7EB] px-4 py-2">
                      <Text className="font-semibold text-[#4F4F4F]">
                        {addOn.name}
                      </Text>
                      <Text className="text-xs text-[#6B7280]">
                        Jumlah: {addOn.quantity}
                      </Text>
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-2 text-right">
                      <Text className="text-[#4F4F4F]">
                        {calculateAddOnTotal(addOn)}
                      </Text>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-2 font-bold text-[#09090B]">Total</td>
                  <td className="px-4 py-2 text-right font-bold text-[#09090B]">
                    {formatPrice(totalPrice)}
                  </td>
                </tr>
              </table>
            </Section>

            <Section className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <Heading className="mb-4 text-xl font-bold text-[#09090B]">
                Informasi Reservasi
              </Heading>
              <Text className="mb-2 font-semibold text-[#4F4F4F]">
                Laboratorium:
              </Text>
              <Text className="mb-4 text-[#4F4F4F]">
                {laboratory.name}
                <br />
                {laboratory.address}
              </Text>
              <Text className="mb-2 font-semibold text-[#4F4F4F]">
                Periode Reservasi:
              </Text>
              <Text className="text-[#4F4F4F]">
                Dari:{" "}
                {formatDate(new Date(startDate), "EEEE, dd MMMM yyyy", {
                  locale: id,
                })}{" "}
                -{" "}
                {formatDate(new Date(`1970-01-01T${startTime}Z`), "HH:mm", {
                  locale: id,
                })}
                <br />
                Sampai:{" "}
                {formatDate(new Date(endDate), "EEEE, dd MMMM yyyy", {
                  locale: id,
                })}{" "}
                -{" "}
                {formatDate(new Date(`1970-01-01T${endTime}Z`), "HH:mm", {
                  locale: id,
                })}
              </Text>
            </Section>

            <Section className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <Heading className="mb-4 text-xl font-bold text-[#09090B]">
                Informasi Pembayaran
              </Heading>
              <Text className="mb-2 font-semibold text-[#4F4F4F]">
                Metode Pembayaran:
              </Text>
              <Text className="mb-4 text-[#4F4F4F]">{metodePembayaran}</Text>
              <Text className="mb-2 font-semibold text-[#4F4F4F]">
                Instruksi Pembayaran:
              </Text>
              <Text className="mb-4 text-[#4F4F4F]">
                Silakan lakukan pembayaran sejumlah{" "}
                <strong>{formatPrice(totalPrice)}</strong> ke rekening yang
                tertera detail pemesanan di bagian tab pembayaran. Klik ikon
                mata pada pemesanan anda untuk melihat detail pada{" "}
                <Link href={`${baseUrl}/dashboard/user/pemesanan-saya`}>
                  halaman ini
                </Link>
                .
              </Text>
              <Text className="mb-2 font-semibold text-[#4F4F4F]">
                Status Pembayaran:
              </Text>
              <Text
                className={
                  statusPembayaran === "LUNAS"
                    ? "font-semibold text-[#059669]"
                    : "font-semibold text-[#DC2626]"
                }
              >
                {statusPembayaran}
              </Text>
            </Section>

            {notes && (
              <Section className="mb-6 rounded-lg bg-white p-6 shadow-md">
                <Heading className="mb-4 text-xl font-bold text-[#09090B]">
                  Catatan Reservasi
                </Heading>
                <Text className="text-[#4F4F4F]">{notes}</Text>
              </Section>
            )}

            <Section className="mt-8 text-center">
              <Button
                className="rounded bg-[#09090B] px-5 py-3 text-center text-sm font-semibold text-white no-underline"
                href={`${homeUrl}/dashboard/user/pemesanan-saya`}
              >
                Lihat Status Reservasi
              </Button>
            </Section>

            <Text className="mt-6 text-center text-sm text-[#6B7280]">
              Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim
              dukungan kami.
            </Text>

            <Hr className="my-6 border-t border-[#E5E7EB]" />

            <Section className="text-center">
              <Link className="mx-2 text-sm text-[#6B7280]" href={homeUrl}>
                Beranda
              </Link>
              <Link className="mx-2 text-sm text-[#6B7280]" href={myAccountUrl}>
                Akun Saya
              </Link>
              <Link className="mx-2 text-sm text-[#6B7280]" href={supportUrl}>
                Bantuan
              </Link>
              <Text className="mt-4 text-xs text-[#6B7280]">
                &copy; {new Date().getFullYear()} {companyName}. Hak cipta
                dilindungi undang-undang.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReservationConfirmationEmail;
