# Frontend Deployment Requirements

## Tujuan

Frontend publik berjalan di path `/` pada VPS yang sama dengan backend, sedangkan backend admin berjalan di `/admin`.

Arsitektur target:
- `https://<ip-atau-domain>/` -> Next.js frontend publik
- `https://<ip-atau-domain>/admin/` -> backend admin

## Temuan dari frontend saat ini

### Route publik frontend

Route publik yang ada di frontend:
- `/`
- `/akademik`
- `/kompetensi-karir`
- `/karir`
- `/advokasi`
- `/tentang-kami`

Sumber: [page.tsx](/c:/projek/extensipedia-frontend/app/page.tsx), [page.tsx](/c:/projek/extensipedia-frontend/app/akademik/page.tsx), [page.tsx](/c:/projek/extensipedia-frontend/app/kompetensi-karir/page.tsx), [page.tsx](/c:/projek/extensipedia-frontend/app/karir/page.tsx), [page.tsx](/c:/projek/extensipedia-frontend/app/advokasi/page.tsx), [page.tsx](/c:/projek/extensipedia-frontend/app/tentang-kami/page.tsx)

### Route API internal milik Next

Frontend ini memiliki route internal Next yang tidak boleh diarahkan ke backend:
- `/api/aspirations/submit`
- `/api/aspirations/track`

Sumber: [route.ts](/c:/projek/extensipedia-frontend/app/api/aspirations/submit/route.ts), [route.ts](/c:/projek/extensipedia-frontend/app/api/aspirations/track/route.ts)

Implikasi:
- Jangan buat reverse proxy `location /api/` langsung ke backend.
- Yang harus ke backend hanya prefix API backend, misalnya `/api/v1/`.

### Dependensi frontend ke backend

Frontend mengakses backend melalui `NEXT_PUBLIC_API_BASE_URL`.

Sumber: [public-api.ts](/c:/projek/extensipedia-frontend/lib/public-api.ts#L1), [AspirasiCard.tsx](/c:/projek/extensipedia-frontend/components/AspirasiCard.tsx#L36)

Implikasi:
- Nilai `NEXT_PUBLIC_API_BASE_URL` harus berupa origin yang sama dengan frontend, misalnya `https://<ip-atau-domain>`.
- Jangan isi dengan suffix `/api/v1`.
- Jangan arahkan ke port internal backend jika ingin menghindari CORS.

### Client-side call langsung ke backend

Komponen aspirasi melakukan POST langsung dari browser ke:
- `/api/v1/public/aspirations/{id}/upvote/`
- `/api/v1/public/aspirations/{id}/vote/`

Sumber: [AspirasiCard.tsx](/c:/projek/extensipedia-frontend/components/AspirasiCard.tsx#L112)

Implikasi:
- Reverse proxy harus mengarahkan `/api/v1/` ke backend.
- Agar aman tanpa CORS, origin frontend dan backend harus sama.

## Requirement VPS dan routing

### Reverse proxy

Wajib ada reverse proxy di depan Next dan backend, misalnya Nginx.

Routing minimum yang dibutuhkan:
- `/admin/` -> backend
- `/api/v1/` -> backend
- `/media/` -> backend
- `/static/` -> backend
- `/_next/` -> frontend
- `/api/aspirations/submit` -> frontend
- `/api/aspirations/track` -> frontend
- selain path di atas -> frontend

Catatan penting:
- `/static/` dibutuhkan untuk asset Django admin atau backend admin setara.
- `/media/` dibutuhkan untuk file upload dan image dari backend.
- Jika `/static/` atau `/media/` diarahkan ke frontend, admin dan asset backend akan rusak.

### Port internal

Contoh pembagian service:
- frontend Next.js: `127.0.0.1:3000`
- backend app: `127.0.0.1:8000`
- Nginx: `80/443`

## Requirement environment frontend

Frontend minimal butuh env berikut:

```env
NEXT_PUBLIC_SITE_URL=https://<ip-atau-domain>
NEXT_PUBLIC_API_BASE_URL=https://<ip-atau-domain>
```

Keterangan:
- `NEXT_PUBLIC_SITE_URL` dipakai untuk sitemap.
- `NEXT_PUBLIC_API_BASE_URL` dipakai untuk request data publik dan resolve media URL.
- Keduanya sebaiknya memakai origin yang sama.

## Requirement environment backend

Backend minimal harus memenuhi:
- `ALLOWED_HOSTS` mencakup IP/domain VPS
- `CSRF_TRUSTED_ORIGINS` mencakup origin publik jika admin pakai HTTPS
- `STATIC_URL` konsisten, misalnya `/static/`
- `MEDIA_URL` konsisten, misalnya `/media/`
- backend admin tersedia di `/admin/`
- seluruh public API frontend tersedia di `/api/v1/public/...`

Jika backend saat ini masih serve root `/`, backend harus diubah agar root publik tidak bentrok dengan frontend.

## Requirement build dan runtime frontend

Node.js harus mengikuti versi yang kompatibel dengan Next `16.1.6`.

Kebutuhan runtime:
- install dependency dengan `npm ci`
- build dengan `npm run build`
- serve dengan `npm run start`
- process manager direkomendasikan: `pm2`, `systemd`, atau container

## Requirement deployment SEO/public

Karena frontend sudah punya sitemap di [sitemap.ts](/c:/projek/extensipedia-frontend/app/sitemap.ts), origin publik harus benar.

Jika `NEXT_PUBLIC_SITE_URL` masih `localhost`, maka `/sitemap.xml` akan salah.

## Risiko yang perlu diperhatikan

### Risiko 1: Salah proxy `/api`

Jika semua `/api/` diarahkan ke backend:
- route Next `/api/aspirations/submit` dan `/api/aspirations/track` akan gagal
- form aspirasi dan pelacakan tiket di frontend akan rusak

### Risiko 2: `NEXT_PUBLIC_API_BASE_URL` diarahkan ke port backend

Jika diisi `http://127.0.0.1:8000` atau host berbeda:
- browser client-side tidak bisa mengaksesnya
- atau akan butuh konfigurasi CORS tambahan

### Risiko 3: `/static/` tidak diarahkan ke backend

Jika `/static/` tidak diproxy ke backend:
- halaman admin bisa tampil tanpa CSS/JS

### Risiko 4: `/media/` tidak diarahkan ke backend

Jika `/media/` tidak tersedia:
- gambar winner slide, lampiran, dan asset media backend tidak tampil

## Rekomendasi implementasi

Rekomendasi final untuk skenario ini:
- pakai satu reverse proxy Nginx
- frontend di `/`
- backend admin di `/admin/`
- backend API di `/api/v1/`
- backend media di `/media/`
- backend static di `/static/`
- set `NEXT_PUBLIC_SITE_URL` dan `NEXT_PUBLIC_API_BASE_URL` ke origin publik yang sama

## Contoh mapping Nginx

Ini contoh kebutuhan mapping, bukan file final:

```nginx
location /admin/ {
    proxy_pass http://127.0.0.1:8000;
}

location /api/v1/ {
    proxy_pass http://127.0.0.1:8000;
}

location /media/ {
    proxy_pass http://127.0.0.1:8000;
}

location /static/ {
    proxy_pass http://127.0.0.1:8000;
}

location /_next/ {
    proxy_pass http://127.0.0.1:3000;
}

location / {
    proxy_pass http://127.0.0.1:3000;
}
```
