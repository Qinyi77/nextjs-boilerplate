# 開發日誌 (development-log.md)

## 日期: 2025-11-07
### 本日進度
- 建立首頁，包含「查詢老師課表」「學生登入（modal）」「老師登入」按鈕
- 修正路由問題（/teacher/login 與 /teacher/schedule）
- 建立 mock store (lib/mockStore.ts) 並修改路徑錯誤
- 本地啟動 dev server 成功

### 待辦
- 將 mock API 換成 Supabase admin/client 實作
- 建立 teachers 表與 availability 表 SQL（schema）
- 增加 unit test（簡單的 route handler 測試）

