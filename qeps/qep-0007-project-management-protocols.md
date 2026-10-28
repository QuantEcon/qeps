---
qep: 7
title: Project Management Protocols
author: "@mmcky"
status: Draft
type: standard
related: [6]
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
| **Related**  | [QEP-6](qep-0006-project-trackers.md) — the GitHub binding of the unit this QEP defines |
| **Discussion** | [QuantEcon/qeps#39](https://github.com/QuantEcon/qeps/issues/39)   |

## Summary

This QEP defines how QuantEcon runs a project, independently of any platform: the
tiers and terms (programme, project, work item, decision point, phase, gate), the
**records** a project keeps and the single home of each, the `.qe/` folder that holds
the agent's records for a repository (an index always loaded, everything else read on
demand, and a tidy that keeps it small), how decisions are recorded and changed, and the
two tests every record must pass: **a person can plan from the tracker, and a fresh
agent can resume from the records.** It states **protocols, not procedures**: the tooling that operates
them keeps its own procedures, and a platform **binding** maps the protocol's concepts
onto that platform's carriers. QEP-6 is the GitHub binding.

## Motivation

The practice exists; the protocol does not. What a project is, where its state lives,
how a decision is recorded and how a session hands over to the next were each written
down somewhere — a notes convention piloted in one repository, a "convention" section
inside the tooling that operates it, the body rules of the GitHub binding — and nowhere
once. Three homes drift three ways, and a reader cannot tell which is current.

The cost showed in the records themselves. A review of the 38 registered trackers
written under the GitHub binding (2026-09-28) found the same shape everywhere: a median
body of 1,100 words and the largest past three thousand, because the section whose
contract is *current state* was being used as the *revision log* — dated accounts of
what happened accreted under the status stamp while the history register stayed empty;
the same repositories kept a second current-state file that drifted from the tracker
and won, because it was the cheaper write; and the agent-records folder beside the
tracker grew without bound, since nothing in it was ever deleted. Each fix is a
protocol: state, not story; one register per fact; a named home for every record; and
a tidy that a check enforces.

Stating the protocol above the binding has a second benefit. A move to another platform
then confines the rewrite to the binding document and the tooling; the protocol — and
every record written under it — survives unchanged.

## Proposal

### 1. Tiers and terms

1. A **work item** is a unit of work whose closing advances a project's definition of
   done. If the definition of done can be met without it, it is not a member, however
   much it shares a repository, a theme or an owner; **if the goal must be widened to
   justify an item's membership, the item is not a member.** An unparented work item is
   the normal case, not a gap to be filled.
2. A **decision point** is a choice the plan waits on beyond the session in which it
   arises, or that someone other than the person running that session must make. It
   is open while the choice is pending and recorded when made, with the choice and its
   reasons; work that cannot start before the choice is constrained by it. A choice
   ruled within one session is recorded in that session's change and in the next update.
3. A **project** is a definition of done, the work items and decision points that
   serve it in plan order, and the records of *Records and their homes*. Progress is measured over its direct
   work items and never compared across a change of membership.
4. A **phase** is a work item that holds its own leaves, with an intent and an exit
   criterion. A **gate** is a real constraint between phases or between projects.
   **The test for a constraint is output, not order**: an edge exists where the waiting
   item cannot start without something the upstream item produces — a ruling, a
   document, a page it draws from. Shared files, serial work by one agent and mere
   preference are sequencing rationale, never gates.
5. A **programme** is a named family of projects in which coordination between the
   projects is somebody's job — a lead who answers for the family. A family that needs
   no coordination is a group for presentation, not a programme. A programme's records
   follow this protocol. Its binding gives a programme one object whose members are its
   projects, in focus order, and whose health is derived from theirs.

### 2. Records and their homes

**One fact, one register.** Every fact about a project is held in exactly one place;
every other place points at it or is generated from it. Two registers for the same fact
are re-verified on different days by different sessions, and one of them is wrong.

