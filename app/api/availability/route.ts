// app/api/availability/route.ts
import { NextResponse } from "next/server";
import { getTeacherBookings, hasBooking } from "@/lib/libmockStore";

const TIMES = [
  "08:00","09:00","10:00","11:00",
  "13:00","14:00","15:00","16:00",
  "19:00","20:00"
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const teacherId = url.searchParams.get("teacherId") || "";
  const slots: Array<{ day: number; time: string; available: boolean }> = [];
  for (let d = 0; d <= 6; d++) {
    for (const t of TIMES) {
      const available = teacherId ? !hasBooking(teacherId, d, t) : true;
      slots.push({ day: d, time: t, available });
    }
  }
  return NextResponse.json(slots);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teacherId, day, time } = body;
    if (!teacherId || day === undefined || !time) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }
    // mock: no permanent store change for availability POST
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
