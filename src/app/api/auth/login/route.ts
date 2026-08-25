import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_PASSWORD) {
    await setAdminSession();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Password salah" }, { status: 401 });
}
