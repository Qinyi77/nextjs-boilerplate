# 問題與解決 (problem-solutions.md)

## 問題 1：Link 與 <a> 的衝突
**症狀**：Next.js 新版 Link 不能包 `<a>`，會拋錯。
**解法**：移除多餘的 `<a>` 或使用 `<Link legacyBehavior>`。已改為直接 `<Link>文字</Link>`。

## 問題 2：模組找不到 (lib 路徑)
**症狀**：`Cannot find module '@/lib/mockStore'`
**解法**：修正 alias 或檔名（例如 `@/lib/libmockStore`），並在 `tsconfig.json` 的 `paths` 與 VScode 設定同步。

## 問題 3：next dev 被 lock
**症狀**：dev server 執行失敗，出現 lock 檔或 3000 port 被佔用。
**解法**：查 PID 並 kill，刪除 `.next/dev/lock`，重新啟動。

