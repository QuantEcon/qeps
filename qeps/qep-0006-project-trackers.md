---
qep: 6
title: Project Tracker Structure and Order
author: "@mmcky"
status: Draft
type: standard
related: [2, 7]
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
| **Related**  | [QEP-2](qep-0002-standard-github-labels.md) — the content axis that *Issue types* composes with; [QEP-7](qep-0007-project-management-protocols.md) — the protocol this QEP binds to GitHub |
| **Discussion** | [QuantEcon/qeps#15](https://github.com/QuantEcon/qeps/issues/15)   |

## Summary

This QEP is the GitHub binding of QEP-7. A **Project** is one tracker issue, typed
`Project`, whose work items are its native sub-issues. Every concept of the protocol
has exactly one native carrier: kind in issue types, membership in sub-issue edges,
order in list position, constraints in blocked-by dependencies, a relation that
constrains nothing in relates-to links, phases in `Phase` issues, planning values in
issue fields and the accountable owner in the assignee, freshness in one fixed status
stamp, each status change in one dated update comment, and agent-authored text in its
disclosure line. The automated reviewer of pull requests is GitHub Copilot code
review. **Sequence is never encoded in names.** The body is a short charter that changes only with direction, followed by a
status block rewritten whole at each update; each change to it is announced by one
dated comment. What is next, what is in flight and how far a project has come are
derived from structure and never written.

## Motivation

The practice exists; the convention did not. A 2026-08-23 audit of 99 tracker-shaped
open issues org-wide found 13 title conventions, 92% with no issue type, 60% tracking
work in body checkboxes or prose rather than sub-issues, status stamps in three forms,
and no use of native dependencies. Trackers also have machine consumers, which read them
unattended, and three producer classes: people, the `qe` skills and unattended agents.

The first draft of this QEP fixed the structure and left the body free. A month of
trackers written to it showed what that produces. A 2026-09-28 review of 38 registered
trackers measured a median body of 1,100 words and no tracker shorter than a screen;
in a twelve-tracker sample the first screen answered 17 of 71 planning questions, and
none said whether the project was on track, when it would end, or whose decisions were
pending. The section whose contract is *current state* had become the revision log,
because it was the only mandatory write. Planning facts lived in prose: 0 of 212
issues carried a field value and 0 of 38 trackers a target date. Child issues held nearly
70% of the words a planner met and no rule covered them. A second status register beside
the tracker won every time, because it was the cheaper write.

The platform now carries what prose carried: issue fields, sub-issues, dependencies,
types and relates-to links are all generally available with REST access. Every mature
peer practice keeps typed status, a short dated update and a stable charter. This
revision moves QuantEcon's trackers to the same shape.

## Proposal

### 1. The unit

A **Project is one tracker issue** carrying the org-level `Project` issue type. Its
**work items are its direct native sub-issues**, which may live in any repository.
Membership lives in the sub-issue edges: body checkboxes, plan tables and legacy
tasklists are never work items.

An issue is a **work item** of a project by QEP-7's membership test (*Tiers and
terms*): closing it advances the definition of done, and if the goal must be widened to
justify it, it is not a member. An unparented issue is the normal case, not a gap to be
filled.

A project's direct children are work items and `Decision`s. A work item is a **leaf**
or a **phase**, whose own sub-issues are that phase's leaves. A project's work items
are of **one grain**: all leaves or all phases, with `Decision`s beside either. Progress
is a count over direct children, and for a phased project also over the open phase's
leaves; it is a snapshot over current membership, never compared across a membership
change. A tracker with no sub-issues has **unmeasured** progress, never zero. A tracker
whose children are project trackers is a programme (*Programmes*), never typed
`Project`.

**All started work has a plan home.** A repository with ongoing work keeps one standing
project at `Stage` Steady, its **upkeep tracker**. An issue joins it when work on it
starts outside any plan; its owner may also place an unstarted issue there to rank it.
Every other unstarted issue stays unparented. A closed child of an upkeep tracker
leaves its list once an update comment cites it, and no percentage is published for
the tracker, because its list never ends.

### 2. Issue types

Native issue types carry **structural role**: what kind of object an issue is in the
tracking system. The axis is orthogonal to QEP-2's labels, which classify **content**
at triage regardless of membership; the two compose (a work item whose content is a
bug is `Task` plus the `bug` label, never a `Bug` type). Types are org metadata: a
consumer branches on them, and they survive redaction where labels are never read.

