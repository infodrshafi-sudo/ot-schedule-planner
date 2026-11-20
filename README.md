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
- The selected day's surgery cards appear first. **↗ Share Image to WhatsApp** and **↓ Download OT List** appear directly below the schedule.
- Both actions use the date currently selected in the Schedule calendar. There is no need to navigate to another screen.
- Before generating an image, the app checks the latest Cloudflare D1 records. If the cloud is unavailable, sharing is paused until the schedule can be verified.
- Image sharing uses the native Android share sheet when file sharing is supported. Otherwise, the PNG is downloaded and the caption is copied where clipboard access is available.
- The image heading is date-aware: **OT LIST FOR TODAY**, **OT LIST FOR TOMORROW**, or the selected date's ordinal heading (for example, **OT LIST FOR 21ST**).

## OT image layout

- A single vertical PNG includes the Rivershore Hospital logo, selected date, and one rounded card per surgery.
- The time badge is centred above the middle divider near the top of each case card.
- The left column shows Patient Name, combined Age/Sex (for example, `69/F`), and Surgery.
- The right column shows Department, Surgeon, and Anesthetist.
- Long patient names, surgery descriptions and staff names wrap within their columns.
- Missing Age or Sex values display as em dashes.

## Android / GitHub deployment

Upload **OT_Planner_Update.zip** unchanged to the repository root using the existing GitHub Actions extractor. Wait for a green Actions check and successful Cloudflare Pages deployment.

## Important

The app has no staff login and remains publicly editable. Use fictional test patients only until access controls are introduced. Test image sharing on the target Android device after deployment.
