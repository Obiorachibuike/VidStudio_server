---

# 🎬 Video Editing Platform

A full-stack **video editing platform** built with **Node.js**, **Prisma**, **Cloudinary**, and **FFmpeg**. Upload, trim, subtitle, render, and download videos like a pro! 🚀🎥

![Video Editing](https://example.com/video-editing-image.png) <!-- Replace with actual image URL -->

---

## 📁 Project Structure

```
video-editing-platform/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   └── video.controller.js
│   ├── middlewares/
│   │   └── upload.middleware.js
│   ├── routes/
│   │   └── video.routes.js
│   ├── services/
│   │   └── video.service.js
│   └── utils/
│       └── ffmpeg.js
├── .env
├── package.json
└── README.md
```

---

## ✨ Features

- 📤 **Upload Videos**
- ✂️ **Trim Videos**
- 💬 **Add Subtitles**
- 🎬 **Render Final Video**
- ⬇️ **Download Edited Video**

---

## 💻 Tech Stack

| Tech           | Role                                |
|----------------|-------------------------------------|
| Node.js        | Backend API                         |
| Express        | Server Framework                    |
| Prisma         | Database ORM                        |
| PostgreSQL     | Relational DB                        |
| Cloudinary     | Video Upload & Storage              |
| FFmpeg         | Video Processing                    |
| dotenv         | Environment Variable Management     |

---

## ⚙️ Setup & Run

### ✅ Prerequisites

- Node.js (v14+)
- npm or yarn

### 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/video-editing-platform.git
   cd video-editing-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup `.env`**
   ```env
   DATABASE_URL=your_postgres_url
   PORT=3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_app_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_secret_key
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Migrate DB**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   Your server will run at: `http://localhost:3000` 🎉

---

## 🛰️ API Endpoints

### 1. **Upload**
- `POST /api/videos/upload`
- Upload a video file.
- Returns: Metadata and Cloudinary URL.

### 2. **Trim**
- `POST /api/videos/trim/:id`
```json
{
  "start": "00:00:10",
  "end": "00:02:00"
}
```

### 3. **Subtitles**
- `POST /api/videos/subtitles/:id`
```json
{
  "text": "This is a subtitle",
  "startTime": "00:00:10",
  "endTime": "00:02:00"
}
```

### 4. **Render**
- `POST /api/videos/render/:id`
- Returns the path of final rendered video.

### 5. **Download**
- `GET /api/videos/download/:id`
- Downloads the rendered video.

---

## 🧬 Prisma Schema

```prisma
model Video {
  id                  Int      @id @default(autoincrement())
  name                String
  size                Int
  duration            Int
  cloudinaryUrl       String
  status              String
  trimmedVideoPath    String?
  subtitlesVideoPath  String?
  renderedVideoPath   String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

---

## 🧪 Testing

Set up your test environment (e.g. with Jest), then run:
```bash
npm test
```

---

## 🤝 Contributions

Pull requests and issues welcome! Let’s build together. 🌍

---

## 📝 License

Licensed under the [MIT License](LICENSE). Happy coding! 💻✨

---
