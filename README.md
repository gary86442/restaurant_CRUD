# 餐廳清單 2.0

使用者可以自行記錄餐廳資訊，(包含修改和刪除功能)

## 專案畫面

![image](https://github.com/gary86442/restaurant_CRUD/blob/main/public/img/restaurant_home.png)

![image](https://github.com/gary86442/restaurant_CRUD/blob/main/public/img/restaurant_show.png)

## 功能列表

- 點選新增餐廳以新增餐廳資訊
- 點選:information_source: 檢視餐廳詳細資訊(包含類別、地址、電話、評分、圖片及 Google Map)
- 點選 ✏️ 編輯此筆餐廳資料
- 點選 🗑️ 刪除此筆餐廳資料
- 依照餐廳名稱及餐廳類別搜尋

## 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/gary86442/restaurant_CRUD.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurantList
```

3. 安裝 npm 套件

> 在 Terminal 輸入

```
 npm install
```

4. 安裝 nodemon 套件

> 在 Terminal 輸入

```
nodemon app.js
```

5. 匯入種子檔案

> 在 Terminal 找到 Seeder.js 檔案

```

執行 node models/seeds/Seeder.js 匯入使用者與餐廳資料
```

> 當 terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行

```
Mongodb is connected!

User and Restaurant data get done!
```

6. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
The Express server is running on http://localhost:3000

Mongodb is connected!
```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用。

## 使用套件及工具

1. "express": "^4.18.2"
2. "express-handlebars": "^6.0.7"
3. "mongoose": "^6.9.1"
4. MongoDB

## 開發者

> [Gary](https://github.com/gary86442)
