"use server";

import transport from "@/lib/nodemailer";

interface SendSignupUserEmailProps {
  email: string;
  token: string;
}

export async function sendSignupUserEmail({
  email,
  token,
}: SendSignupUserEmailProps) {
  console.log(`Sending email to ${email} with token ${token}`);

  await transport.sendMail({
    from: `Auth Team <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
    to: email,
    subject: "Verify your email address",
    html: `<div>
    // <p>Hi there,</p>

    //      <p>
    //     //  <a href="${process.env.AUTH_URL}/auth/signup/verify-email?token=${token}">Verify Email</a>           
    //      </p>
    // </div>
    `, // i can replace the href with a variable that goes to a proper link when deploying
  });

  console.log(`Email sent to ${email} with token ${token}`);
}
