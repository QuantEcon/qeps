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

The [README](README.md) index lists **every** QEP with its `Type`, current `Status`, and
`Version` — not only accepted ones. A row is added when the PR opens (status `Draft`,
version `–`) and its status is updated in place as the QEP moves: Draft → Accepted /
Rejected / Withdrawn / Superseded. The `Type`, `Status`, and `Version` columns must match
the QEP's frontmatter — CI checks this parity on every PR (see *What CI does*).

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
status `Draft` and version `–`, and open a PR. A new QEP is unversioned (implicitly v0):
omit the `version` field. See QEP-1 for the full process.

## Amending an accepted QEP

An accepted QEP is a living document (QEP-1). A substantive evolution of the *same*
standard is a normal PR against the QEP under lazy-consensus that **bumps its
`version`**; a *different* decision that replaces it wholesale is a **new** QEP that
marks the old one `Superseded`. Don't supersede for routine maintenance.

**Does `version` move?** — the author/reviewer call, not CI's:

- **Substantive** (any change to normative content — a rule, a value, a table row, a
  machine-readable appendix): increment `version` by one in **both** the frontmatter and
  the header table. The first amendment introduces `version: 1` and adds a **Version**
  row to the header table; the README `Version` column moves from `–` to `v{N}`.
- **Editorial** (no change to normative content — typo, wording, formatting, link):
  leave `version` unchanged.

Leave the `# <hash>` comment **off** when you set or bump `version` — CI stamps it with
the merge hash; never hand-write it (a commit cannot contain its own hash).

**Commit subjects** carry the same distinction:

- Substantive → `QEP-N vM: <summary>` (e.g. `QEP-2 v1: add release-blocker label`).
- Editorial → `QEP-N: <summary>`.

## Squash-merge only

Every QEP PR is **squash-merged** so one amendment is one commit and a QEP's history
reads as one line per change. This is a repository setting; when merging through the
GitHub UI choose **Squash and merge**.

## What CI does (don't do these by hand)

- **Post-merge** — [`stamp-version.yml`](.github/workflows/stamp-version.yml) stamps the
  merged short hash into `version: N  # <hash>` and syncs the README `Type`/`Version`
  columns from each QEP's frontmatter.
- **On every PR** — [`qep-checks.yml`](.github/workflows/qep-checks.yml) checks that
  `version`, if present, either stays the same (editorial) or increases by exactly one
  (substantive), and that the README `Type`/`Status`/`Version` columns match each QEP's
  frontmatter.

You still set `version`, `type`, and the README row in the PR; CI stamps the hash and
enforces parity. The checks live in [`.github/scripts/`](.github/scripts/).
