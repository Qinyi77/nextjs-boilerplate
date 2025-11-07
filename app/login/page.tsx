"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [msg, setMsg] = useState("");

  async function handleSubmit() {
    setMsg("");
    if (mode === "signup") {
      const { error } = await supabaseBrowser.auth.signUp({
        email,
        password,
      });
      if (error) return setMsg(error.message);
      setMsg("註冊成功，請登入。");
      setMode("signin");
      return;
    }

    if (mode === "signin") {
      const { data, error } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return setMsg(error.message);
      setMsg("登入成功");
      // 登入後導向不同角色頁面
      if (role === "teacher") location.href = "/teacher/schedule";
      else location.href = "/student/schedule";
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "60px auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>
        {mode === "signin" ? "登入" : "註冊"}
      </h1>

      {mode === "signup" && (
        <div style={{ marginBottom: 8 }}>
          <label>身分：</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            style={{ padding: 6 }}
          >
            <option value="teacher">老師</option>
            <option value="student">學生 / 家長</option>
          </select>
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          marginBottom: 8,
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

      <input
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          marginBottom: 8,
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 4,
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {mode === "signin" ? "登入" : "註冊"}
      </button>

      <p style={{ color: "#c00", marginTop: 8 }}>{msg}</p>

      <p style={{ marginTop: 12, textAlign: "center" }}>
        {mode === "signin" ? (
          <>
            沒有帳號？{" "}
            <a href="#" onClick={() => setMode("signup")}>
              註冊
            </a>
          </>
        ) : (
          <>
            已有帳號？{" "}
            <a href="#" onClick={() => setMode("signin")}>
              登入
            </a>
          </>
        )}
      </p>
    </main>
  );
}
