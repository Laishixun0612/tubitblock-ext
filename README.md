# tubitblock-ext

提供 **TubitBlock** 使用的外部裝置（devices）與擴充積木（extensions）。

本專案由 **東業創新科技 DongYe Technology** 維護，  
主要用於讓 TubitBlock 透過「自動更新」取得最新的擴展資源。

---

## 專案說明

`tubitblock-ext` 主要包含：

- `devices/`  
  控制板定義。

- `extensions/`  
  各種感測器、馬達、顯示器、AI 模組等對應的積木擴展。

- `buildResources/`  
  打包與發佈 external resources 用的建置腳本（Webpack 等）。

這個 repo 會被 TubitBlock 的「外部資源更新系統」讀取，  
當有新版本發佈時，TubitBlock 會自動下載並更新到使用者端。

---

## 如何使用（給使用者）

一般使用者 **不需要手動下載本專案**。  

只要安裝我們的 TubitBlock：

1. 開啟 TubitBlock
2. TubitBlock 會在啟動時檢查 `tubitblock-ext` 是否有新版本
3. 若有更新，會自動下載新的 devices / extensions

---

## 如何貢獻（給開發者 / 內部成員）

若你要為 TubitBlock 新增裝置或擴充積木：

1. 在 `devices/` 或 `extensions/` 中新增或修改對應檔案  
2. 在本機測試 TubitBlock 是否能正常載入與使用  
3. 提交 Pull Request 或由維護者直接 commit 到本專案
4. 更新 `config.json` 中的 `version` 版本號（例如從 `1.0.0` 改為 `1.0.1`）
5. 推送到 GitHub 後，使用者下次開啟 TubitBlock 即可自動更新

> 註：版本號僅用於 TubitBlock 檢查更新，請依照實際發佈節奏遞增。

---

## 語系 / 翻譯

目前擴展的多語系翻譯檔位於 `extensions/` 或 `devices/` 對應目錄中。  
若要新增或修改翻譯：

1. 修改對應的語系檔（例如 `zh-tw`, `en` 等）
2. 確認積木在 TubitBlock 中顯示正常
3. 提交修改到本專案

未來若建立專用翻譯流程（例如線上翻譯平台），  
將會在此 README 中補充說明。

---

## 開發與打包

如需重新打包 external resources，可使用 `buildResources` 內的腳本：

```bash
npm install
npm run build
