# OT Schedule Planner — Shared Cloudflare Edition

The app uses **Cloudflare Pages Functions** and **Cloudflare D1**. Cases are not stored in browser localStorage. Everyone with the correct shared staff access code sees the same central schedule. **The site is not live until deployed and configured.**

## Deploy without coding (GitHub + Cloudflare dashboard)

1. Create a **private** GitHub repository, for example `ot-schedule-planner`.
2. Unzip this ZIP locally. Upload **the contents** of this folder to the **root** of your GitHub repository. Preserve the `functions/api/` folder structure. The ZIP itself must not be uploaded as the only file.
3. In the Cloudflare dashboard, open **Workers & Pages > Create application > Pages > Connect to Git**; connect the GitHub repository. Build settings: **Framework preset = None**, **Build command = leave blank** (if required, use `exit 0`), **Build output directory = `.`**, **root directory = repository root**.
4. In the Cloudflare dashboard, create a D1 database named `ot-planner-db` (Workers & Pages / Storage & databases / D1, depending on interface). Open its **Console**, paste the contents of `schema.sql`, and **Execute**. This creates the surgery table.
5. Open your **Pages** project > **Settings > Bindings > Add > D1 database**. Set the **variable name** exactly `DB` and choose `ot-planner-db`.
6. In your Pages project > **Settings > Variables and Secrets** (or Environment variables), create the secret `OT_ACCESS_CODE` containing a strong staff-shared code **at least 12 characters**. Do not put the code into GitHub or the HTML. Configure for **Production**, and Preview too if you intend to use preview URLs.
7. **Redeploy** the Pages project after adding the binding and secret (Deployments > Retry deployment or trigger a new commit).
8. Open the `https://<your-project>.pages.dev` website in two different devices. Enter the same staff code on each, add a **test** surgery on one device, and verify that it appears on the other device within about 30 seconds (or upon reopening the page).

## Existing local-only data

Earlier versions stored cases in the browser. This new package **does not copy** them to D1. Re-enter test cases manually; do not delete the older browser data until you have verified the online cases.

## Editing and sharing

- Mandatory at creation: surgery date, surgery name, department, surgeon and anesthetist.
- Optional: time, patient, MR number; they can be added later by editing.
- All connected staff can add/edit/delete. Deletion removes from the active schedule.
- The app warns of possible duplicates, offers autocomplete, filters and a chronological list.
- Tomorrow sharing: 12:00 PM–10:00 PM IST. Today sharing: 12:00 AM–8:30 AM IST. Preview remains possible outside these periods.
- A case changed concurrently on another device is rejected with a refresh message rather than silently overwriting it.

## Security and use

This is a functional **staff-shared-code prototype**, not a production-grade patient information system. The shared code provides only coarse access control and no individual-user audit trail. Do **not** put identifiable real patients into it without the hospital's approval and an appropriate privacy, access-control, retention and security review. A private GitHub repository does not make a publicly accessible Pages URL private. Use strong secret, rotate when needed, restrict site access through Cloudflare Access if desired, and review backup/recovery requirements. The server validates all edits and stores cases in D1. Client retains the access code in sessionStorage for that browser tab/session, not persistent localStorage. Use HTTPS only.

## Project files

- `index.html`: frontend
- `functions/api/_middleware.js`: shared-code check for all API calls
- `functions/api/cases.js`: list/create
- `functions/api/cases/[id].js`: edit/delete with conflict detection
- `schema.sql`: run once in the D1 Console
