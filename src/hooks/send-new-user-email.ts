import nodemailer from "nodemailer";

import type { NewUserEmailType } from "~/typeSchema/email-types";

import { env } from "~/env";
import { getBaseUrl } from "./get-base-url";
import { createEmailRenderer } from "./email-renderer";

import NewUserEmailTemplate from "~/components/ui/email/new-user";

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: env.SMTP_USER,
//     pass: env.SMTP_PASS,
//   },
// });
// Looking to send emails in production? Check out our Email API/SMTP product!

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9f98b68d6c6d61",
    pass: "4f8bd797d4a17f",
  },
});

const renderVerificationEmail =
  createEmailRenderer<NewUserEmailType>(NewUserEmailTemplate);

export async function sendNewUserEmail({
  to,
  token,
  userName,
}: {
  to: string;
  token: string;
  userName: string;
}): Promise<void> {
  const baseUrl = getBaseUrl();
  const verificationLink = new URL(`${baseUrl}/verifikasi-akun`);
  verificationLink.searchParams.set("token", token);

  const emailHtml = await renderVerificationEmail({
    userName: userName,
    verificationToken: verificationLink.href,
  });

  await sendEmail(to, "Verifikasi Akun Silab Anda", emailHtml);
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const mailOptions = {
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
}