| Register | What it holds | Home | Writer |
|---|---|---|---|
| Goal | the definition of done, one sentence | the tracker, first line | people, at creation |
| State | why the project is off track, if it is, and what it waits on from people | the tracker's stamped status section | the owner; the tooling drafts it when an update is due |
| History | status changes, as dated events; and session by session, what was done, the files touched and the lessons routed | the tracker's dated update comments; the long form in the repository's `log/`, consumable | the tooling; agents |
| Decisions | choices made, with their reasons, as of their date | decision points in the plan; decision records in the repository (*Decision records*); QEPs across repositories | people |
| Structure | membership, plan order, constraints, phase membership | the binding's native carriers (*Bindings*) | the tooling, with the owner's approval; by hand |
| Phase meaning | each phase's intent and exit criterion | the phase's own body | people |
| Planning values | health, stage, priority, dates, the accountable owner | the binding's typed carriers (*Bindings*) | the owner; stage and priority by the programme lead |
| Derived views | the index of the folder; next, in flight, blocked and progress | the index, generated; the rest computed on read, never written | the tooling |
| Working rules | how people and agents work in the repository, as in force now | the root instruction file and the files it points to, each rule citing its record | people, with the decider's words quoted at each change |

**State, not story.** The state register states where the project stands now and never
how it got there. A dated account of what happened — what was built, what was decided,
what was tried — belongs in the history register; a state section that carries it stops
being readable as state and starts being a changelog nobody stamped. The state register
is short by construction: reasons and asks. A resume pointer, the step in flight and the
failing thing are working state, kept in the records.

**Claims are verified when written, never carried forward.** Every claim in a state
register is measured against live state at the time of writing and dated; a claim that
cannot be verified is not written, and one repeated from an earlier update is verified
again. A claim is true only against a
primary record: the state of an item or a change, a release, a run, a commit, or the
person's own words. An agent's own log is never sufficient evidence for a claim in a
state register.

### 3. The acceptance test

Everything written under this protocol is judged by two tests. The **planning test**: a
person, from the tracker's first screen alone, can tell the goal, whether the project is
on track, what is next, who waits on whom, and when the next exit is due. The
**resumption test**: a fresh agent, from the index, the plan and working file of its
item, and the tracker's structure, can resume the work without the conversation that
produced them and without reading the tracker's prose. Anything load-bearing for either
test is a named record with a named home, never a behaviour a session is trusted to have
performed.

### 4. The `.qe/` folder

Everything QuantEcon-specific about *how a repository is worked* lives in one folder,
`.qe/`, so that retiring the overlay, archiving the repository or changing its visibility
is one decision about one directory, and the public-content rule has one tree to check.

1. **What it holds.** The folder is the agent's record: what the tracker's structure
   cannot hold and the platform does not. That is how the repository is built (its
   invariants and traps), the plan behind each tracker homed here, a working note for
   each open item, the reasoning behind decisions, the lessons of each session, and
   task-scoped instructions. It is written by agents and approved by people.
2. **What it never holds.** Status, next steps, what is in flight, and rulings: those
   live on the tracker and on decision points, which the binding carries. Copies of
   platform content: titles, bodies, comments, child lists, field values. Product code,
   build outputs, drafts and evidence bundles. Counts and dated figures: a record stores
   the query that produces a figure, never the figure, because a stored number goes
   stale silently and is still quoted with confidence.
3. **Layout.** The folder has these entries and no others:

   ```
   .qe/
   ├── README.md        optional: local deviations from this QEP, nothing else
   ├── INDEX.md         optional: the index, written only by continuous integration after a merge
   ├── agents/          task-scoped instructions, one file per task, opening with its trigger
   └── dev/
       ├── ARCHITECTURE.md  how the repository is built: invariants (their only home), traps, open questions
       ├── topics/          overflow from ARCHITECTURE, one subject per file
       ├── plans/           one file per tracker homed here, named by the tracker's number
       ├── work/            one file per open item, named by the item's number, deleted when it closes
       ├── decisions/       decision records (*Decision records*)
       └── log/             session entries, consumable (*Logs*); retrospectives kept
   ```

   The records home of a project is the repository that holds its tracker, whatever the
   repository's type. There is no exemption by repository type: a planning repository
   keeps this layout like any other, and keeps its evidence bundles outside the folder.
