import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_ENCRYPTION === "ssl",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendConsultationEmail({
  to,
  fullName,
}: {
  to: string;
  fullName: string;
}) {
  return transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to,
    subject: "Konsultasi Baru Diterima",
    html: `<p>Halo ${fullName},</p><p>Terima kasih telah mengisi formulir konsultasi. Kami akan segera menghubungi Anda.</p>`,
  });
}
