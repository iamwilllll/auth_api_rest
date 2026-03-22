import nodemailer from 'nodemailer';
import { env } from '@/config/env.js';

type SendEmailServiceProps = {
    to: string;
    subject: string;
    text?: string;
    html: string;
};

const { HOST, PORT, SECURE, USER, PASSWORD } = env.SMTP;
const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: SECURE,
    auth: {
        user: USER,
        pass: PASSWORD,
    },
} as nodemailer.TransportOptions);

export async function sendEmailService({ to, subject, text, html }: SendEmailServiceProps) {
    if (env.isDev) {
        console.log({ to, subject, text });
        return;
    }

    await transporter.sendMail({ from: `"Auth API" <${USER}>`, to, subject, text, html });
}
