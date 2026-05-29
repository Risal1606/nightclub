// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import { z } from "zod";
import { NextResponse } from "next/server";

const schema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  comment: z.string().min(1, "Please enter a message."),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const result = schema.safeParse(body);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = String(issue.path[0]);
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    });
    return NextResponse.json({ errors: fieldErrors }, { status: 400 });
  }

  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/contact_messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result.data, date: new Date().toISOString() }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Could not connect to the server. Please try again later." },
      { status: 503 }
    );
  }
}
