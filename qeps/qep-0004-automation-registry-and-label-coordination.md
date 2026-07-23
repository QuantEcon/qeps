---
qep: 4
title: Automation Registry and Label Coordination
author: "@mmcky"
status: Draft
type: standard
created: 2026-07-23
discussion: https://github.com/QuantEcon/qeps/pull/2#issuecomment-5053414782
related: [2]
---

# QEP-4: Automation Registry and Label Coordination

|              |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| **QEP**      | 4                                                                  |
| **Title**    | Automation Registry and Label Coordination                         |
| **Author**   | @mmcky                                                             |
| **Status**   | Draft                                                              |
| **Type**     | standard                                                           |
| **Created**  | 2026-07-23                                                         |
| **Discussion** | [QuantEcon/qeps#2 (field report)](https://github.com/QuantEcon/qeps/pull/2#issuecomment-5053414782) |
| **Related**  | [QEP-2](qep-0002-standard-github-labels.md) — the core label standard this registry extends |

## Summary

This QEP establishes a **registry of QuantEcon automations** and the policy by
which they coordinate through GitHub labels. Registering an automation grants
it two things: a durable **origin label** (the full, self-documenting name of
the automation, e.g. `action-translation`) applied to every artifact it
creates, and optionally a **task namespace** — a short, capability-named
prefix with a `/` separator (e.g. `translate/`) under which the automation
owns every label. Labels inside a namespace are the automation's
**coordination contract**: their meaning, lifecycle, and vocabulary are the
owner's to define and evolve in its own repository, *without* amending any
QEP. The registry records the boundary; the contract interior stays free.

## Motivation

[QEP-2](qep-0002-standard-github-labels.md) standardises the human label
vocabulary and a small closed set of bot **diagnostics** (`broken-links`,
`build-failure`, `dependencies` — *what an automation found*). Field use
immediately surfaced a second kind of bot label it could not describe: labels
that exist so automations can **coordinate** — with their own future runs,
with other automations, and with humans.

Two are already load-bearing in production:

- [`cleanup-weekly-reports.yml`](https://github.com/QuantEcon/reports-activity/blob/main/.github/workflows/cleanup-weekly-reports.yml)
  finds its own weekly issues by filtering on `status-report,automated` as an
  AND — `automated` alone would sweep in Dependabot PRs and build-failure
  issues.
- [`tools/highlights.py`](https://github.com/QuantEcon/reports-activity/blob/main/tools/highlights.py)
  routes the Translation-Sync rollup on `action-translation` across the
  lecture repos.

These labels look exactly like the bespoke local labels `qe gh labels prune`
exists to remove, and losing them fails *silently* — labels are ranking boosts
and routing keys, never gates, so the rollup degrades with no error. They need
to be registered somewhere prune can read.

At the same time, coordination contracts **evolve with the tooling**. Which
task labels `action-translation` uses to request a review, and what its
workflow does when one is applied, will shift as the action develops. Baking
each label into a QEP would put a team-review process in the inner loop of
action development. The resolution is the registrar model: **the QEP allocates
the namespace; the automation owns its interior.**

## Proposal

### The registry

Each registered automation gets one entry:

| Field | Meaning |
|---|---|
| **Automation** | The producing action/app and its home repository |
| **Origin label** | Durable full-name label on every artifact the automation creates |
| **Task prefix** | *(optional)* Short capability-named namespace, `/`-separated, that the automation owns |
| **Family grey** | One colour from the band `#ededed`–`#bdbdbd`, shared by the whole family |
| **Service area** | The repositories the automation operates on (where its labels are provisioned) |
| **Contract** | Link to the owner-maintained document defining its task labels and behaviour |

**Registration bar:** an entry requires a **documented consumer** — a query,
workflow, or tool that reads the label(s), which can be pointed at. This is
the testable justification that stops the namespace re-growing one label per
action. Adding or removing a registration is a **substantive amendment** to
this QEP (it changes what `prune` protects); everything *inside* a registered
namespace never touches a QEP at all.

Prefixes are unique across the registry. An automation that coordinates
through its origin label alone does not claim a prefix (see `status-report`
below). GitHub caps label names at 50 characters — short prefixes keep task
labels well clear of it.

### Founding registrations

| Automation | Origin label | Task prefix | Family grey | Service area |
|---|---|---|---|---|
| [`action-translation`](https://github.com/QuantEcon/action-translation) (translation sync) | `action-translation` | `translate/` | `#e5e5e5` | Lecture repos and their translation forks |
| [`reports-activity`](https://github.com/QuantEcon/reports-activity) (weekly status reports) | `status-report` | — | `#d5d5d5` | `QuantEcon/reports-activity` |

### Three tiers of automation label

| Tier | Example | Answers | Lifecycle |
|---|---|---|---|
| Family marker | `automated` | "was this made by a machine?" (org-wide union query) | Durable — every bot artifact ([QEP-2](qep-0002-standard-github-labels.md)) |
| Origin label | `action-translation` | "*which* automation created this?" (per-automation query) | Durable — every artifact the automation creates |
| Task label | `translate/review` | "what work is currently requested?" | Transient — applied to enqueue, removed on completion |

**Origin marks authorship, not participation.** An automation acting on
another automation's artifact does not add its own origin label; its
involvement is visible through the transient task label and the issue
timeline. One artifact, one origin. Both durable tiers are mandatory on
artifacts a registered automation creates, because GitHub search cannot
prefix-match — `automated` is the only "all bot output" query, and the origin
label the only "all of *this* bot's output" query.

### Coordination semantics: the mailbox model

A task label is a **mailbox address owned by the automation that does the
work** (worker-owns, not writer-owns): the owner has one place to watch — its
own namespace — and requesters are many and need no relationship with it.

- **Apply = enqueue.** Any org automation or maintainer may apply a registered
  task label to request the work, unless the owner's contract restricts
  requesters. Publishing a prefix in this registry declares a public org
  endpoint; guarded endpoints are the exception, declared per contract.
- **Owner removes = complete.** The owner is the **sole authority** over its
  namespace: it defines each label's meaning, performs the work, and removes
  the label on completion. If it cannot or will not act, it removes the label
  with a comment saying why (the dead-letter convention) — queues never rot
  silently.
- **Human removes = cancel.** A human deleting a task label before the owner
  runs is a "never mind"; the owner sees the `unlabeled` event with a human
  sender and stands down. Cancellation comes free from the platform.
- **Completion is inert.** Completing a task must not, by default, enqueue new
  tasks — that is the anti-loop rule. Chains (translate → spell-check →
  notify) are designed deliberately and one-directionally by a pipeline
  author, never emergent from two automations' completion behaviour.
- **The owner provisions and garbage-collects its zone.** Its labels exist on
  every repo in its service area *before* they are needed (the GitHub API
  auto-creates a missing label off-palette on first application), and stale
  state labels are the owner's to clean up.

Label ACLs do not exist on GitHub, so "who may apply" is enforced by the
**owner at consumption time**: the `labeled` event carries the sender, and a
guarded owner checks it before acting. Two platform mechanics do real work
here: applying labels requires triage permission (the floor that keeps
drive-by users out), and events created with a workflow's default
`GITHUB_TOKEN` do **not** trigger other workflows — so automation-to-automation
enqueueing only works through a deliberately provisioned GitHub App or PAT
token, which places a human decision exactly where the coordination power is
granted. Humans applying labels through the UI trigger workflows normally and
need no provisioning.

### Conventions

- **Separator is `/`** (`translate/review`). Visually distinct from both the
  hyphenated human vocabulary and the retired `priority: high` colon style, so
  "machine contract" is legible at a glance; native GitHub resonance
  (`owner/repo`); sorts families into contiguous blocks in the label list.
- **Prefixes name the capability, not the implementation** where the two
  differ (`translate/`, not `action-translation/`) — task labels then read
  task-first while ownership stays one registry lookup away.
- **Every namespaced label's description names its owner and the action**:
  *"Task label for QuantEcon/action-translation — applied to request a
  translation review; the action removes it on completion."* This is what a
  human sees in the label picker and what `prune` double-checks.
- **Family colour** comes from the grey band `#ededed`–`#bdbdbd` (grey =
  low-salience machine state, per QEP-2); each family takes one value,
  allocated at registration as the next unused in the band.

### Tooling

`qe gh labels sync` never creates, renames, or recolours labels under a
registered origin or prefix — a registered zone belongs to its owner. `qe gh
labels prune` **skips registered zones by rule** (a mechanical prefix match
against this registry) instead of relying on a human recognising a routing key
during one-by-one review.

## Alternatives considered

- **Register every coordination label individually.** The original proposal
  from the QEP-2 field report ("at most one origin label, added only where a
  documented consumer queries on it"). Rejected: it puts every contract change
  through a QEP amendment, which is exactly the pressure that makes teams
  bypass process. The registrar model keeps the justification bar (it moves to
  the namespace) while freeing the interior.
- **A shared org-wide prefix (`qebot/…` or `task/…`).** One reserved prefix
  and perfect visual unity, but the task vocabulary becomes shared mutable
  state: either every verb needs central definition (re-centralising what this
  QEP decentralises — every new task becomes a registry row) or two
  automations cross-talk through the same label. It also cannot express
  private state labels, so per-owner namespaces would be needed anyway. The
  capability-stability benefit ("swap the implementing bot without changing
  the label") is speculative at QuantEcon's scale and retrofittable via a
  shared alias if it ever materialises; the per-owner foundation is not
  retrofittable once contracts exist.
- **Writer-owns namespaces** (the producer posts state in its own zone;
  consumers subscribe). Right for state labels, wrong for tasks: the worker
  would have to watch every producer's zone that might signal it. Worker-owns
  inverts the coupling — one inbox, many anonymous requesters — and matches
  the platform grain (`on: labeled` fires where the label is watched).
- **Milestones for grouping bot work.** A registered task label is a standing
  routing key an automation queries every period; a milestone is a finite
  container that would be re-created per period and cannot be filtered through
  the issues API the same way.
- **No registry — rely on prune's one-by-one human review.** The status quo.
  `action-translation` sits on pilot lecture repos looking exactly like a
  bespoke leftover, and its loss degrades the Translation-Sync rollup silently.
  Protection by vigilance does not survive personnel and time; protection by
  rule does.

## Rollout

1. **Accept this QEP** to fix the registry, the namespace policy, and the
   coordination semantics as the QuantEcon standard.
2. **Provision the founding registrations**: recolour `action-translation` and
   `status-report` to their family greys on their service areas; owners adopt
   the description convention as task labels are introduced.
3. **Ship the registry as a machine-readable appendix**
   (`qep-0004-automations.yml`, following QEP-2's companion-file pattern) and
   extend the appendix CI check to the registry schema (including the `repo`
   service-area scope). Until then, the table above is normative.
4. **Wire the tooling**: `qe gh labels prune` and `sync` read the registry and
   skip registered zones mechanically.
5. **Register future automations by amendment** to this QEP — one entry per
   automation, justified by a documented consumer.
