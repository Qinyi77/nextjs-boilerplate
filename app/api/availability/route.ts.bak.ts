import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseAdmin";

// GET /api/availability?teacherId=t-001
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get("teacherId");

  const base = supabase.from("availability").select("day,time");
  const { data, error } = teacherId ? await base.eq("teacher_id", teacherId) : await base;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST 新增/打開時段
export async function POST(req: Request) {
  const { teacherId, day, time } = await req.json();
  if (!teacherId || day === undefined || !time)
    return NextResponse.json({ error: "missing fields" }, { status: 400 });

  const { error } = await supabase
    .from("availability")
    .upsert({ teacher_id: teacherId, day, time }, { onConflict: "teacher_id,day,time" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE 關閉時段
export async function DELETE(req: Request) {
  const { teacherId, day, time } = await req.json();
  if (!teacherId || day === undefined || !time)
    return NextResponse.json({ error: "missing fields" }, { status: 400 });

  const { error } = await supabase
    .from("availability")
    .delete()
    .eq("teacher_id", teacherId)
    .eq("day", day)
    .eq("time", time);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
