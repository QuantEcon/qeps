---
qep: 1
title: QEP Purpose and Process
author: "@mmcky"
status: Accepted
type: process
version: 4
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
| **Version**  | 4                                                      |
| **Created**  | 2026-06-16                                             |
| **Discussion** | [QuantEcon/meta#325](https://github.com/QuantEcon/meta/issues/325) |

## Summary

A **QuantEcon Enhancement Proposal (QEP)** is a short, durable document that records a
decision affecting **more than one QuantEcon repository**, or that **changes how the
team works**. This QEP defines what a QEP is, when one is needed, where QEPs live, how a
proposal moves from draft to decision, and how an accepted QEP is **maintained over
time**. It is deliberately lightweight: the aim is a clean close, not governance
for its own sake.

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
2. **Draft.** Open a PR adding `qeps/qep-XXXX-slug.md` from the template, with
   **Status: Draft** and a discussion link. The README index row is generated at
   merge — do not add one.
3. **Decide.** Objections are raised as PR comments; an outstanding objection blocks
   acceptance until it is resolved or withdrawn. Once the PR has been announced and
   **no objection is outstanding**, a **Core Maintainer other than the author** accepts
   the QEP with an approving review; the author does not accept their own QEP. There
   is no decision deadline. If there is no consensus, the lead (@jstac) decides or
   defers.
4. **Record.** On acceptance, set **Status: Accepted** in the frontmatter and the header
   table, confirm the number, and merge — the approval is the acceptance and the merge
   records it, so either party may merge. The PR itself carries no `version`: CI stamps
   **`version: 0`** and its `version-hash` anchor at merge (see *Versioning*).

### Amending an accepted QEP

An accepted QEP is not frozen. A QEP that sets an ongoing rule — a label schema, a style
guide, editorial conventions — is a **living standard**: its *current state* is the
point, and it evolves in small, frequent steps. Two paths keep that change orderly:

- **Amend in place.** A substantive evolution of the *same* standard — tweak a value,
  add a label, clarify a rule — is a normal PR against the QEP that bumps the QEP's
  `version` (below), accepted the same way as a new QEP: no objection outstanding, and
  an approving review from a Core Maintainer other than the author. An editorial change
  needs no second reader. The document stays `Accepted`, and a reader always sees one
  current standard instead of chasing a chain of superseding documents.
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

Every merged QEP carries a `version` from the moment it lands:

| `version`   | Meaning                                                               |
| ----------- | --------------------------------------------------------------------- |
| `0`         | As originally merged, never substantively changed. Many QEPs (a one-off decision) stay here forever. |
| `1`, `2`, … | The current substantive revision. The first substantive amendment climbs to `version: 1`; each later substantive change to `2`, `3`, … |

A sibling `version-hash` field carries the short commit hash that anchors the revision
to git history:

```yaml
version: 0
version-hash: a1b2c3d  # stamped by CI; do not edit
```

Both fields are machine-written at birth: a Draft carries neither, and the post-merge
step (see *Automation*) stamps `version: 0` and the hash on the merge that records the
QEP's outcome — a commit cannot contain its own hash, so neither field is ever
hand-written to start. From then on the author bumps `version` on substantive
amendments, and CI re-stamps the hash on every merged change, editorial included. The
stamp is uniform across merged outcomes — Accepted, Rejected, and Withdrawn QEPs all
carry it — so every durable record is machine-referenceable.

`version` is a plain number; the commit hash lives in the separate `version-hash` field —
a real key, so any YAML parser keeps it. Tooling that pins a standard (for example a
labels-sync command) reads `version` and cross-checks `version-hash` against the
revision it fetched. **`version-hash` is a historical anchor, not a file checksum**:
the stamp commit post-dates the hash it writes, so the field names the revision that
last changed the QEP — it does not hash the file's bytes. A per-QEP `version` is the
right anchor because a git *tag* tags the whole repository, not one QEP's revision.

**Substantive vs editorial** decides whether the number moves:

- **Substantive** — any change to normative content (a rule, a value, a table row, a
  machine-readable appendix) → **bump `version`** by one; the hash moves too.
- **Editorial** — no change to normative content (a typo, wording, formatting, a link)
  → **`version` unchanged**; only the hash moves — at v0 exactly as at v1+, so a
  consumer of a machine-readable appendix sees that something changed without diffing
  git.

This keeps version numbers meaningful — not inflated by typos — while every change
stays precisely pinned by the hash and visible in git. The call sits with author and
reviewer; CI does not classify it.

### History and publication

The change record is **git itself**, not a hand-maintained changelog, which would drift
and clutter the document. The squash-commit subjects are the changelog entries, and the
file's commit history and blame on GitHub cover the rest.

The **README index** carries `Type` and `Version` columns; it is repo-controlled, so
it renders whatever theme the site uses. `Version` shows `v{N}` from `v0` up: `v0` is
shown rather than hidden, since it names an anchored revision.

### Automation

Two mechanical steps are enforced by CI rather than left to memory:

- a **post-merge action** (`.github/workflows/stamp-version.yml`) reads the merged short
  hash, stamps `version: 0` alongside it into any QEP that has left Draft and carries no
  `version`, writes the hash into every changed QEP's `version-hash` field, and
  **regenerates the README index** from each QEP's frontmatter, ordered by number;
- a **pull-request check** (`.github/workflows/qep-checks.yml`) confirms that `version`
  moves legally — a new QEP arrives unversioned in its PR (`version: 0` is stamped at
  merge), a stamped QEP stays versioned, and the
  number stays the same (editorial) or increases by exactly one (substantive) — that
  `type` and `status` are known values, that `related:` and the header table's
  **Related** row agree, and that **ordered-list markers ascend in source**. That last
  rule exists because Markdown *renumbers* an ordered list on render: a source list
  reading `1., 2., 2., 3., 4.` displays as 1–5 while every external "clause N" citation
  silently shifts by one. A stale README index is a **warning, not a failure** — the
  index is generated, so a PR carries no row of its own to be wrong.

The author-side judgement — substantive vs editorial, bumping `version`, the commit
subject — is documented in `AGENTS.md`; CI enforces the mechanical steps that a
maintainer merging through the GitHub UI would otherwise have to remember.

### Rollout

A QEP states a standard, not how it is rolled out, so it has no adoption or rollout
section. Everything that binds — including what conforming requires, and any rule for
how existing things migrate — is stated in the **Proposal**, where a reader looking for
the rule will find it.

The work of rolling a QEP out — who does what, and when — lives in a **tracker issue**
with its work items as sub-issues, never in the QEP, so that completing, reordering or
dropping a step never requires amending the standard. Whoever merges the pull request
that records the acceptance opens it, so that the step has an owner. Where it lives is
its owner's choice, and may be a repository of its own. A QEP whose acceptance leaves
nothing to sequence needs no tracker.

The test for any sentence: if it would still bind once the rollout had finished, it is
a rule and belongs in the Proposal; if it says only who does what and when, it belongs
in the tracker.

### Writing a QEP

A QEP should be the simplest document that states its decision in full and is easy to
read. There is no length limit: length is an outcome of these principles, not a target.

- **Rules first.** A reader finds what is required before the history of how it was
  decided.
- **Every rule keeps its reason,** in a clause. A rule that explains itself can be
  applied to cases its author never saw; the incident that prompted it belongs in the
  commit message.
- **Each thing is said once.** A QEP does not restate itself between sections, and
  `AGENTS.md` links to a rule instead of repeating it.
- **A QEP records the standard as it is,** not how it came to be: it carries no history
  of versions. Git is the change record.
- **Alternatives keep the deciding reason** for each option not chosen, and link to the
  discussion for the rest.
- **A QEP states the rule, not how to implement it.** How a repository or a tool meets
  a rule is theirs to decide, and a description of an implementation goes stale
  silently.

### Numbering

Numbers are assigned sequentially. An author may propose the next free number when
opening the PR; it is confirmed (and adjusted if two proposals collide) at merge. A
number is **reserved when the draft PR opens** and released if that PR is closed without
merging. The README index lists only merged QEPs, so **gaps are normal while drafts are
open**, and a QEP that merges out of numeric order takes its numeric position
automatically. Numbers are written **unpadded** in text (QEP-1, QEP-2, …); only the
filename zero-pads them to four digits (`qep-0001-…`). This QEP is QEP-1.

### Roles

- **Author** — anyone may write a QEP; typically a maintainer. The author announces
  the PR and drives the discussion.
- **Core Maintainers** — the maintainers with admin rights on `QuantEcon/qeps`. They
  decide by lazy consensus, once no objection is outstanding; acceptance is an
  approving review from one of them who is not the author.
- **Lead** (@jstac) — breaks ties and may defer a decision.

No sponsor, delegate, or editor role is introduced; the process is intended to stay as
light as the decisions it records.

### Format

Each QEP is a Markdown file with YAML frontmatter (`qep`, `title`, `author`, `status`,
`type`, `created`, `discussion` — plus the CI-stamped `version` and `version-hash`, which
sit just after `type` from the merge that records the QEP's outcome) followed by the
sections in [`qeps/template.md`](../qeps/template.md): **Summary, Motivation, Proposal,
Alternatives considered**. The `type` field describes the **kind of content**
the QEP carries:

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
- **A length limit for QEPs.** Rejected: text cut to a word target keeps its rules and
  loses the reasons behind them. Length is an outcome of the writing principles, not a
  target.
- **An Adoption section in each QEP.** Rejected: even written as obligations it mixed
  three things — what conforming requires, how existing things migrate, and who does
  what and when — and it attracted plans, lists of instances and version histories.
  The first two are rules and are found more easily in the Proposal; the third is a
  tracker's.
- **A dedicated repository for each QEP's rollout.** Rejected as a rule: a rollout's
  tracker is an issue, and its evidence and decisions have homes of their own, so most
  rollouts need no repository, and mandating one invited an accumulation of working
  records. An owner may still choose one where a rollout is large.
- **An implicit v0 (absent `version`), anchored only from v1.** The v1–v2 design:
  absence itself said "never substantively changed", and one-off QEPs carried no stamp.
  Dropped in v3 because the asymmetry pushed a special case into every consumer
  ("absent means v0 — choose your own anchor") and left the machine-readable appendix
  of an accepted-but-unamended standard with no recorded revision at all: QEP-2 shipped
  normative tooling input with nothing to cite ([#22](https://github.com/QuantEcon/qeps/issues/22)).
  Uniform stamping from v0 costs a pill and a bot commit; the implicit v0 cost
  correctness, in prose that described pinning which did not yet exist.
- **A recorded decision deadline, with lazy consensus resolving at it.** The v1–v2
  design: the author set a comment window and recorded a decision date in the PR
  description, and the Core Maintainers decided at it. Dropped in v3 because nothing
  enforced it and the team did not keep it
  ([#26](https://github.com/QuantEcon/qeps/issues/26)). Enforcing it in CI was
  considered and declined: the deadline's function — a moment at which lazy consensus
  resolves — is served as well by *no objection outstanding*, which a reviewer
  establishes by reading the thread. The cost is that nothing is accepted by the passage
  of time; a QEP nobody looks at stays open until someone looks. The check the deadline
  never supplied is the second reader in step 3.

