"use client";
import { useEffect, useMemo, useState, Fragment } from "react";

type Slot = { day: number; time: string; available: boolean };
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const ORDER = [1,2,3,4,5,6,0];
const TIMES = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","19:00","20:00"];

const TEACHER_ID = "t-001";
// 假資料：等導入 Supabase Auth 後改成 auth.uid()
const STUDENT_ID = "00000000-0000-0000-0000-000000000001";

function seed(): Slot[] {
  const s: Slot[] = [];
  for (let d = 0; d <= 6; d++) for (const t of TIMES) s.push({ day: d, time: t, available: false });
  return s;
}

export default function Page() {
  const [slots, setSlots] = useState<Slot[]>(useMemo(seed, []));

  const by = (d:number,t:string) => slots.find(s => s.day===d && s.time===t);

  // 載入：可預約時段=availability，已被預約=bookings
  useEffect(() => {
    (async () => {
      const [availRes, bookedRes] = await Promise.all([
        fetch(`/api/availability?teacherId=${TEACHER_ID}`),
        fetch(`/api/bookings?teacherId=${TEACHER_ID}`)
      ]);
      const avail: {day:number; time:string}[] = availRes.ok ? await availRes.json() : [];
      const booked: {day:number; time:string}[] = bookedRes.ok ? await bookedRes.json() : [];

      const openSet = new Set(avail.map(x => `${x.day}-${x.time}`));
      const bookedSet = new Set(booked.map(x => `${x.day}-${x.time}`));

      setSlots(prev => prev.map(s => ({
        ...s,
        // 學生端只顯示「可選」：有在 availability 且尚未被 bookings 佔用
        available: openSet.has(`${s.day}-${s.time}`) && !bookedSet.has(`${s.day}-${s.time}`)
      })));
    })();
  }, []);

  const book = async (d:number, t:string) => {
    const resp = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacherId: TEACHER_ID, day: d, time: t, studentId: STUDENT_ID })
    });
    if (!resp.ok) { alert("預約失敗"); return; }
    // 樂觀更新：點了就變不可選
    setSlots(prev => prev.map(s =>
      s.day===d && s.time===t ? { ...s, available: false } : s
    ));
    alert("預約成功");
  };

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>學生預約</h1>

      <div style={{ display:"grid", gridTemplateColumns:"100px repeat(7,1fr)", gap:8 }}>
        <div />
        {ORDER.map(d => (
          <div key={`h-${d}`} style={{ textAlign:"center", fontWeight:700, padding:"10px 0", background:"#f5f5f5", border:"1px solid #e5e5e5", borderRadius:6 }}>
            {DAYS[d]}
          </div>
        ))}

        {TIMES.map(t => (
          <Fragment key={t}>
            <div style={{ padding:"10px 6px", fontWeight:700 }}>{t}</div>
            {ORDER.map(d => {
              const s = by(d,t);
              const on = !!s?.available;
              return (
                <button
                  key={`${d}-${t}`}
                  disabled={!on}
                  onClick={() => book(d,t)}
                  style={{
                    padding:"12px 8px",
                    border:"1px solid #e5e5e5",
                    borderRadius:6,
                    background: on ? "#e6ffec" : "#f7f7f7",
                    cursor: on ? "pointer" : "not-allowed",
                    opacity: on ? 1 : 0.6
                  }}
                >
                  {on ? "預約" : "不可預約"}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>

      <p style={{ marginTop:12, color:"#666" }}>學生只能看到可預約「空位」，不會顯示其他學生資料。</p>
    </main>
  );
}
