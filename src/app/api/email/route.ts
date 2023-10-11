import { EmailValidator } from "@/lib/validators/email";
import { z } from "zod";
import { mailOptions, transporter } from "@/config/nodemailer";

export async function POST(req: Request) {
  try {
    // const { email, message, name, phone, surname } = EmailValidator.parse(body);

    // console.log(body.subject);

    await transporter.sendMail({
      ...mailOptions,
      subject: "text",
      text: "this is a text",
      html: "<h1>Hello</h1>",
    });

    return new Response("OK");
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(error.message, { status: 500 });
  }
}