| Type | Role | Closing means |
|---|---|---|
| `Programme` | a family of projects with a lead | the family is retired |
| `Project` | a project tracker | the definition of done is met |
| `Phase` | one step of a project, holding its leaves | the exit criterion is met |
| `Task` | a leaf work item | the work shipped |
| `Decision` | a decision point in a plan | the choice is recorded, or the question is moot |

A **`Decision`** is opened for a choice that blocks planned work beyond the session in
which it arises, or that someone other than the person running that session must make.
A choice ruled within one session is recorded in that session's change and in the next
update instead. A `Decision`'s assignee is the decider and its `Target date` the
needed-by date; its blocking edges go to what waits. The decider's own comment is the
ruling, complete when posted; a relayed ruling stands once the decider confirms it; a
ruling made in a document the decider merges is cited at its merge commit. The issue's
first line, edited in place at ruling, carries the outcome and cites the ruling by
option label or its first sentence, verbatim. A reversal is a new `Decision`.

**Only a leaf `Task` is closed by a reference** from a pull request or commit. A phase,
a project, a programme and a `Decision` close by their own act.

A type is admitted to the set only when it names a structural role with its own
meaning of "closed" that a consumer renders or branches on. Content classification is
never a type.

### 3. Planning fields

A project tracker has **one assignee, its accountable owner**. It carries five issue
fields: `Health` (On track, At risk, Off track), `Stage` (Proposed, Active, Parked,
Steady), `Priority` (Now, Next, Later), `Start date` and `Target date`. An Active
project meant to finish carries a `Target date`; a Steady one carries none. The date
is the current expectation, not a commitment: the tooling reports on it and never
enforces it, and moving it is an owner's judgement announced in an update.

A phase's date is its `Target date`, except where a repository plans by release; there
the release milestone's due date is the date of every item in it, and those items carry
none. A leaf carries a `Target date` only for its own deadline. A `Decision`'s is its
needed-by date.

Everywhere, the assignee is the accountable person; an assignment never means work is
under way. The fields are visible to everyone who can see the issue, and **a fact a
field carries is never written in prose**.

### 4. Order is positional

The sub-issue list is kept in **plan order**: position is the order of the plan, and
the list is a plan, not a queue. Completed items keep their place, except on an upkeep
tracker (*The unit*); a new item is placed on arrival. An item **dropped** from the plan is removed from
the list, because membership is the plan and a closed child counts as complete
whatever its closing reason. Re-ordering moves items and never renames them.
**Sequence is never encoded in titles or milestone names.** Issue numbers are the
stable handles; titles are outcomes, free of sequence, priority and date tokens.

What follows from order is **derived, never written**. *Next* is the topmost open leaf
with no open blocker on itself or any ancestor and no open pull request referencing it,
descending into the first open phase. *In flight* is an open leaf referenced by an open
pull request, or by a pushed branch that has no pull request. *Pending decisions* are
the open `Decision` children. No body states any of these.

Order is an operational property of the membership edge, observable exactly where
membership is. A consumer that republishes a tracker presents membership as recorded,
in the position the tracker places it; one that re-sorts or re-groups makes a
conformant tracker and a non-conformant one publish identically. No consumer may
require, parse or infer sequence from names.

### 5. Constraints are dependencies

A genuine sequencing constraint is a **native dependency** (blocked-by), never prose,
and it passes QEP-7's test (*Tiers and terms*): **output, not order**. An edge is
written where the downstream item cannot start without something the upstream item
produces; shared files, serial work by one agent and mere preference are sequencing
rationale, never edges. Dependencies are independent of the parent hierarchy and may
cross project boundaries.

A gate is an edge **between the issues actually constrained**: leaves, phases or
trackers. A phase-level gate is one edge between two `Phase` issues; a decision gate is
an edge from each waiting item to the `Decision`; a whole-project gate is a
tracker-to-tracker edge, which asserts that nothing in the blocked project may start
and is therefore the wrong instrument for a gate that holds one phase. Derivation
honours an ancestor's blockers, so a leaf under a blocked phase is parked without an
edge of its own.

