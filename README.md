# Mise en Place — PWA Package for Google Play Store

This folder contains everything needed to publish the app to the **Google Play Store** via PWABuilder.

---

## What's in this package

| File | Purpose |
|------|---------|
| `index.html` | Updated app with external manifest + SW references |
| `manifest.json` | Web App Manifest (required by PWABuilder) |
| `sw.js` | External Service Worker (required by PWABuilder) |
| `icons/icon-192x192.png` | App icon — 192×192px |
| `icons/icon-512x512.png` | App icon — 512×512px |
| `.well-known/assetlinks.json` | Digital Asset Links (fill in after Play Console setup) |

---

## Step 1 — Upload files to your GitHub repository

Upload **all files** from this package to your GitHub repo at `ossan-code/Mise-en-place`, maintaining the folder structure:

```
/                          ← root of repo
├── index.html             ← replace existing
├── manifest.json          ← NEW
├── sw.js                  ← NEW
├── icons/
│   ├── icon-192x192.png   ← NEW
│   └── icon-512x512.png   ← NEW
└── .well-known/
    └── assetlinks.json    ← NEW (fill in later)
```

**How to upload via GitHub web:**
1. Go to `github.com/ossan-code/Mise-en-place`
2. Click **Add file → Upload files**
3. Drag all files onto the page (drag the whole folder structure)
4. Click **Commit changes**
5. Wait 2 minutes for GitHub Pages to rebuild

**Verify it works:** Open these URLs in your browser:
- `https://ossan-code.github.io/Mise-en-place/manifest.json` — should show JSON
- `https://ossan-code.github.io/Mise-en-place/sw.js` — should show JavaScript
- `https://ossan-code.github.io/Mise-en-place/icons/icon-512x512.png` — should show the icon

---

## Step 2 — Run a Lighthouse audit (optional but recommended)

1. Open `https://ossan-code.github.io/Mise-en-place/` in Chrome desktop
2. Press F12 → Lighthouse tab
3. Select **Mobile** and check **Progressive Web App**
4. Click **Analyze page load**
5. Aim for PWA score of 100 — the app should pass all checks

---

## Step 3 — Package with PWABuilder

1. Go to **https://www.pwabuilder.com/**
2. Enter your URL: `https://ossan-code.github.io/Mise-en-place/`
3. Click **Start**
4. PWABuilder will analyse your site — you should see green scores for:
   - ✅ Web Manifest
   - ✅ Service Worker
   - ✅ Security (HTTPS via GitHub Pages)
5. Click **Package for stores**
6. In the **Android** section, click **Generate Package**

---

## Step 4 — Configure the Android package

In the PWABuilder Android configuration screen, fill in:

| Field | Value |
|-------|-------|
| **Package ID** | `com.miseenplace.app` (or your own reverse-domain) |
| **App name** | `Mise en Place` |
| **App version** | `1` |
| **App version string** | `1.0.0` |
| **Host** | `ossan-code.github.io` |
| **Start URL** | `/Mise-en-place/` |
| **Theme color** | `#0F1629` |
| **Background color** | `#080D1A` |
| **Signing** | Choose **New** to let PWABuilder generate a signing key |

> ⚠️ **IMPORTANT:** Download and safely store the signing key (.keystore file) that PWABuilder generates. You need this same key for every future update. If you lose it, you cannot update your app.

Click **Generate** — PWABuilder will download a ZIP containing:
- `app-release-signed.aab` — the Android App Bundle for Google Play
- Your signing key files

---

## Step 5 — Set up Google Play Console

1. Go to **https://play.google.com/console** and sign in
2. Pay the **one-time $25** developer registration fee if not done already
3. Click **Create app**
4. Fill in:
   - App name: `Mise en Place`
   - Default language: English
   - App or game: **App**
   - Free or paid: **Free**
5. Accept the declarations and click **Create app**

---

## Step 6 — Fill in your app listing

In Google Play Console → your app → **Main store listing**:

**Short description (max 80 chars):**
> Smart weekly meal planner with AI suggestions and health insights

**Full description (max 4000 chars):**
> Mise en Place is your personal weekly smart meal planner.
>
> 📅 WEEKLY PLANNER
> Plan your week with Guided mode (filter by food category) or Free mode (any meal any day). Generate menus automatically, swap meals you don't like, and accept when ready.
>
> 🤖 SMART MEAL DISCOVERY
> Ask AI to suggest new meals matching your description. Get full recipes, ingredients with quantities, and links to popular recipe sites.
>
> 🎯 SMART DIET PLANNER
> Tell AI your health goal (Weight Loss, Athletic, Heart Friendly, Family & Toddlers, etc.) and get a personalised 7-day category plan instantly applied to your planner.
>
> 📊 HEALTH INSIGHTS
> After 4 weeks, the app analyses your meal history and gives you plain-language feedback on balance — too much red meat, low fish intake, good variety, etc.
>
> 🛒 SMART SHOPPING LIST
> Auto-generated from your week's meals, grouped by day with meal names shown. Copy and share to WhatsApp, Telegram or Email.
>
> 📤 SHARE & EXPORT
> Share your meal plan as text to any app. Export to Google Calendar, Apple Calendar or Outlook as a proper .ics file with one meal per day.
>
> 📚 HISTORY
> Browse and edit past weekly menus. See which weeks used Smart Diet Plans.
>
> Your data stays on your device — no account required, no tracking.

**Category:** Food & Drink

---

## Step 7 — Upload your APK/AAB

1. In Play Console → **Production** → **Releases** → **Create new release**
2. Upload the `app-release-signed.aab` file from the PWABuilder ZIP
3. Add release notes: `Initial release`
4. Click **Review release** → **Start rollout to Production**

---

## Step 8 — Get your SHA-256 fingerprint and update assetlinks.json

This step enables **full-screen mode** (no browser bar) in the installed app.

1. In Play Console → your app → **Setup** → **App integrity**
2. Copy the **SHA-256 certificate fingerprint** shown there
3. Edit `.well-known/assetlinks.json` in your GitHub repo:
   - Replace `PASTE_YOUR_SHA256_FINGERPRINT_HERE` with your actual fingerprint
   - Example: `"14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"`
4. Commit the change
5. Verify it's live: `https://ossan-code.github.io/Mise-en-place/.well-known/assetlinks.json`

---

## Step 9 — Wait for review

Google typically reviews apps within **3–7 days**. You'll receive an email when approved or if any changes are needed.

---

## Updating the app in future

When you update the app:
1. Upload the new `index.html` to GitHub (the app auto-updates since it's a TWA pointing to your URL)
2. For manifest/icon changes: re-run PWABuilder, increment version number, upload new AAB to Play Console

---

## Troubleshooting

**PWABuilder shows low score:**
- Make sure all files are uploaded to GitHub and accessible via HTTPS
- Clear your browser cache and try again
- Check that `manifest.json` is valid JSON at the URL above

**App shows browser bar instead of fullscreen:**
- The `assetlinks.json` fingerprint hasn't been set or the file isn't accessible
- Verify the URL: `https://ossan-code.github.io/Mise-en-place/.well-known/assetlinks.json`

**Google Play rejects the app:**
- Common reasons: icon not meeting requirements, description too short, missing privacy policy
- Add a simple privacy policy page: since this app stores no user data on servers, a one-liner "This app stores all data locally on your device and does not collect or transmit any personal information" is usually sufficient
