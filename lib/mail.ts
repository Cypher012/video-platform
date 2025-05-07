import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export const mailer = nodemailer.createTransport({
  host: process.env.MAIL_SERVER,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  templateName: string;
  variables?: Record<string, any>;
}

export async function sendEmail({
  to,
  subject,
  templateName,
  variables,
}: EmailOptions) {
  const templatePath = path.join(
    process.cwd(),
    'templates',
    `${templateName}.html`
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  const source = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(source);
  const html = template(variables || {});

  await mailer.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
}
