import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseAdmin"; // 沒設定別名就換成 ../../../../lib/supabaseAdmin

// 讀取某位老師目前已被預約的時段
// GET /api/bookings?teacherId=t-001
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get("teacherId") || "";
  const { data, error } = await supabase
    .from("bookings")
    .select("day,time,student_id")
    .eq("teacher_id", teacherId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// 建立預約並關掉可預約時段
// POST body: { teacherId, day, time, studentId }
export async function POST(req: Request) {
  const { teacherId, day, time, studentId } = await req.json();
  if (!teacherId || day === undefined || !time || !studentId) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  // 建立 booking（有唯一鍵，衝突會報錯）
  const { error } = await supabase
    .from("bookings")
    .insert({ teacher_id: teacherId, day, time, student_id: studentId });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 關掉 availability 該時段
  await supabase
    .from("availability")
    .delete()
    .eq("teacher_id", teacherId)
    .eq("day", day)
    .eq("time", time);

  return NextResponse.json({ success: true });
}
