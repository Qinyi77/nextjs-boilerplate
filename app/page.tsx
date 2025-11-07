// app/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotice("請輸入有效的電子郵件地址");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setNotice("已發送登入連結到你的信箱（請檢查收件匣）。");
        setEmail("");
      } else {
        const text = await res.text().catch(() => null);
        setNotice(text || "伺服器回應失敗。已使用本機模擬登入（僅開發用）。");
        try {
          localStorage.setItem("mock_student_email", email);
          window.location.href = "/student/schedule";
        } catch {}
      }
    } catch (err) {
      setNotice("無法連線到 /api/auth/magic-link，改以本機模擬登入並導向學生頁。");
      try {
        localStorage.setItem("mock_student_email", email);
        window.location.href = "/student/schedule";
      } catch {}
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        padding: 32,
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
        家教管理平台
      </h1>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* 正確用法：不要 legacyBehavior，直接把 Link 當作可點擊元素 */}
        <Link
          href="/teacher/schedule"
          style={{
            display: "inline-block",
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "inherit",
          }}
        >
          進入老師課表
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: "#0b74de",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 700,
            boxShadow: "0 2px 6px rgba(11,116,222,0.18)",
          }}
        >
          學生登入
        </button>

        <Link
          href="/teacher/login"
          style={{
            display: "inline-block",
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "inherit",
          }}
        >
          老師登入
        </Link>
      </div>

      <p style={{ marginTop: 20, color: "#666" }}>
        （提示）按下「學生登入」會開啟輸入信箱的彈窗。若你已經有後端 API
        <code> /api/auth/magic-link </code>
        或 Supabase magic link，表單會嘗試呼叫它並送出。
      </p>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            zIndex: 9999,
            padding: 20,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 420,
              maxWidth: "100%",
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>學生登入</h2>

            <form onSubmit={submitEmail}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14 }}>
                電子郵件
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  marginBottom: 12,
                }}
                required
              />

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#0b74de",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {loading ? "處理中…" : "發送登入連結 / 模擬登入"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setNotice(null);
                  }}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  取消
                </button>
              </div>
            </form>

            {notice && (
              <div
                style={{
                  marginTop: 12,
                  padding: 8,
                  borderRadius: 6,
                  background: "#fff3cd",
                  color: "#664d03",
                  border: "1px solid #ffeeba",
                }}
              >
                {notice}
              </div>
            )}

            <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
              注意：
              <ul>
                <li>
                  若你要用 Supabase magic link，請自行建立 API 路由
                  <code>/api/auth/magic-link</code>，後端呼叫 Supabase 發送 magic
                  link。
                </li>
                <li>目前示範行為會在找不到 API 時以 localStorage 模擬登入。</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