4. **Four lifecycles, by folder.** *Living* pages (`ARCHITECTURE.md`, `topics/`,
   `plans/`, `agents/`) are rewritten in place; a wholesale replacement names its
   predecessor and the commit that holds it. *Per-item* files (`work/`) are created when
   an item is planned or picked up and deleted by the change that closes it; the file
   lives where that change lands, and an item that changes no repository, or several,
   keeps it in the records home. *Records* (`decisions/`) are fixed once accepted and
   never deleted. *Consumable* entries (`log/`) are deleted once distilled, except a
   retrospective, which is kept. A file's lifecycle follows from its folder, so no file
   needs to state it.
5. **Two reading tiers.** A session starts from an **index**: one generated page, always
   loaded, that lists the living pages and their size, the plans and their trackers, the
   working files, the current decision records by topic, and the undistilled logs.
   Everything else is read on demand, by link from the index or from the item being
   worked. The index is computed when read, or written to the default branch by
   continuous integration after a merge; it is never changed in a change under review. The resumption test (*The acceptance test*) is judged on the index plus the
   plan and working file of the item in hand; that read fits a budget the tooling sets
   and reports on. A rule of conduct an agent must follow verbatim does not live in the
   folder's prose at all: it lives in the repository's root instruction file or in
   instruction files scoped to the paths it governs, which load whole and are never
   summarised. An invariant of the code lives in `ARCHITECTURE.md`, which such a rule
   may cite.
   Compaction loses exact wording first, so a rule carried in prose a session may
   summarise is a rule that will be lost.
6. **Logs.** Every session that changes something ends with one entry: what it did, each
   with its primary record (a change, a run, a release); the files it touched; what it
   learned, each lesson tagged with where it goes (a living page, a record, an issue, a
   promotion out of the repository, or noise); what was decided, linking the record or
   the decision point; and any status it proposes, as a proposal the tooling lists until
   a person applies or rejects it. An entry is never edited after it merges. A log is
   history and evidence for the next session, never a status register and never a place
   a person is expected to read.
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
   opens draft changes and files its log and hand-off, and its proposals wait. Instructions for taking over a role live in `agents/`; the state of the
   role does not. A hand-over is never a file a person is expected to find unprompted.
8. **Tidy.** The folder is kept small by a tidy, not by restraint. A tidy runs when the
   undistilled logs pass a ceiling the tooling sets, when a phase or a tracker closes,
   and when a session ends with a lesson it could not route. It deletes a log entry once every
   lesson in it has reached its home and every proposal has a disposition; rewrites
   living pages from what it distilled; deletes working files of closed items; writes a
   retrospective at a project's close, which is kept; and ages out an entry no tidy has
   reached within a period the tooling sets. A tidy is drafted by an agent as a
   reviewable change whose description lists every deletion with its last commit, so
   anything can be restored. It is never an in-place rewrite, it is bounded in how much
   it may drop in one pass, and it never deletes a record or a retrospective. What
   leaves the folder stays in version control; a large removal is tagged so it stays one
   reference away.
9. **Content rules.** Nothing under `.qe/` is ignored by version control, and the
   protocol prescribes no scratch location: scratch lives outside the tree, and
   anything worth keeping is distilled into the folder deliberately. `.qe/` is public
   content: no credentials, no unpatched-vulnerability specifics, absolute dates only,
   no unfilled placeholders. A sentence an agent inferred rather than read from a
   primary record is marked as inferred.
10. **Who accepts a change.** A change to the folder is accepted by whoever the
    lifecycle of what it touches requires, and by nobody else. In a session a person
    runs, the session merges its own change to `log/` or `work/` as soon as the
    tooling's check passes and automated review has nothing left open: those files are
    consumable or die with their item, nobody reads them for approval, and version
    control is their undo. A change to a living page is merged on a second reader's
    recommendation, because every later session reads it. A record is accepted by the
    decider's merge (*Decision records*). A tidy is merged by the owner, whatever it
    deletes, because it is the one change that removes things. A hand-off stays open
    until settled (*Hand-over between sessions*). A run with no person present merges
    nothing. Automated review, where the platform offers it, runs on every change, and
    each finding is addressed or answered before the merge; what a consumable file is
    spared is the second reader, never that. Review beyond this is spent where it has
    shown its worth: on living pages and on standards, and as a sampled audit of what
    merged without it, never on every log.
