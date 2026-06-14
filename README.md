# Extensipedia Frontend

Frontend publik Extensipedia dibangun dengan Next.js, React, Tailwind CSS, dan npm.

## Requirement

- Node.js 20 atau lebih baru
- npm
- Backend Extensipedia berjalan dan bisa diakses dari frontend

Project ini memakai:

- Next.js `16.1.6`
- React `19.2.3`
- npm dengan `package-lock.json`

## Clone Project

```bash
git clone https://github.com/rafasoelistiono/extensipedia-frontend.git
cd extensipedia-frontend
```

## Install Dependency

```bash
npm ci
```

Gunakan `npm ci` untuk install dependency sesuai `package-lock.json`.

## Setup Environment

Buat file `.env.local` dari `.env.example`.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Linux/macOS:

```bash
cp .env.example .env.local
```

Isi default untuk development lokal:

```env
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:8000/
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Catatan:

- `NEXT_PUBLIC_API_BASE_URL` harus berupa origin saja.
- Jangan tambahkan `/api/v1` di env, karena path API sudah ditambahkan oleh kode frontend.
- Jika backend berjalan di domain atau port lain, sesuaikan dua value di `.env.local`.

## Jalankan Development Server

Pastikan backend lokal sudah berjalan, lalu jalankan frontend:

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

## Script yang Tersedia

```bash
npm run dev
```

Menjalankan Next.js development server.

```bash
npm run build
```

Membuat build production.

```bash
npm run start
```

Menjalankan build production. Jalankan `npm run build` terlebih dahulu.

```bash
npm run lint
```

Menjalankan ESLint.

## Build Production Lokal

```bash
npm run build
npm run start
```

Default Next.js akan berjalan di:

```text
http://localhost:3000
```

Jika ingin menentukan host dan port:

```bash
npm run start -- -H 127.0.0.1 -p 3000
```

## Struktur Utama

```text
app/                    Route dan halaman Next.js
components/             Komponen UI
lib/                    Helper API dan utilitas frontend
public/                 Asset publik
.env.example            Contoh environment variable
package.json            Script dan dependency
```

## Endpoint Backend yang Dipakai

Frontend mengambil data dari backend melalui `NEXT_PUBLIC_API_BASE_URL`, terutama endpoint public seperti:

```text
/api/v1/public/academic/...
/api/v1/public/competency/...
/api/v1/public/career/...
/api/v1/public/advocacy/...
/api/v1/public/aspirations/...
```

Frontend juga punya route API internal Next.js:

```text
/api/aspirations/submit
/api/aspirations/track
/api/aspirations/{id}/upvote
/api/aspirations/{id}/vote
```

Route internal ini dipakai sebagai proxy terkontrol dari browser ke backend.

## Troubleshooting

Jika data tidak muncul:

1. Pastikan backend berjalan.
2. Pastikan `.env.local` sudah ada.
3. Pastikan `NEXT_PUBLIC_API_BASE_URL` mengarah ke origin backend yang benar.
4. Jangan isi `NEXT_PUBLIC_API_BASE_URL` dengan suffix `/api/v1`.
5. Restart dev server setelah mengubah `.env.local`.

Jika dependency bermasalah:

```bash
rm -rf node_modules
npm ci
```

Di PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```
