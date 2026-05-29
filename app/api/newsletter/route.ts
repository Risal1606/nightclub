// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import { z } from "zod";
import { NextResponse } from "next/server";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/newsletters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: result.data.email }),
    });

    if (res.status === 409) {
      return NextResponse.json(
        { error: "This email address is already subscribed to our newsletter." },
        { status: 409 }
      );
    }

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
