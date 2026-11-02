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
- Each card shows Time, Patient Name, Age, Sex (left); Surgery, Department, Surgeon, and **Anesthetist highlighted below surgeon** (right).
- Surgery and surgeon names are bold; long names wrap within their cards; number badge is narrow.
- Existing WhatsApp plain-text sharing is unchanged.
- Age/Sex are optional on the existing single surgery scheduling form; blank fields show an em dash in the image.
- Cloudflare D1 remains the sole shared data store; nothing moves to per-browser records.

## Important
The app has no staff login and remains publicly editable. Use fictional test patients only until access controls are introduced. Browser-based image sharing on your Android device should be tested after deployment.
