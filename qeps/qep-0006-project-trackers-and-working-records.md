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
| `Task` | one outcome, written for a project | the work has shipped |
| `Decision` | a choice the plan waits on | the choice is recorded, or the question is moot |

How an issue closes depends on what it is:

- **A work item with no sub-issues and no steps may close automatically,** when a pull
  request or commit that references it merges.
- **A `Project`, a `Decision`, and any work item that has sub-issues or steps are
  closed by a person,** because a merge cannot tell whether a goal has been met.

### A project is one tracker issue

A **project** is one issue of type `Project`. Its **work items are its sub-issues**,
which may live in any repository. Work that a project's goal needs is tracked by that
project, even when its code lives in another project's repository, so that each item
has one tracker.

A sub-issue of a project is a work item whatever its type. `Task` is the type for work
written for the project. An issue the project adopts from a reporter keeps the
reporter's text, and need not be retyped.

- **The sub-issue list is the plan,** kept in plan order. Completed items keep their
  place, so the list still reads as the plan. An item the goal no longer needs, dropped
  or parked, is removed from the list and named under *Not doing* with its reason,
  because a closed sub-issue counts as done and an open one reads as ready.
- **An issue belongs to a project only if the goal cannot be met without it.** An issue
  outside every project is normal and needs no parent.
- **What is ready is never written down.** Every open sub-issue with nothing open
  blocking it is ready, and ready items may be worked at the same time. List order is
  priority, not a queue: whoever is free takes the first ready item that nobody has
  claimed. A written "next" line goes stale the first time the list is reordered.
- **An item in flight shows who has it.** Before starting, a person assigns
  themselves; a session that shares an account opens a draft pull request that names
  the task and step. An item with an assignee or an open linked pull request is taken.
  A claim that has gone quiet may be taken over after a comment on the item.
- **Sequence is never encoded in a title.** Re-ordering moves an item and never renames
  it. Titles state outcomes.

### Constraints are dependencies

When one item must wait for another, that is recorded as a native blocked-by
dependency, never in prose, so that people and tooling read the same link.

A dependency exists only where the waiting item cannot start without something the
other produces: a ruling, a document, a release. Touching the same files, or a
preferred order, is not a constraint. Two items that are merely related mention each
other in their text; GitHub has no link for it.

Items that touch the same files still run in parallel, and the later pull request
rebases. Where a rebase cannot resolve the overlap, as with generated or binary files,
the later item waits, and says what it waits for.

### Steps

A `Task` is one outcome, and an outcome may take several pull requests. Each is a
**step**, listed in the task's body with what it delivers and the check that ends it.

- **One step is one pull request.** Its title starts with the task and the step, as in
  `cli#37 S1: …`, and its description mentions the task without a closing keyword. A
  closing keyword would close the task while steps remain, so GitHub's own link from a
  pull request to an issue cannot be used here.
- **Which steps are done is never written in the body.** It is read from the task's
  pull requests, found by that title, in the same way that what is ready is read from
  the sub-issue list.
- **A step carries its own check.** The task's done-when holds only what no single step
  proves.
- **A step may name the files it may touch,** where that is what limits its scope.
- **Steps run in order unless a step says otherwise.** A step is under way while its
  pull request is open, and done when it merges.
- **A step that must wait says what it waits for,** in its own line, naming the item
  and the step it waits on. A wait usually holds one step and not the whole task, and
  a dependency would show the task as blocked while another of its steps is ready.
- **A dependency is used only where everything left in the task waits.** A task with
  one step always uses one. Dependency links are task-grained, and that has a cost on
  both sides: a wait kept in a step does not show on the tracker, and a link clears
  only when the whole blocking task closes. A wait for an event that is not an item
  closing, such as a release, is written in the step.
- **A choice found while working is listed in the step's pull request,** for the
  decider to rule on, and is written into the task once ruled. A session does not
  settle it by guessing.

A step is not made into a task of its own to keep bodies short. One task for each pull
request multiplies issues and dependencies until tracking them is more work than the
work itself.

### Phases

Most projects need no phases. A short list with dependencies is already a plan, and a
check that would end a phase belongs in the tracker's done-when.

A project uses phases only when its list is too long to read as a plan, and its groups
each end in a check that no single item states.

- **A phase is a `Task` that has its own sub-issues.** Its title names the phase's
  outcome and its done-when is the check that ends it, so the check is written once and
  membership is the parent link. No separate type is needed.
- **Only a phase has sub-issues.** A task's pull requests are steps in its body, and a
  phase never holds another phase, so that a task with sub-issues always means a phase.
- **Phases are not described in the tracker body, and milestones do not mark them.** A
  table in the body says which phases exist but not what each holds, and it drifts when
  the list is reordered. A milestone cannot span repositories.
- **A wait is a dependency on the item that produces what is waited for.** Where
  everything in a phase waits, the dependency is on the phase, and it holds every item
  under it. Tooling treats an item as blocked when it or its phase is blocked.
- **What is ready is read through a phase** to the items inside it.

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

Two kinds of choice need no `Decision`:

