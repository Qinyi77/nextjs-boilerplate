// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { getTeacherBookings, hasBooking, addBooking, Booking } from "@/lib/libmockStore";

/**
 * GET /api/bookings?teacherId=t-001
 * 回傳該老師的 bookings（或全部）
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const teacherId = url.searchParams.get("teacherId") || undefined;
  const data = getTeacherBookings(teacherId);
  return NextResponse.json(data);
}

/**
 * POST /api/bookings
 * body: { teacherId, day, time, studentId }
 * - 若該時段已被預約回 409
 * - 成功回 { ok: true }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teacherId, day, time, studentId } = body as Partial<Booking>;

    if (!teacherId || day === undefined || !time || !studentId) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const dayNum = Number(day);
    if (Number.isNaN(dayNum) || dayNum < 0 || dayNum > 6) {
      return NextResponse.json({ error: "invalid day" }, { status: 400 });
    }

    if (hasBooking(teacherId, dayNum, time)) {
      return NextResponse.json({ error: "slot already booked" }, { status: 409 });
    }

    addBooking({ teacherId, day: dayNum, time, studentId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
