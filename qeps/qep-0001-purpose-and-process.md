---
qep: 1
title: QEP Purpose and Process
author: "@mmcky"
status: Draft
type: Process
created: 2026-06-16
discussion: https://github.com/QuantEcon/meta/issues/325
---

# QEP-1: QEP Purpose and Process

|              |                                                        |
| ------------ | ------------------------------------------------------ |
| **QEP**      | 1                                                      |
| **Title**    | QEP Purpose and Process                                |
| **Author**   | @mmcky                                                 |
| **Status**   | Draft                                                  |
| **Type**     | Process                                                |
| **Created**  | 2026-06-16                                             |
| **Discussion** | [QuantEcon/meta#325](https://github.com/QuantEcon/meta/issues/325) |

## Summary

A **QuantEcon Enhancement Proposal (QEP)** is a short, durable document that records a
decision affecting **more than one QuantEcon repository**, or that **changes how the
team works**. This QEP defines what a QEP is, when one is needed, where QEPs live, and
how a proposal moves from draft to decision. It is deliberately lightweight: the aim is
a ten-minute read, a clear deadline, and a clean close — not governance for its own
sake. As the first proposal, this document is also a worked example of the template it
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
`Final` state — `Accepted` *is* final.

### How a QEP is decided

1. **(Optional) Float the idea.** Open a *QEP discussion* issue to socialise it and
   confirm it warrants a QEP.
2. **Draft.** Open a PR adding `qeps/qep-XXXX-slug.md` from the template (with
   **Status: Draft** and a discussion link) and a matching row in the README index.
3. **Set a deadline.** The author announces the PR and sets a comment window —
   normally **one to two weeks**.
4. **Decide.** At the deadline, the **Core Maintainers** decide by **lazy consensus**:
   no sustained objection means the QEP is Accepted. If there is no consensus, the
   lead (@jstac) decides or defers.
5. **Record.** On acceptance, set **Status: Accepted** — in the frontmatter, the header
   table, and the README index row — confirm the number, and merge.

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
`type`, `created`, `discussion`) followed by the sections in
[`qeps/template.md`](../qeps/template.md): **Summary, Motivation, Proposal, Alternatives
considered, Rollout**. The `type` field is one of:

- **Process** — how QuantEcon works (this QEP).
- **Standard** — a concrete shared standard (e.g. a label set, a style rule).
- **Informational** — guidance or a recommendation with no binding action.

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

## Rollout

1. Merge this QEP (QEP-1) to establish the process.
2. Re-record the label-set decision
   ([QuantEcon/meta#324](https://github.com/QuantEcon/meta/issues/324)) as a worked
   `Standard`-type QEP.
3. Add a short "How we make cross-repo decisions" entry to the team manual pointing at
   `QuantEcon/qeps`, and have Core Maintainers watch the repository so proposal
   deadlines are seen.
