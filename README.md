# AI Agent Super Power — Landing Page

Landing page giới thiệu hệ thống "12 AI Agent" của KP3 (React + Vite + Tailwind v4).

## Yêu cầu

- **Node.js** ≥ 20.x
- **npm** ≥ 10.x (đi kèm Node)

## Cài đặt & chạy

```bash
# 1. Cài dependency
npm install

# 2. Chạy dev server (mặc định port 3000)
npm run dev
# → http://localhost:3000/12-assp/

# 3. Build production (output sẽ ở thư mục 12-assp/)
npm run build

# 4. Preview build cục bộ
npm run preview
```

## Cấu trúc thư mục

```
.
├── src/
│   ├── components/      # React components (Hero, Footer, FeedbackChallenge, ...)
│   ├── lib/             # Helpers (lenis smooth scroll, ...)
│   ├── assets/          # Local fonts (PODIUM Sharp .ttf)
│   ├── App.tsx          # Root component, mount thứ tự các section
│   ├── main.tsx         # React DOM entry
│   └── index.css        # Tailwind import + global styles + keyframes
├── public/              # Tài nguyên tĩnh (ảnh, video, logo, feedback, testimonials)
├── index.html           # Root HTML, có Facebook Pixel snippet
├── package.json         # Dependencies + scripts
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config (base, outDir, plugins)
├── INTEGRATION.md       # Tài liệu wiring form đăng ký với FluentCart
└── SETUP.md             # Tài liệu hệ thống delivery email sau thanh toán
```

## Deploy

### Netlify (drag-drop)

```bash
# Build với base path tương đối để portable
npx vite build --base=./ --outDir=dist

# Kéo thư mục dist/ vào https://app.netlify.com/drop
```

Hoặc dùng Netlify CLI:

```bash
netlify deploy --dir=dist --prod
```

### Subpath deploy (giữ `/12-assp/`)

```bash
npm run build      # output ra thư mục 12-assp/, paths bắt đầu bằng /12-assp/
```

Upload nội dung `12-assp/` lên server tại đường dẫn `https://example.com/12-assp/`.

## Ghi chú

- **Form đăng ký** (`PackageForm.tsx`) hiện đang gọi endpoint `/wp-json/sepay/v1/checkout` — xem `INTEGRATION.md` và `SETUP.md` để biết cách wire backend FluentCart + SePay + email automation.
- **Facebook Pixel** ID `744582444678962` được hard-code trong `index.html`.
- **Logo Fluentcom** (`fluentcom-logo.webp`) ở `public/` là logo brand đang dùng cho landing này.
- **Smooth scroll** dùng [Lenis](https://github.com/darkroomengineering/lenis) — wrapper trong `src/lib/lenis.ts`.

## Stack

- React 19
- Vite 6
- TypeScript 5
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Motion (Framer Motion successor)
- Lucide React (icons)
- Lenis (smooth scroll)
