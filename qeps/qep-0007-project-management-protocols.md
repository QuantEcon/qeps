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

The cost showed in the records themselves. A review of the trackers written under the
GitHub binding (2026-09-21, eleven registered trackers measured) found the same shape
everywhere: the largest bodies run to two thousand words, because the section whose
contract is *current state* is being used as the *revision log* — dated accounts of
what happened accrete under the status stamp while the log register stays empty; the
same repositories keep a second current-state file that drifts from the tracker; and
phases have no carrier wherever a project spans repositories, so only the prose can say
which phase is live. None of these is a platform problem. Each fix is a protocol: state,
not story; one register per fact; a named home for every record.

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
2. A **decision point** is a choice the plan waits on. It is open while the choice is
   pending and recorded when made, with the choice and its reasons; work that cannot
   start before the choice is constrained by it.
3. A **project** is a definition of done, the work items and decision points that
   serve it in plan order, and the records of *Records and their homes*. Progress is measured over its direct
   work items and never compared across a change of membership.
4. A **phase** is a contiguous group of a project's work items with an intent and an
   exit criterion. A **gate** is a real constraint between phases or between projects.
   **The test for a constraint is output, not order**: an edge exists where the waiting
   item cannot start without something the upstream item produces — a ruling, a
   document, a page it draws from. Shared files, serial work by one agent and mere
   preference are sequencing rationale, never gates.
