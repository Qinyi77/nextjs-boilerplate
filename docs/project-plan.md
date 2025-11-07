# 家教管理系統 — 專案規劃 (project-plan.md)

## 專案名稱
家教預約與管理平台

## 目標
建立一個雙角色（老師/學生）平台，支援：課表查詢/預約、登入驗證（magic link / mock）、教師排程管理、mock API 到 Supabase 的串接。

## 優先功能（MVP）
1. 顯示老師課表（teacher/schedule）
2. 學生端：查表 + 模擬預約（mock）
3. 老師端：登入、管理可預約時段
4. 身份驗證：先用 mock，完成後接 Supabase
5. API 層：/api/availability, /api/bookings, /api/auth/magic-link

## 技術堆疊
- Next.js (App Router, TypeScript)
- React + Hooks
- Supabase (Postgres) - 之後接實際 DB
- GitHub 用於版本與文件記錄