A gate's rationale is **one clause, written once**, on the waiting issue, or on the
programme when both ends belong to it, and it is removed with its edge. The reverse
direction is read, never written: blocked-by and blocking are two ends of one edge. A
relationship that constrains nothing is a relates-to link. Whether an item is parked is
derived: an open item with an open blocker, on itself or an ancestor, is parked.

### 6. Phases

A phase is an issue of type `Phase`. Its title names its outcome; its body states the
intent and the exit criterion; its date follows *Planning fields*. Phases carry edges
and cross repositories, which is what a grouping needs. A project uses phases when its
flat list stops reading as a plan, and its definition of done then holds only checks
that no single phase's exit states.

**Milestones group a repository's releases** and carry no phase meaning, membership or
order. A release item's title may name its release, because the version is its
identity. A milestone title is never purely numeric, because tooling reads a numeric title as a
milestone number.

### 7. The status stamp

The tracker body carries **exactly one machine-read element**, the status stamp, in one
fixed form: the heading `## Where we stand (verified YYYY-MM-DD)`, optionally with a
time and zone. Nothing else goes inside the parentheses. The date is the writer's
local calendar date. The string `verified YYYY-MM-DD` appears nowhere else in the body.

The stamp heads the **status block**, a fixed form at the end of the body. The block
is the status. It is **rewritten whole, in place**, at each update, and holds only:

- **`Risk:`** the reason, present exactly when `Health` is not On track;
- **`Needs:`** what the plan waits on from people: an issue or pull request with the
  act in a few words, naming a person only where no object carries the ask, with the
  date the ask was first made, and mentioning them only when first named; or "none".
  An ask that names a person and is still unmet at the next update becomes an issue
  assigned to them.

The block restates no field, assignee or structure. A line carried from the previous
block is a claim like any other and is verified again. A wrong claim is corrected in
place. A stamp asserts that the block beneath it was checked on that date, so it is
never placed over a body with no status content.

**Each change to the block is announced by one update comment**: first the date and
the `Health` value, then what changed and why, as at most two dated, linked events. It
cites rulings by option label or the decider's words, records any correction,
restates no unchanged state, and is never edited. A comment without a block change
carries only an event that changes no status line. **No status comment is pinned.**

An update is due when a judgement changes (health, target, stage, priority, a new ask,
a ruling, direction) or a direct child closes. A list edit or the passage of time
never makes one due.

### 8. The body

The body has two parts. First the **charter**: the goal, written as the outcome; a few
observable done-when checks, or, for an upkeep tracker, the standing checks it keeps;
what the project will not do; an optional one-clause order principle; a resume
condition, present exactly when the project is parked; the one whole-project gate line,
when one applies; and a link to the repository's records. The charter changes only
when direction changes. Then the status block (*The status stamp*). **The skeleton is
the ceiling.** With the title, the fields and the child list, the body passes QEP-7's
planning test within one screen.

Each banned kind of text has a named home:

| Never in the body | It already lives in |
|---|---|
| A work-item roster, a numbered sequence, a checkbox work list | the sub-issue list |
| A `Next:` line, "currently on", "in flight" | derived from the list and open pull requests |
| Progress counts or percentages, phase completion or dates | native progress, `Phase` state, fields |
| A planning value in prose: health, stage, priority, dates, owner | the fields and the assignee |
| Dependency prose for an edge that exists | the edge and its one clause |
| History: what landed, what was ruled, when | the update comments and the records |
| Implementation detail, steps, resume notes | the records folder (QEP-7) |
| Evidence | the pull request, or an evidence bundle outside the records folder |
| Related work | relates-to links |

Work items are referenced by number, never by copied title. An ask that names an
object points at one its addressee can read.

### 9. Programmes

A programme is one issue of type `Programme`, assigned to its lead. Its direct
sub-issues are its member trackers, in focus order, and its own `Decision`s. A project
belongs to at most one programme, through its parent edge, the only record of
membership; a project tracker acquires no duty by belonging, and an unparented
project tracker is normal.

Its body states the purpose; who besides the lead has a final say, and on what; the
scope; the gates between members, each with its one clause; optionally, the reason for
the order; a resume condition, present exactly when it is parked; and a link to its
records. It never states a member's state and never publishes a progress count over
its members. Its `Stage` is a field; its status block and update comments follow *The
status stamp*, without a `Risk:` line, and its update comment opens with the date
alone, because its health is derived: the worst `Health` among its open Active members.
A programme that never ends stays open at `Stage` Steady.