- **A choice that is cheap to reverse and made within one session** is stated in the
  pull request that applies it.
- **A choice that nothing waits on yet** may be written as an **open choice** in the
  task where it will first matter, with its options and a recommendation. It is raised
  with the decider when that task is picked up, and it becomes a `Decision` only if
  work has to wait for it. Opening an issue for every foreseeable choice buries the
  ones that block work.

### Programmes, and combining projects

The organisation keeps one **projects registry**: a single reviewed list of its
projects, recording for each its tracker, stage, priority, dates and programme.

A **programme** is a named group of projects, declared in that registry and not as an
issue type. A programme may have one ordinary, untyped issue as its front door; the
registry identifies it. The front door's sub-issues are the member trackers, and any
`Decision` that more than one of them waits on. It holds no work items, and its body
follows the front door shape.

Projects whose tasks routinely block one another are **combined into one project**
instead of being coordinated across trackers, because dependencies inside one plan are
visible in one list.

### Planning values

- **Stage, priority and dates are declared once, in the organisation's projects
  registry,** and not on the issue, so that each value has one reviewed home and no
  two readers can see different ones.
- **A phase's target date, where one is needed, is declared there too,** against the
  phase's task. The registry never lists which items a phase holds; that is the parent
  link.
- **Health, meaning whether a project is on track, is observed from its activity and
  never declared,** because a value set by hand goes stale without anyone noticing.
- **The owner of a project is the tracker's assignee.** A project tracker has exactly
  one.

### The body

An issue body follows the shape for its type in *Appendix: the shapes*, and
contains nothing else. A person should be able to read it without scrolling.

A project's done-when carries every check that ends it. A body is made short by
removing what has a home elsewhere, never by cutting checks.

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
| Background, findings, analysis | `docs/` or `research/` in a repository (see *Working records*); the body may link to it |
| Steps, context and acceptance for one task | that `Task` |
| Phases, gates and the reasons for the order | phase tasks, dependencies, and `docs/` or `research/` |
| Related work | `docs/`, or the *Background* line |

When a body grows long:

- **A `Decision`** keeps the question and options in the body, and moves its analysis
  to its first comment or to a file under `research/`.
- **A `Task`** moves its background to `docs/` or `research/`. It is not split to
  make it shorter (see *Steps*).

### The status block

A project tracker ends with one dated heading, in exactly this form, because tooling
reads the date:

```markdown
## Where we stand (verified YYYY-MM-DD)
```

Under it are at most two lines:

- **`Risk:`** why the project is off track. Present only when it is.
- **`Needs from a person:`** what the project waits on from a person, as an issue
  reference, who, and a few words, or "none". Several entries are written one to a
  line. It is not the list of blocked items, which the dependencies show.

These are the only two facts about a project's state that cannot be worked out from
its sub-issues. The body may also carry one line, `Registry:`, linking to the project's
registry entry, so that a reader can find its stage, priority and dates. The owner is
the assignee, which the page shows.

The date changes only when the owner has re-checked the block. A tracker whose
sub-issues are moving needs no new date.

### Comments

Comment when a person needs to read something.

One comment is required. When `Risk` appears or changes, or `Needs from a person` newly names a
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
| Agent instructions that every session needs | one root `AGENTS.md`; any other tool's instruction file is a one-line pointer to it | The rules that apply whatever the task, each with its reason, and what to read before each kind of work. No history and no citations of past decisions. |
| Rules for one kind of work | one document for that work, under `docs/`, linked from `AGENTS.md` | Read before that work starts. Binds as if it were written in `AGENTS.md`. |
| Product documentation | `docs/` | Describes what exists now, and what is being built where it names the task that builds it. Rewritten in place. |
| Evidence | `research/YYYY-MM-DD-topic/`, or attached to the release or pull request it supports | Dated and frozen: audits, reviews, measurements. Read on request, never as instructions. |
| Plans, state, what is next | the tracker and its sub-issues | No plan, roadmap, state or next-steps file. |
| Ideas not yet scheduled | an issue with no parent, or nothing | No backlog file. |
| Decisions | the `Decision`, and the commit or code comment that applies it | No decision register. |
| Handover between sessions | the pull request's description, or `.qe/HANDOVER.md` on the work branch | See *Handover*. |
| Configuration a tool reads about the repository | `.qe/{tool}/`, a folder for each tool | Reviewed like any other file. See below. |

The reason for the table is that an agent cannot tell a stale note from a rule in
force. These rules follow:

- **A rule states its reason beside it,** in a clause and without a citation. A reader
  who knows why a rule exists can apply it to a case nobody foresaw, and can tell when
  it no longer applies. A reason kept in a separate record is lost when that record
  goes. A reason is taken from its source and never reconstructed; one that cannot be
  found is marked as unknown.
- **`AGENTS.md` holds only what every session needs.** A rule stays there only if it
  applies whatever the task. It is loaded into every session, so each rule in it costs
  attention in sessions it does not concern, and a long file is read less closely.
- **A rule for one kind of work lives in one document for that work,** with its reason,
  and binds exactly as if it were written in `AGENTS.md`.
