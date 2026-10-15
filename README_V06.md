[README_V06.md](https://github.com/user-attachments/files/33466377/README_V06.md)
# TariffLab v0.6 — Chapter 99 official reference

Static site, compatible with GitHub Pages. Upload **index.html** and **data/chapter99_reference.json** at their specified paths; keep existing **data/hts/**, **data/chapter99_rules.json**, and other files.

The reference contains Chapter 99 rows from the user-supplied USITC 2026 Revision 21 JSON. It is a **text search**, NOT a verified Chapter 1–97-to-Chapter 99 mapping, historical effective-date engine, legal-note parser, exclusion eligibility engine, or duty calculation. No rows auto-apply.

Official source: https://www.usitc.gov/2026_hts_revision_21 (snapshot published October 9, 2026).

Test: search `9903.91` in Chapter 99 official reference; check the source citation and no calculated additional duties. Test `8507600090` to confirm base rate 3.4% from existing chapter 85 file.

Future: parse Chapter 99 legal notes, create reviewed mappings, product descriptions, effective periods, exclusion documentation and tests.
