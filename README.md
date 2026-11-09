# Rivershore Hospital OT Planner — Card-style WhatsApp PNG

## REQUIRED: One-time D1 database migration before deploying this version
The app now supports optional Age and Sex. In Cloudflare Dashboard → D1 → ot-planner-db → Console, execute these two statements **one at a time**:

```sql
ALTER TABLE surgeries ADD COLUMN age TEXT NOT NULL DEFAULT '';
ALTER TABLE surgeries ADD COLUMN sex TEXT NOT NULL DEFAULT '';
```

If a statement says `duplicate column name`, that column already exists; do not repeat it. Existing surgery records are preserved. This migration is required only once; do not rerun it with every ZIP update.

## Android GitHub update
Upload **OT_Planner_Update.zip** unchanged to the repository root, using the existing GitHub Actions extractor. Wait for a green Actions check and successful Cloudflare Pages deployment.

## Image sharing
- Image sharing now creates a **single vertical PNG** with a Rivershore logo, OT date, and **one separate rounded card per surgery**.
- Each card shows Time, Patient Name, Age, Sex (left); Surgery, Department, Surgeon, and **Anesthetist shown like Surgeon (no separate box)** (right).
- Surgery and surgeon names are bold; long names wrap within their cards; number badge is narrow.
- Existing WhatsApp plain-text sharing is unchanged.
- Age/Sex are optional on the existing single surgery scheduling form; blank fields show an em dash in the image.
- Cloudflare D1 remains the sole shared data store; nothing moves to per-browser records.

## Important
The app has no staff login and remains publicly editable. Use fictional test patients only until access controls are introduced. Browser-based image sharing on your Android device should be tested after deployment.

## Latest changes
- Main "Add New Surgery" actions are now labelled **Post New Case**.
- When using **Post New Case** from the Schedule screen, the form starts with the date selected in the Schedule calendar; the date remains editable. Save & Post Another Case retains the saved date.
- The sharing screen now presents only one large **green Share Image to WhatsApp** button. No Share Text, Copy Text, or Download PNG actions appear. Image sharing uses the native Android share sheet when supported; browsers without file sharing automatically download a PNG so it can be attached in WhatsApp.
- Case-card image design, autocomplete, Cloudflare D1 API and schema remain unchanged.

## Share image actions (latest update)
- The primary **Share Image to WhatsApp** action now uses a WhatsApp-green gradient starting with `#25D366` and transitioning to `#1EBE5A`.
- A smaller **Download OT List** PNG button appears directly underneath.
- Both use the existing fresh-cloud check and the same card-style PNG image generator; plain-text sharing is not shown.


## Review and share screen update
The Share screen now shows the same surgery cards and Edit/Delete controls as the Schedule page, with Today, Tomorrow and any-date selection. Changes saved while editing from the Share screen return to Share for review. The WhatsApp PNG and Download OT List buttons remain below the case list. No D1 migration is required for this change.


## Review & Share compact-screen update
- Removed Post New Case button from the Share tab only; the Schedule tab's Post New Case button is retained and continues using the selected schedule date.
- Removed repeated pending-case review section and extra warning text. Existing total/complete/pending counters remain.
- Edit and Delete controls on Share's surgery cards remain available, as do Share Image and Download OT List.
- An empty Share list shows a plain message without a Post New Case button.
- No database migration required.


## Desktop Schedule 14-day widget (November 2026 update)
- On PC-width screens (901px or wider), the bottom of the Schedule tab contains a small `+ Add Widget · 2-week OT schedule` button.
- Clicking it shows a 14-day calendar in two rows of seven; clicking again removes it from view.
- The calendar shows date, daily case count, up to 3 surgery names/times, and `+N more`, with previous/next 14-day controls.
- Click a day to select that date in the existing Schedule view, where editing/deletion and Post New Case continue to work.
- On mobile widths the button and widget remain hidden. No database changes required.
