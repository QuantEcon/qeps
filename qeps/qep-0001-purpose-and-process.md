---
qep: 1
title: QEP Purpose and Process
author: "@mmcky"
status: Accepted
type: process
version: 1
created: 2026-06-16
discussion: https://github.com/QuantEcon/meta/issues/325
---

# QEP-1: QEP Purpose and Process

|              |                                                        |
| ------------ | ------------------------------------------------------ |
| **QEP**      | 1                                                      |
| **Title**    | QEP Purpose and Process                                |
| **Author**   | @mmcky                                                 |
| **Status**   | Accepted                                               |
| **Type**     | process                                                |
| **Version**  | 1                                                      |
| **Created**  | 2026-06-16                                             |
| **Discussion** | [QuantEcon/meta#325](https://github.com/QuantEcon/meta/issues/325) |

## Summary

A **QuantEcon Enhancement Proposal (QEP)** is a short, durable document that records a
decision affecting **more than one QuantEcon repository**, or that **changes how the
team works**. This QEP defines what a QEP is, when one is needed, where QEPs live, how a
proposal moves from draft to decision, and how an accepted QEP is **maintained over
time**. It is deliberately lightweight: the aim is a ten-minute read, a clear deadline,
and a clean close — not governance for its own sake. As the first proposal, this
document is also a worked example of the template and the in-place versioning it
describes.

## Motivation

Decisions that touch every repository, or change how the whole team works — label
standardisation, style-guide rules, tooling standards, editorial conventions, licensing
— currently happen in ad-hoc issues and email threads scattered across repos. Once
closed, they are hard to find again, and there is no consistent bar for what counts as
"decided".

A lightweight enhancement-proposal process gives us:

- **A single place** to find what was decided, when, and why.
- **A consistent shape**, so the work of finding a *good* solution gets the weight it
  deserves before anything rolls out.
- **A clear decision rule**, so proposals actually close instead of drifting.

Many of these decisions are not one-shot: a label set, a style guide, or this process
itself is a **standard that keeps evolving** in small steps. The *current state* is the
point, so a QEP must also be maintainable in place — adding a label should not mean
retiring the whole document and chasing the live standard across a chain of superseding
proposals.

This mirrors the role [PEPs](https://peps.python.org/pep-0001/) play for Python and
[MEPs](https://mep.mystmd.org) for MyST, but is scoped more broadly: QEPs cover
**governance and editorial decisions as well as software**, and the process is kept far
lighter than PEPs (no sponsors, delegates, or editor role).

## Proposal

### When a QEP is needed

Open a QEP when a decision **crosses repositories** or **changes how the whole team
works**. Typical examples: a standard label set, a shared style or editorial rule, a
cross-repo tooling or CI convention, a licensing choice, or a change to a team-wide
workflow.

### When a QEP is *not* needed

Everyday work never needs a QEP: bugs, features, and lecture content in a single repo,
or anything scoped to one repository's own lifecycle. **If you are unsure whether
something needs a QEP, it does not.** The default for normal work is unchanged.

### Where QEPs live

QEPs live in the **`QuantEcon/qeps`** repository, one Markdown file per proposal under
`qeps/`, named `qep-XXXX-short-slug.md` with a zero-padded four-digit number. The
repository renders to a browsable index via GitHub Pages. Discussion of an individual
proposal happens on its PR (and optionally a preceding discussion issue in this repo),
keeping proposal traffic out of the general issue trackers.

### Lifecycle and statuses

A QEP carries one status:

| Status         | Meaning                                                        |
| -------------- | ------------------------------------------------------------- |
| **Draft**      | Under discussion on an open PR.                                |
| **Accepted**   | Agreed; the decision is now in effect.                         |
| **Rejected**   | Considered and declined (the record is kept, with one reason). |
| **Withdrawn**  | Pulled by the author before a decision.                        |
| **Superseded** | Replaced by a later QEP (link it).                             |

Accepted, Rejected, and Withdrawn QEPs are all **merged**, so the record is durable;
only abandoned or spam drafts are closed without merging. There is no separate
`Final` state — `Accepted` *is* final. `status` records only *whether a QEP was
agreed* and is independent of a QEP's `version`; `Superseded` marks a wholesale
replacement by a later QEP (below), not the routine in-place evolution of a living
standard.

### How a QEP is decided

1. **(Optional) Float the idea.** Open a *QEP discussion* issue to socialise it and
   confirm it warrants a QEP.
2. **Draft.** Open a PR adding `qeps/qep-XXXX-slug.md` from the template (with
   **Status: Draft** and a discussion link) and a matching row in the README index.
3. **Set a deadline.** The author announces the PR and sets a comment window —
   normally **one to two weeks** — recording the **decision deadline** in the PR
   description.
4. **Decide.** At the deadline, the **Core Maintainers** decide by **lazy consensus**:
   objections are raised as PR comments, and no sustained objection means the QEP is
   Accepted. If there is no consensus, the lead (@jstac) decides or defers.
5. **Record.** On acceptance, set **Status: Accepted** — in the frontmatter, the header
   table, and the README index row — confirm the number, and merge. A newly accepted
   QEP carries no `version`: it is implicitly **v0** until first amended.

### Amending an accepted QEP

An accepted QEP is not frozen. A QEP that sets an ongoing rule — a label schema, a style
guide, editorial conventions — is a **living standard**: its *current state* is the
point, and it evolves in small, frequent steps. Two paths keep that change orderly:

- **Amend in place.** A substantive evolution of the *same* standard — tweak a value,
  add a label, clarify a rule — is a normal PR against the QEP, reviewed under the same
  lazy-consensus rule, that bumps the QEP's `version` (below). The document stays
  `Accepted`, and a reader always sees one current standard instead of chasing a chain
  of superseding documents.
- **Supersede.** A *different* decision that replaces the QEP wholesale is a **new** QEP
  that marks the old one `Superseded` (link it). Superseding is reserved for a genuine
  rethink, not routine maintenance.

**Squash-merge only.** Each amendment lands as a single commit, so a QEP's history
reads as one line per change. This is a repository setting, not a convention to
remember.

**Commit subjects** carry the substantive/editorial distinction (below): a substantive
amendment uses `QEP-N vM: <summary>` (e.g. `QEP-2 v1: add release-blocker label`); an
editorial fix uses `QEP-N: <summary>`. The `vM:` token in the log is itself the
substantive-milestone marker.

### Versioning: `version` and its git anchor

A QEP gains a `version` the first time it is **substantively** changed after acceptance:

| `version`   | Meaning                                                               |
| ----------- | --------------------------------------------------------------------- |
| *absent*    | Implicitly **v0** — as originally accepted, never substantively changed. Many QEPs (a one-off decision) stay here forever. |
| `1`, `2`, … | The current substantive revision. The first substantive amendment introduces `version: 1`; each later substantive change climbs to `2`, `3`, … |

From `v1` onward a sibling `version-hash` field carries the short commit hash that
anchors the revision to git history:

```yaml
version: 1
version-hash: a1b2c3d  # stamped by CI; do not edit
```

`version` is a plain number; the commit hash lives in the separate `version-hash` field —
a real key, so any YAML parser keeps it. The hash is stamped
**automatically at merge** — a commit cannot contain its own hash, so a post-merge step
(see *Automation*) writes it; never hand-write it. Tooling that pins a standard (for
example a labels-sync command) reads `version` and verifies against `version-hash`. A
per-QEP `version` is the right anchor because a git *tag* tags the whole repository, not
one QEP's revision.

**Substantive vs editorial** decides whether the number moves:

- **Substantive** — any change to normative content (a rule, a value, a table row, a
  machine-readable appendix) → **bump `version`** by one; the hash moves too.
- **Editorial** — no change to normative content (a typo, wording, formatting, a link)
  → **`version` unchanged**; only the hash moves (at v0, the change is simply a git
  commit).

One-line rule: *editorial = no change to normative content; substantive = any change to
normative content.* This keeps version numbers meaningful — not inflated by typos —
while every change stays precisely pinned by the hash and visible in git. The call sits
with author and reviewer; CI does not classify it.

### History and publication

The change record is **git itself**, surfaced rather than duplicated into a
hand-maintained changelog (which would drift and clutter the document):

- **On the rendered site**, once the QuantEcon theme is adopted, its git-history control
  shows *Last changed: ⟨date⟩* and expands a dropdown of recent commits for the page, each
  linked to GitHub ([quantecon-theme.mystmd#83](https://github.com/QuantEcon/quantecon-theme.mystmd/pull/83)).
  The squash-commit subjects are the changelog entries.
- **On GitHub** the file's full commit history and blame cover anything beyond the
  recent window.

Type and version are surfaced two ways:

- the **README index** carries `Type` and `Version` columns, with `Version` showing `–`
  at v0 and `v{N}` thereafter — repo-controlled, so it renders on any theme;
- under the **QuantEcon theme** (once adopted), a coloured **`type` pill** always and a
  **`version` pill** once a QEP reaches `v1` — e.g. `standard` · `v2`; a v0 QEP shows only
  the type pill.

### Automation

Two mechanical steps are enforced by CI rather than left to memory:

- a **post-merge action** (`.github/workflows/stamp-version.yml`) reads the merged short
  hash, writes it into the `version-hash` field, and keeps the README `Type`/`Version`
  columns in sync with each QEP's frontmatter;
- a **pull-request check** (`.github/workflows/qep-checks.yml`) confirms that `version`
  moves legally — a new QEP starts unversioned, a versioned QEP stays versioned, and the
  number stays the same (editorial) or increases by exactly one (substantive) — that
  `type` and `status` are known values, and that the README `Type`/`Status`/`Version`
  columns match each QEP's frontmatter.

The author-side judgement — substantive vs editorial, bumping `version`, the commit
subject — is documented in `AGENTS.md`; CI enforces the mechanical steps that a
maintainer merging through the GitHub UI would otherwise have to remember.

### Numbering

Numbers are assigned sequentially. An author may propose the next free number when
opening the PR; it is confirmed (and adjusted if two proposals collide) at merge.
Numbers are written **unpadded** in text (QEP-1, QEP-2, …); only the filename zero-pads
them to four digits (`qep-0001-…`). This QEP is QEP-1.

### Roles

- **Author** — anyone may write a QEP; typically a maintainer. The author drives
  discussion and sets the deadline.
- **Core Maintainers** — decide by lazy consensus at the deadline.
- **Lead** (@jstac) — breaks ties and may defer a decision.

No sponsor, delegate, or editor role is introduced; the process is intended to stay as
light as the decisions it records.

### Format

Each QEP is a Markdown file with YAML frontmatter (`qep`, `title`, `author`, `status`,
`type`, `created`, `discussion` — plus `version` and its CI-stamped `version-hash`, which
sit just after `type` once the QEP is first amended) followed by the sections in
[`qeps/template.md`](../qeps/template.md): **Summary, Motivation, Proposal, Alternatives
considered, Rollout**. The `type` field describes the **kind of content** the QEP
carries:

- **`standard`** — a normative spec or rule you conform to (a label schema, a style
  guide, editorial or metadata conventions, a licensing choice).
- **`process`** — how the team or the QEP system itself operates (this QEP; a review or
  release procedure; governance).
- **`informational`** — non-binding guidance, rationale, or reference (design notes,
  recommendations, recorded rationale).

A *policy* is a normative rule — a `standard` you conform to — so it is not a separate
type; a one-off *decision* is a `standard` if it sets an ongoing rule, or
`informational` if it only records rationale.

## Alternatives considered

- **Location — a `qeps/` directory in `QuantEcon/meta` vs a dedicated repository.**
  A dedicated `QuantEcon/qeps` was chosen so the repo stays focused, renders cleanly to
  its own GitHub Pages site, and has an issue register tuned for QEP discussion that
  feeds into PRs without general-tracker noise. Infrastructure cost is low and a future
  migration (which would not carry PR/issue discussion history) is avoided. The main
  trade-off — remembering the repo exists — is handled by documenting QEPs in the team
  manual. Discussed in [QuantEcon/meta#325](https://github.com/QuantEcon/meta/issues/325).
- **Name — QEP vs QuEP/QUEP.** "QEP" (QuantEcon Enhancement Proposal) was preferred for
  brevity and its close fit with PEP/MEP.
- **Heavier PEP-style machinery** (sponsors, PEP-delegates, an editor role, a
  `Draft → Accepted → Final` split) was rejected as disproportionate for a team of a
  handful of maintainers. The Django DEP and MEP processes — small-team enhancement
  processes on a comparable scale — informed the lightweight shape adopted here.
- **A `Living` or `Active` status vs versioning.** PEP marks
  continuously-maintained documents `Active`; we instead carry living-ness on a
  `version` and leave `status` to mean only *was this agreed?* This keeps the status set
  small and sidesteps the collision with MyST's MEPs, where `Active` means *frozen for
  voting* — the opposite sense.
- **A hand-maintained changelog vs git.** A changelog section inside each
  QEP would duplicate git, drift from it, and clutter the document; we point at git
  instead, surfaced on the site by the theme's history feature and on GitHub by
  history/blame.

## Rollout

1. **(v0) Establish the process.** Merge this QEP to set the process; re-record the
   label-set decision
   ([QuantEcon/meta#324](https://github.com/QuantEcon/meta/issues/324)) as a
   `standard`-type QEP; add a short "How we make cross-repo decisions" entry to the team
   manual pointing at `QuantEcon/qeps`, and have Core Maintainers watch the repository so
   proposal deadlines are seen.
2. **(v1) Adopt in-place versioning.** Add the `version` field and its `version-hash`
   anchor, the substantive/editorial rule, the amend-in-place + squash-merge + commit-subject
   conventions, the `standard`/`process`/`informational` `type` taxonomy, and git
   (surfaced on the site) as the change record. Supporting changes: update
   `qeps/template.md`; add `Type`/`Version` columns to the README index; add the
   post-merge stamp + README-sync action and the pull-request check; document the
   author-side steps in `AGENTS.md`; and set the repository to squash-merge only.
   Adopting this mechanism is QEP-1's own first substantive amendment, so QEP-1
   becomes **v1**.
