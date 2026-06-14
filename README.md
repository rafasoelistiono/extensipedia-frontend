# Extensipedia Frontend

Frontend publik Extensipedia memakai Next.js dan berjalan bersama backend Django di VPS yang sama melalui Nginx reverse proxy.

Dokumen ini berisi hasil analisis read-only VPS produksi pada 2026-06-14 dan langkah update saat ada perubahan dari GitHub.

## Ringkasan VPS Produksi

- Host: `srv1632505`
- IP: `187.77.115.15`
- OS: Ubuntu 22.04.5 LTS
- Domain utama: `https://bempefebui.com`
- Redirect: `extensipedia.com` dan `www.extensipedia.com` diarahkan ke `https://bempefebui.com`
- User aplikasi: `extensipedia`
- Group web: `www-data`
- Frontend repo: `/var/www/extensipedia/frontend`
- Backend repo: `/var/www/extensipedia/backend`
- Nginx config aktif: `/etc/nginx/sites-available/extensipedia`
- Symlink aktif: `/etc/nginx/sites-enabled/extensipedia`

## Service dan Port

| Komponen | Service | Internal bind | Public access |
| --- | --- | --- | --- |
| Next.js frontend | `extensipedia-frontend.service` | `127.0.0.1:3000` | `/`, `/_next/`, `/api/aspirations/` |
| Django backend | `extensipedia-backend.service` | `127.0.0.1:8000` | `/admin/`, `/django-admin/`, `/api/v1/`, `/api/schema/`, `/check-api/` |
| PostgreSQL | `postgresql@14-main.service` | `127.0.0.1:5432` | Internal only |
| Nginx | `nginx.service` | `0.0.0.0:80`, `0.0.0.0:443` | Public HTTP/HTTPS |

Runtime yang ditemukan:

- Node.js `v20.20.2`
- npm `10.8.2`
- Next.js `16.1.6`
- Python system `3.10.12`
- Python backend venv `3.13.13`
- Django `6.0.3`
- Gunicorn `25.1.0`
- Nginx `1.18.0`
- PostgreSQL `14.23`

## Aturan Penting

- Jalankan update Git sebagai user `extensipedia`, bukan langsung sebagai `root`, karena repo dimiliki `extensipedia:www-data`.
- Jika menjalankan `git pull` sebagai `root`, Git bisa menolak dengan error `detected dubious ownership`.
- Jangan membuat Nginx `location /api/` generik ke backend.
- Backend hanya untuk prefix `/api/v1/`, `/api/schema/`, `/check-api/`, `/admin/`, dan `/django-admin/`.
- Next.js tetap harus menerima `/api/aspirations/`, `/_next/`, dan `/`.
- Jangan commit atau menimpa `.env`, `.env.production`, sertifikat TLS, atau file backup server.

## Cek Status Sebelum Update

Jalankan sebagai `root` di VPS:

```bash
systemctl status extensipedia-frontend --no-pager
systemctl status extensipedia-backend --no-pager
systemctl status nginx --no-pager

ss -ltnp | grep -E '(:3000|:8000|:80|:443|:5432)'

sudo -u extensipedia -H bash -lc 'cd /var/www/extensipedia/frontend && git status --short && git log -1 --oneline'
sudo -u extensipedia -H bash -lc 'cd /var/www/extensipedia/backend && git status --short && git log -1 --oneline'

nginx -t
```

Jika `git status --short` menampilkan perubahan lokal yang tidak dikenal, jangan lanjut update sebelum tahu perubahan itu milik siapa.

## Update Frontend Next.js

Gunakan saat ada perubahan di repo frontend GitHub:

```bash
sudo -u extensipedia -H bash -lc '
set -euo pipefail
cd /var/www/extensipedia/frontend

if [ -n "$(git status --porcelain)" ]; then
  echo "Repo frontend punya perubahan lokal. Stop update."
  git status --short
  exit 1
fi

git fetch origin
git pull --ff-only origin main
npm ci
npm run build
'

systemctl restart extensipedia-frontend
systemctl status extensipedia-frontend --no-pager
```

Verifikasi frontend:

```bash
curl -I https://bempefebui.com/
curl -I https://bempefebui.com/karir
curl -I https://bempefebui.com/logo-extensipedia.png
journalctl -u extensipedia-frontend -n 80 --no-pager
```

Catatan env frontend:

- File env produksi ada di `/var/www/extensipedia/frontend/.env.production`.
- Key yang dipakai saat analisis:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_API_BASE_URL`
- Jika `.env.production` berubah, jalankan ulang `npm run build` dan restart service frontend.

## Update Backend Django

Gunakan saat ada perubahan di repo backend GitHub.

Backup database terlebih dahulu jika perubahan backend membawa migration atau perubahan model:

```bash
cd /var/www/extensipedia/backend
DATABASE_URL="$(python3 - <<'PY'
from pathlib import Path

for line in Path(".env").read_text().splitlines():
    if line.startswith("DATABASE_URL="):
        print(line.split("=", 1)[1].strip().strip("\"'"))
        break
PY
)"

