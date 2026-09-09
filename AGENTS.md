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

## The README index is generated — do not hand-edit it

The [README](README.md) index lists **every** QEP with its `Type`, current `Status`, and
`Version` — not only accepted ones. **Every cell is derived from the QEP's own
frontmatter, and the whole table is regenerated post-merge** by
[`stamp.mjs`](.github/scripts/stamp.mjs), ordered by QEP number. So:

- **A PR does not add its own row.** Set `status`, `type` and `version` in the
  frontmatter; the row appears when the PR merges.
- **Editing the table by hand achieves nothing durable** — the next merge overwrites it
  from frontmatter. CI warns when a branch's table is stale; it never fails on it.
- **Gaps are normal.** The index shows only merged QEPs, so while drafts are open the
  numbers skip (a number is reserved when its draft PR opens and released if that PR
  closes unmerged). A QEP that merges out of order slots into its numeric position
  automatically.

This is why the table stopped being a merge-conflict magnet: four open QEP PRs used to
contend for rows in one table, and #18 was unmergeable on that single line. A branch
that still carries a row will conflict textually — strip the row — but a *mis-resolved*
index conflict is now self-healing, because the post-merge regeneration restores the
table from frontmatter whatever the resolution did to it.

## Accepting a QEP

When a QEP reaches a decision (see QEP-1 for the lazy-consensus rule), apply the outcome
in a **single PR**. The status lives in **two places in the document** — keep them in
sync:

1. the YAML frontmatter `status:` field, and
2. the **Status** row in the in-document header table.

The [README](README.md) index row is *generated* from the frontmatter post-merge, so do
not edit it. This applies to every terminal outcome — **Accepted**, **Rejected**, **Withdrawn**, or
**Superseded** — not just acceptance.

Then **merge** the PR; do not close it. Accepted, Rejected, and Withdrawn QEPs are all
merged so the record stays durable — only abandoned or spam drafts are closed.

Before merging, confirm the QEP number is final and not colliding with another open PR,
and that the filename is zero-padded to four digits.

A merged QEP may not carry `status: Draft` — Draft means *under discussion on an open
PR*, and only abandoned drafts are closed unmerged, so nothing should reach `main` in
that state. QEP-3 did, for two months.

## Drafting a new QEP

Copy [`qeps/template.md`](qeps/template.md) to `qeps/qep-XXXX-slug.md`, fill it in with
**Status: Draft** and a discussion link, and open a PR. **Do not add a README index
row** — it is generated from the frontmatter when the PR merges. A new QEP is unversioned
(implicitly v0): omit the `version` field. See QEP-1 for the full process.

## Amending an accepted QEP

An accepted QEP is a living document (QEP-1). A substantive evolution of the *same*
standard is a normal PR against the QEP under lazy-consensus that **bumps its
`version`**; a *different* decision that replaces it wholesale is a **new** QEP that
marks the old one `Superseded`. Don't supersede for routine maintenance.

**A QEP that changes another QEP carries the edit itself.** Don't add a forward
reference from an accepted QEP to one still in draft: the link dangles on `main`, and
the draft's review can still reshape what the reference promised. Put the upstream edits
in the downstream QEP's own branch — an *Amendments to QEP-N* section until acceptance,
applied as file edits at landing — so reference and target land in one commit, and a
reviewer sees the whole change as one diff.

Standards **outside** this repo are not covered by that. A QEP is the source of truth
and is independent of every repository: it states the rule, and a consuming repo owns
how and when it conforms. Don't write precedence clauses, handover obligations, or
tracking-issue references for another repository into a QEP.

Nor what another repository **does today**. A description goes stale the same way a
pointer does, and silently: QEP-6 said the projects dashboard re-sorts children by issue
number and prescribed the fix, when that repo had already removed the sort on its own
two days earlier. State the **principle and the reason for it**, never the instance — a
rule that explains itself outlives any one consumer's behaviour, and a reader can apply
it to consumers you have never heard of.

**Does `version` move?** — the author/reviewer call, not CI's:

- **Substantive** (any change to normative content — a rule, a value, a table row, a
  machine-readable appendix): increment `version` by one in **both** the frontmatter and
  the header table. The first amendment introduces `version: 1` and adds a **Version**
  row to the header table; the README `Version` column moves from `–` to `v{N}`.
- **Editorial** (no change to normative content — typo, wording, formatting, link):
  leave `version` unchanged.

Leave `version-hash` **off** when you set or bump `version` — CI adds it with the merge
hash; never hand-write it (a commit cannot contain its own hash).

**Commit subjects** carry the same distinction:

- Substantive → `QEP-N vM: <summary>` (e.g. `QEP-2 v1: add release-blocker label`).
- Editorial → `QEP-N: <summary>`.

## Squash-merge only

Every QEP PR is **squash-merged** so one amendment is one commit and a QEP's history
reads as one line per change. This is a repository setting; when merging through the
GitHub UI choose **Squash and merge**.

## What CI does (don't do these by hand)

- **Post-merge** — [`stamp-version.yml`](.github/workflows/stamp-version.yml) stamps the
  merged short hash into the `version-hash` field and **regenerates the whole README
  index** from each QEP's frontmatter, ordered by number.
- **On every PR** — [`qep-checks.yml`](.github/workflows/qep-checks.yml) checks that
  `version` moves legally (a new QEP starts unversioned; a versioned QEP stays versioned;
  the number stays the same or increases by exactly one), that `type` and `status` are
  known values, that `related:` and the header table's **Related** row agree, and that
  **ordered-list markers ascend in source** (see below). A stale README index is a
  warning, not a failure.

You still set `version`, `type` and `status` in the frontmatter; CI stamps the hash and
generates the index. The checks live in [`.github/scripts/`](.github/scripts/).

## Cite a section by its name, not its number

Refer to a QEP section by its heading — *QEP-6 § Constraints are dependencies* — rather
than by number. **Section numbers move.** Inserting §2 into QEP-6 mid-draft renumbered
§2–§7 to §3–§8 and forced a correction onto a ruling that had already cited them, and
external consumers cite these: the `qe` skills, the projects dashboard's tracker
contract, and several tracking issues.

The same hazard applies inside a document. Markdown **renumbers an ordered list on
render**, so a source list reading `1., 2., 2., 3., 4.` displays as 1–5 while every
external "clause N" citation silently shifts by one. QEP-6 shipped exactly that and it
survived a twelve-amendment review, a field report and four PR comments — so it is now a
CI check rather than a convention. Keep ordered-list markers strictly ascending in
source; fenced code blocks are exempt.