11. **The check.** Each rule in this section is marked below as checked, convention, or
    both. A rule marked checked is one that conforming tooling checks; a rule marked
    convention is kept by review. A standard that marks as checked what no tooling can
    check is defective, so the table claims only what a tool reading the repository
    can see.

| Rule | Checked | Convention |
|---|---|---|
| *Layout* | the tree and nothing outside it | |
| *What it never holds* | status text, code files; figures reported as candidates | copies of platform content |
| *Four lifecycles*: predecessor line | | yes |
| *Four lifecycles*: working files deleted at close | leftover files reported | |
| *Two reading tiers*: index generated, within budget | yes | |
| *Two reading tiers*: rules of conduct outside the folder's prose | | yes |
| *Logs*: one entry per session, with touched files and routed lessons | missing routes, missing file list | one entry per session |
| *Hand-over*: working file with a resume section; open hand-offs listed | resume section present; open hand-off changes listed by the tooling | |
| *Tidy*: triggers, manifest, records and retrospectives never deleted | triggers reported; manifest; deletions outside `log/` and `work/` refused | bounded drop |
| *Content rules* | ignored paths, placeholders, relative dates | credentials and inference marks, by review |
| *Who accepts a change* | the check runs before any merge; a merge to `decisions/`, or a tidy, by anyone but the decider or owner is reported | the second reader on living pages; findings of automated review addressed; the sampled audit |

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
   needs no record. A choice that binds beyond one project or changes how the team
   works is a QEP. A choice that a plan waits on is a decision point in the plan (*Tiers
   and terms*), recorded where the binding records decision points; it gains a record
   here only if it also changes how the repository is built.
2. **Form.** One file per record in `.qe/dev/decisions/`, named
   `D-YYYY-MM-DD-<slug>.md`. Its front matter carries `status` (accepted, superseded,
   lapsed), `date`, `topic`, `decider`, and the links `supersedes`, `superseded-by` and
   `refines` as the lifecycle needs them, with `reason` (premise changed, reversed, or
   the thing governed is gone) on a superseded or lapsed record. Its body is a one-sentence summary that states the context, the
   choice and what was given up; the context; the decision in the decider's own words,
   dated; the consequences; what evidence would reopen it; and references. The body fits
   a budget the tooling sets. A sentence an agent drafted sits apart from the decider's
   words and is marked where it is inferred; a record never carries an invented date or
   an alternative nobody considered. Appendix A gives the form.
3. **Lifecycle.** A record is accepted by the decider's merge of the change that files
   it, or by a person's merge of a record that cites a ruling already in the decider's
   words. After acceptance its body is fixed; only `status`, `superseded-by` and `reason`
   change. To replace a decision, write the new record naming what it supersedes, and
   mark the old one superseded by it; the two links are checked against each other. To
   change a decision in part, write the new record naming what it refines; the old
   record stays accepted, and the index derives the reverse link. A record is never deleted; it
   leaves the reading set through its status. A record that lapses because the thing it
   governs is gone is marked so, with the reason.
4. **Rules and records.** A rule in force lives in exactly one living text: the
   repository's root instruction file for how agents work, `ARCHITECTURE.md` for
   invariants, the plan for sequencing. The rule cites the record that explains it by
   file name, and the record cites the rule it explains rather than restating it. Where
   a rule and a record differ, the rule holds, and the difference is drift for the next
   tidy to flag. A record that states a rule in its own words is the failure this
   section exists to prevent: the record becomes the rule, the rule changes by amending
   records, and a reader must follow the chain to learn what is in force.
