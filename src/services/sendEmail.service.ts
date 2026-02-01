import { Resend } from 'resend';
import { env } from '../config/env.js';
import colors from 'colors';

type SendEmailServiceProps = {
    to: string;
    subject: string;
    html: string;
};

const resend = new Resend(env.RESEND.API_KEY);

export async function sendEmailService({ to, subject, html }: SendEmailServiceProps) {
    await resend.emails.send({
        from: env.RESEND.USER,
        to,
        subject,
        html,
    });

    if (process.env.NODE_ENV !== 'production') {
        console.log('📧 Email simulated');
        console.log({ to, subject });
        return;
    }

    console.log(colors.cyan.bold(`Email sent to:, ${to}`));
}
