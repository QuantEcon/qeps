---
qep: 6
title: Project Tracker Structure and Order
author: "@mmcky"
status: Draft
type: standard
created: 2026-08-26
discussion: https://github.com/QuantEcon/qeps/issues/15
---

# QEP-6: Project Tracker Structure and Order

|              |                                                                      |
| ------------ | -------------------------------------------------------------------- |
| **QEP**      | 6                                                                    |
| **Title**    | Project Tracker Structure and Order                                  |
| **Author**   | @mmcky                                                               |
| **Status**   | Draft                                                                |
| **Type**     | standard                                                             |
| **Created**  | 2026-08-26                                                           |
| **Discussion** | [QuantEcon/qeps#15](https://github.com/QuantEcon/qeps/issues/15)   |

## Summary

This QEP defines the org's unit of project tracking: a **Project** is one tracker
issue, typed with the native `Project` issue type, whose work items are its
**native sub-issues** one level down. Every structural fact lives in exactly one
native carrier — membership in sub-issue edges, **order in list position**,
constraints in dependencies, grouping in milestones, freshness in one fixed
status stamp — and **sequence is never encoded in names**. The tracker body
carries what structure cannot: goal, current state, phase intent, gates, and
rationale, and it never restates what the platform already holds.

## Motivation

The practice exists; the convention doesn't. A 2026-08-23 audit of 99
tracker-shaped open issues org-wide found 13 title conventions (the commonest
covering 23%), 92% with no issue type, 60% tracking work in body checkboxes or
prose rather than sub-issues, status stamps in three forms, and zero use of
native dependencies. Coordination issues also have no honest label under QEP-2
([#11](https://github.com/QuantEcon/qeps/issues/11)), so "untyped = untriaged"
is currently unreliable.

Two things force the decision now. First, trackers have a **machine consumer**:
the projects dashboard's collector reads every registered tracker nightly, and
three producer classes write them (people, the `qe` skills, and future
maintenance agents). Second, **ordering has arrived from the field**: the first
work plan reached for milestones to express sequence
(QuantEcon/textstrata#8), and a `wp{issue}-stage{n}` milestone naming
convention was proposed to generalise it (QuantEcon/skills#55). Milestones
group but do not order; the review of that first instance found the plan's own
phases and the milestone axis cutting across each other, with the real
dependencies left in prose.

The root problem is structural: a sequence token in an issue title or a
milestone name **welds order to identity**. Every re-plan must then either
rename the work (breaking every prior reference to it) or let the names lie
against the visible list. Names are also the one carrier the machine consumer
cannot use: the dashboard's tracker contract deliberately **never reads title
conventions or labels**, and its redaction rules strip titles and milestone
names from private repositories (12 of the 28 registered trackers). Position,
edges, types, dates, and counts survive everywhere names do not — and each is a
single-writer fact: re-ordering a list is one gesture, renaming a token family
is one edit per issue.

## Proposal

### 1. The unit

A **Project is one tracker issue**. It carries the org-level **`Project` issue
type** — a native issue type, not a label, so QEP-2's label set is untouched
and "untyped = untriaged" stays reliable. Issue types are org metadata rather
than repository content, so the type survives even where a private repository's
content is redacted. This resolves the gap reported in
[#11](https://github.com/QuantEcon/qeps/issues/11).

Its **work items are its direct native sub-issues** — which may live in any
repository — and **progress is measured on direct children only, never
deeper**. Membership lives in the sub-issue edges: body checkboxes, plan
tables, and legacy tasklists are never work items. A tracker with no
sub-issues has **unmeasured** progress (never 0% — "no sub-issues" and
"nothing done yet" are different facts).

### 2. Order is positional

The sub-issue list is kept in **plan order**: **position is the order of the
plan**, and the **topmost open item is next**. The list is a plan, not a
queue — completed items keep their place, so the list stays readable as the
plan with progress visible in it. A new item is placed on arrival (it appends
by default; move it into its phase), and phase groups stay contiguous.

**Re-ordering moves items and never renames them** — by drag in the UI or by
the sub-issue reprioritize API (`PATCH …/issues/{parent}/sub_issues/priority`;
GraphQL `reprioritizeSubIssue`); the two write the same fact. **Sequence is
never encoded in issue titles or milestone names** (no `W3 —`, no `Phase 2:`
prefixes, no `stage{n}` tokens). Issue numbers are the stable handles; titles
are pure descriptions.

Order is an **operational property, not a published field** of the unit: a
consumer that publishes a child list should preserve list order (order is an
attribute of the membership edge and is observable exactly where membership
is), but no consumer may require, parse, or infer sequence from names.

### 3. Constraints are dependencies

A genuine sequencing constraint between work items is expressed as a **native
dependency** (blocked-by), never as prose. A dependency states a
**constraint** (a partial order), not a presentation order; position states
presentation. Dependencies are **optional** — most order is soft preference,
and edges are reserved for constraints that are real. Phase-level gates
("nothing in Phase 2 starts before Phase 1's exit criterion") are stated in
the body, not encoded as pairwise edges.

### 4. Phases are milestones (optional)

Where a tracker is large enough to want grouping, **milestones group work
items into phases**. Milestone names are **descriptive** ("Phase 1 —
Foundations"), never sequence tokens: a milestone is a single object that
issues *reference*, so renaming a phase is one edit that propagates
everywhere — the single-update-point property no title convention has. Phase
order shows as contiguity in the list; phase *meaning* (intent, exit
criterion, gate) lives in the body's phase table.

Two platform limits are accepted rather than worked around: an issue takes
one milestone, so phases must partition the work; and milestones are
per-repository, so **cross-repo work items fall back to the body's phase
table** — a same-named milestone in another repository is a copy, and copies
diverge.

### 5. The status stamp

The tracker body carries **exactly one machine-read element**: the status
stamp, in one fixed form.

- **Canonical**: a `## Where we stand (verified YYYY-MM-DD)` heading.
- **Accepted fallback**: a `> **Updated YYYY-MM-DD.**` banner line.

The string `verified YYYY-MM-DD` must not appear anywhere else in the body —
free-text near-misses are the known failure mode of stamp parsing. Everything
else in the body is for people; no other body text is machine-read.

### 6. The body

The body opens with a **one-sentence goal**, then the **stamp section at the
top**. The stamp section may open with a single **`**Next:**` line** — a link
to one work item plus one line of pickup context (branch, failing thing,
where to resume). This is the body's **only** statement of what is next: it
is a dated claim inside the one section whose contract is
dated-claims-re-verified-on-update, and if it ever disagrees with the list,
**the list is the authority** and the line is stale prose awaiting its next
stamp. Trackers that do not run working sessions omit the line.

The body carries what structure cannot: the goal and definition of done, the
where-we-stand narrative, phase intents and exit criteria, gates, sequencing
rationale, and scope boundaries ("what does not change"). The body **never
mirrors structure**:

| Never in the body | It already lives in |
|---|---|
| Work-item rosters or checkbox work lists | the sub-issue list (membership, order, state) |
| Milestone→issue tables | the milestone (one click, always live) |
| Hand-written progress counts or percentages | native sub-issue progress |
| Pairwise dependency prose for edges that exist | the dependency edges |
| Any "next"/"currently on" claim outside the stamp's `Next:` line | list position |

Work items are referenced from prose by number/URL (rendered live by GitHub),
never by copied titles. An informative body skeleton is given in Appendix A.

### 7. Scope

This QEP governs **project tracker issues** — the unit the projects registry
registers. The **programme layer** (programme → project → items) is
deliberately outside it. The surrounding *practice* — tracker vs period-plan
genres, session ledgers, succession, revision-log comment discipline — is
maintained in the org's `qe` skills, which cite this QEP as the authority on
the unit's structure.

## Alternatives considered

- **Sequence tokens in titles or milestone names** (`W0–W6`, `wp{n}-stage{m}`,
  `Phase 2:` prefixes). Rejected: welds order to identity, so every re-order
  renames k issues (breaking every prior "see W3" in immutable comment
  history) or leaves the tokens lying against the visible list. Unreadable by
  the machine consumer by contract, and stripped by redaction for private
  repositories. Field evidence: token families harden into names on first
  use, which is the tell that the real need is *handles* (issue numbers) and
  *grouping* (milestones), not order.
- **The body's plan table as the order authority.** Rejected: the native list
  renders in position order on the same page, so a table that enumerates a
  second order is a mirror in visible conflict with structure, and the
  discipline's own rule — claims re-verified, never carried forward — argues
  against maintaining mirrors. The table's job is meaning (phases, gates,
  rationale), not enumeration.
- **A `tracking` type label** (as floated in
  [#11](https://github.com/QuantEcon/qeps/issues/11)). Rejected in favour of
  the native `Project` issue type: QEP-2's one-type-per-issue label rule stays
  untouched, and the type survives redaction where labels are never read.
- **GitHub Projects (v2) as the ordering surface.** Rejected as authority:
  item order there is per-view, on a separate permission surface, in a second
  system the collector does not read. Fine as a *lens* over the same issues;
  never the source of truth.
- **Queue semantics for the list** (done sinks, next floats to top).
  Rejected: destroys the list's readability as a plan, fragments phase
  contiguity, and makes closing an item cost a move. Under plan semantics the
  routine gesture (closing) costs nothing and moves always mean re-planning.
- **A standalone resume box above the body.** Rejected: a second dated prose
  register beside the stamp section — two update points that diverge, and a
  stylistic near-miss with the banner stamp form. Folded into the stamp
  section as the single `Next:` line instead.

## Adoption

Obligations on the three producer classes and the one consumer:

1. **New trackers** conform at creation: `Project` type, sub-issue work items,
   stamp, plan-ordered list, order-free names.
2. **Registered existing trackers** are brought into this layout by the
   conform tooling (QuantEcon/skills#49); the collector reports compliance
   nightly. Adoption of the ordering rules is greenfield: at the 2026-08-23
   baseline only 3 of 28 registered trackers carry any milestone (all
   descriptive) and none use dependencies, so nothing is renamed and no
   history is rewritten.
3. **The `qe` skills** (`workplan-*`) operationalise the convention: create
   sub-issues in plan position, reprioritize on re-plan, and refresh the
   stamp section, `Next:` line, and list position as one atomic update. Their
   lint/conform pass may verify mechanically: stamp form present and unique,
   no sequence tokens in child titles or milestone names, no checkbox work
   lists, at most one `Next:` line and only in the stamp section, phases
   contiguous.
4. **The projects dashboard** treats the tracker's list order as the
   published child order (its tracker contract currently re-sorts children by
   issue number; that rule is amended to preserve list order — a one-row
   contract change plus a sort removal, verified once against a deliberate
   re-order on a public tracker). Order remains unpublished as a field;
   dependencies continue to publish as counts.

## Appendix A (informative): tracker body skeleton

```markdown
*Goal: one sentence on what done looks like.*

## Where we stand (verified YYYY-MM-DD)

**Next:** Owner/repo#N — one line of pickup context.

Narrative of state: recent movement, in flight, blockers.

## Plan

Work items and their order: the sub-issue list (top = next; completed items
keep their place). Constraints between items: native dependencies. Phases:
the milestones below.

| Phase | Intent | Exit criterion |
|---|---|---|
| [Phase 1 — Name](milestone-url) | … | … |

**Gates:** …

**Sequencing rationale:** why this order — only what the list cannot say.

## Out of scope / what does not change

…
```

Free sections (Findings, Premises, Notes) may follow — the skeleton is a
floor, not a ceiling. Revision history lives in comments, per the practice
conventions maintained in the `qe` skills.
