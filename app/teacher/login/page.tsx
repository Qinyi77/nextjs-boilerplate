"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 這裡放你的登入或 mock 邏輯
    // 範例：把 email 存 localStorage 再導到老師頁（測試用）
    try {
      localStorage.setItem("mock_teacher_email", email);
      window.location.href = "/teacher/schedule";
    } catch {
      // noop
    }
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>老師登入（測試頁）</h1>

      <form onSubmit={onSubmit} style={{ maxWidth: 640 }}>
        <label style={{ display: "block", marginBottom: 8 }}>電子郵件</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teacher@example.com"
          required
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
        />

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 6,
              background: "#0b74de",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            模擬登入 / 確認
          </button>

          {/* 回首頁用 Link，不要把 <a> 放進去 */}
          <Link href="/" style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ddd", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            回首頁
          </Link>
        </div>
      </form>
    </main>
  );
}
