---
qep: 6
title: Project Trackers and Working Records
author: "@mmcky"
status: Draft
type: standard
related: [2, 5]
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
| **Related**  | [QEP-2](qep-0002-standard-github-labels.md) — labels classify the content of an issue, types its role; [QEP-5](qep-0005-code-of-ai-use.md) — the disclosure line on agent-written text |
| **Discussion** | [QuantEcon/qeps#18](https://github.com/QuantEcon/qeps/pull/18) — the earlier draft and its review |

## Summary

A project is one tracker issue whose sub-issues are its plan. The tracker is the single
record of what is planned and what is next, read by people and by agents alike, and
short enough to take in at a glance. A repository keeps no second record beside it: no
plan files, decision registers or session logs. Each kind of working knowledge has one
home, and the only notes an agent leaves behind are a handover file that lives on a work
branch and never reaches the default branch.

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
git history already holds a fact, nothing restates it, because a restatement is
verified on a different day from its source and one of the two is then wrong.

### Issue types

Three issue types carry an issue's **role** in tracking. They are independent of
[QEP-2](qep-0002-standard-github-labels.md)'s labels, which classify its **content**: a
work item that fixes a defect is a `Task` with the `bug` label.

| Type | Role | Closed when |
|---|---|---|
| `Project` | a project's tracker | its done-when checks are met |
| `Task` | a unit of work | the work has shipped |
| `Decision` | a choice the plan waits on | the choice is recorded, or the question is moot |

Only a `Task` with no sub-issues is closed by a reference from a pull request or commit.
A `Project`, a `Decision` and a `Task` that holds sub-issues close by a person's own act,
because a merge cannot tell whether a goal has been met.

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

A sequencing constraint is a native blocked-by dependency, never prose, so that tooling
and people read the same edge. A dependency exists only where the waiting item cannot
start without something the other produces: a ruling, a document, a release. Shared
files and preferred order are not constraints. A relationship that constrains nothing is
a relates-to link.

### Phases

A project uses phases only when its flat list stops reading as a plan. A **phase is a
`Task` that has its own sub-issues**: its title names the phase's outcome and its body
states the check that ends it. No separate type is needed, because tooling can tell a
phase from a single task by whether it has sub-issues.

### Decisions

A `Decision` is opened for a choice the plan waits on beyond the session in which it
arises, or that someone other than the person doing the work must make.

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

A **programme** is a named group of projects, declared in the organisation's projects
registry and not as an issue type. A programme may have one ordinary, untyped issue as
its front door, whose sub-issues are the member trackers; the registry identifies it.

Projects whose tasks routinely block one another, or that share decisions, are
**combined into one project** instead of being coordinated across trackers, because
dependencies inside one plan are visible in one list.

### Planning values

- **Stage, priority and dates are declared once, in the organisation's projects
  registry,** and not on the issue. The registry is reviewed and is what every consumer
  reads.
- **Health is observed from activity, never declared,** because a hand-set value goes
  stale silently.
- **The owner of a project is the tracker's assignee.** A project tracker has exactly
  one.

### The body

An issue body follows the shape for its type in *Appendix: the three shapes*, and
nothing follows the shape. A person should be able to read it without scrolling. As
guidelines, a `Project` body is about 150 words, a `Decision` 200 and a `Task` 300;
tooling may warn above these and never blocks.

Each kind of text that used to accumulate has a home outside the body:

| Never in a tracker body | Where it already lives |
|---|---|
| A work list, a numbered sequence, checkboxes | the sub-issue list |
| What is next, in flight or blocked | derived from the list, its dependencies and linked pull requests |
| Progress counts, stage, priority, dates, owner | the sub-issue list, the registry, the assignee |
| What merged or was ruled, and when | the pull requests, the issue timeline, the `Decision` |
| Background, findings, analysis | `docs/` or `research/` in a repository (see *Working records*) |
| Steps, context and acceptance for one task | that `Task` |
| Related work | relates-to links |

A `Decision` over its guideline moves its analysis to its first comment or to a file
under `research/`, leaving the question and options in the body. A `Task` over its
guideline is usually two tasks, or carries background that belongs under `docs/` or
`research/`.

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

These are the two things that cannot be derived. The date changes only when the owner
has re-checked the block; a tracker with recent sub-issue activity needs no new date.

### Comments

Comment when a person needs to read something. One case is required: when `Risk`
appears or changes, or `Needs` newly names a person, post one short comment that
mentions whoever must act, because an edit to a body notifies nobody.

A thread never carries session reports, revision logs or pasted bodies. Text an agent
writes carries [QEP-5](qep-0005-code-of-ai-use.md)'s disclosure line.

### Working records

A repository keeps no records folder on its default branch. Each kind of working
knowledge has one home:

| Content | Home | Rule |
|---|---|---|
| Agent instructions | one root `AGENTS.md`; any other tool's instruction file is a one-line pointer to it | Rules in force now, and nothing else: no history and no citations of past decisions. Aim for about 600 words. |
| Product documentation | `docs/` | Describes what exists now. Rewritten in place. |
| Evidence | `research/YYYY-MM-DD-topic/`, or attached to the release or pull request it supports | Dated and frozen: audits, reviews, measurements. Read on request, never as instructions. |
| Plans, state, what is next | the tracker and its sub-issues | No plan, roadmap, state or next-steps file. |
| Ideas not yet scheduled | an issue with no parent, or nothing | No backlog file. |
| Decisions | the `Decision`, and the commit or code comment that applies it | No decision register. |
| Handover between sessions | `.qe/HANDOVER.md` on the work branch | See *Handover*. |

Three rules follow from the reason for the table, which is that an agent cannot tell a
stale note from a rule in force:

- **What the code must always do is a test,** not a note. A safety rule that no test,
  check or branch rule enforces stays written in `AGENTS.md`, and gains a check where
  one is cheap.
- **Why a surprising choice was made is a comment at the code it explains,** and the
  message of the commit that made it.
- **Earlier notes and decisions are context, not constraints.** Where the code or the
  task points to a better choice, an agent proposes it.

### Handover

A session that stops with work in flight may leave one file, `.qe/HANDOVER.md`, on the
branch it was working on. It is committed scratch space for the next session on that
branch, and it travels with the branch so that a session on another machine can resume
without access to anything else.

- **It holds** the task, what is done, what is in flight, what failed and the next
  step, in about 200 words. It may also be a work order for another machine, with its
  scripts beside it in `.qe/`.
- **It is overwritten each session,** never appended, so it describes the present.
- **It never reaches the default branch.** The pull request deletes `.qe/` before
  merge, and a check of its own, named for what it tests, fails while `.qe/` is
  present, so that an uncleared handover never reads as a failing test.
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
4. **What we deliberately don't label.** Replace "project / grouping labels … →
   Milestones": a campaign or a recurring programme of work is a `Project`; milestones
   group a repository's releases.

## Alternatives considered

- **A tracker for people and a records folder for agents.** The design this QEP
  replaces. Rejected: they are two records of one project, the folder was the cheaper
  write, and it grew without limit while tracker bodies filled with narrative to
  compensate. Agents now read issues, sub-issue order and dependencies directly, so one
  record serves both readers.
- **Keep a records folder and prune it on a schedule.** Rejected: pruning was already
  the rule, and no repository examined had ever done it. A folder that cannot exist on
  the default branch needs no pruning.
- **A small permanent notes folder on the default branch.** Rejected: its only contents
  would be notes that agents read as rules, and it would need a check to stay small.
  The one need it met, handover between sessions and machines, is met by a file that
  lives on the work branch.
- **Decision records kept in the repository.** Rejected: a record cannot fail when it
  becomes obsolete, and by design it was never deleted, so constraints only
  accumulated. A decision that must hold is enforced by a test or stated in
  `AGENTS.md`; its reasoning stays with the `Decision` and the commit.
- **Planning values as issue fields.** Rejected: the values were already declared in a
  reviewed registry that every consumer reads, and a second home was left empty in
  practice. The cost is that stage and priority are not visible on the issue itself.
- **`Programme` and `Phase` issue types.** Rejected: neither was in use, the registry
  already says which projects form a programme, and a `Task` with sub-issues does what
  a phase needs.
- **A platform-neutral protocol with a separate document binding it to GitHub.**
  Rejected: it defined every concept twice, and there is no plan to change platform.
- **Hard word limits on issue bodies.** Rejected: a limit invites moving text into a
  first comment, and some bodies are legitimately long. Leaving length free was also
  rejected: it is how the median tracker reached 977 words. The guidelines warn and
  never block.
- **A status comment on every change, or a pinned status comment.** Rejected: with the
  status block reduced to two lines there is little to announce, and a pinned comment
  is a second place to read status.

## Adoption

Acceptance fixes the tracker shape and the homes for working records above as the
QuantEcon standard. What follows is what adopting it requires.

1. **A backup is taken and verified before anything is changed:** an export of every
   typed issue with its body, comments, sub-issue order and dependencies, and a marker
   in each repository's history from which removed files can be restored. Restoring one
   tracker from the backup alone is tested first.
2. **New trackers, decisions and tasks** follow the three shapes from acceptance.
3. **Existing project trackers** are brought to the shape. Every item in a body's plan
   is confirmed to be a sub-issue before the body is replaced, because that is the one
   step where work can be lost from view. Removed narrative is deleted, not moved.
4. **Each project tracker has one assignee.**
5. **Existing repositories** are brought to the *Working records* table. A file that
   tooling reads is removed only after the tooling stops reading it. A safety rule
   exists as a test, or as a line in `AGENTS.md`, before the record that stated it is
   deleted.
6. **Tooling that writes or checks trackers** conforms to the three shapes, treats the
   word guidelines as warnings, and reads planning values from the registry.

The sequenced execution of these steps belongs in a tracker issue, not in this
document.

## Appendix: the three shapes

This appendix is normative. A line marked optional appears only when it applies.

**Project**

```markdown
**Goal:** [the outcome, one sentence]

**Done when**
- [observable check]                          ← two to five

**Not doing:** [one line]                     ← optional

## Where we stand (verified YYYY-MM-DD)
**Risk:** [why the project is off track]      ← only when it is
**Needs:** #N [act], or none
```

**Decision**

```markdown
**Question:** [one sentence, answerable by choosing an option]

**Options**
- **A** [what it is]: [what follows for the work that waits]
- **B** [what it is]: [what follows for the work that waits]

**Why now:** [what waits on this]             ← optional
**Needed by:** YYYY-MM-DD
```

**Task**

```markdown
**Outcome:** [what changes, and for whom]

**Done when**
- [observable check]
```

Steps, context and how to verify are optional in a `Task` and kept brief. An issue
adopted from a reporter keeps the reporter's text.
