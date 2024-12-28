import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { getBaseUrl } from "~/hooks/get-base-url";
import type { ResetPasswordEmailType } from "~/typeSchema/email-types";

const baseUrl = getBaseUrl();

export const ResetPasswordEmailTemplate = ({
  logo = `${baseUrl}/assets/images/static/silab-light.png`,
  newsPageUrl = `${baseUrl}/berita`,
  researchPageUrl = `${baseUrl}/penelitian`,
  laboratoryPageUrl = `${baseUrl}/laboratorium`,
  myReservationPageUrl = `${baseUrl}/dashboard/user/pemesanan-saya`,
  userName,
  resetPasswordToken,
}: ResetPasswordEmailType) => {
  const previewText = `Reset password akun Silab anda`;
  const verificationUrl = `${resetPasswordToken}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[500px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Row>
              <Column align="center">
                <Img alt="React Email logo" height="42" src={logo} />
              </Column>
            </Row>
            <Row className="mt-[40px]">
              <Column align="center">
                <table>
                  <tr>
                    <td className="px-[8px]">
                      <Link
                        className="text-gray-600 [text-decoration:none]"
                        href={newsPageUrl}
                      >
                        Berita
                      </Link>
                    </td>
                    <td className="px-[8px]">
                      <Link
                        className="text-gray-600 [text-decoration:none]"
                        href={researchPageUrl}
                      >
                        Penelitian
                      </Link>
                    </td>
                    <td className="px-[8px]">
                      <Link
                        className="text-gray-600 [text-decoration:none]"
                        href={laboratoryPageUrl}
                      >
                        Laboratorium
                      </Link>
                    </td>
                    <td className="px-[8px]">
                      <Link
                        className="text-gray-600 [text-decoration:none]"
                        href={myReservationPageUrl}
                      >
                        Pemesanan Saya
                      </Link>
                    </td>
                  </tr>
                </table>
              </Column>
            </Row>
            <Heading className="mt-[40px] text-center text-2xl">
              Konfirmasi Perubahan Password Silab
            </Heading>
            {userName && (
              <Text className="mt-[40px]">
                Halo, <strong>{userName}</strong>,
              </Text>
            )}
            <Text className="text-justify">
              Kami menerima permintaan untuk mereset password akun Silab Anda.
              Jika permintaan ini dari Anda, silakan konfirmasi dengan mengklik
              tautan di bawah ini.
            </Text>

            <Section className="mb-[16px] mt-[32px] text-center">
              <Button
                className="w-[350px] rounded bg-[#000000] px-4 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={verificationUrl}
              >
                Reset Password
              </Button>
              <Text className="text-[14px] text-zinc-500">
                Jika tombol tidak bekerja, klik{" "}
                <Link
                  href={verificationUrl}
                  className="text-blue-600 no-underline"
                >
                  disini
                </Link>{" "}
                untuk melakukan reset password.
              </Text>
            </Section>

            <Text className="text-justify">
              Jika Anda tidak meminta reset password, Anda dapat mengabaikan
              pesan ini dan tidak ada tindakan lebih lanjut yang diperlukan.
            </Text>

            <Hr className="my-[32px] border-t-2 border-gray-200" />

            <Section className="text-center">
              <table className="w-full">
                <tr className="w-full">
                  <td align="center">
                    <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
                      Sistem Informasi Laboratorium
                    </Text>
                    <Text className="mb-0 mt-[4px] text-[16px] leading-[24px] text-gray-500">
                      Jurusan Kesehatan Politeknik Negeri Jember
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Text className="my-[8px] leading-[24px]">
                      Jl. Mastrip POBOX 164 Jember
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmailTemplate;
