# Frontend Deployment Requirements

## Tujuan deployment

Frontend publik berjalan di path `/` pada VPS yang sama dengan backend. Backend tetap melayani admin, public API, static admin, dan media backend.

Target routing:
- `https://<domain-atau-ip>/` -> Next.js frontend publik
- `https://<domain-atau-ip>/admin/` -> backend admin
- `https://<domain-atau-ip>/api/v1/` -> backend public API
- `https://<domain-atau-ip>/static/` -> backend static files
- `https://<domain-atau-ip>/media/` -> backend uploaded media

Prinsip utama: browser harus melihat frontend dan backend sebagai origin yang sama agar tidak perlu konfigurasi CORS untuk public flow.

## Stack frontend saat ini

Project ini memakai:
- Next.js `16.1.6`
- React `19.2.3`
- Node.js minimal `20.9.0`, mengikuti `engines` dari package Next lokal
- Package manager: npm, karena repo memiliki `package-lock.json`

Script yang dipakai saat deployment:

```bash
npm ci
npm run build
npm run start
```

Runtime Next default memakai port `3000`. Jalankan service di loopback, misalnya `127.0.0.1:3000`, lalu expose hanya lewat reverse proxy.

## Route publik frontend

Route halaman publik yang harus diarahkan ke Next:
- `/`
- `/akademik`
- `/kompetensi-karir`
- `/karir`
- `/advokasi`
- `/tentang-kami`
- `/sitemap.xml`
- semua asset Next di `/_next/`
- semua file statis di root public, misalnya `/logo-extensipedia.png`, `/hero-campus.jpg`, `/favicon.ico`

Sumber route utama:
- [app/page.tsx](/c:/projek/extensipedia-frontend/app/page.tsx)
- [app/akademik/page.tsx](/c:/projek/extensipedia-frontend/app/akademik/page.tsx)
- [app/kompetensi-karir/page.tsx](/c:/projek/extensipedia-frontend/app/kompetensi-karir/page.tsx)
- [app/karir/page.tsx](/c:/projek/extensipedia-frontend/app/karir/page.tsx)
- [app/advokasi/page.tsx](/c:/projek/extensipedia-frontend/app/advokasi/page.tsx)
- [app/tentang-kami/page.tsx](/c:/projek/extensipedia-frontend/app/tentang-kami/page.tsx)
- [app/sitemap.ts](/c:/projek/extensipedia-frontend/app/sitemap.ts)

## Route API internal milik Next

Frontend memiliki route API Next sendiri. Route ini harus tetap diarahkan ke service Next, bukan ke backend langsung:
- `/api/aspirations/submit`
- `/api/aspirations/track`
- `/api/aspirations/{id}/upvote`
- `/api/aspirations/{id}/vote`

Route tersebut bertugas menjadi proxy terkontrol dari browser ke backend public API:
- `/api/aspirations/submit` -> backend `/api/v1/public/aspirations/submit/`
- `/api/aspirations/track` -> backend `/api/v1/public/tickets/track/`
- `/api/aspirations/{id}/upvote` -> backend `/api/v1/public/aspirations/{id}/upvote/`
- `/api/aspirations/{id}/vote` -> backend `/api/v1/public/aspirations/{id}/vote/`

Sumber:
- [app/api/aspirations/submit/route.ts](/c:/projek/extensipedia-frontend/app/api/aspirations/submit/route.ts)
- [app/api/aspirations/track/route.ts](/c:/projek/extensipedia-frontend/app/api/aspirations/track/route.ts)
- [app/api/aspirations/[id]/[action]/route.ts](/c:/projek/extensipedia-frontend/app/api/aspirations/[id]/[action]/route.ts)

Implikasi penting:
- Jangan buat reverse proxy generik `location /api/` ke backend.
- Yang boleh diarahkan ke backend adalah prefix backend yang spesifik, yaitu `/api/v1/`.
- Prefix `/api/aspirations/` harus diarahkan ke Next.

## Dependensi frontend ke backend

Frontend membaca backend origin dari `NEXT_PUBLIC_API_BASE_URL`.

Sumber:
- [lib/public-api.ts](/c:/projek/extensipedia-frontend/lib/public-api.ts)
- [components/AspirasiCard.tsx](/c:/projek/extensipedia-frontend/components/AspirasiCard.tsx)
- [components/support-hub/AspirationSubmitForm.tsx](/c:/projek/extensipedia-frontend/components/support-hub/AspirationSubmitForm.tsx)
- [components/support-hub/TicketTracker.tsx](/c:/projek/extensipedia-frontend/components/support-hub/TicketTracker.tsx)

Nilai production yang direkomendasikan:

```env
NEXT_PUBLIC_SITE_URL=https://<domain-atau-ip>
NEXT_PUBLIC_API_BASE_URL=https://<domain-atau-ip>
```

Aturan env:
- `NEXT_PUBLIC_SITE_URL` dipakai untuk URL sitemap.
- `NEXT_PUBLIC_API_BASE_URL` harus berupa origin saja.
- Jangan tambahkan suffix `/api/v1`; kode sudah menambahkan path API sendiri.
- Jangan isi `NEXT_PUBLIC_API_BASE_URL` dengan `http://127.0.0.1:8000` untuk production, karena value ini juga bisa dipakai untuk URL media/link yang terlihat dari browser.
- Jika production memakai HTTPS, kedua value harus memakai `https://`.

Catatan: `.env.example` boleh tetap memakai alamat development lokal, tetapi environment production di server harus memakai origin publik.

## Endpoint backend yang dibutuhkan frontend

