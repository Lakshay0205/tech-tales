# Tech&Tales — Agency Website

## Stack
- **Frontend**: React + Vite + Tailwind CSS v4 + Framer Motion + React Router
- **Backend**: Node.js + Express + Nodemailer (contact form only)

## Local Development

### Frontend
```bash
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your SMTP credentials
npm run dev
# → http://localhost:3001
```

The Vite dev server proxies `/api/*` → `http://localhost:3001/*` automatically.

## SMTP Setup (Gmail)
1. Enable 2FA on your Google account
2. Generate an App Password: Google Account → Security → App Passwords
3. Set `SMTP_USER` = your Gmail address, `SMTP_PASS` = the 16-char app password

## Deployment

### Frontend → Vercel / Netlify
```bash
npm run build
# deploy the dist/ folder
```
Set environment variable on Vercel/Netlify:
- `VITE_API_URL` = your backend URL (if not using Vercel rewrites)

### Backend → Render / Railway
- Point to `server/` directory
- Set all env vars from `.env.example`
- Start command: `node index.js`

### Connecting frontend to deployed backend
In `src/pages/Contact.jsx`, the fetch hits `/api/contact`.
On Vercel, add a `vercel.json` rewrite:
```json
{
  "rewrites": [{ "source": "/api/:path*", "destination": "https://your-backend.render.com/:path*" }]
}
```

## Customization Checklist
 - [ ] Replace `hello@techtales.in` with real email (Footer, Contact)
- [ ] Replace WhatsApp number `919999999999` with real number (Footer, Contact)
- [ ] Update founder names and bios in `About.jsx`
- [ ] Add real project screenshots/images to portfolio cards
- [ ] Update Google Form URL in `Contact.jsx`
- [ ] Set pricing numbers to match actual rates
