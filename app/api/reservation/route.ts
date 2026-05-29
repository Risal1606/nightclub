// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import { z } from "zod";
import { NextResponse } from "next/server";

const schema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  table: z.string().min(1, "Please select a table."),
  guests: z.string().min(1, "Please enter the number of guests."),
  date: z.string().min(1, "Please select a date."),
  phone: z.string().min(1, "Please enter your phone number."),
  eventId: z.union([z.number(), z.null()]).optional(),
  comment: z.string().optional(),
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
    const res = await fetch(`${apiUrl}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (res.status === 409) {
      return NextResponse.json(
        { error: "This table is already reserved for the selected date." },
        { status: 409 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "Booking failed. Please try again." },
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
