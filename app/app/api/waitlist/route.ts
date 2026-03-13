import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "valid email required" }, { status: 400 });
    }
    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        source: "waitlist",
        subscribed: true,
        userGroup: "waitlist",
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.message?.includes("already")) {
        return NextResponse.json({ success: true, alreadySignedUp: true });
      }
      return NextResponse.json({ error: "something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
}
