# Adnyan Foundation Website

Full-stack website for **Adnyan Research & Educational Trust**.

- `frontend/` React 19 + TypeScript + Vite (public site and admin panel)
- `backend/` Node.js + Express + PostgreSQL (forms, content API, admin login)

The public site works even if the backend is offline (it shows built-in sample content). The backend is needed for the contact, newsletter and join forms, and for the admin panel.

## 1. Requirements

- Node.js 20 or newer (https://nodejs.org)
- VS Code
- PostgreSQL 14+, either through Docker Desktop (easiest) or installed directly

## 2. Run locally in VS Code

Open the `adnyan-foundation` folder in VS Code, then open a terminal (Ctrl + `).

**Step 1: start the database** (with Docker)

    docker compose up -d

No Docker? Install PostgreSQL, create a database called `adnyan`, and put your connection string in `backend/.env` (`DATABASE_URL`).

**Step 2: start the backend** (Terminal 1)

    cd backend
    cp .env.example .env        # on Windows: copy .env.example .env
    npm install
    npm run dev

Tables and starter content are created automatically. The first admin account is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`. Change these before you deploy.

**Step 3: start the frontend** (Terminal 2, click the + icon)

    cd frontend
    npm install
    npm run dev

Open http://localhost:5173. Admin panel: http://localhost:5173/admin

## 3. What the admin can manage

Sign in at `/admin` to view contact messages, join requests and newsletter subscribers, and to add, edit and delete Announcements, Stories of Change, Calls, Team members and Impact numbers. Images are referenced by URL: put files in `frontend/public/images/` and use `/images/your-file.jpg`.

## 4. Where to change things

| What | Where |
| --- | --- |
| Name, contact details, social links, menu, bank details | `frontend/src/config.ts` |
| Slider slides (titles, text, images) | `frontend/src/components/Slider.tsx` |
| Colours and fonts | top of `frontend/src/styles.css` (`:root`) |
| Profile / Vision / Mission / Goals | `frontend/src/pages/Profile.tsx` |
| Ongoing and previous projects | `frontend/src/pages/Projects.tsx` |
| Resource pages | `frontend/src/pages/Resources.tsx` |
| Logo | replace `frontend/public/logo.jpg` |
| Photos | `frontend/public/images/` |

The photos were taken from your booklet at low resolution. Replace `slide-*.jpg` with larger images (about 1920 px wide) for a sharper full-screen slider.

## 5. Push to GitHub

    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/<your-username>/<repo-name>.git
    git push -u origin main

Create the empty repository on github.com first. `.env` files are ignored, so no secrets are uploaded. The included GitHub Actions workflow lints and builds the frontend on every push.


### Publish the frontend on GitHub Pages (https://<user>.github.io/<repo>/)

The repo name must match the base path in `frontend/package.json` (`build:pages` uses `/adnyan-foundation/`; change it if your repo has another name, and also in `.github/workflows/deploy-pages.yml` if you edit the script).

1. Push the code (steps above).
2. On GitHub: **Settings > Pages > Source: GitHub Actions**.
3. Each push to `main` now builds and publishes the site automatically (see the Actions tab).

Manual alternative: `cd frontend && npm run build:pages`, then publish the `dist/` folder.

GitHub Pages hosts static files only, so forms and the admin panel do nothing there until the backend is deployed elsewhere and `VITE_API_URL` points to it. The public pages still show the built-in sample content.

## 6. Deploy on BigRock

**Frontend (static files):**

1. Set the backend URL: in `frontend/.env` write `VITE_API_URL=https://api.yourdomain.com/api`
2. Run `cd frontend && npm run build`
3. In BigRock cPanel > File Manager, upload everything inside `frontend/dist/` to `public_html/`. The included `.htaccess` makes page refresh and direct links work.

**Backend:** normal BigRock shared hosting cannot run Node.js with PostgreSQL. Use one of:

- a BigRock VPS or Cloud server (install Node 20+, PostgreSQL, run with `pm2 start src/index.js --name adnyan-api`, put Nginx in front), or
- a managed host such as Render, Railway or Fly.io with a managed Postgres (set `PGSSL=true`), then point a subdomain like `api.yourdomain.com` to it.

On the server set: `DATABASE_URL`, `JWT_SECRET` (long random string), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `CORS_ORIGIN=https://yourdomain.com`.

## 7. API summary

Public: `GET /api/{announcements|stories|calls|team|stats}`, `POST /api/contact`, `POST /api/newsletter`, `POST /api/join`.
Admin (Bearer token): `POST /api/admin/login`, `GET|DELETE /api/admin/submissions/:type`, `GET|POST /api/admin/content/:kind`, `PUT|DELETE /api/admin/content/:kind/:id`.

## 8. Before going live

- Replace the sample team roles, governance text and impact numbers with verified information.
- Add real social media links in `config.ts`.
- Change the admin password and `JWT_SECRET`.
- Confirm the bank and UPI details on the Donate page.