mkdir -p /root/extensipedia-backups
pg_dump "$DATABASE_URL" | gzip > "/root/extensipedia-backups/db-$(date +%F-%H%M%S).sql.gz"
```

Update backend:

```bash
sudo -u extensipedia -H bash -lc '
set -euo pipefail
cd /var/www/extensipedia/backend

if [ -n "$(git status --porcelain)" ]; then
  echo "Repo backend punya perubahan lokal. Stop update."
  git status --short
  exit 1
fi

git fetch origin
git pull --ff-only origin main

source venv/bin/activate
export DJANGO_SETTINGS_MODULE=config.settings.prod
pip install -r requirements.txt
python manage.py check --deploy
python manage.py migrate --noinput
python manage.py collectstatic --noinput
'

systemctl restart extensipedia-backend
systemctl status extensipedia-backend --no-pager
```

Verifikasi backend:

```bash
curl -I https://bempefebui.com/admin/
curl -I https://bempefebui.com/api/v1/public/aspirations/featured/
curl -I https://bempefebui.com/static/
journalctl -u extensipedia-backend -n 100 --no-pager
```

Catatan env backend:

- File env produksi ada di `/var/www/extensipedia/backend/.env`.
- Service memakai `DJANGO_SETTINGS_MODULE=config.settings.prod`.
- Jangan tampilkan atau commit nilai `.env` karena berisi `DJANGO_SECRET_KEY`, `DATABASE_URL`, dan credential email.

## Update Nginx

Gunakan saat perlu mengubah routing domain, TLS, proxy, static, atau media.

Config aktif saat ini:

```bash
/etc/nginx/sites-available/extensipedia
/etc/nginx/sites-enabled/extensipedia -> /etc/nginx/sites-available/extensipedia
```

Backup config sebelum edit:

```bash
mkdir -p /root/nginx-backups
cp /etc/nginx/sites-available/extensipedia "/root/nginx-backups/extensipedia-$(date +%F-%H%M%S)"
```

Edit config:

```bash
nano /etc/nginx/sites-available/extensipedia
```

Test dan reload:

```bash
nginx -t
systemctl reload nginx
systemctl status nginx --no-pager
```

Mapping yang harus dipertahankan:

```nginx
location ^~ /static/ {
    alias /var/www/extensipedia/backend/staticfiles/;
}

location ^~ /media/ {
    alias /var/www/extensipedia/backend/media/;
}

location ^~ /admin/ {
    proxy_pass http://127.0.0.1:8000;
}

location ^~ /django-admin/ {
    proxy_pass http://127.0.0.1:8000;
}

location ^~ /api/v1/ {
    proxy_pass http://127.0.0.1:8000;
}

location ^~ /api/schema/ {
    proxy_pass http://127.0.0.1:8000;
}

location ^~ /check-api/ {
    proxy_pass http://127.0.0.1:8000;
}

location ^~ /api/aspirations/ {
    proxy_pass http://127.0.0.1:3000;
}

location ^~ /_next/ {
    proxy_pass http://127.0.0.1:3000;
}

location / {
    proxy_pass http://127.0.0.1:3000;
}
```

Setiap block `proxy_pass` sebaiknya tetap punya header ini:

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Verifikasi setelah reload Nginx:

```bash
curl -I https://bempefebui.com/
curl -I https://bempefebui.com/karir
curl -I https://bempefebui.com/admin/
curl -I https://bempefebui.com/api/v1/public/aspirations/featured/
curl -I https://bempefebui.com/api/aspirations/track
tail -n 100 /var/log/nginx/error.log
```

## Rollback Cepat

Frontend:

```bash
sudo -u extensipedia -H bash -lc '
cd /var/www/extensipedia/frontend
git log --oneline -5
git checkout <commit_sebelumnya>
npm ci
npm run build
'
systemctl restart extensipedia-frontend
```

Backend:

```bash
sudo -u extensipedia -H bash -lc '
cd /var/www/extensipedia/backend
git log --oneline -5
git checkout <commit_sebelumnya>
source venv/bin/activate
export DJANGO_SETTINGS_MODULE=config.settings.prod
pip install -r requirements.txt
python manage.py migrate --noinput
python manage.py collectstatic --noinput
'
systemctl restart extensipedia-backend
```

Nginx:

```bash
cp /root/nginx-backups/<file_backup> /etc/nginx/sites-available/extensipedia
nginx -t
systemctl reload nginx
```

## Log Penting

```bash
journalctl -u extensipedia-frontend -n 100 --no-pager
journalctl -u extensipedia-backend -n 100 --no-pager
journalctl -u nginx -n 100 --no-pager
tail -n 100 /var/log/nginx/access.log
tail -n 100 /var/log/nginx/error.log
```

## Hasil Probe Terakhir

Pada analisis read-only 2026-06-14:

- `https://bempefebui.com/` mengembalikan `200 OK` dari Next.js.
- `https://bempefebui.com/karir` mengembalikan `200 OK` dari Next.js.
- `https://bempefebui.com/admin/` mengembalikan `302 Found` ke login Django admin.
- `https://bempefebui.com/api/v1/public/aspirations/featured/` mengembalikan `200 OK` dari backend.
- `https://bempefebui.com/api/aspirations/track` mengembalikan `200 OK` dari Next API route.
