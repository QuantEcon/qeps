---
qep: 7
title: Project Management Protocols
author: "@mmcky"
status: Draft
type: standard
related: [1, 3, 5, 6]
created: 2026-09-21
discussion: https://github.com/QuantEcon/qeps/issues/39
---

# QEP-7: Project Management Protocols

|              |                                                                      |
| ------------ | -------------------------------------------------------------------- |
| **QEP**      | 7                                                                    |
| **Title**    | Project Management Protocols                                         |
| **Author**   | @mmcky                                                               |
| **Status**   | Draft                                                                |
| **Type**     | standard                                                             |
| **Created**  | 2026-09-21                                                           |
| **Related**  | [QEP-6](qep-0006-project-trackers.md) — the GitHub binding of the unit this QEP defines; [QEP-5](qep-0005-code-of-ai-use.md) — the norm a person's own merge answers to; [QEP-3](qep-0003-repository-naming-and-types.md) — the repository types the records home may have; [QEP-1](qep-0001-purpose-and-process.md) — what a choice that binds the organisation becomes |
| **Discussion** | [QuantEcon/qeps#39](https://github.com/QuantEcon/qeps/issues/39)   |

## Summary

A project keeps each fact in one place: goal, state and history on its tracker;
structure in the platform's carriers; resumption state in the repository's `.qe/`
folder, which a tidy keeps small. Decision records explain rules without restating them.
A person must be able to plan from the tracker, and a fresh agent resume from the
records. The protocol names no platform; QEP-6 binds it to GitHub.

## Motivation

The practice exists; the protocol does not. What a project is, where its state lives,
how a decision is recorded and how a session hands over to the next were each written
down somewhere, and nowhere once: a notes convention piloted in one repository, a
convention section inside the tooling that operates it, the body rules of the GitHub
binding. Three homes drift three ways, and a reader cannot tell which is current.

The cost showed in the records themselves. A review of the 38 registered trackers
written under the GitHub binding (2026-09-28) found the same shape everywhere. The
section whose contract is current state was used as the revision log: dated accounts of
what happened accreted under the status stamp while the history register stayed empty.
The same repositories kept a second current-state file that drifted from the tracker
and won, because it was the cheaper write. The agent-records folder beside the tracker
grew without bound, since nothing in it was ever deleted. Each fix is a protocol: state,
not story; one register per fact; a named home for every record; and a tidy that a
check enforces.

Stating the protocol above the binding has a second benefit. A move to another platform
then confines the rewrite to the binding document and the tooling. The protocol, and
every record written under it, survives unchanged.

## Proposal

### 1. Tiers and terms

1. A **programme** is a named family of projects in which coordination between the
   projects is somebody's job: a **programme lead**, who answers for the family. A
   family that needs no coordination is a group for presentation, not a programme. Its
   binding gives a programme one object whose members are its projects, in focus order,
   and whose health is derived from theirs.
2. A **project** is a definition of done, the work items and decision points that serve
   it in plan order, and the records of *Records and their homes*. Its **tracker** is
   the platform object that carries its goal, state and structure, and its
   **accountable owner** is the one person who answers for it; where the project is in
   no programme, the owner also sets its stage and priority. The tracker's **charter**
   is the short body that changes only with direction. Progress is measured over the
   project's direct work items and never compared across a change of membership.
3. A **phase** is a work item that holds its own **leaves**, the items beneath it, with
   an intent and an exit criterion. A **gate** is a real constraint between phases or
   between projects. **The test for a constraint is output, not order**: an **edge**
   exists where the waiting item cannot start without something the upstream item
   produces, such as a ruling, a document or a page it draws from. Shared files, serial
   work by one agent and mere preference are sequencing rationale, never constraints.
4. A **work item** is a unit of work whose closing advances a project's definition of
   done. If the definition of done can be met without it, it is not a member, however
   much it shares a repository, a theme or an owner; **if the goal must be widened to
   justify an item's membership, the item is not a member.** An item outside any
   project is allowed and is the normal case, not a gap to be filled. Work that keeps
   records in the `.qe/` folder has a plan home: a project whose plan is homed in that
   repository, so that the resumption test has a plan to read and a tidy has an owner
   to merge it. The binding says how an item that belongs to no other project gets one.
5. A **decision point** is a choice the plan waits on beyond the session in which it
   arises, or that someone other than the person running that session must make. It is
   open while the choice is pending and recorded when made, with the choice, its
   reasons, its **decider** and the date by which it is needed; work that cannot start
   before the choice is constrained by it. A choice ruled within one session is recorded
   in that session's change and in the next update.
6. A **session** is one run of an agent under a person who is present; a **run with no
   person present** is scheduled or unattended. The **overlay** is everything
   QuantEcon-specific about how a repository is worked, which *The `.qe/` folder* puts
   in one place. A **record** is anything kept under this protocol; a **primary record**
   is the evidence a claim rests on: the state of an item or a change, a release, a run,
   a commit, or a person's own words.

### 2. Records and their homes

**One fact, one register.** Every fact about a project is held in exactly one place;
every other place points at it or is generated from it. Two registers for the same fact
are re-verified on different days by different sessions, and one of them is wrong.

| Register | What it holds | Home | Writer |
|---|---|---|---|
| Goal | the definition of done, one sentence | the tracker, first line | people, at creation |
| State | why the project is off track, if it is, and what it waits on from people | the tracker's stamped status section | the owner; the tooling drafts it when the binding says an update is due |
| History | status changes, as dated events; and session by session, what was done, the files touched and the lessons routed | the tracker's dated change records; the long form in the repository's `log/`, consumable | the tooling; agents |
| Decisions | choices made, with their reasons, as of their date | decision points in the plan; decision records in the repository (*Decision records*); QEPs across repositories | people |
| Structure | membership, plan order, constraints, phase membership | the binding's native carriers (*Bindings*) | the tooling, with the owner's approval; by hand |
| Phase meaning | each phase's intent and exit criterion | the phase's own body | people |
| Planning values | health, stage, priority, dates, the accountable owner | the binding's typed carriers (*Bindings*) | the owner; stage and priority by the programme lead where there is one |
| Derived views | the index of the folder; next, in flight, blocked and progress | the index, generated; the rest computed on read, never written | the tooling |
| Working rules | how people and agents work in the repository, as in force now | the root instruction file and the files it points to, each rule citing its record where one exists | people, with the decider's words quoted at each change |

**State, not story.** The state register states where the project stands now and never
how it got there. A dated account of what happened belongs in the history register; a
state section that carries it stops being readable as state and starts being a
changelog nobody stamped. The state register is short by construction: reasons and
asks. A resume pointer, the step in flight and the failing thing are working state, kept
in the records.

**Claims are verified when written, never carried forward.** Every claim in a state
register is measured against live state at the time of writing and dated; a claim that
cannot be verified is not written, and one repeated from an earlier update is verified
again. A claim is true only against a primary record. An agent's own log is never
sufficient evidence for a claim in a state register.

**Derived, never written.** What is next, what is in flight, what is blocked and how far
a project has come are computed from the binding's carriers at the time of reading.
**Next** is the first open item in plan order with no open constraint on it or on its
phase. A view of structure that a person wants to keep is a page outside the folder,
dated, that states the tracker it was read from.

### 3. The acceptance test

Everything written under this protocol is judged by two tests. The **planning test**: a
person, from the tracker's first screen alone, can tell the goal, whether the project is
on track, what is next, who waits on whom, and, where the project has phases, when the
next exit is due. The **resumption test**: a fresh agent, from three inputs and no
conversation, can resume an item without reading the tracker's prose. The inputs are
the index, the plan and working file of the item, and the tracker's structure. Anything
load-bearing for either test is a named record with a named home, never a behaviour a
session is trusted to have performed.

### 4. The `.qe/` folder

Everything QuantEcon-specific about *how a repository is worked* lives in one folder,
`.qe/`, apart from the working rules in the root instruction file, so that retiring the
overlay, archiving the repository or changing its visibility is one decision about one
directory, and the public-content rule has one tree to check. Each rule below ends with
its enforcement: **checked** means conforming tooling, reading the repository and the
binding's carriers, reports a breach; **convention** names who keeps it. A standard that
marks as checked what no tool can see is defective, so the tags claim only what a tool
can read.

1. **What it holds.** The folder is the agent's record: what the tracker's structure
   cannot hold and the platform does not. That is how the repository is built (its
   invariants and traps), the plan behind each tracker homed here, a working note for
   each open item, the reasoning behind decisions, the lessons of each session, and
   task-scoped instructions. It is written by agents; a person owns what they merge
   from their own session and approves the rest (*Who accepts a change*). Convention:
   the owner.
2. **What it never holds.** Status, next steps, what is in flight, and rulings on a
   plan's decision points: those live on the tracker and on the decision points, which
   the binding carries. Copies of platform content: titles, bodies, comments, child
   lists, field values. Product code, build outputs, drafts and evidence bundles. Counts
   and dated figures: a record stores the query that produces a figure, never the
   figure, because a stored number goes stale silently and is still quoted with
   confidence. Checked: status text, code files, figures reported as candidates.
   Convention, the owner: copies of platform content.
3. **Layout.** The folder has these entries and no others. Checked.

   ```
   .qe/
   ├── README.md        optional: local deviations from this QEP, nothing else
   ├── INDEX.md         optional: the index, written only by continuous integration after a merge
   ├── agents/          task-scoped instructions, one file per task, opening with its trigger
   └── dev/
       ├── ARCHITECTURE.md  how the repository is built: invariants (their only home), traps, open questions
       ├── topics/          overflow from ARCHITECTURE, one subject per file
       ├── plans/           one file per tracker homed here, named by the tracker's identifier
       ├── work/            one file per open item, named by the item's identifier, deleted when it closes
       ├── decisions/       decision records (*Decision records*)
       ├── retrospectives/  one dated file per closed project, written by its closing tidy
       └── log/             session entries, consumable (*Logs*)
   ```

   The records home of a project is the repository that holds its tracker, whatever the
   repository's type (QEP-3). There is no exemption by type: a planning repository keeps
   this layout like any other, and keeps its evidence bundles outside the folder.
4. **Lifecycles by folder.** *Living* pages (`ARCHITECTURE.md`, `topics/`, `plans/`,
   `agents/`) are rewritten in place; a wholesale replacement names its predecessor and
   the commit that holds it. *Per-item* files (`work/`) are created when an item is
   planned or picked up and deleted by the change that closes it; the file lives where
   that change lands, and an item that changes no repository, or several, keeps it in
   the records home. *Fixed* files (`decisions/`, `retrospectives/`) never change after
   acceptance and are never deleted. *Consumable* entries (`log/`) are deleted once
   distilled. A file's lifecycle follows from its folder, so no file needs to state it.
   Checked: leftover working files of closed items. Convention, the author: the
   predecessor line.
5. **Reading tiers.** A session starts from an **index**: one generated page, always
   loaded, that lists the living pages and their size, the plans and their trackers, the
   working files, the current decision records by topic, and the undistilled logs.
   Everything else is read on demand, by link from the index or from the item being
   worked. The index is computed when read, or written to the default branch by
   continuous integration after a merge; it is never edited by hand and never changed in
   a change under review. The read for the resumption test fits a budget the tooling
   sets and reports on. A rule of conduct an agent must follow verbatim does not live in
   the folder's prose at all: it lives in the repository's root instruction file or in
   instruction files scoped to the paths it governs, which load whole and are never
   summarised, because a session summarises prose and loses exact wording first. An
   invariant of the code lives in `ARCHITECTURE.md`, which such a rule may cite.
   Checked: the index is generated and within budget. Convention, the owner: rules of
   conduct outside the folder's prose.
6. **Logs.** Every session that changes something ends with one entry: what it did,
   each with its primary record; the files it touched; what it learned, each lesson
   tagged with where it goes (a living page, a record, a tracker item, a promotion out
   of the repository, or noise); what was decided, linking the record or the decision
   point; and any status it proposes, as a proposal the tooling lists until a person
   applies or rejects it. An entry is never edited after it merges. A log is history and
   evidence for the next session, never a status register and never a place a person is
   expected to read. Checked: a route for each lesson, the file list, an entry unchanged
   after its merge. Convention, the author: one entry per session.
7. **Hand-over between sessions.** A session that cannot finish an item, or cannot write
   what it needs, hands over through two carriers and no other. Working state for the
   same item goes in that item's working file, whose resume section the next session
   reads instead of any conversation. Everything the session could not do itself (a
   change outside the repository, a write it lacked the tool or permission for) goes in
   a hand-off log entry, filed in a change of its own that stays open until a session
   that can act has settled each item and appended the outcome; a merged hand-off is a
   settled one, and the tooling lists open ones as pending work. What only awaits a
   person's answer is a proposal in the log (*Logs*) or a decision point, never a
   hand-off. A run with no person present writes no tracker record: it pushes branches,
   opens draft changes and files its log and hand-off, and its proposals wait.
   Instructions for taking over a role live in `agents/`; the state of the role does
   not. A hand-over is never a file a person is expected to find unprompted. Checked:
   the resume section, the open hand-offs listed.
8. **Tidy.** The folder is kept small by a tidy, not by restraint. A tidy runs when the
   undistilled logs pass a ceiling the tooling sets, when a phase or a tracker closes,
   when a session ends with a lesson it could not route, and when an entry has waited
   longer than a period the tooling sets. It deletes a log entry once every lesson in it
   has reached its home and every proposal has a disposition; rewrites living pages from
   what it distilled; deletes working files of closed items; and writes a retrospective
   at a project's close. A tidy is drafted by an agent as a reviewable change whose
   description lists every deletion with its last commit, so anything can be restored.
   It is never an in-place rewrite, it is bounded in how much it may drop in one pass,
   and it never deletes a fixed file. What leaves the folder stays in version control; a
   large removal is tagged so it stays one reference away. Checked: the triggers, the
   manifest, the bound, deletions outside `log/` and `work/` refused.
9. **Content rules.** Nothing under `.qe/` is ignored by version control, and the
   protocol prescribes no scratch location: scratch lives outside the tree, and anything
   worth keeping is distilled into the folder deliberately. `.qe/` is public content: no
   credentials, no unpatched-vulnerability specifics, absolute dates only, no unfilled
   placeholders. A sentence an agent inferred rather than read from a primary record is
   marked as inferred. Checked: ignored paths, placeholders, relative dates. Convention,
   the author: credentials and inference marks.
10. **Who accepts a change.** A person merges: a `log/` or `work/` change from their own
    session once the check passes, because those files are evidence for no state claim,
    die with their item or their distillation, and version control is their undo
    (QEP-5, *A human is in the loop*: the person who merges owns the act); a living-page
    change once another reader, a person or an agent, recommends it, because later
    sessions act on the page as current; a tidy, as an accountable owner of a project
    planned here, because it decides, by a judgement no check confirms, what the folder
    forgets; and a settled hand-off (*Hand-over between sessions*) on the recommendation
    of a reader who neither wrote nor settled it. Records follow *Decision records*. A
    change of several kinds meets each rule. Where the binding names an automated
    reviewer, nothing merges before it has reported and each finding is fixed or
    answered with a reason. A run with no person present merges nothing; a person merges
    its log from their own session. Checked: the lifecycles a change touches. Convention,
    the person who merges: the rest.

### 5. Decision records

A decision record is **a dated record of reasoning, not a rule.** It explains a choice as
of its date so that a later reader can tell a decision that was wrong from one whose
premises changed, and so that a choice is not re-litigated by a session that never saw
it. It binds nothing beyond *read it before re-litigating*; the rules it explains live
elsewhere.

1. **When a record is written.** A record exists for a choice that someone might
   reasonably re-litigate: one that is hard to reverse, surprising without its context, a
   real trade-off between live options, or one that changes how other decisions behave.
   A ruling that changes a working rule is not a record but a dated edit to the rule,
   with the decider's words quoted in the change that makes it. A ruling on one case
   needs no record. A choice that binds beyond one project is a QEP (QEP-1). A choice
   that a plan waits on is a decision point in the plan (*Tiers and terms*), recorded
   where the binding records decision points; it gains a record here only if it also
   changes how the repository is built. Convention: the author.
2. **Form.** One file per record in `.qe/dev/decisions/`, named
   `D-YYYY-MM-DD-<slug>.md`. Its front matter carries `status` (accepted, superseded,
   lapsed), `date`, `topic`, `decider`, and the links `supersedes`, `superseded-by` and
   `refines` as the lifecycle needs them, with `reason` (premise changed, reversed, or
   the thing governed is gone) on a superseded or lapsed record. Its body is a
   one-sentence summary that states the context, the choice and what was given up; the
   context; the decision in the decider's own words, dated; the consequences; what
   evidence would reopen it; and references. The body fits a budget the tooling sets. A
   sentence an agent drafted sits apart from the decider's words and is marked where it
   is inferred; a record never carries an invented date or an alternative nobody
   considered. The appendix *A decision record* gives the form. Checked: the front
   matter, the budget. Convention, the author: inference marks.
3. **Lifecycle.** A record is accepted by the decider's merge of the change that files
   it, or by a person's merge of a record that cites a ruling already in the decider's
   words. After acceptance its body is fixed; only `status`, `superseded-by` and `reason`
   change. To replace a decision, write the new record naming what it supersedes, and
   mark the old one superseded by it; the two links are checked against each other. To
   change a decision in part, write the new record naming what it refines; the old
   record stays accepted, and the index derives the reverse link. A record is never
   deleted; it leaves the reading set through its status. A record that lapses because
   the thing it governs is gone is marked so, with the reason. Checked: the fixed body,
   the links.
4. **Rules and records.** A rule in force lives in exactly one living text: the
   repository's root instruction file for how agents work, `ARCHITECTURE.md` for
   invariants, the plan for sequencing. The rule cites the record that explains it by
   file name, and the record cites the rule it explains rather than restating it. Where
   a rule and a record differ, the rule holds, and the difference is drift for the next
   tidy to flag. A record that states a rule in its own words is the failure this
   section exists to prevent: the record becomes the rule, the rule changes by amending
   records, and a reader must follow the chain to learn what is in force. Checked: each
   citation resolves. Convention, the author: no restatement.
5. **The index.** The current position is one lookup. The index (*The `.qe/` folder*,
   *Reading tiers*) lists records by topic with their status, walks each chain of
   supersession to its terminal successor, hides superseded records, and reports a chain
   that does not terminate. A session reads the index and the current record for the
   topic in hand, never the folder. Checked.
6. **One home for records.** A repository keeps one folder of decision records.
   Decisions about a plan live on its decision points; decisions about the organisation
   live in QEPs; neither is copied into the folder, and the records are not copied into
   a plan, a table in another file, or a numbered list in a document. Checked: numbered
   decision lists in other files.

### 6. Distillation and flow back

Knowledge moves one way: from the log, through a distillation drawn from primary records
and live structure, to the tracker. The tooling drafts an update; every claim in it
resolves to a primary record read live; and a person approves its judgements: health,
target, stage, priority, a new ask, a charter change, a new decision point. A
distillation of verified events only may post without approval, disclosed as agent work
and posted in a session, under the account of the person running it. Nothing is kept in
step afterwards: a claim lives where it was approved, and the next update re-verifies
it. A ruling found anywhere but the platform is posted there, in the decider's words,
before anything cites it; a ruling already in a change the decider merged is cited at
that merge.

### 7. Bindings

A binding maps the protocol's concepts onto one platform's carriers. It must provide,
each in exactly one native carrier:

- the **identity** of a programme, a project, a phase, a work item and a decision point
  (their kind), and a **stable identifier** for each, by which files in the folder are
  named;
- **membership**, **order**, **constraints**, and a **relation that constrains
  nothing**;
- the **planning values**, the **accountable owner** and the **programme lead**;
- a **status stamp**, the one machine-read element of a state register, whose date is
  the date the section beneath it was checked, and the rule for **when an update is
  due**;
- a **dated change record** for each status change;
- a **body** for what structure cannot hold: the goal, the state, phase meaning, gate
  rationale, scope;
- for a decision point, its **ruling**, **decider** and **needed-by date**;
- a **mark** on agent-authored text, so that a reader and a consumer can tell it from a
  person's;
- a **plan home** for work that keeps records but belongs to no other project (*Tiers
  and terms*).

A binding never encodes sequence in names, and never lets a body restate what a carrier
already holds. A binding may also name an **automated reviewer** of changes, on which
*Who accepts a change* relies where one exists. Consumers read the binding's carriers,
never the protocol's prose.

**QEP-6 is the GitHub binding.** Its *Summary* names the carrier of each concept, and
its sections carry the rules. This QEP names no feature of any platform; QEP-6 defines
no register.

### 8. Scope

This QEP governs the records and the folder. **Procedures**, meaning how a session
creates, reads, resumes, updates and closes a plan, how the index and the derived reads
are computed, and the budgets and lints that keep a state register short, belong to the
tooling that operates the protocol. **Consumer contracts**, what a dashboard or a
registry reads and publishes, belong to their consumers. The numbers behind every bound
in this QEP (budgets, ceilings, ageing periods) belong to the tooling, which records
them, reports against them before enforcing them, and sets them from measurement.

## Alternatives considered

- **Extending QEP-6 into a single project-management document.** Rejected: it would
  weld the platform-free layer to one platform's carriers, so a change of platform
  rewrites the protocol; it would reverse the ruling that kept the unit's interface and
  the practice apart; and it would double the length of a document meant to be read in
  one sitting.
- **Two folders, a curated `.dev/` beside a generated `.qe/`.** Rejected: the boundary
  the folder exists to draw, one path that leaves with the overlay, would run through
  two directories, a root roadmap and an ignore rule. The split by writer survives as a
  lifecycle per folder inside one folder.
- **A scratch location inside the folder**, ignored by version control. Rejected (*The
  `.qe/` folder*): it versions nothing, costs maintenance, and creates a file state that
  is neither committed nor outside the tree.
- **A second machine-read block in the body**, a structured block for phase and next.
  Rejected: one machine-read element means one parse and one failure mode, and next and
  in flight are derived, so nothing needs declaring.
- **A repository state file as the state register**, beside the tracker. Rejected
  (*Records and their homes*): two registers for one fact drift, and the cheaper write
  wins. The 2026-09-28 review found a state file at six times its own stated size and
  disagreeing with its tracker on nine facts. A state file retires; its resume list goes
  to the working files.
- **A periodic tidy on a calendar.** Rejected: at the 2026-09-28 review, no repository
  that had scheduled a "roughly monthly" tidy had run one. The triggers are events the
  tooling can see.
- **An append-only raw layer that is never deleted.** Rejected: it was the first design,
  and every folder under it grew without bound while its distilled pages went stale.
  History lives in version control; the folder holds what the next session needs.
- **Generated views of status and structure committed into the folder.** Rejected: a
  committed view is a copy of platform state that drifts the moment an item closes, and
  in practice none was ever generated. The index is the one generated page, and it
  describes the folder, not the project.
- **A reader's review of every change to the folder.** Rejected: a log entry or a
  working file held for a person or a second agent costs a review nobody acts on, and
  review spent on low-stakes text lapses. The check and the automated reviewer are the
  review for `log/` and `work/`; readers are the review for living pages.

## Adoption

1. **Repositories that keep working notes** hold them in `.qe/` in the layout of *The
   `.qe/` folder*. A repository that adopted an earlier layout conforms by one change:
   a state file retires into the tracker's status section, working files and
   `ARCHITECTURE.md`; a plan file becomes one plan per tracker; declared-facts and
   reading-order files retire, because trackers are found through the binding; generated
   views are deleted; build material, run records and evidence leave the folder. The
   removal is tagged.
2. **Tooling that writes records** conforms to *Records and their homes*, *Reading
   tiers*, *Decision records* and *Tidy*, and reports against each bound before
   enforcing it (*Scope*).
3. **Decision records** conform by one pass: each record gains the front matter of
   *Decision records*, each chain of supersession is linked in both directions, rules
   restated in records move to their living text with a citation back, and the index is
   generated. A record's body is not rewritten; one longer than the budget, or one that
   states a rule, is superseded by a short successor that cites the rule.
4. **A binding** names one carrier for each concept in *Bindings* and states its own
   stamp form and body rules. QEP-6 is the binding for GitHub; a binding for another
   platform is a new QEP that supersedes it, leaving this QEP unchanged.

## Appendix A (informative): a decision record

```markdown
---
status: accepted            # accepted | superseded | lapsed
date: YYYY-MM-DD
topic: <one word or phrase the index groups by>
decider: <the person who decided>
supersedes: []              # records this one replaces in whole
refines: []                 # records this one changes in part
superseded-by:              # set on the old record when a successor lands
reason:                     # premise-changed | reversed | gone, on a superseded or lapsed record
---
# <What was decided, as a title>

**Summary**: In the context of <situation>, facing <the live options>, we chose <the
choice>, accepting <what was given up>.

**Context**: the situation and the constraint that forced a choice, with the evidence.

**Decision**: the decider's own words, dated.

**Consequences**: what follows for the code, the records and the people.

**Revisit when**: the evidence that would reopen it (optional).

**Refs**: the rule this record explains, and the tracker items, changes, records and
QEPs it rests on.
```

A sentence the agent inferred rather than read is marked `[inferred]`. The body fits the
budget the tooling sets; a record that needs more is two records.
