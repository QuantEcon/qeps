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
type** — a native issue type, not a label, so QEP-2's label set is untouched.
Issue types are org metadata rather than repository content, so the type
survives even where a private repository's content is redacted. This resolves
the gap reported in [#11](https://github.com/QuantEcon/qeps/issues/11).

Its **work items are its direct native sub-issues** — which may live in any
repository — and **progress is measured on direct children only, never
deeper**. Membership lives in the sub-issue edges: body checkboxes, plan
tables, and legacy tasklists are never work items. A tracker with no
sub-issues has **unmeasured** progress (never 0% — "no sub-issues" and
"nothing done yet" are different facts).

An issue is a **work item** of a project if closing it advances the project's
definition of done. If the definition of done can be met without it, it is not
a member — however much it shares a repository, a theme, or an owner. **If the
goal must be widened to justify an item's membership, the item is not a
member.** Not every issue belongs to a project — an unparented issue is the
normal case, not a gap to be filled — and an unparented project tracker is
likewise normal: not every project answers to a programme.

A tracker's direct children should be **homogeneous in kind** — all leaf work
items, or all project trackers. Progress is a count over direct children, so
mixing a multi-item project with leaf issues weights them equally and makes
the percentage meaningless. The percentage is also a **snapshot over current
direct children, not a time series**: membership changes — items dropped,
items moved to another project, a tracker split — move the number without
work occurring, so progress is never compared across a membership change.

### 2. Order is positional

The sub-issue list is kept in **plan order**: **position is the order of the
plan**, and the **topmost open item is next**. The list is a plan, not a
queue — completed items keep their place, so the list stays readable as the
plan with progress visible in it. A new item is placed on arrival (it appends
by default; move it into its phase), and phase groups stay contiguous.

Dropping is different from completing. An item **dropped** from the plan —
closed `not_planned`, or superseded — is **removed from the sub-issue list**:
membership is the plan, and work no longer in the plan is not a member. The
issue itself persists with its own `state_reason` (`completed`, `not_planned`,
or `duplicate` with `duplicate_of`) and its cross-references intact — only
the membership edge goes. This is mechanical as well as semantic:
`sub_issues_summary.completed` counts every closed child regardless of
`state_reason`, so a dropped item left in place inflates the tracker's
reported progress.

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
and edges are reserved for constraints that are real. Dependencies are
independent of the parent hierarchy, so an edge may cross project boundaries.

**Gates** cover phase-level and project-level constraints. Most cross-project
gates are **phase-level** in practice — one phase of A waits on one phase of
B while the rest of both proceeds — and a phase-level gate ("nothing in
Phase 2 starts before Phase 1's exit criterion") is stated in the body, not
encoded as pairwise edges, because no object represents a phase. Where a
project genuinely waits on another project **in its entirety**, that gate
must also carry the native dependency edge between the two tracker issues,
with the body carrying only the rationale. State the constraint at the
granularity that is actually true: a tracker-to-tracker edge asserts that
*nothing* in the blocked project may start, and parks it wholesale in any
consumer deriving parked-ness from blockers. A gate is stated **once**, in
the body of the project that must wait; the other project points at it (see
§6, Related work) rather than restating it.

Whether an item is **parked** is derived, not carried: an open item with an
open blocker is parked. Position states where an item sits in the plan;
dependencies state whether it can start. Where a gate is a decision rather
than an issue, create the issue for the decision rather than describing the
park in prose.

### 4. Phases are milestones (optional)

Where a tracker is large enough to want grouping, **milestones group work
items into phases**. Milestone names are **descriptive** ("Phase 1 —
Foundations"), never sequence tokens, and never purely numeric (`gh issue
list --milestone` parses its argument as a number first, so a milestone
titled "2026" is looked up as milestone *number* 2026 and fails). A milestone
is a single object that issues *reference*, so renaming a phase is one edit
that propagates everywhere — the single-update-point property no title
convention has. Phase order shows as contiguity in the list; phase *meaning*
(intent, exit criterion, gate) lives in the body's phase table.

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

Body writes are **whole-replace**: GitHub offers no partial update and no
compare-and-swap, so a stamp refresh is a **read-modify-write within a
single turn**, preserving all body content outside the stamp section —
concurrent writers otherwise silently discard each other's edits. The read
half must be **lossless**: read the body from a surface that returns its
source (the REST issues endpoint returns raw markdown). Some agent surfaces
return a sanitised rendering instead — HTML entities substituted, and
anything tag-shaped, such as a `<placeholder>` in a code snippet, silently
dropped — and writing such a read back destroys content while appearing to
preserve it. Where only a sanitising surface is available, treat the body as
append-only and record corrections as comments. This applies to every
programmatic body write, not only the stamp.

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

The bans have named replacements: the body's **phase table carries phase
intent and exit criteria, never membership** — the question a roster answers
(which items are in which phase) is already answered by the sub-issue list
and the milestones. A ban with a named replacement survives contact with
producers; a ban alone gets worked around.

A **Related work** section (optional) names sibling **projects** — one line
each on how they relate: informs, spawned by, shares an engine, gated by
(pointing at the body that states the gate). GitHub records only that a
mention happened; a deliberate relationship between projects is an assertion
with no native carrier, which is what the body is for. Entries name
projects, never work items — an entry may cite item numbers as the specifics
of a project-level relationship, but an entry whose subject is a work item
is the sub-issue list restated or dependency prose, both banned above.

Work items are referenced from prose by number/URL (rendered live by GitHub),
never by copied titles. An informative body skeleton is given in Appendix A.

### 7. Scope

This QEP governs **project tracker issues** — the unit the projects registry
registers. The **programme layer** (programme → project → items) is
deliberately outside it. The surrounding *practice* — tracker vs period-plan
genres, session ledgers, succession, revision-log comment discipline — is
maintained in the org's `qe` skills, which cite this QEP as the authority on
the unit's structure.

The QEP is scoped to **GitHub.com**: the sub-issue reordering endpoint is
absent from GitHub Enterprise Server API descriptions through 3.18, so the
ordering rule has no verified mechanism there.

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
   stamp, plan-ordered list, order-free names. A tracker template is a
   **markdown template**, never an issue form: forms render field labels as
   `###` headings and cannot emit the stamp heading or its dynamic date,
   while a markdown template passes the body through verbatim and can set
   `type:`. Templates cannot set milestone, parent, dependencies, or order —
   those are post-creation for every producer. Creation is never trusted to
   carry the type: after creating a tracker, assert the type by read-back
   (`gh issue view N --json issueType`) and set it explicitly if absent —
   non-interactive `gh issue create` does not apply templates at all, and
   the REST `type` parameter is silently dropped for callers without push
   access; both fail silently. Assert against the issue itself, not an org
   type enumeration (`GET /orgs/{org}/issue-types` is 403 for app identities
   where the repo-scoped read succeeds), and key automation on
   `issue.type.name` — webhook payloads carry no template identifier.
2. **Registered existing trackers** are brought into this layout by the
   conform tooling (QuantEcon/skills#49); the collector reports compliance
   nightly. Claiming a work item that already has a parent **detaches it
   from that parent**: sub-issue membership is single-parent, and both
   `gh issue edit --add-sub-issue` and `--parent` set `replace_parent`
   unconditionally, with no opt-out. The conform tooling must read an item's
   existing parent before linking, and re-link that parent or record the
   detachment — a programme tracker silently emptied this way reports its
   remaining closed children as complete. Adoption of the ordering rules is
   greenfield: at the 2026-08-23 baseline only 3 of 28 registered trackers
   carry any milestone (all descriptive) and none use dependencies, so
   nothing is renamed and no history is rewritten.
3. **The `qe` skills** (`workplan-*`) operationalise the convention: create
   sub-issues in plan position, reprioritize on re-plan, and refresh the
   stamp section, `Next:` line, and list position as one atomic update. Their
   lint/conform pass may verify mechanically: stamp form present and unique,
   no sequence tokens in child titles or milestone names, no checkbox work
   lists, at most one `Next:` line and only in the stamp section, phases
   contiguous. The skills currently cite the dashboard's tracker contract,
   which permits body constructs this QEP forbids; until that contract's
   planned handover to this QEP, this QEP is authoritative for tracker
   structure wherever the two disagree.
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

**Gates:** … (phase-level gates live here; a whole-project gate also carries
a tracker-to-tracker dependency edge, with only the rationale stated here,
once, in the project that waits)

**Sequencing rationale:** why this order — only what the list cannot say.

## Related work

- [Project name](tracker-url) — one line on the relationship.

## Out of scope / what does not change

…
```

Free sections (Findings, Premises, Notes) may follow — the skeleton is a
floor, not a ceiling. Revision history lives in comments, per the practice
conventions maintained in the `qe` skills.
