import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const username = process.env.EMAIL_USERNAME; // Use environment variables
  const password = process.env.EMAIL_PASSWORD;
  const recipient = process.env.RECIPIENT_EMAIL; // Assuming you have a recipient email

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  });

  const formData = await request.formData();
  const file = formData.get('pdf-file'); // Ensure this is the correct field name

  try {
    await transporter.sendMail({
      from: username,
      to: recipient, // Send to a recipient
      subject: `Sunday School Form`,
      html: `<p>Sunday School form</p>`,
      attachments: [
        {
          filename: 'form.pdf',
          content: file.stream(),
          contentType: 'application/pdf'
        }
      ],
    });

    return new NextResponse(JSON.stringify({ message: "Success: email was sent" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "COULD NOT SEND MESSAGE" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
