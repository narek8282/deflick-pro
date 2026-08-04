import { NextRequest, NextResponse } from "next/server";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function getIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const now = Date.now();
  const current = attempts.get(ip);

  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ message: "Too many inquiries. Try again later." }, { status: 429 });
  }

  attempts.set(ip, {
    count: current && current.resetAt > now ? current.count + 1 : 1,
    resetAt: now + WINDOW_MS
  });

  const body = (await request.json()) as {
    name?: string;
    email?: string;
    project?: string;
    website?: string;
  };

  if (body.website) {
    return NextResponse.json({ message: "Thanks. The inquiry was received." });
  }

  if (!body.name || !body.email || !body.project || body.project.length < 10) {
    return NextResponse.json({ message: "Add your name, email and project details." }, { status: 400 });
  }

  // Production handoff: connect this to Payload, email, or a CRM action once credentials exist.
  console.info("Deflick inquiry", {
    name: body.name,
    email: body.email,
    project: body.project.slice(0, 240),
    receivedAt: new Date().toISOString()
  });

  return NextResponse.json({ message: "Inquiry received. DeFlick will reply from the business email." });
}
