---
qep: 6
title: Project Trackers and Working Records
author: "@mmcky"
status: Draft
type: standard
related: [2]
created: 2026-11-17
discussion: https://github.com/QuantEcon/qeps/pull/18
---

# QEP-6: Project Trackers and Working Records

|              |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| **QEP**      | 6                                                                  |
| **Title**    | Project Trackers and Working Records                               |
| **Author**   | @mmcky                                                             |
| **Status**   | Draft                                                              |
| **Type**     | standard                                                           |
| **Created**  | 2026-11-17                                                         |
| **Related**  | [QEP-2](qep-0002-standard-github-labels.md) — labels classify the content of an issue, types its role |
| **Discussion** | [QuantEcon/qeps#18](https://github.com/QuantEcon/qeps/pull/18) — the earlier draft and its review |

## Summary

This QEP sets out how a project is tracked and where a repository keeps its working
knowledge. It rests on one idea: every fact has one home.

- **A project is one tracker issue, and its sub-issues are its plan.** The tracker is
  the single record of what is planned and what is next. People and agents read the
  same one, and it is short enough to take in at a glance.
- **A repository keeps no second record beside the tracker:** no plan files, decision
  registers or session logs.
- **The only notes a working session leaves behind are one handover file,** which lives
  on the work branch and never reaches the default branch.

## Motivation

A 2026-11-17 audit read every typed issue in the organisation and the working records
of 60 repositories. It found the same shape in both:

- **Trackers had become documents.** The median open project tracker ran to 977 words.
  About half of all tracker text was a dated narrative of what had merged or a
  restatement of the sub-issue list, both of which the platform already records.
- **Planning values had two homes and one was empty.** Stage, priority and dates were
  defined as issue fields and also declared in a registry. One tracker in fifty had a
  field set; the registry was complete.
- **Working records only grew.** Session logs, hand-offs, plans and decision records
  totalled about two million words across 18 repositories under four different folder
  conventions. No repository examined had ever deleted one, although a periodic tidy was
  the stated rule.
- **Agents treated records as constraints.** A record written as the reasoning behind a
  past choice was read as a rule in force, so sessions declined to revisit choices that
  no longer fitted the code.

The cause is common to all four: the same fact was kept in two places, and the cheaper
place to write won. The fix is one home for each fact, and nothing kept that the
platform or the code already holds.

## Proposal

### One home for each fact

Every fact about a project lives in exactly one place. Where the platform, the code or
git history already holds a fact, nothing restates it. A copy and its original are
updated at different times, so sooner or later they disagree, and a reader cannot tell
which is right.

### Issue types

An issue's **type** says what role it plays in tracking. There are three. Types are
separate from [QEP-2](qep-0002-standard-github-labels.md)'s labels, which say what an
issue is about: a work item that fixes a defect is a `Task` with the `bug` label.

| Type | Role | Closed when |
|---|---|---|
| `Project` | a project's tracker | its done-when checks are met |
| `Task` | a unit of work | the work has shipped |
| `Decision` | a choice the plan waits on | the choice is recorded, or the question is moot |

How an issue closes depends on its type:

- **A `Task` with no sub-issues may close automatically,** when a pull request or
  commit that references it merges.
- **A `Project`, a `Decision`, and a `Task` that has sub-issues are closed by a
  person,** because a merge cannot tell whether a goal has been met.

### A project is one tracker issue

A **project** is one issue of type `Project`. Its **work items are its sub-issues**,
which may live in any repository.

- **The sub-issue list is the plan,** kept in plan order. Completed items keep their
  place, so the list still reads as the plan. An item dropped from the plan is removed
  from the list, because a closed sub-issue counts as done.
- **An issue belongs to a project only if the goal cannot be met without it.** An issue
  outside every project is normal and needs no parent.
- **What is next is never written down.** It is the first open sub-issue with nothing
  blocking it. A written "next" line goes stale the first time the list is reordered.
- **Sequence is never encoded in a title.** Re-ordering moves an item and never renames
  it. Titles state outcomes.

### Constraints are dependencies

When one item must wait for another, that is recorded as a native blocked-by
dependency, never in prose, so that people and tooling read the same link.

A dependency exists only where the waiting item cannot start without something the
other produces: a ruling, a document, a release. Touching the same files, or a
preferred order, is not a constraint. Two items that are merely related get a
relates-to link.

### Phases

A project uses phases only when its flat list of sub-issues stops reading as a plan.

A **phase is a `Task` that has its own sub-issues.** Its title names the phase's
outcome, and its body states the check that ends it. No separate type is needed,
because tooling can tell a phase from a single task by whether it has sub-issues.

### Decisions

A `Decision` is opened for a choice the plan has to wait for. That is a choice that
cannot be settled in the working session where it comes up, or one that someone other
than the person doing the work must make.

- **Its assignee is the decider.**
- **Work that cannot start before the choice is blocked by it,** with a native
  dependency.
- **The ruling is the decider's own comment,** and the issue is closed when it is
  posted. An agent never writes a ruling.
- **A reversal is a new `Decision`,** so the earlier ruling stays readable as it was
  made.

A choice that is cheap to reverse and made within one session needs no `Decision`; it is
stated in the pull request that applies it.

### Programmes, and combining projects

The organisation keeps one **projects registry**: a single reviewed list of its
projects, recording for each its tracker, stage, priority, dates and programme.

A **programme** is a named group of projects, declared in that registry and not as an
issue type. A programme may have one ordinary, untyped issue as its front door, whose
sub-issues are the member trackers; the registry identifies it.

Projects whose tasks routinely block one another, or that share decisions, are
**combined into one project** instead of being coordinated across trackers, because
dependencies inside one plan are visible in one list.

### Planning values

- **Stage, priority and dates are declared once, in the organisation's projects
  registry,** and not on the issue, so that each value has one reviewed home and no
  two readers can see different ones.
- **Health, meaning whether a project is on track, is observed from its activity and
  never declared,** because a value set by hand goes stale without anyone noticing.
- **The owner of a project is the tracker's assignee.** A project tracker has exactly
  one.

### The body

An issue body follows the shape for its type in *Appendix: the three shapes*, and
contains nothing else. A person should be able to read it without scrolling.

There is no word limit. A body holds what its shape allows and no more. Tooling may
warn when a body contains text that has a home elsewhere, such as a dated account of
what merged, a checklist, or a restated sub-issue list. It warns on content, never on
length, and it never blocks.

Tracker bodies used to fill up with other kinds of text. Each has a home elsewhere:

| Never in a tracker body | Where it already lives |
|---|---|
| A work list, a numbered sequence, checkboxes | the sub-issue list |
| What is next, in flight or blocked | derived from the list, its dependencies and linked pull requests |
| Progress counts, stage, priority, dates, owner | the sub-issue list, the registry, the assignee |
| What merged or was ruled, and when | the pull requests, the issue timeline, the `Decision` |
| Background, findings, analysis | `docs/` or `research/` in a repository (see *Working records*) |
| Steps, context and acceptance for one task | that `Task` |
| Related work | relates-to links |

When a body grows long:

- **A `Decision`** keeps the question and options in the body, and moves its analysis
  to its first comment or to a file under `research/`.
- **A `Task`** is usually two tasks, or carries background that belongs under `docs/`
  or `research/`.

### The status block

A project tracker ends with one dated heading, in exactly this form, because tooling
reads the date:

```markdown
## Where we stand (verified YYYY-MM-DD)
```

Under it are at most two lines:

- **`Risk:`** why the project is off track. Present only when it is.
- **`Needs:`** what the project waits on from a person, as an issue reference and a few
  words, or "none".

These are the only two facts about a project's state that cannot be worked out from
its sub-issues.

The date changes only when the owner has re-checked the block. A tracker whose
sub-issues are moving needs no new date.

### Comments

Comment when a person needs to read something.

One comment is required. When `Risk` appears or changes, or `Needs` newly names a
person, post one short comment that mentions whoever must act. An edit to a body
notifies nobody.

A thread never carries session reports, revision logs or pasted bodies. The one
exception is a handover for work that has no branch (see *Handover*).

### Working records

Working records are the notes a team and its agents write while working: plans, session
logs, hand-offs and decision records.

A repository keeps no folder of them on its default branch. Each kind of working
knowledge has one home instead:

| Content | Home | Rule |
|---|---|---|
| Agent instructions | one root `AGENTS.md`; any other tool's instruction file is a one-line pointer to it | Rules in force now, each with its reason, and nothing else: no history and no citations of past decisions. |
| Product documentation | `docs/` | Describes what exists now. Rewritten in place. |
| Evidence | `research/YYYY-MM-DD-topic/`, or attached to the release or pull request it supports | Dated and frozen: audits, reviews, measurements. Read on request, never as instructions. |
| Plans, state, what is next | the tracker and its sub-issues | No plan, roadmap, state or next-steps file. |
| Ideas not yet scheduled | an issue with no parent, or nothing | No backlog file. |
| Decisions | the `Decision`, and the commit or code comment that applies it | No decision register. |
| Handover between sessions | `.qe/HANDOVER.md` on the work branch | See *Handover*. |

The reason for the table is that an agent cannot tell a stale note from a rule in
force. Five rules follow:

- **A rule states its reason beside it,** in a clause and without a citation. A reader
  who knows why a rule exists can apply it to a case nobody foresaw, and can tell when
  it no longer applies. A reason kept in a separate record is lost when that record
  goes.
- **`AGENTS.md` stands alone.** A rule there is complete as written and does not depend
  on a definition in another file. It may link to `docs/` for detail a reader can do
  without, never for the rule itself.
- **What the code must always do is a test,** not a note. A safety rule that no test,
  check or branch rule enforces stays written in `AGENTS.md`, and gains a check where
  one is cheap.
- **Why a surprising choice was made is a comment at the code it explains,** and the
  message of the commit that made it.
- **Earlier notes and decisions are context, not constraints.** Where the code or the
  task points to a better choice, an agent proposes it.

### Handover

A session that stops with work unfinished may leave one file, `.qe/HANDOVER.md`, on the
branch it was working on. The file is committed scratch space for the next session on
that branch. It travels with the branch, so a session on another machine can pick the
work up without access to anything else.

- **It holds** the task, what is done, what is under way, what failed and the next
  step, briefly. It may also be a work order for another machine, with its
  scripts beside it in `.qe/`.
- **It is overwritten each session,** never appended, so it describes the present.
- **It never reaches the default branch, and a check enforces that.** A rule to tidy
  working records by hand was already in place, and no repository followed it.
- **Results that must last** move to `research/` before the merge.
- **It does not track the project.** What is next for the project is the tracker's to
  say.
- **The next session verifies it against the code** before relying on it.

Work that has no branch hands over in a comment on its `Task` or `Decision`.

## Amendments to QEP-2

Carried here until acceptance, then applied to
[QEP-2](qep-0002-standard-github-labels.md) as a substantive amendment in the
landing pull request.

1. **Labelling policy, `question` versus `discuss`.** Add: `discuss` is never applied to
   a `Decision`, whose type already says a decision is to be made.
2. **Labelling policy, *A sub-issue parent is structure, not work*.** Add: a `Project`
   carries its type and no Type label, because content labels belong to the issues that
   do the work.
3. **The one behavioural change.** Replace the sentence beginning "A blocker that is not
   an issue": a wait on a choice is a blocked-by dependency on its `Decision`; a wait on
   a person is the tracker's `Needs:` line; a "Blocked by: …" first line in a body is
   used only for a wait that is neither.
4. **What we deliberately don't label.** Replace the row for project / grouping
   labels, which points to Milestones: a campaign or a recurring programme of work is a
   `Project`; milestones group a repository's releases.

## Alternatives considered

- **A tracker for people and a records folder for agents.** The design this QEP
  replaces. Rejected: they are two records of one project. The folder was the easier
  place to write, so it grew without limit, while tracker bodies filled with narrative
  to compensate. Agents now read issues, sub-issue order and dependencies directly, so
  one record serves both readers.
- **Keep a records folder on the default branch,** pruned on a schedule or held small
  and permanent. Rejected: pruning was already the rule, and no repository examined
  had ever done it; a small folder would hold only notes that agents read as rules,
  and would need a check to stay small. A folder that cannot exist on the default
  branch needs no pruning, and the one need it met, handover between sessions and
  machines, is met by a file that lives on the work branch.
- **Decision records kept in the repository.** Rejected: nothing flags a record when it
  becomes obsolete, and by design it was never deleted, so constraints only
  accumulated. A decision that must hold is enforced by a test or stated in
  `AGENTS.md`, with its reason beside it; the fuller reasoning stays with the
  `Decision` and the commit.
- **Planning values as issue fields.** Rejected: the values were already declared in a
  reviewed registry that every consumer reads, and a second home was left empty in
  practice. The cost is that stage and priority are not visible on the issue itself.
- **A `Programme` issue type.** Rejected: none was in use, and the registry already
  says which projects form a programme, so a type would state the same fact twice.
- **A platform-neutral protocol with a separate document binding it to GitHub.**
  Rejected: it defined every concept twice, and there is no plan to change platform.
- **Word limits, or word guidelines, on issue bodies.** Rejected: a number cuts a task
  that needs its length and invites moving text into a first comment. Long bodies are
  long mostly because of dated narrative, not because of their steps or acceptance
  checks, so a warning on that content targets the cause. Leaving bodies unconstrained
  was also rejected: it is how the median tracker reached 977 words.
- **A status comment on every change, or a pinned status comment.** Rejected: with the
  status block reduced to two lines there is little to announce, and a pinned comment
  is a second place to read status.

## Appendix: the three shapes

This appendix is normative. A line marked optional appears only when it applies.

**Project**

<!-- qep-appendix: shape-project -->
```markdown
**Goal:** [the outcome, one sentence]

**Done when**
- [observable check]                          ← two to five

**Not doing**                                 ← optional
- [what is out of scope]: [why]

## Where we stand (verified YYYY-MM-DD)
**Risk:** [why the project is off track]      ← only when it is
**Needs:** #N [act], or none
```
<!-- /qep-appendix -->

**Decision**

<!-- qep-appendix: shape-decision -->
```markdown
**Question:** [one sentence, answerable by choosing an option]

**Options**
- **A** [what it is]: [what follows for the work that waits]
- **B** [what it is]: [what follows for the work that waits]

**Why now:** [what waits on this]             ← optional
**Needed by:** YYYY-MM-DD
```
<!-- /qep-appendix -->

**Task**

<!-- qep-appendix: shape-task -->
```markdown
**Outcome:** [what changes, and for whom]

**Done when**
- [observable check]
```
<!-- /qep-appendix -->

Steps, context and how to verify are optional in a `Task` and kept brief. An issue
adopted from a reporter keeps the reporter's text.

**An example.** A `Project` body in full, for illustration only:

```markdown
**Goal:** Every lecture series builds on the shared environment.

**Done when**
- Each lecture repository builds from the shared environment file.
- No repository pins a package the shared file already pins.

**Not doing**
- Upgrading packages beyond the shared baseline: each series decides that for itself.

## Where we stand (verified 2026-11-20)
**Needs:** #12 choose the baseline Python version
```
