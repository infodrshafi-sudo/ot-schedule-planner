# Rivershore Hospital OT Planner — UI refresh

## Deploy from Android
Upload this ZIP **without extracting it** as `OT_Planner_Update.zip` to the root of your existing GitHub repository. The existing GitHub Actions workflow extracts it and Cloudflare Pages deploys the changed files. Check GitHub Actions and Cloudflare deployments.

## Improvements
- Large full-width Add New Surgery action; clearer dashboard and helpful empty screens.
- Existing **single** surgery form, ordered as Date, Surgery, Department, Surgeon and Anesthetist, with optional Time/Patient/MR below on the same form.
- Prominent Save and Save & Add Another actions. For repeated cases, the latter carries forward the surgery date and anesthetist but clears patient information.
- Larger form labels, inputs, surgery cards and navigation touch targets.
- Existing date arrows, Today/Tomorrow shortcuts, seven-day calendar strip, department, search and completion-status filters retained.
- Improved fixed Android bottom navigation, sharing action hierarchy and cloud status/manual refresh.
- Existing WhatsApp text and PNG table image sharing retained, including Rivershore logo. Reduced No. column width.
- Existing autocomplete and Cloudflare D1 API unchanged. No SQL migration.

## Important
The app remains **publicly editable** without a login. Restrict it to fictional test data. Anyone with the URL may view, alter or delete records. A green deployment check is not a security or end-to-end browser test.