- **`AGENTS.md` says when to read each linked document, by action:** "before you merge a
  pull request, read …". A list of documents by subject leaves a session to guess when
  each one matters.
- **A linked document makes sense alone.** A rule is complete where it is stated, with
  any definition it needs beside it, and does not point "above" or "below" to text in
  another file.
- **Which rules a repository keeps is for its owner to decide.**
- **What the code must always do is a test,** not a note. A safety rule that no test,
  check or branch rule enforces stays written in `AGENTS.md`, and gains a check where
  one is cheap.
- **Why a surprising choice was made is a comment at the code it explains,** and the
  message of the commit that made it.
- **Earlier notes and decisions are context, not constraints.** Where the code or the
  task points to a better choice, an agent proposes it.

### Configuration in `.qe/`

`.qe/` on a default branch may hold configuration that tooling reads about that
repository, reviewed like any other file. It never holds plans, state, logs, decision
records or a cache. The test is whether a tool reads the file as input: a note written
for the next session is a working record, and a file a tool parses is configuration.

Each tool keeps its configuration in a folder of its own, `.qe/{tool}/`, named for the
tool that reads it. Two tools then never contend for one file name, and a reader can
tell which tool a file belongs to and where to look for what it means. The top level of
`.qe/` is kept for what this QEP defines, which is the handover file.

### Handover

A session that stops with work unfinished leaves a handover for the next session. It has
one home:

- **Where the work has a pull request, its description is the handover.** A description
  cannot reach the default branch, and a second copy in a file drifts from it.
- **Where the work has a branch and no pull request, or must travel without GitHub, it
  is one file, `.qe/HANDOVER.md`, on that branch.** The file travels with the branch, so
  a session on another machine can pick the work up without access to anything else. It
  never reaches the default branch, and a check enforces that: a rule to tidy working
  records by hand was already in place, and no repository followed it.
- **Work that has no branch** hands over in a comment on its `Task` or `Decision`.

Wherever it lives:

- **It holds** the task, what is done, what is under way, what failed and the next
  step, briefly. A file may also be a work order for another machine, with its scripts
  beside it in `.qe/`.
- **It is overwritten each session,** never appended, so it describes the present.
- **One session works a branch at a time,** so the handover has one writer.
- **Results that must last** move to `research/` before the merge.
- **It does not track the project.** What is ready for the project is the tracker's to
  say.
- **The next session verifies it against the code** before relying on it.

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
   a person is the tracker's `Needs from a person:` line; a "Blocked by: …" first line in a body is
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
- **One task for each pull request.** Rejected: it was tried on one project, as 63
  tasks with 70 dependency links, and was regrouped as a process heavier than the work.
  A task is an outcome, and its pull requests are steps within it.
- **Every rule in `AGENTS.md`.** Rejected: the file is loaded into every session
  whatever the task. In one repository, moving each activity's rules to a linked
  document cut it from 5,250 words to 1,435, and sessions given the short file found and
  followed the linked rules as reliably as sessions given the long one.
- **Phases as a table in the tracker body, or as milestones.** Rejected: the table was
  the common practice, but it never says which items a phase holds, tooling cannot tell
  which phase is current, and most tables sat over lists short enough to need no
  phases. A milestone cannot span repositories or block anything.
- **Working one item at a time, in list order.** Rejected: most projects have several
  items ready at once and several people or sessions working. Order is priority, and a
  claim shows what is taken.
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

## Appendix: the shapes

This appendix is normative. A line marked optional appears only when it applies.

**Project**

<!-- qep-appendix: shape-project -->
```markdown
**Goal:** [the outcome, one sentence]

**Done when**
- [observable check]                          ← every check that ends the project

**Not doing**                                 ← optional
- [what is out of scope]: [why]

**Background:** [link to `docs/` or `research/`]   ← optional
**Registry:** [link to the project's registry entry]   ← optional

## Where we stand (verified YYYY-MM-DD)
**Risk:** [why the project is off track]      ← only when it is
**Needs from a person:** #N [who] [act], or none
```
<!-- /qep-appendix -->

**Front door**

<!-- qep-appendix: shape-front-door -->
```markdown
[What the programme is, one sentence.] Its member trackers are the sub-issues of
this issue.

**Background:** [link to `docs/` or `research/`]   ← optional
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

**Steps**                                     ← optional
- **S1** [what this pull request delivers]: [the check that ends it]
  [files it may touch, and what it waits for]   ← optional

**Open choice:** [the options, and a recommendation]   ← optional
```
<!-- /qep-appendix -->

How to verify, and who must act, may be added to a `Task` where they are needed. An
issue adopted from a reporter keeps the reporter's text.

**An example.** A `Project` body in full, for illustration only:

```markdown
**Goal:** Every lecture series builds on the shared environment.

**Done when**
- Each lecture repository builds from the shared environment file.
- No repository pins a package the shared file already pins.

**Not doing**
- Upgrading packages beyond the shared baseline: each series decides that for itself.

## Where we stand (verified 2026-11-20)
**Needs from a person:** #12 @owner to choose the baseline Python version
```
