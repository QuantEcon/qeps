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
a repository's share of those records, how decisions are recorded and changed, and the
acceptance test every record must pass — **a fresh agent, given only the records, can
resume the work.** It states **protocols, not procedures**: the tooling that operates
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
   serve it in plan order, and the records of §2. Progress is measured over its direct
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
| History | what happened, session by session, and why premises changed | the tracker's revision-log comments; the long form in the repository's session log | the tooling; agents |
| Decisions | choices made, with their reasons, as of their date | decision points in the plan; decision records in the repository (§5); QEPs across repositories | people |
| Structure | membership, plan order, constraints, phase membership | the binding's native carriers (§7) | the tooling; by hand |
| Phase meaning | each phase's intent and exit criterion | the tracker's phase table | people |
| Derived views | the digest (status) and the roadmap (structure) | the `.qe/` folder, generated (§6) | the tooling |
| Declared facts | the project's tracker, its registry identity, its programme | `.qe/project.yml` | people, once |

**State, not story.** The state register states where the project stands now and never
how it got there. A dated account of what happened — what was built, what was decided,
what was tried — belongs in the history register; a state section that carries it stops
being readable as state and starts being a changelog nobody stamped. The state register
is short by construction: a resume pointer, what is in flight, what is blocked, what
needs a person.

**Claims are verified when written, never carried forward.** Every claim in a state
register is measured against live state at the time of writing and dated; what cannot
be verified is written as an open question, not a fact.

### 3. The acceptance test

Everything written under this protocol is judged by one test: **a fresh agent, given
only the records — the tracker, its history, the repository's `.qe/` folder — can resume
the work without the conversation that produced them.** Anything load-bearing for that
test is a named record with a named home, never a behaviour a session is trusted to
have performed.

### 4. The `.qe/` folder

Everything QuantEcon-specific about *how a repository is worked* lives in one folder,
`.qe/`, so that retiring the overlay, archiving the repository or open-sourcing it is one
decision about one directory, and the public-content rule has one tree to check.

1. **Flat at the root.** The root holds the primary elements a reader opens first: the
   folder's own contract (`README.md`), the declared facts (`project.yml`), the curated
   reading order across trackers where a repository has more than one (`NEXT-STEPS.md`),
   and the generated views (`ROADMAP.md`, `DIGEST.md`, `snapshot.json`). Not every file
   is present in every repository; Appendix A gives the full set.
2. **`dev/` is the only sub-folder**, and it is the repository's notes record: the raw
   layer (`log/`, `decisions/`), append-only and never edited; the distilled layer
   (`STATE.md`, `PLAN.md`, `ARCHITECTURE.md`, `FUTURE.md`), rewritten in place and citing
   the entries it was distilled from; and a periodic distillation pass, run by an agent
   and approved by a person, that updates the distilled pages, flags contradictions and
   staleness, records what it distilled, and promotes upward — to the repository's
   documentation, to a QEP, or to the organisation's knowledge vault. Knowledge moves
   one way: raw, distilled, promoted.
3. **`dev/` is about the repository it sits in.** It holds nothing about another
   repository, a project that spans repositories, or the organisation; that material is
   promoted out. A repository whose *purpose* is to be a project's notes and decisions
   — a `project-*` or `workspace-*` repository under QEP-3 — is a notes record by
   construction and keeps its own layout; it may still carry the generated views.
4. **A lifecycle per file, not per folder.** `README.md`, `project.yml` and
   `NEXT-STEPS.md` are written by people and live; the generated views are written by
   the tooling, carry a first-line *generated by* marker, and are regenerated rather than
   edited; `dev/` is raw or distilled as above. The folder's `README.md` states each
   file's writer and lifecycle.
5. **The boundary test.** A file belongs in `.qe/` if it would leave with QuantEcon's
   way of managing the project; a file that describes the product stays in the
   repository's documentation. The files that tools discover at the repository root —
   agent instructions and tool configuration — stay at the root.
6. **Nothing under `.qe/` is ignored by version control**, and the protocol prescribes
   no scratch location. Working files live outside the tree; anything worth keeping is
   promoted into `dev/` deliberately. An ignored folder inside the tree versions nothing
   and still costs a placeholder, an ignore rule and a third state for a file — in the
   tree but uncommittable.
7. **`.qe/` is public content**: no credentials, no unpatched-vulnerability specifics,
   absolute dates only.

### 5. Decision records

A decision record is **a dated record of reasoning, not a rule.** It explains a choice
as of its date and guides the next one; it binds nothing beyond *read it before
re-litigating*.

1. **Form.** One file per decision in `.qe/dev/decisions/`, named
   `D-YYYY-MM-DD-<slug>.md`, a few lines each: context, decision, consequences, references
   (Appendix B). It is filed in the change that makes the decision.
