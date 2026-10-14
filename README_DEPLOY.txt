TariffLab v0.5 — deploy complete ZIP contents to GitHub repository ROOT, keeping the data/hts/ directory structure.
IMPORTANT: GitHub mobile web may make uploading 97 individual files difficult; use GitHub web upload (desktop mode) or GitHub Codespaces / desktop. Do not upload the ZIP itself as a repo file.
Base HTS: 2026 Revision 21, 19,949 10-digit lookup records, split by 2-digit chapter and loaded on demand. Data from user's supplied official USITC JSON, normalized lookup.
Chapter 99: chapter99_rules.json is intentionally EMPTY, not an indication of no tariffs. Manual candidate rules remain local, unverified, and never automatically included in duty totals.
Existing HTS importer still supports manual datasets, but the indexed bundled revision is not persistent in browser memory between page reloads; it reloads the chapter when searched.
No automatic USITC source-check repair: USITC HTTP 403 remains. No legal mapping or exclusion eligibility is certified.