### 10. Work items

A work item's body states its outcome, its done-when checks, any person it needs and
for what act, and the reason for any unobvious wait. It holds no status, steps,
evidence, history or links to working files: steps and resume notes live in the
records folder (QEP-7), evidence in the pull request that does the work or in a bundle
outside the folder. An adopted report keeps its
reporter's body, with at most a short done-when prepended.

### 11. Comments

A thread carries the update comments that announce status changes, rulings in the
decider's own words, questions to a named person, closing notes and conversation. The
status itself is in the body, never in a comment. A thread never carries session
reports, revision logs, audits, pasted bodies, reminders or repeat mentions. A person
may update the status by hand, in these forms.

Agent-drafted text carries QEP-5's disclosure line, which is the mark a reader and a
consumer filter on. It is posted by the person who approved it, or, for an update of
verified events only, by the person running the session. An agent never writes a
ruling; once ruled, it may copy the decider's words into a `Decision`'s first line. An
unattended run never writes a tracker record: it pushes branches and opens draft
changes, and its proposals wait for a session a person runs.

### 12. Scope

This QEP governs project trackers, their work items, their comments and programmes on
**GitHub.com**: the sub-issue reordering endpoint is absent from GitHub Enterprise
Server, so the ordering rule has no verified mechanism there. Procedures, numbers and
lints belong to the tooling, which records its numbers, reports against them for one
cycle before enforcing them, and enforces them at write. The records a project keeps
beside its tracker are QEP-7's. In a repository that keeps a `.qe/` folder, the
automated reviewer that QEP-7's *Who accepts a change* relies on, a review agent in
QEP-5's terms, is GitHub Copilot code review, because it is GitHub's native reviewer,
so the binding depends on nothing beyond the platform.

## Alternatives considered

- **Sequence tokens in titles or milestone names.** Rejected: welds order to identity,
  so every re-order renames issues or lets the names lie against the list; unusable by
  a consumer, which can neither parse names reliably nor publish them for private
  repositories.
- **A body status section of free prose.** Rejected: it was the first draft's rule, and
  on every tracker measured it became the revision log, because it was the one
  mandatory write and a session ending had nowhere else to put what it did.
- **A `Next:` line in the body.** Rejected: it was the first draft's one resume
  affordance, and in the field it grew to hundreds of words and disagreed with the list
  within days. Next is derivable, and a derived value cannot drift.
- **A pinned status comment.** Rejected: the body is the one surface every reader and
  consumer sees first, a pinned comment is a second register, and who may pin was
  unverified.
- **Milestones as phases.** Rejected: an issue takes one milestone, milestones are
  per-repository, and they carry no edges, so cross-repository projects had no phase
  carrier at all.
- **A conjunction of edges onto the first item of a waiting phase.** Rejected once
  phases became issues: one edge between two `Phase` issues says the same thing, and
  derivation honours an ancestor's blockers.
- **Content-classifying issue types** (`Bug`, `Feature`). Rejected: content is QEP-2's
  label axis, and a second carrier for the same fact lets the two disagree.
- **GitHub Projects as the ordering surface.** Rejected as authority: item order there
  is per-view, on a separate permission surface, in a second system every consumer
  would also have to read. Fine as a lens; never the source of truth.
- **A `Phase` issue field to group work items.** Rejected: a field's options are
  defined once for the organisation, while phase names belong to each project.
- **Queue semantics for the list** (done sinks, next floats to the top). Rejected:
  destroys the list's readability as a plan and makes closing an item cost a move.
- **Heartbeat updates on a schedule.** Rejected: reposting to keep a freshness signal
  alive measures activity, not status.
- **A `Decision` for every ruling.** Rejected: decision points stay few and real; a
  choice ruled in session is recorded in that session's change and the next update.

## Amendments to QEP-2

