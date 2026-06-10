import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Sanitize user input before embedding in HTML ────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── POST /api/contact ───────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // --- Validate fields ---
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message too long (5000 character limit)." },
        { status: 400 }
      );
    }

    // --- Send via Resend ---
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abheeshtr11@gmail.com",
      subject: `Portfolio Contact: ${name.trim()}`,
      replyTo: email.trim(),
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #6366f1;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr style="border: none; border-top: 1px solid #1e1e2e; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