2. **Never edited.** To change a decision, write the superseding record and put one note
   at the top of the old one pointing at it — the one permitted edit. The overruled
   reasoning stays readable, which is what lets a later reader tell a decision that was
   wrong from one whose premises changed.
3. **Revisit when.** A record may name the evidence that would reopen it, so a future
   reader knows when re-litigating is welcome rather than noise.
4. **An index of current positions**, maintained by the distillation pass and derived
   from the records: identifier, title, status — accepted, superseded by, reverted by,
   lapsed — and what each points at. The records are the authority; the index is
   regenerable.
5. **One register per tier.** A decision point in a plan is recorded where the binding
   records decision points (§7); a choice about how a repository is built is a decision
   record; a decision that crosses repositories or changes how the team works is a QEP,
   by QEP-1's own test, and QEPs are living too — amended in place by version, superseded
   by a new one, never rewritten silently.

### 6. Derived views

The **digest** shows status — the goal, the resume pointer, the phase table with
computed progress, open decision points, parked items — and the **roadmap** shows
structure — phases, gates, pathways, work items and their constraints. Both are computed
from the structure the binding holds, both are written into `.qe/` with a *generated by*
marker, and both are regenerated whenever the plan changes and never edited between
regenerations. Neither is ever a source of truth, and neither is ever written into a
state register: a generated count in a body is a mirror that drifts the moment an item
closes. The **snapshot** (`snapshot.json`) is the structure as last read, kept so the
next session can report what changed before anyone re-reads the prose.

### 7. Bindings

A binding maps the protocol's concepts onto one platform's carriers. It must provide,
each in exactly one native carrier: the **identity** of a project, a work item and a
decision point (their kind); **membership**; **order**; **constraints**; **grouping**
into phases; a **status stamp** — the one machine-read element of a state register,
whose date is the date the section beneath it was checked; and a **body** for what
structure cannot hold: the goal, the state, phase meaning, gate rationale, scope. A
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
cite the binding. The programme tier's binding is deferred as §1 states.

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
- **A scratch location inside the folder**, ignored by version control. Rejected (§4):
  it versions nothing, costs maintenance, and creates a file state that is neither
  committed nor outside the tree.
- **A second machine-read block in the body** — a structured block for phase and
  next. Rejected: the binding carries exactly one machine-read element for good reasons,
  and the digest is derived, so nothing needs declaring.
- **A repository state file as the state register**, beside the tracker. Rejected (§2):
  two registers for one fact drift, and the field showed them seventeen days apart on
  the same question. Where a project has a tracker, a state file keeps to orientation and
  the resume checklist, or is replaced by the generated digest.
- **Collapsible sections to hide the narrative** in a state register. Rejected: it hides
  the story instead of moving it, and text-mode readers print it in full.

## Adoption

1. **Repositories that keep working notes** hold them at `.qe/dev/`, in the form of §4.
   A repository that adopted the earlier `.dev/` convention conforms by one move; its
   raw entries keep their history unedited, and any scratch location is removed.
2. **Tooling that writes records** conforms: a state register is re-stamped as state, not
   story, with the removed narrative written to the history register in the same turn;
   generated views carry their marker and are regenerated, never edited; a decision
   record is filed in the change that decides.
3. **A binding** names one carrier for each concept in §7 and states its own stamp form
   and body rules. QEP-6 is the binding for GitHub; a binding for another platform is a
   new QEP that supersedes it, leaving this QEP unchanged.
4. **A `project-*` or `workspace-*` repository** keeps its own layout (§4) and adopts
   the generated views at its option.

## Appendix A (informative): the `.qe/` layout

```
.qe/
├── README.md        the contract: each root file's writer and lifecycle; the public-content rule
├── project.yml      declared, edited by people: the tracker, the registry identity, the programme
├── NEXT-STEPS.md    curated by people: the reading order across trackers, and the gates between them
├── ROADMAP.md       generated: structure — phases, gates, pathways, work items
├── DIGEST.md        generated: status — the one-screen digest of the tracker
├── snapshot.json    generated: the structure as last read, for the diff at the next session
└── dev/             the notes record — raw entries distilled into living pages
    ├── STATE.md  PLAN.md  FUTURE.md  ARCHITECTURE.md   distilled: rewritten in place
    ├── decisions/   D-YYYY-MM-DD-<slug>.md — raw, append-only
    └── log/         YYYY-MM-DD-<id>.md — raw, append-only
```

`project.yml` carries three declared facts: `tracker` (the project's tracker, in the
binding's reference form), `registry` (the identifier by which the organisation's project
registry knows the project), and `programme`.

## Appendix B (informative): a decision record

```markdown
# <What was decided, as a title>

**Context**: the situation and the constraint that forced a choice, with the evidence.

**Decision**: the choice, by whom, on which date. What it changes and what it leaves.

**Consequences**: what follows for the code, the records and the people; what was given up.

**Revisit when**: the evidence that would reopen it (optional).

**Refs**: issues, PRs, records and QEPs this rests on.
```
