# Meraki Di-Agro PWA

Uganda's Digital Farm Platform — installable Progressive Web App.

## Host on GitHub Pages

1. Create a new GitHub repo and upload all files in this folder to the root.
2. Go to **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save.
3. Your app will be live at `https://<your-username>.github.io/<repo-name>/`.

## Files
- `index.html` — main app (same as `app.html`)
- `manifest.json` — PWA manifest (installable)
- `sw.js` — service worker for offline support
- `icons/`, `icon-*.png`, `favicon.png` — app icons

## Notes
- **Install button**: works on Chrome/Edge (Android & Desktop). iOS uses Share → Add to Home Screen.
- **AI crop detection**: requires a backend at `/api/chat`. On static GitHub Pages this endpoint won't exist, so AI features will gracefully fall back. Deploy the full Lovable project for full AI functionality.
- **GPS & Notifications**: work fully on any HTTPS host (GitHub Pages is HTTPS).
- **Phone call button**: opens the user's dialer with `tel:+256758503931`.
