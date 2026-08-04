import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { login?: string; password?: string };
  const login = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!login || !password) {
    return NextResponse.json(
      { message: "Admin credentials are not configured on this environment." },
      { status: 503 }
    );
  }

  if (body.login === login && body.password === password) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
}
