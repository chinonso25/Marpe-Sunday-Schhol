import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
// Handles POST requests to /api

export async function POST(request: { formData: () => any; }) {
  // const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  // const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
  // const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
  const username = 'chinonso25@gmail.com'
  const password = 'mldo clga rmjl rnll'

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

  const formData = await request.formData()
  const file = formData.get('pdf-file')

  try {

    const mail = await transporter.sendMail({
      from: username,
      to: username,

      subject: `Sunday School Form`,
      html: `
            <p>Sunday scjool form</p>
            `,
      attachments: [file]
    })

    return NextResponse.json({ message: "Success: email was sent" })

  } catch (error) {
    console.log(error)
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" })
  }

}