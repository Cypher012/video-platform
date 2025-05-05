import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

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
  variables?: Record<string, string>;
}

export async function sendEmail({
  to,
  subject,
  templateName,
  variables,
}: EmailOptions) {
  const templatePath = path.join(
    process.cwd(),
    '/app/templates',
    `${templateName}.html`
  );
  console.log(templatePath);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  let html = fs.readFileSync(templatePath, 'utf-8');

  // Simple variable replacement: {{varName}}
  if (variables) {
    for (const [key, value] of Object.entries(variables)) {
      html = html.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value);
    }
  }

  await mailer.sendMail({
    from: `${process.env.FROM_NAME}`,
    to,
    subject,
    html,
  });
}