Backend minimal harus menyediakan endpoint berikut:
- `GET /api/v1/public/academic/services/`
- `GET /api/v1/public/academic/youtube/`
- `GET /api/v1/public/academic/countdown-events/`
- `GET /api/v1/public/academic/quick-downloads/`
- `GET /api/v1/public/academic/repository/`
- `GET /api/v1/public/academic/digital-resources/`
- `GET /api/v1/public/competency/agenda-cards/`
- `GET /api/v1/public/competency/winner-slides/`
- `GET /api/v1/public/about/cabinet-calendar/`
- `GET /api/v1/public/career/resources/`
- `GET /api/v1/public/career/opportunities/`
- `GET /api/v1/public/advocacy/policy-resources/`
- `GET /api/v1/public/aspirations/featured/`
- `POST /api/v1/public/aspirations/submit/`
- `POST /api/v1/public/aspirations/{id}/upvote/`
- `POST /api/v1/public/aspirations/{id}/vote/`
- `GET /api/v1/public/tickets/track/`

## Requirement reverse proxy

Wajib ada reverse proxy di depan Next dan backend, misalnya Nginx.

Contoh pembagian service internal:
- frontend Next.js: `127.0.0.1:3000`
- backend app: `127.0.0.1:8000`
- Nginx: port publik `80` dan `443`

Routing minimum:
- `/admin/` -> backend
- `/api/v1/` -> backend
- `/media/` -> backend
- `/static/` -> backend
- `/api/aspirations/` -> frontend
- `/_next/` -> frontend
- selain path di atas -> frontend

Catatan:
- `/static/` dibutuhkan untuk CSS/JS Django admin atau backend admin setara.
- `/media/` dibutuhkan untuk image dan file upload dari backend.
- Jika `/static/` atau `/media/` diarahkan ke frontend, halaman admin atau media publik akan rusak.

## Contoh mapping Nginx

Ini contoh kebutuhan mapping, bukan file final lengkap:

```nginx
server {
    listen 80;
    server_name <domain-atau-ip>;

    client_max_body_size 20m;

    location ^~ /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /api/v1/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /media/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /static/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /api/aspirations/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /_next/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Untuk HTTPS, pasang TLS di Nginx dan pastikan `X-Forwarded-Proto` bernilai `https` pada request publik HTTPS.

## Requirement backend

Backend minimal harus memenuhi:
- `ALLOWED_HOSTS` mencakup domain/IP publik.
- `CSRF_TRUSTED_ORIGINS` mencakup origin publik, misalnya `https://<domain-atau-ip>`.
- `STATIC_URL` konsisten dengan `/static/`.
- `MEDIA_URL` konsisten dengan `/media/`.
- Admin tersedia di `/admin/`.
- Public API tersedia di `/api/v1/public/...`.
- Backend tidak mengambil alih root `/`, karena root publik sudah milik frontend.
- Jika backend berjalan di belakang Nginx HTTPS, aktifkan setting proxy SSL yang sesuai, misalnya `SECURE_PROXY_SSL_HEADER` pada Django.

## Requirement process manager

Frontend perlu dijalankan sebagai service yang restart otomatis. Pilihan yang disarankan:
- `systemd`
- `pm2`
- container

Contoh command runtime:

```bash
npm run start -- -H 127.0.0.1 -p 3000
```

Pastikan environment production tersedia saat build dan saat runtime. Env `NEXT_PUBLIC_*` dibaca saat build untuk bundle client dan juga tersedia saat server runtime.

## Checklist verifikasi setelah deploy

Jalankan pengecekan berikut dari browser atau `curl`:
- `/` tampil sebagai landing frontend.
- `/akademik`, `/kompetensi-karir`, `/karir`, `/advokasi`, dan `/tentang-kami` tampil tanpa error.
- `/_next/static/...` tidak 404.
- `/sitemap.xml` memakai domain production, bukan localhost.
- `/admin/` membuka backend admin dengan CSS/JS utuh.
- `/api/v1/public/aspirations/featured/` dijawab backend.
- `/api/aspirations/track?ticket_id=<ticket>` dijawab Next API route, bukan 404 dari backend.
- File dari `/media/` bisa dibuka jika backend mengembalikan URL media.

## Risiko yang harus dihindari

### Risiko 1: `location /api/` diarahkan ke backend

Dampak:
- `/api/aspirations/submit` gagal.
- `/api/aspirations/track` gagal.
- vote/upvote aspirasi dari card gagal.

Solusi:
- Arahkan hanya `/api/v1/` ke backend.
- Arahkan `/api/aspirations/` ke Next.

### Risiko 2: `NEXT_PUBLIC_API_BASE_URL` memakai port internal backend

Dampak:
- URL media atau link resource bisa menjadi `http://127.0.0.1:8000/...` di browser pengguna.
- Browser pengguna tidak bisa mengakses host internal server.

Solusi:
- Untuk production, gunakan origin publik yang sama dengan frontend.

### Risiko 3: `/static/` tidak diarahkan ke backend

Dampak:
- Backend admin tampil tanpa CSS/JS.

Solusi:
- Proxy `/static/` ke backend atau serve static backend langsung dari Nginx sesuai konfigurasi backend.

### Risiko 4: `/media/` tidak tersedia

Dampak:
- Gambar winner slide, lampiran, dan resource file dari backend tidak tampil.

Solusi:
- Proxy `/media/` ke backend atau serve media langsung dari Nginx sesuai storage backend.

## Rekomendasi final

Gunakan satu origin publik dengan Nginx sebagai reverse proxy:
- Next.js di `/`
- Backend admin di `/admin/`
- Backend API di `/api/v1/`
- Backend static di `/static/`
- Backend media di `/media/`
- Next API internal di `/api/aspirations/`

Set production env:

```env
NEXT_PUBLIC_SITE_URL=https://<domain-atau-ip>
NEXT_PUBLIC_API_BASE_URL=https://<domain-atau-ip>
```