Carried here until acceptance, then applied to QEP-2 as a substantive amendment. Under
*Labelling policy*: `discuss` is never applied to a `Decision`, whose type already says
a decision is to be made; a sub-issue parent (a programme, a project or a phase) carries
a type and no Type label, because the type names its role and content labels belong to
the issues that do the work; and `Blocked by:` in a body is used only for a wait that
is not an issue, a decision point or a person's act, since each of those has its own
carrier. Under *What we deliberately don't label*: a campaign is a `Project`, a
recurring activity is a `Project` at `Stage` Steady, a family of projects is a
`Programme`, a step of a project is a `Phase`, and milestones group releases only. The
priority rows are unchanged.

## Amendments to QEP-5

Carried here until acceptance, then applied to QEP-5 as a substantive amendment. The
Code in brief does not change. Each paragraph below names where its text goes.

After the block under *In brief* (after the closing appendix marker), one sentence:
where this Code asks you to answer review, it means a person's review; *Own it* says how
a review agent's findings are answered.

In *A human is in the loop*, after the sentence ending "without a person approving what
it does", two exceptions: First, an agent in a session a person runs may post, under
that person's account and with the disclosure line, a tracker update of verified events
only, because it holds no judgement. Second, such an agent may fix or answer a review
agent's finding under that person's account; a reply that leaves a finding even partly
unfixed gives its reason and waits for the person's approval, because unlike a fix it
leaves nothing in the change to read.

At the end of *Organisation-operated automation is not an external contribution*,
after "whoever built it": A run with no person present writes no tracker record or
ruling and declines no finding, because a person must answer for each. A **review
agent** is an agent whose only output is comment-only reviews, posted under its own bot
account without a person approving them, however requested; a change it suggests lands
only when someone applies it as their own. A review agent counts as
organisation-operated automation, though no schedule runs it, because it acts with no
person approving each act. It does so when it has a named maintainer and an entry in
the public register of the organisation's automation; lacking either, it is an
unattended agent. Its bot account alone satisfies disclosure, in place of the
`automated` label, because the label marks what automation opens and a review agent
opens nothing. Unlike other automation, a review agent's maintainer answers for
enabling and configuring it, not for each finding, because a finding changes nothing
until someone acts on it; *Own it* and *Verify before you claim* bind whoever acts on
one. The maintainer proposes to the maintainers withdrawing it, where it is enabled or
by amending the QEP that requires it, once its findings cost authors more than they
catch, by the tooling's measure.

In *Disclose*, at the end: an agent's reply to a review agent ends with
`Assisted-by: <tool> (<model>)` naming that agent, and a pull request whose author
applies a review agent's suggestion names it in its line.

In *Own it*, the clause "not by passing a reviewer's comments to an agent" becomes "not
by passing a person's review comments to an agent", and at the end: You may fix or
answer a review agent's finding yourself, or have an agent do so in a session you run,
because answering a review agent spends no reviewer's attention. Either way the change
stays yours to explain, and a reply that leaves a finding even partly unfixed waits for
your approval. A finding a human reviewer endorses in a comment of their own is theirs,
and you answer it yourself.

## Adoption

1. **The org issue-type set** is reshaped once by reversible calls: `Programme` and
   `Phase` created, `Bug` and `Feature` disabled rather than deleted, and each type
   given the description of its row in *Issue types*. **The org fields** `Health` and
   `Stage` are created, `Priority`'s options become Now, Next and Later, and the five
   planning fields are made visible to everyone who can see an issue. Each step is
   reversible: a type is disabled, never deleted.
2. **New trackers** conform at creation. A tracker template is a Markdown template,
   never an issue form: forms render field labels as headings and cannot emit the stamp
   heading, while a Markdown template passes the body through verbatim and can set the
   type. A template sets the type only; fields, parent, dependencies and order are set
   after creation and read back, because creation cannot be trusted to carry the type
   on every surface. Placeholders use square brackets, because GitHub drops tag-shaped
   text when it renders.
3. **Existing trackers** are brought to this shape by a conform pass that re-verifies
   every status claim against live records before writing, retitles as an outcome,
   writes the charter from the goal and the phase exits, moves history to one update
   comment and the records, types each child, adds native edges for real gates and
   removes the gate prose, and sets the fields and the assignee. Claiming a work item
   that already has a parent detaches it from that parent, so the pass reads an item's
   parent before linking and re-links or records the detachment.