5. A **programme** is a named family of projects in which coordination between the
   projects is somebody's job — a lead who answers for the family. A family that needs
   no coordination is a group for presentation, not a programme. A programme's records
   follow this protocol; whether a programme is *structure* or *venue* on a given
   platform is its binding's question, and is left to the programme discussion
   ([QuantEcon/qeps#24](https://github.com/QuantEcon/qeps/issues/24)).

### 2. Records and their homes

**One fact, one register.** Every fact about a project is held in exactly one place;
every other place points at it or is generated from it. Two registers for the same fact
are re-verified on different days by different sessions, and one of them is wrong.

| Register | What it holds | Home | Writer |
|---|---|---|---|
| Goal | the definition of done, one sentence | the tracker, first line | people, at creation |
| State | where the project stands *now*: what is next, what is in flight, what is blocked, what needs a person | the tracker's stamped status section | the tooling, at every session boundary |
| History | what happened, session by session, with the files touched and the lessons routed | the tracker's dated update comments; the long form in the repository's `log/`, consumable | the tooling; agents |
| Decisions | choices made, with their reasons, as of their date | decision points in the plan; decision records in the repository (*Decision records*); QEPs across repositories | people |
| Structure | membership, plan order, constraints, phase membership | the binding's native carriers (*Bindings*) | the tooling; by hand |
| Phase meaning | each phase's intent and exit criterion | the tracker's phase table | people |
| Derived views | the index of the folder; next, in flight, blocked and progress | the index, generated; the rest computed on read, never written | the tooling |
| Working rules | how people and agents work in the repository, as in force now | the root instruction file and the files it points to, each rule citing its record | people, with the decider's words quoted at each change |

**State, not story.** The state register states where the project stands now and never
how it got there. A dated account of what happened — what was built, what was decided,
what was tried — belongs in the history register; a state section that carries it stops
being readable as state and starts being a changelog nobody stamped. The state register
is short by construction: a resume pointer, what is in flight, what is blocked, what
needs a person.

**Claims are verified when written, never carried forward.** Every claim in a state
register is measured against live state at the time of writing and dated; what cannot
be verified is written as an open question, not a fact. A claim is true only against a
primary record: the state of an item or a change, a release, a run, a commit, or the
person's own words. An agent's own log is never sufficient evidence for a claim in a
state register.

### 3. The acceptance tests

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
   ├── agents/          task-scoped instructions, one file per task, opening with its trigger
   └── dev/
       ├── ARCHITECTURE.md  how the repository is built: invariants (their only home), traps, open questions
       ├── topics/          overflow from ARCHITECTURE, one subject per file
       ├── plans/           one file per tracker homed here, named by the tracker's number
       ├── work/            one file per open item, named by the item's number, deleted when it closes
       ├── decisions/       decision records (*Decision records*)
       └── log/             session entries, consumable (item 6)
   ```

   The records home of a project is the repository that holds its tracker, whatever the
   repository's type. There is no exemption by repository type: a planning repository
   keeps this layout like any other, and keeps its evidence bundles outside the folder.
4. **Three lifecycles, by folder.** *Living* pages (`ARCHITECTURE.md`, `topics/`,
   `plans/`, `agents/`) are rewritten in place; a wholesale replacement names its
   predecessor and the commit that holds it. *Per-item* files (`work/`) are created when
   an item is planned or picked up and deleted by the change that closes it. *Records*
   (`decisions/`) are fixed once accepted and never deleted. *Consumable* entries
   (`log/`) are deleted once distilled. A file's lifecycle follows from its folder, so no
   file needs to state it.
5. **Two reading tiers.** A session starts from an **index**: one generated page, always
   loaded, that lists the living pages and their size, the plans and their trackers, the
   working files, the current decision records by topic, and the undistilled logs.
   Everything else is read on demand, by link from the index or from the item being
   worked. The resumption test (*The acceptance tests*) is judged on the index plus the
   plan and working file of the item in hand; that read fits a budget the tooling sets
   and reports on. Rules an agent must follow verbatim do not live in the folder's prose
   at all: they live in the repository's root instruction file or in instruction files
   scoped to the paths they govern, which load whole and are never summarised.
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
   settled one, and the index lists open ones as pending work. What only awaits a
   person's answer is a proposal in the log (item 6) or a decision point, never a
   hand-off. Instructions for taking over a role live in `agents/`; the state of the
   role does not. A hand-over is never a file a person is expected to find unprompted.
8. **Tidy.** The folder is kept small by a tidy, not by restraint. A tidy runs when the
   undistilled logs pass a ceiling the tooling sets, when a phase or a tracker closes,
   and when a session ends with lessons unrouted. It deletes a log entry once every
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
   protocol prescribes no scratch location: working files live outside the tree, and
   anything worth keeping is distilled into the folder deliberately. `.qe/` is public
   content: no credentials, no unpatched-vulnerability specifics, absolute dates only. A
   sentence an agent inferred rather than read from a primary record is marked as
   inferred.
10. **The check.** Each rule in this section is checked by the tooling where it can be
    and is marked below as checked or convention. A rule stated as checked that the
    tooling does not check is a defect in the standard.

| Rule | Checked by tooling | Convention |
|---|---|---|
| Layout (item 3) | yes | |
| No status, copies, code or figures (item 2) | status text, code files, figures | copies |
| Living-page predecessor line (item 4) | | yes |
| Working files deleted at close (item 4) | leftover files reported | |
| Index generated, always loaded, within budget (item 5) | yes | |
| Rules verbatim outside prose (item 5) | | yes |
| Log entry per session, with touched files and routed lessons (item 6) | missing routes, missing file list | |
| Hand-over through the working file and a hand-off entry (item 7) | open hand-offs listed; resume section present | |
| Tidy triggers and manifest (item 8) | triggers reported; manifest | bounded drop |
| Public content, absolute dates (item 9) | placeholders, relative dates | credentials by review |

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
   needs no record. A choice that binds more than one repository or changes how the team
   works is a QEP. A choice that a plan waits on is a decision point in the plan (*Tiers
   and terms*), recorded where the binding records decision points; it gains a record
   here only if it also changes how the repository is built.
2. **Form.** One file per record in `.qe/dev/decisions/`, named
   `D-YYYY-MM-DD-<slug>.md`. Its front matter carries `status` (accepted, superseded,
   lapsed), `date`, `topic`, `decider`, and the links `supersedes`, `superseded-by` and
   `refines` as the lifecycle needs them, with `reason` (premise changed, or reversed) on
   a superseded record. Its body is a one-sentence summary that states the context, the
   choice and what was given up; the context; the decision in the decider's own words,
   dated; the consequences; what evidence would reopen it; and references. The body fits
   a budget the tooling sets. A sentence an agent drafted sits apart from the decider's
   words and is marked where it is inferred; a record never carries an invented date or
   an alternative nobody considered. Appendix B gives the form.
3. **Lifecycle.** A record is accepted by the decider's merge of the change that files
   it, or by a person's merge of a record that cites a ruling already in the decider's
   words. After acceptance its body is fixed; only its front-matter status and links
   change. To change a decision, in whole or in part, write the new record and link both
   ways: the new record names what it supersedes or refines, and the old record names
   its successor. Links are checked in both directions. A record is never deleted; it
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
   item 5) lists records by topic with their status, walks each chain of supersession to
   its terminal successor, hides superseded records, and reports a chain that does not
   terminate. It is generated from the front matter, never edited by hand, and checked
   wherever the repository has continuous integration. A session reads the index and the
   current record for the topic in hand, never the register.
6. **One register.** A repository keeps one decision register. Decisions about a plan
   live on its decision points; decisions about the organisation live in QEPs; neither
   is copied into the register, and the register is not copied into a plan, a table in
   another file, or a numbered list in a document.

| Rule | Checked by tooling | Convention |
|---|---|---|
| Write-test (item 1) | | yes |
| Front matter and body budget (item 2) | yes | |
| Fixed body, bidirectional links (item 3) | yes | |
| Rule cites record, record cites rule (item 4) | citation resolves | wording |
| Index generated and current (item 5) | yes | |
| One register (item 6) | numbered decision lists in other files reported | |

### 6. The index and derived reads

The only generated page in the folder is the index (*The `.qe/` folder*, item 5). It is
computed on read, or regenerated on the default branch after a merge where the
repository has continuous integration, and it is never changed in a change under
review. What is next, what is in flight, what is blocked and how far a project has come
are derived from the binding's carriers at the time of reading and are never written
into the folder or the tracker. A view of structure that a person wants to keep is a
page outside the folder, dated, and it states the tracker it was read from.

### 7. Bindings

A binding maps the protocol's concepts onto one platform's carriers. It must provide,
each in exactly one native carrier: the **identity** of a project, a work item and a
decision point (their kind); **membership**; **order**; **constraints**; **grouping**
into phases; a **status stamp** — the one machine-read element of a state register,
whose date is the date the section beneath it was checked; a **body** for what
structure cannot hold: the goal, the state, phase meaning, gate rationale, scope; a way
to mark an agent-authored comment so that a reader and a consumer can tell it from a
person's; and a way for an agent to attach status to an item without publishing it as
the person's. A
binding never encodes sequence in names, and never lets a body restate what a carrier
already holds. Consumers read the binding's carriers, never the protocol's prose.

**QEP-6 is the GitHub binding**: identity in native issue types (QEP-6 § *Issue types*),
membership in sub-issue edges and order in list position (§ *Order is positional*),
constraints in blocked-by edges (§ *Constraints are dependencies*), phases in milestones
(§ *Phases are milestones*), the stamp as a fixed heading (§ *The status stamp*) and the
body rules (§ *The body*). This QEP names no GitHub feature; QEP-6 names no register.

### 8. Scope

This QEP governs the records and the folder. **Procedures** — how a session creates,
reads, resumes, updates and closes a plan; how a digest is computed; the budgets and
lints that keep a state register short — belong to the tooling that operates the
protocol, which cites this QEP as the authority on the records. **Consumer contracts** —
what a dashboard or a registry reads and publishes — belong to their consumers, which
cite the binding. The programme tier's binding is deferred as *Tiers and terms* states. The numbers behind
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
  lifecycle per file inside one folder.
- **A scratch location inside the folder**, ignored by version control. Rejected (*The
  `.qe/` folder*):
  it versions nothing, costs maintenance, and creates a file state that is neither
  committed nor outside the tree.
- **A second machine-read block in the body** — a structured block for phase and
  next. Rejected: the binding carries exactly one machine-read element for good reasons,
  and next and in flight are derived, so nothing needs declaring.
- **A repository state file as the state register**, beside the tracker. Rejected
  (*Records and their homes*):
  two registers for one fact drift, and the field showed them seventeen days apart on
  the same question. Where a project has a tracker, a state file keeps to orientation and
  the resume checklist, or is replaced by the generated digest.
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

## Appendix A (informative): the `.qe/` layout

```
.qe/
├── README.md          optional, by people: local deviations from this QEP, nothing else
├── agents/            living, by people: task-scoped instructions, one file per task, each opening with its trigger
└── dev/
    ├── ARCHITECTURE.md  living: how the repository is built; invariants (their only home); traps; open questions
    ├── topics/          living: overflow from ARCHITECTURE, one subject per file
    ├── plans/           living: <tracker>.md, one per tracker homed here; cites items by number, never by title
    ├── work/            per item: <item>-<slug>.md, from planning or pickup until the item closes; holds the resume section
    ├── decisions/       records: D-YYYY-MM-DD-<slug>.md, body fixed after acceptance, never deleted
    └── log/             consumable: YYYY-MM-DD-<slug>.md, one per session, deleted once distilled; retrospectives kept
```

The index is generated from this tree and is not part of it: it is computed on read, or
written to the default branch by continuous integration after a merge, and never changed
in a change under review.

## Appendix B (informative): a decision record

```markdown
---
status: accepted            # accepted | superseded | lapsed
date: YYYY-MM-DD
topic: <one word or phrase the index groups by>
decider: "@person"
supersedes: []              # records this one replaces in whole
refines: []                 # records this one changes in part
superseded-by:              # set on the old record when a successor lands
reason:                     # premise-changed | reversed, on a superseded record
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
