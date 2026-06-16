# AGENTS.md

Operational guidance for agents and contributors working in `QuantEcon/qeps`.
This file is the **how**; the rules and rationale are
[QEP-1](qeps/qep-0001-purpose-and-process.md). Link back to QEP-1 as the source of
truth — don't restate it here.

## What this repo is

One Markdown file per proposal under `qeps/`, named `qep-XXXX-short-slug.md`, where
`XXXX` is the QEP number **zero-padded to four digits** (`qep-0002-...`, not
`qep-2-...`). The number itself is written **unpadded** everywhere it is displayed — the
title, the `qep:` frontmatter field, the header table, and the README index (so `QEP-2`,
not `QEP-0002`); only the filename pads it. The site is built
and published to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main`.

## The README index is a complete registry

The [README](README.md) index lists **every** QEP with its current status — not only
accepted ones. A row is added when the PR opens (status `Draft`) and its status is
updated in place as the QEP moves: Draft → Accepted / Rejected / Withdrawn / Superseded.

## Accepting a QEP

When a QEP reaches a decision (see QEP-1 for the lazy-consensus rule), apply the outcome
in a **single PR**. The status is **duplicated in three places** — keep them in sync:

1. the YAML frontmatter `status:` field,
2. the **Status** row in the in-document header table, and
3. the QEP's row in the [README](README.md) index table.

This applies to every terminal outcome — **Accepted**, **Rejected**, **Withdrawn**, or
**Superseded** — not just acceptance.

Then **merge** the PR; do not close it. Accepted, Rejected, and Withdrawn QEPs are all
merged so the record stays durable — only abandoned or spam drafts are closed.

Before merging, confirm the QEP number is final and not colliding with another open PR,
and that the filename is zero-padded to four digits.

## Drafting a new QEP

Copy [`qeps/template.md`](qeps/template.md) to `qeps/qep-XXXX-slug.md`, fill it in with
**Status: Draft** and a discussion link, add the QEP's row to the README index with
status `Draft`, and open a PR. See QEP-1 for the full process.