4. **Tooling that writes trackers** drafts from the records and live structure,
   resolves every present-tense or outcome claim to a primary record read live, and
   has judgements approved by the accountable owner, with `Stage` and `Priority` by the
   programme lead. Membership, order and edges change with the owner's approval. It re-reads each carrier before
   writing it and abandons the write if the carrier moved. In a body it rewrites only a
   tracker's status block and a `Decision`'s first line, from the raw source, because
   body writes are whole-replace with no compare-and-swap and some surfaces return a
   sanitised rendering that destroys content when written back. It writes fields one
   at a time, reads back every write, and posts the update comment only after its
   block reads back. Its lint checks the layout of a body against Appendix A, the
   bans of *The body*, titles, and the budgets the tooling sets.
5. **Review.** Each repository that keeps a `.qe/` folder requests Copilot code review
   automatically on every pull request and on each new push, so that the review covers
   the commit that merges. At acceptance, Copilot code review gets a named maintainer
   and one entry, covering every repository and every request, in the public register
   of the organisation's automation, created by that entry if none exists.

## Appendix A (informative): the six skeletons

Each skeleton is defined here once. A repository's issue templates and the tooling's
lint are generated from it or checked against it. Lines marked optional appear only
when they apply; no free sections follow.

**Programme**

```markdown
**Purpose:** [what the family delivers together, one sentence]
**Decides:** @[person]: [matters]             ← only people other than the lead
**Scope:** [in] · not: [out]
**Resumes when:** [condition]                 ← present exactly when Stage is Parked
**Gates:**
- #[A] waits on #[B] for [what B produces]    ← each with a native edge
**Sequencing:** [why this order]              ← optional
Records: [.qe/](link)

## Where we stand (verified YYYY-MM-DD)

**Needs:** #N: [act] · @[handle]: [act] (since YYYY-MM-DD)   ← or "none"; a handle only where no object carries the ask
```

The programme's update comment opens with the date alone.

**Project**

```markdown
**Goal:** [the outcome, written as if delivered]

**Done when**
- [observable check]                          ← a few; a phased project lists only what no phase's exit states

**Not doing**
- [one line]                                  ← optional

**Order:** [sequencing principle]             ← optional
**Resumes when:** [condition]                 ← present exactly when Stage is Parked
**Waits on #N:** [what it produces]           ← only a whole-project gate outside a shared programme
Records: [.qe/](link)

## Where we stand (verified YYYY-MM-DD)

**Risk:** [why Health is not On track]        ← present exactly when it is not
**Needs:** #N: [act] · @[handle]: [act] (since YYYY-MM-DD)   ← or "none"; a handle only where no object carries the ask
```

The update comment that announces a change to the block:

```markdown
**YYYY-MM-DD · [Health value].**

[What changed and why: one or two events, dated and linked; "Corrected: [claim]" for a correction]

Log: [entry](permalink)                       ← when a records change exists
Assisted-by: [tool] ([model])                 ← when drafted by an agent
```

**Upkeep tracker** (a `Project` at `Stage` Steady)

```markdown
**Goal:** [what this repository keeps working, for whom]
**Keeps**
- [standing check that defines healthy]       ← Health is judged against these
**Not doing**
- [one line]
**Order:** [how unplanned work is ranked]     ← optional
Records: [.qe/](link)

## Where we stand (verified YYYY-MM-DD)

**Risk:** [why Health is not On track]        ← present exactly when it is not
**Needs:** #N: [act]                          ← or "none"
```

**Phase**

```markdown
**Outcome:** [what this phase delivers, for whom]
**Exit when**
- [observable check]
**Waits on #N:** [for what]                   ← only if not obvious from the edge
```

**Task**

```markdown
Blocked by: [a blocker that is not an issue, decision or person's act]   ← first line, only if one exists
**Outcome:** [what changes, for whom, and why]
**Done when**
- [observable check]
**Needs a person:** @[who]: [act]             ← only if any; never a choice
**Waits on #N:** [for what]                   ← only if not obvious
```

**Decision**

```markdown
**Decided YYYY-MM-DD by @[decider]:** [option label, or the ruling's first sentence] · [ruling](URL)   ← line 1, written at ruling

**Question:** [one sentence, answerable by choosing an option]
**Options**
- **[label]**: [consequence for what waits]   ← "(recommended)" only where a source recommends
**Consult:** @[who]                           ← optional
**Analysis:** [record or evidence](permalink)
```
