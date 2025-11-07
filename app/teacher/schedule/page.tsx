// app/teacher/schedule/page.tsx
"use client";
import React from "react";
import Link from "next/link";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const TIMES = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","19:00","20:00"];

export default function TeacherSchedulePage() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, Arial", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>老師課表（測試）</h1>
      <p style={{ color: "#666" }}>這是沒有驗證的測試頁。以後再把驗證/redirect 放回來。</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 18 }}>
        <thead>
          <tr><th style={{ padding: 8 }}>時間</th>{DAYS.map(d => <th key={d} style={{ padding: 8 }}>{d}</th>)}</tr>
        </thead>
        <tbody>
          {TIMES.map(t => (
            <tr key={t}>
              <td style={{ padding: 8, fontWeight: 700 }}>{t}</td>
              {DAYS.map(d => (
                <td key={d+t} style={{ padding: 8 }}>
                  <div style={{ border: "1px solid #eee", padding: 8, borderRadius: 6, textAlign: "center" }}>關閉</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
  <Link href="/teacher/login" style={{ marginRight: 12 }}>
    老師登入
  </Link>

  <Link href="/">回首頁</Link>
</div>

    </main>
  );
}