5. **The index.** The current position is one lookup. The index (*The `.qe/` folder*,
   *Two reading tiers*) lists records by topic with their status, walks each chain of supersession to
   its terminal successor, hides superseded records, and reports a chain that does not
   terminate. It is generated from the front matter, never edited by hand, and checked
   wherever the repository has continuous integration. A session reads the index and the
   current record for the topic in hand, never the register.
6. **One register.** A repository keeps one decision register. Decisions about a plan
   live on its decision points; decisions about the organisation live in QEPs; neither
   is copied into the register, and the register is not copied into a plan, a table in
   another file, or a numbered list in a document.

| Rule | Checked | Convention |
|---|---|---|
| *When a record is written* | | yes |
| *Form*: front matter and body budget | yes | inference marks, by review |
| *Lifecycle*: fixed body; supersession linked both ways | yes | |
| *Rules and records*: citations resolve; no restatement | citation resolves | wording |
| *The index*: generated and current | yes | |
| *One register* | numbered decision lists in other files reported | |

### 6. The index and derived reads

The only generated page in the folder is the index (*The `.qe/` folder*, *Two reading
tiers*). It is computed on read, or written to the default branch by continuous
integration after a merge, and it is never changed in a change under review. What is next, what is in flight, what is blocked and how far a project has come
are derived from the binding's carriers at the time of reading and are never written
into the folder or the tracker. A view of structure that a person wants to keep is a
page outside the folder, dated, and it states the tracker it was read from.

### 7. Distillation and flow back

Knowledge moves one way: from the log, through a distillation drawn from primary
records and live structure, to the tracker. The tooling drafts an update; every claim
in it resolves to a primary record read live; and a person approves its judgements:
health, target, stage, priority, a new ask, a charter change, a new decision point. A
distillation of verified events only may post without approval, disclosed as agent
work and posted in a session a person runs, under that person's account. Nothing is
kept in step afterwards: a claim lives where it was approved, and the next update
re-verifies it. A ruling found anywhere but the platform is posted there, in the
decider's words, before anything cites it.

### 8. Bindings

A binding maps the protocol's concepts onto one platform's carriers. It must provide,
each in exactly one native carrier: the **identity** of a programme, a project, a
phase, a work item and a decision point (their kind); **membership**; **order**;
**constraints**; a **relation that constrains nothing**; the **planning values** and
the **accountable owner**; a **status stamp**, the one machine-read element of a state
register, whose date is the date the section beneath it was checked; a **dated change
record** for each status change; a **body** for what structure cannot hold: the goal,
the state, phase meaning, gate rationale, scope; and a **mark** on agent-authored text
so that a reader and a consumer can tell it from a person's. A binding never encodes
sequence in names, and never lets a body restate what a carrier already holds.
Consumers read the binding's carriers, never the protocol's prose.

**QEP-6 is the GitHub binding.** Its *Summary* names the carrier of each concept, and
its sections carry the rules. This QEP names no feature of any platform; QEP-6 defines
no register.

### 9. Scope

This QEP governs the records and the folder. **Procedures** — how a session creates,
reads, resumes, updates and closes a plan; how the index and the derived reads are
computed; the budgets and lints that keep a state register short — belong to the
tooling that operates the protocol, which cites this QEP as the authority on the
records. **Consumer contracts** — what a dashboard or a registry reads and publishes —
belong to their consumers, which cite the binding. The numbers behind
every bound in this QEP (budgets, ceilings, ageing periods) belong to the tooling, which
records them, reports against them for one cycle before enforcing them, and sets them
from measurement.

## Alternatives considered

- **Extending QEP-6 into a single project-management document.** Rejected: it would
  weld the platform-free layer to one platform's carriers, so a change of platform
  rewrites the protocol; it would reverse the ruling that kept the unit's interface and
  the practice apart; and it would double the length of a document meant to be a
  ten-minute read.
- **Two folders — a curated `.dev/` beside a generated `.qe/`.** Rejected: the boundary
  the folder exists to draw — one path that leaves with the overlay — would run through
  two directories, a root roadmap and an ignore rule. The split by writer survives as a
  lifecycle per folder inside one folder.
