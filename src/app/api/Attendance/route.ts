import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request) {
  return new NextResponse(JSON.stringify({ message: "Success: email was sent" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}



// Helper function to convert a ReadableStream to a Buffer
async function streamToBuffer(readableStream: any) {
  const chunks = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
export async function POST(request) {
  const user = process.env.NEXT_PUBLIC_EMAIL_USERNAME; // Use environment variables
  const pass = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const recipient = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL; // Assuming you have a recipient email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  const formData = await request.formData();
  const file = formData.get('pdf-file'); // Ensure this is the correct field name
  const fileBuffer = await streamToBuffer(file.stream());
  const teacher = formData.get('teacher')
  const teacherSupport = formData.get('teacherSupport')
  const classRoom = formData.get('classRoom')


  try {
    await transporter.sendMail({
      from: 'info',
      to: recipient, // Send to a recipient
      bcc: user,
      subject: `${classRoom} - Sunday School`,
      html: `<p><u><strong>Sunday School Form</strong></u><strong>&nbsp; -&nbsp;</strong></p>

<p><strong>Class: ${classRoom}</strong></p>

<p><strong>Teacher: ${teacher}</strong></p>

<p><strong>Teacher Support: ${teacherSupport}</strong></p>
`,
      attachments: [
        {
          filename: 'form.pdf',
          content: fileBuffer,
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
