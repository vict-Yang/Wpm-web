# wp-final  

## 安裝與測試步驟
- 在frontend資料夾，先執行yarn來下載套件，然後yarn start就可以打開前端了。  
- 在backend資料夾，先執行yarn來下載套件，然後yarn server就可以打開後端了。  

## 組員負責項目：  
### 楊心岑 
- 打字界面，保括字的顏色顯示，auto scroll，以及cursor的移動
- wpm折線圖顯示
- demo 錄影 
### 林庭宇  
- 文章生成、個人紀錄儲存、個人紀錄顯示
### 嚴詩順  
- 登入機制：使用jsonwebtoken來驗證使用者，使用bcrypt來加密密碼，前端則是使用react-auth-kit來實現登入機制
- 登入頁面、註冊頁面：設計參考了MUI官方的sample頁面，並使用Formik來簡化表格的實作（處理submit、驗證每個欄位的合理性等等）
- 定義前端的Routes
- 排行榜（前端 + 後端）
- Profile頁面（不包括chart）：排版、實作改密碼機制等等
- deploy