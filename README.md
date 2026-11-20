# Rivershore Hospital OT Planner — Card-style WhatsApp PNG

## Database migration

The app supports optional Age and Sex fields. If these columns have not already been added to the Cloudflare D1 database, open Cloudflare Dashboard → D1 → `ot-planner-db` → Console and execute the following statements one at a time:

```sql
ALTER TABLE surgeries ADD COLUMN age TEXT NOT NULL DEFAULT '';
ALTER TABLE surgeries ADD COLUMN sex TEXT NOT NULL DEFAULT '';
```

If either statement reports `duplicate column name`, that column already exists; do not run it again. This is a one-time migration only. Existing surgery records are preserved. The current navigation and sharing update does not require a database migration.

## Current app workflow

- The app has three main sections: **Home**, **Post New Case**, and **Schedule**. There is no separate Share tab.
- In **Schedule**, select the required date using the calendar field or the 14-day date strip.
- The selected day's surgery cards appear first. **Share to WhatsApp** and **Download OT List** appear directly below the schedule.
- Both actions use the date currently selected in the Schedule calendar. There is no need to navigate to another screen.
- Before generating an image, the app checks the latest Cloudflare D1 records. If the cloud is unavailable, sharing is paused until the schedule can be verified.
- Image sharing uses the native Android share sheet when file sharing is supported. Otherwise, the PNG is downloaded and the caption is copied where clipboard access is available.
- The image heading is date-aware: **OT LIST FOR TODAY**, **OT LIST FOR TOMORROW**, or the selected date's ordinal heading (for example, **OT LIST FOR 21ST**).


## Install as an Android app (PWA)

The site is configured as an installable Progressive Web App (PWA):

- `manifest.webmanifest` defines the app name, standalone display mode, theme, start URL and scope.
- `icons/icon-192.png` and `icons/icon-512.png` provide the required app icon sizes. The artwork is also marked as maskable.
- `sw.js` caches only the application shell and icons. It uses network-first navigation so new deployments are picked up, and it deliberately bypasses `/api/` so Cloudflare D1 surgery records are never served from a stale cache.
- `_headers` sets the manifest and service-worker content types and revalidation headers.
- The app does not add an in-app Install button.

After deploying all files to the Cloudflare Pages project root, open the HTTPS site in Chrome on Android, refresh it, and use Chrome's menu → **Install app** (or **Add to Home screen**, depending on the Chrome version). If Chrome still offers only **Create shortcut**, close the tab, reopen the live URL, wait a few seconds for the service worker to register, and check that `/manifest.webmanifest`, `/sw.js`, and both icon URLs load successfully.

Offline behaviour is limited to opening the cached app shell. Live surgery records, create/edit/delete actions, and schedule sharing still require a working connection to Cloudflare D1; API responses are intentionally never cached.

## Search

Use the magnifying-glass button in the upper-right corner to search all loaded surgery dates by patient, MR number, surgery, department, surgeon, anesthetist or date. Tap a result to open its schedule date. Automatic cloud synchronisation remains enabled; use browser reload for manual refresh.

## OT image layout

- A single vertical PNG includes the Rivershore Hospital logo, selected date, and one rounded card per surgery.
- The time badge is centred above the middle divider near the top of each case card.
- The left column shows Patient Name, combined Age/Sex (for example, `69/F`), and Surgery.
- The right column shows Department, Surgeon, and Anesthetist.
- Long patient names, surgery descriptions and staff names wrap within their columns.
- Missing Age or Sex values display as em dashes.

## Android / GitHub deployment

The PWA update is included in this ZIP. Keep these files at the application project root alongside the existing `functions/` and `schema.sql` files:

- `index.html` (updated with the manifest links and service-worker registration)
- `manifest.webmanifest`
- `sw.js`
- `_headers`
- `icons/icon-192.png`
- `icons/icon-512.png`

Do not place these files inside an extra nested folder. Deploy them to the same Cloudflare Pages project and retain the existing D1 binding. No database schema change is required for the PWA functionality.

## Important

The app has no staff login and remains publicly editable. Use fictional test patients only until access controls are introduced. Test image sharing on the target Android device after deployment.
