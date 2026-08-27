---
qep: 3
title: Repository Naming and Types
author: "@mmcky"
status: Draft
type: standard
created: 2026-07-10
discussion: https://github.com/QuantEcon/qeps/pull/7
---

# QEP-3: Repository Naming and Types

|              |                                      |
| ------------ | ------------------------------------ |
| **QEP**      | 3                                    |
| **Title**    | Repository Naming and Types          |
| **Author**   | @mmcky                               |
| **Status**   | Draft                                |
| **Type**     | standard                             |
| **Created**  | 2026-07-10                           |
| **Discussion** | [QuantEcon/qeps#7](https://github.com/QuantEcon/qeps/pull/7) |

## Summary

This QEP makes the QuantEcon organization's repository namespace a decided standard
rather than an observed habit. It defines:

- a naming **grammar** — a dash prefix encodes a repository's *type*; a dot suffix
  encodes a *variant* of the same content;
- a **registry** of type prefixes, each with its meaning, default visibility, and
  lifecycle;
- a **naming rule for published software packages and forks** — they keep the name the
  ecosystem knows them by, unprefixed;
- a convention for **teaching events**, the organization's largest family with no
  naming convention at all; and
- a **migration and archival policy** — new repositories must comply; existing ones
  are renamed opportunistically or simply archived; a repository that has outgrown its
  type is succeeded, never renamed into it.

The operational types are named for an actor's *effect* — decide, operate, measure,
narrate, execute, assess — never for a mechanism or trigger. The team manual's
repository-conventions page remains the operational how-to and will follow this QEP.

## Motivation

QuantEcon's repository namespace has drifted: of roughly 245 non-archived
repositories, only about 40% follow a documented naming convention, and the costs
recur. Placement questions are re-litigated project by project; teaching events — the
organization's largest family, at ~55 repositories — use at least eight naming styles
(`imf_2024`, `2026-nyu-course`, `workshop.africa-july2023`); load-bearing conventions
such as the `.{lang}` suffix for translated lectures are written down nowhere; and
the open lecture-rename proposals
([meta#333](https://github.com/QuantEcon/meta/issues/333),
[meta#334](https://github.com/QuantEcon/meta/issues/334)) have no policy to cite. A
naming standard defined once for the whole organization makes placement decidable,
renames routine, and the conventions that tooling already depends on citable.

## Proposal

### 1. Naming grammar

1. Repository names are lowercase and use only characters that need no shift key:
   dashes, not underscores; no capitals. (Names that are load-bearing elsewhere are
   exempt — see §3.)
2. **A dash prefix encodes the repository's type**: `{type}-{name}` (e.g.
   `lecture-dp`, `status-translations`, `action-translation`).
3. **A dot suffix encodes a variant or companion of the same content**:
   `{repo}.{variant}`. Established variants:

   | Suffix | Meaning | Example |
   |---|---|---|
   | `.notebooks` | notebook companion of a lecture series | `lecture-dp.notebooks` |
   | `.{lang}` | translated edition (lowercase IETF tag) | `lecture-python-programming.zh-cn`, `lecture-python-programming.fa` |
   | `.public` / `.private` | visibility twin of an existing repo | `notebook-gallery.private` |
   | `.docker` | container-build companion | `lecture-python.docker` |
   | `.myst` | build-system variant (legacy; being retired via [meta#334](https://github.com/QuantEcon/meta/issues/334)) | `lecture-julia.myst` |

   The `.{lang}` suffix is machine-consumed: `action-translation` locates translated
   editions by this pattern, so any change to it must be coordinated with that
   tooling.

4. Dots are **reserved** for variant suffixes. Type prefixes always use a dash: the
   dotted type forms in use today (`project.{name}`, `audit.{yyyy-mm}.{topic}`,
   `benchmark.{topic}`) are grandfathered, and new members of those families use the
   dash form (`project-{name}`, `audit-{yyyy-mm}-{topic}`, `benchmark-{topic}`).
5. **Name tokens pass the reversal test**: choose tokens so the name reads as natural
   English when expanded — singular inside compounds (`compliance-lecture-style` →
   "lecture-style compliance"), plural for whole-domain tokens
   (`status-translations`). This settles singular/plural choices mechanically.

### 2. Type registry

The normative registry of type prefixes. Detailed anatomies, worked examples and the
decision guide live in the team manual (private) and follow this table.

**Content**

| Prefix | Meaning | Visibility | Lifecycle |
|---|---|---|---|
| `lecture-{topic}` | official lecture series (+ `.notebooks`, `.{lang}` variants) | public | living |
| `book-{name}` | textbook project (+ `.public` companion) | private | living |
| `quantecon-book-{name}` | companion software package for a book | public | living |

**Programs and operations** — the six operational types map onto verbs: `project-*`
**decides**, `workspace-*` **operates**, `status-*` **measures**, `reporter-*`
**narrates**, `task-*` **executes**, `compliance-*` **assesses**. The first two are
human-authored; the rest are machine-written.

| Prefix | Meaning | Visibility | Lifecycle |
|---|---|---|---|
| `project-{name}` | planning and decision home for an initiative or program: roadmap, decision register, research, reports; no production code (may carry a minimal command bench — see boundary rules) | private | goal-scoped — lives and dies with its goal (initiatives end; programs run long) |
| `workspace-{collection}` | cross-repo operating bench for a repo family: manifest + runner, humans executing across the set; never vendors content | private | fleet-scoped — persists as long as the family, and outlives every project that passes through it |
| `status-{domain}` | machine-updated dashboard of facts about a domain: collector + versioned data + Pages site | public (typically) | domain-scoped — outlives any project |
| `reporter-{name}` | read-only automation that observes org or web state and writes reports, digests or dashboard-adjacent narrative; needs read scopes (plus issue/PR comment) only | either | ongoing |
| `task-{name}` | automation with write access to org resources, executing recurring org chores (backups, archival sweeps); the machinery that does a chore, not a task tracker — work tracking stays in GitHub Projects | either | ongoing |
| `compliance-{domain}` | standing record of a domain's conformance with a named standard: rubric + runbook, findings and scores re-measured in place per pass; versioned history seeded from each absorbed audit | public (typically) | standard-scoped — durable while the standard is enforced |
| `action-{name}` | reusable GitHub Action consumed by other repos via `uses:` | public | ongoing |

Boundary rules:

- **`status-*` holds the numbers; `project-*` holds the narrative.** A dashboard may
  incubate as hand-maintained tables inside a project repo; once a machine collects
  the numbers on a cadence, it graduates to a `status-*` repo named for the *domain
  it measures*, not the project that created it.
- **A `project-*` repo is organized around a goal; a `workspace-*` repo around a
  fleet.** A project may carry a minimal command bench (manifest + runner) for the
  repos it is changing; the bench graduates to a `workspace-*` once it is shared
  across initiatives or serves routine fleet operations.
- **The automation types split on the read/write boundary, not the trigger.**
  `reporter-*` observes and narrates with read scopes; `task-*` acts with write
  access to org resources. This makes the automation estate triage-able for security
  review directly from the repository list.
- **`status-*` reports what machines observe; `compliance-*` records what a rubric
  adjudicates.** Litmus test: a script with no human judgment could produce the
  number → `status-`; publication requires reviewing findings, or the repo recommends
  anything → `compliance-`. Adjudicated numbers never appear on a status dashboard.
- **The audit is the event; the compliance repo is the ledger.** A one-off
  examination publishes as `audit-{yyyy-mm}-{topic}` and freezes. When examinations
  acquire a cadence, an owner and a runbook, the standing record is a `compliance-*`
  repo; absorbed audit repos are archived (content stays public and citable), never
  renamed.

**Teaching events** (new)

| Prefix | Meaning | Visibility | Lifecycle |
|---|---|---|---|
| `workshop-{name}-{yyyy}` | workshop, summer school, or tutorial | public (typically) | frozen and archived after the event |
| `course-{name}-{yyyy}` | semester or short course | public (typically) | frozen and archived after the course |
| `conference-{name}-{yyyy}` | conference or meeting materials | public (typically) | frozen and archived after the event |

The name ends with the year; a private planning twin uses the `.private` variant
suffix (e.g. `workshop-india-2022.private`).

**Supporting**

| Prefix | Meaning | Visibility | Lifecycle |
|---|---|---|---|
| `test-{name}` | test double or CI target for tooling, pilot-scoped or standing (`test-cli` is a standing target for `cli`) | either | pilot-scoped doubles are archived when the pilot ends; a standing target lives as long as the tooling it tests |
| `template-{name}` | template repository | public | living |
| `tool-{name}` | internal, unpublished tooling — scripts and benches that are not installable and not meant to be; a tool published to an ecosystem takes its package name instead (§3) | either | living |
| `contractor-{name}` | payment artifacts for an individual RA/contractor | private | per engagement |
| `audit-{yyyy-mm}-{topic}` | dated point-in-time audit | public (typically) | frozen once published; archived once absorbed into a `compliance-*` ledger (see boundary rules) |
| `benchmark-{topic}` | benchmark dataset / evaluation harness | public | living |

### 3. Exemptions — names that are load-bearing elsewhere

- **Published software packages take their ecosystem name, unprefixed** — the
  repository name equals the name the package is registered under (PyPI, npm, Julia
  General, …): `QuantEcon.py`, `GameTheory.jl`, `sphinx-tojupyter`. This is a forward
  rule for new packages, not merely grandfathering: install commands, badges and
  citations depend on the repo and registry names agreeing. (`action-*` is the same
  principle for the Actions marketplace; internal unpublished tooling is `tool-*`,
  §2.)
- **Forks** keep the upstream name (`mystmd`, `gametracer`).
- **Deployed web properties** are named by their domain
  (`atlas.quantecon.org`; the dots here are the domain's, not variant suffixes).

### 4. Reserved names

Singletons with an org-wide role, outside the prefix system: `meta`, `qeps`,
`dashboard`, `QuantEcon.manual`, `actions`, `lectures`, `skills`, `cli`, `website`,
`grant-admin`, `grant-fundraising`, `admin`, `vault`, `governance`, `projects`,
`.github`. New singletons should be rare and need a stronger reason than a new prefix
would.

### 5. Migration and archival policy

- **New repositories must follow this QEP** from the date it is accepted. The
  new-repository checklist in the team manual references the registry above.
- **No bulk renames.** Existing repositories are renamed opportunistically — when a
  repo is actively maintained and a rename is proposed in its own issue tracker.
  Redirects make renames cheap, but CI, submodules and hard-coded paths still need
  checking, so renames ride on active maintenance rather than a campaign. The open
  lecture-rename proposals
  ([meta#333](https://github.com/QuantEcon/meta/issues/333),
  [meta#334](https://github.com/QuantEcon/meta/issues/334)) proceed as the first
  instances of this policy.
- **Renames fix names; they never transmute types.** A repository that has outgrown
  its type is *succeeded* by a new repository of the right type and archived, never
  renamed into the new type.
- **Rename and succession proposals are adjudicated against the published record**: a
  repo *planning* a series is not yet a repo *having* one.
- **Concluded events are archived, not renamed.** Archiving makes them read-only
  while content stays public and citable; an annual sweep archives the previous
  cycle's concluded events. Legacy names are grandfathered at archival.
- **Unmaintained legacy repositories** keep their names until archived.

## Alternatives considered

- **One `event-` prefix instead of `workshop-`/`course-`/`conference-`.** Rejected:
  the three-way split matches how the team already speaks and names, and the reader
  of a repo list gets more signal at no extra grammar cost.
- **A prefix for software libraries** (e.g. `pkg-*`). Rejected: package names are
  load-bearing in registries, install commands and citations, and the ecosystem
  suffixes (`.py`, `.jl`) already mark these repos clearly. §3 states the accepted
  rule; `tool-*` covers internal unpublished tooling.
- **A `workflow-*` type, and registering `reports-*`.** Rejected: `workflow-` names
  the mechanism rather than the role — every repository has `.github/workflows/`, so
  "contains workflows" distinguishes nothing — and `reports-*` would legitimize a
  single-member family. Both incumbents rename into the effect-named
  `reporter-*`/`task-*` pair (see Adoption). Candidate names colliding with the org's
  mathematical and economic vocabulary (`operator-`, `agent-`) or naming a cadence,
  mechanism or trigger (`routine-`, `bot-`, `cron-`, `job-`) were rejected; full
  record in the
  [discussion](https://github.com/QuantEcon/qeps/pull/7#issuecomment-4980556272).
- **Folding fleet benches into `project-*` (no `workspace-*` type).** Rejected:
  `workspace-lectures` — the manifest, runner and clone root for the lecture family —
  serves several concurrent initiatives at once and outlives each of them, which is
  precisely the fleet condition; and §5 forbids renaming a live repo into a
  different type.
- **Renaming the `workspace-*` prefix**, since it names the *place* while the other
  operational types name the actor's effect. Rejected: the asymmetry is deliberate —
  the machine-written types are named for effects because machines have no location,
  while a fleet bench is the one operational repo humans work *in*. No candidate
  (`maintenance-`, `ops-`, `fleet-`, `bench-`, …) said better what the repo *is*. One
  cost is accepted knowingly: `workspace-` and `workshop-` differ by two characters,
  so the pair needs care in the manual's worked examples.
- **Folding conformance records into `status-*`, or de-dating `audit-*` into a living
  series.** Rejected: `status-*`'s promise is *re-run the collector, get the same
  number*, and rubric-adjudicated scores behind that prefix would launder opinion as
  fact; an audit is an event even when it recurs. The living thing is the ledger:
  `compliance-*`.
  ([discussion](https://github.com/QuantEcon/qeps/pull/7#issuecomment-5421261197))
- **Keeping the dotted type forms** (`audit.{yyyy-mm}.{topic}`, `benchmark.{topic}`)
  **for new repos.** Rejected: dots are the variant-suffix marker, and reserving them
  keeps names machine-parseable. Existing dotted names are grandfathered; the
  families are small and rarely minted, so the switch costs nothing.
- **A bulk rename campaign.** Rejected: ~150 repositories, most of them concluded
  events or dormant research, with CI and submodule breakage risk for near-zero
  reader benefit. Archival delivers most of the cleanup value; redirects make the
  remaining opportunistic renames cheap.
- **Leaving the standard in the team manual only.** Rejected: the manual is private
  and describes *how*; the namespace decision needs a public, durable, versioned
  record — the same reasoning that made the label set QEP-2.
- **Doing nothing.** The namespace keeps drifting one repo at a time; the ~55-repo
  event family shows where that ends.

## Adoption

Acceptance fixes the grammar, registry, exemptions, and migration policy above as the
QuantEcon standard. On acceptance:

- The team manual's repository-conventions page cites QEP-3 as the naming authority
  and aligns its tables with this registry; operational program homes point back here
  so namespace decisions are not re-made locally.
- The open lecture-rename proposals
  ([meta#333](https://github.com/QuantEcon/meta/issues/333),
  [meta#334](https://github.com/QuantEcon/meta/issues/334)) proceed as the first
  opportunistic renames under §5, with `continuous_time_mcs` joining the batch
  ([meta#382](https://github.com/QuantEcon/meta/issues/382)).
- Concluded teaching-event repositories are archived in one pass — the trigger under
  this QEP is *the event concluded*, widening the *inactive-two-years* inventory in
  [meta#267](https://github.com/QuantEcon/meta/issues/267) — and thereafter by an
  annual sweep, itself a `task-*` candidate.
- The automation renames `reports-activity` → `reporter-activity` and
  `workflow-backups` → `task-backups` ride on active maintenance per §5
  ([meta#383](https://github.com/QuantEcon/meta/issues/383)).
- `compliance-lecture-style` is assembled from `audit.2026-05.style-guide`, which is
  then archived — the first instance of §5's "renames never transmute types".
- Future families (`research-*`, `paper-*` are visible in the long tail) are added to
  the registry by amending this QEP in place (version bump per QEP-1), not by new
  QEPs.

The sequenced execution checklist belongs in a tracking issue, not in this document,
so completing, reordering, or dropping a step never requires amending the standard.