- **A scratch location inside the folder**, ignored by version control. Rejected (*The
  `.qe/` folder*):
  it versions nothing, costs maintenance, and creates a file state that is neither
  committed nor outside the tree.
- **A second machine-read block in the body** — a structured block for phase and
  next. Rejected: one machine-read element means one parse and one failure mode, and
  next and in flight are derived, so nothing needs declaring.
- **A repository state file as the state register**, beside the tracker. Rejected
  (*Records and their homes*):
  two registers for one fact drift, and the cheaper write wins. The field showed a
  state file at six times its own stated size and disagreeing with its tracker on nine
  facts. A state file retires; its resume list goes to the working files.
- **Collapsible sections to hide the narrative** in a state register. Rejected: it hides
  the story instead of moving it, and text-mode readers print it in full.

- **A periodic tidy on a calendar.** Rejected: a tidy that runs "roughly monthly" has
  not run in any repository that scheduled one. The triggers are events the tooling can
  see.
- **An append-only raw layer that is never deleted.** Rejected: it was the first design,
  and every folder under it grew without bound while its distilled pages went stale.
  History lives in version control; the folder holds what the next session needs.
- **Generated views of status and structure committed into the folder.** Rejected: a
  committed view is a copy of platform state that drifts the moment an item closes, and
  in practice none was ever generated. The index is the one generated page, and it
  describes the folder, not the project.
- **A reader's review of every change to the folder.** Rejected: a log entry per
  session, held for a person or a second agent, costs a round trip nobody reads, and the
  field showed that review spent on low-stakes text is skipped, not done. The check and
  automated review are the review for consumable files; readers are the review for
  living ones.

## Adoption

1. **Repositories that keep working notes** hold them in `.qe/` in the layout of *The
   `.qe/` folder*. A repository that adopted an earlier layout conforms by one change:
   a state file retires into the tracker's status section, working files and
   `ARCHITECTURE.md`; a plan file becomes one plan per tracker; declared-facts and
   reading-order files retire, because trackers are found through the binding; generated
   views are deleted; build material, run records and evidence leave the folder. The
   removal is tagged.
2. **Tooling that writes records** conforms: a state register is re-stamped as state,
   not story, with the removed narrative written to the history register in the same
   turn; the index is generated, never edited; a record is filed in the change that
   decides, with the decider's words quoted; a tidy is drafted as a reviewable change;
   and every bound in this QEP is reported against for one cycle before it is enforced.
3. **Decision registers** conform by one pass: each record gains the front matter of
   *Decision records*, each chain of supersession is linked in both directions, rules
   restated in records move to their living text with a citation back, and the index is
   generated. Records longer than the budget are not rewritten; a tidy may file a short
   successor that refines them.
4. **A binding** names one carrier for each concept in *Bindings* and states its own
   stamp form and body rules. QEP-6 is the binding for GitHub; a binding for another
   platform is a new QEP that supersedes it, leaving this QEP unchanged.

## Appendix A (informative): a decision record

```markdown
---
status: accepted            # accepted | superseded | lapsed
date: YYYY-MM-DD
topic: <one word or phrase the index groups by>
decider: "@person"
supersedes: []              # records this one replaces in whole
refines: []                 # records this one changes in part
superseded-by:              # set on the old record when a successor lands
reason:                     # premise-changed | reversed | gone, on a superseded or lapsed record
---
# <What was decided, as a title>

**Summary**: In the context of <situation>, facing <the live options>, we chose <the
choice>, accepting <what was given up>.

**Context**: the situation and the constraint that forced a choice, with the evidence.

**Decision**: the decider's own words, dated; or the drafted text, marked as adopted by
the decider's merge.

**Consequences**: what follows for the code, the records and the people.

**Revisit when**: the evidence that would reopen it (optional).

**Refs**: the rule this record explains, and the issues, changes, records and QEPs it
rests on.
```

A sentence the agent inferred rather than read is marked `[inferred]`. The body fits the
budget the tooling sets; a record that needs more is two records.
