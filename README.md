# OT Planner — redesigned mobile UI and final-list verification

## Deploy from Android
Replace the existing `OT_Planner_Update.zip` in the root of your GitHub repository, commit, then verify the green GitHub Actions checkmark and Cloudflare Pages deployment. Do not extract the ZIP. Keep the existing D1 database binding `DB` and existing D1 database. No SQL migration is required.

## Included
- Redesigned responsive dashboard with today, tomorrow and pending case counts, clear Ready/Pending badges and larger tap targets.
- Fixed bottom navigation on mobile; existing desktop navigation retained.
- Date arrows, Today/Tomorrow shortcuts, seven-day strip, department/search filters, and All/Ready/Pending filters.
- OT list verification with case-count, complete/pending counts and a review list. A checkbox must be confirmed before copying or sharing; fresh D1 records are fetched immediately before sharing, and changes require re-verification.
- Single surgery form unchanged, with five required fields and optional time, patient, MR; existing auto-complete behavior and preloaded lists unchanged.
- Today's and tomorrow's OT lists can be prepared anytime.

## Caution
The web app is publicly editable with **no access code or login**. Anyone with the URL can potentially view, alter or delete cases. **Only use synthetic test records** and never enter real patient-identifiable information. Database records persist in the existing D1 database, which this ZIP does not recreate.
