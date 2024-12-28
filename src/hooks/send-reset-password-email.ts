import nodemailer from "nodemailer";

import type { ResetPasswordEmailType } from "~/typeSchema/email-types";

import { env } from "~/env";
import { getBaseUrl } from "./get-base-url";
import { createEmailRenderer } from "./email-renderer";

import ResetPasswordEmailTemplate from "~/components/ui/email/reset-password-email";

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

const renderResetPasswordEmail = createEmailRenderer<ResetPasswordEmailType>(
  ResetPasswordEmailTemplate,
);

export async function sendResetPasswordEmail({
  to,
  userName,
  resetPasswordToken,
}: {
  to: string;
  userName: string;
  resetPasswordToken: string;
}) {
  const baseUrl = getBaseUrl();
  const verificationLink = new URL(`${baseUrl}/lupa-password`);
  verificationLink.searchParams.set("token", resetPasswordToken);

  const html = await renderResetPasswordEmail({
    userName,
    resetPasswordToken: verificationLink.href,
  });

  await sendEmail(to, "Reset Password Silab Anda", html);
}

async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email",
    );
  }
}
