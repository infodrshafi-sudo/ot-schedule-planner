# OT Schedule Planner — Open Shared Cloud Edition

This version opens immediately without a staff access code. All visitors with the public Cloudflare Pages URL can view, add, edit and delete surgeries in the same D1 database. Suitable for **test data only**; do not enter real patient-identifiable data into this publicly editable version.

## Android update

Upload `OT_Planner_Update.zip` to the root of the existing GitHub repository, replacing the old ZIP of the same name. The existing **Publish OT Planner ZIP** GitHub Action extracts it and publishes `public/index.html` plus Pages Functions. GitHub Actions must finish with a green checkmark; then Cloudflare Pages must deploy the resulting Git commit. Do not extract the ZIP on your phone.

The existing Cloudflare Pages **D1 database binding** named `DB` to `ot-planner-db` must remain connected. **Do not delete or recreate the D1 database or rerun destructive SQL.** The `OT_ACCESS_CODE` secret is no longer used by this release and can be deleted later from the Cloudflare settings; removing the secret alone cannot remove the old login screen unless the new ZIP is deployed.

## Features

Mandatory: date, surgery, department, surgeon, anesthetist. Optional and editable later: time, patient name, MR number. Includes search, department filters, autocomplete, duplicate warnings, confirmation before deleting, time sorting, IST sharing windows, and WhatsApp-ready numbered list. Shared records refresh roughly every 30 seconds.

Caution: Anyone who knows or discovers the URL can modify or erase records. There is no login, account audit trail or abuse protection. Never use real patient identifiers in this public build; consider Cloudflare Access if you later need a restricted clinical deployment.
