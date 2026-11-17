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
- Image sharing creates a **single vertical PNG** with the Rivershore Hospital logo, OT date, and one rounded card per surgery.
- The **time badge is centred over the middle divider**, near the top of each case card.
- The left column shows Patient Name, combined **Age/Sex** (for example, `69/F`), and Surgery in that order.
- The right column shows Department, Surgeon, and Anesthetist.
- Surgery and staff names are bold; long names and surgery descriptions wrap within their columns.
- Existing WhatsApp sharing and PNG download actions are unchanged.
- Age and Sex remain optional on the existing surgery scheduling form; missing values display as em dashes.
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


## OT image layout update
- Updated the exported OT-list PNG layout only; scheduling forms, records, API, database schema, and sharing actions are unchanged.
- Time is displayed in a bold blue rounded badge centred directly above the vertical divider.
- Patient Name, Age/Sex, and Surgery appear in the first column; Department, Surgeon, and Anesthetist remain in the second column.
- No database migration is required for this layout update.
