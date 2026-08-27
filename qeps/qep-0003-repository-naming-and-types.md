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
rather than an observed habit. It defines a naming **grammar** (a dash prefix encodes a
repository's *type*; a dot suffix encodes a *variant* of the same content), a
**registry** of type prefixes with the meaning, default visibility and lifecycle of
each, a **naming rule for published software packages and forks** (they take the name
the ecosystem knows them by, unprefixed), a new convention for the organization's
largest unnamed family (**teaching events**), and a **migration and archival policy**
(new repositories must comply; existing ones are renamed opportunistically or simply
archived; a repository that has outgrown its type is succeeded, never renamed into
it). While in Draft, the registry was field-tested against live placement and rename
decisions recorded on the discussion PR; the operational types that emerged are named
for an actor's *effect* — decide, operate, measure, narrate, execute, assess — never
for a mechanism or trigger. The team manual's repository-conventions page remains the
operational how-to and follows this QEP.

## Motivation

The organization has roughly 245 non-archived repositories. After the July 2026
taxonomy update to the team manual, about 40% follow a documented convention; the rest
accumulated names one decision at a time. The costs are concrete:

- **Placement questions recur and get re-litigated.** Recent example: whether the
  translation-progress dashboard belonged in the translation program's planning repo or
  in its own repository. Answering it well required writing down what each repo type is
  *for* — that reasoning should be decided once, not rediscovered per project.
- **The largest family in the organization has no convention at all.** Teaching events
  (workshops, courses, conferences) account for ~55 repositories in at least eight
  naming styles (`imf_2024`, `kyoto_2025`, `2026-nyu-course`,
  `workshop.africa-july2023`, `ChicagoFed_workshop`, `ShenzhenWinterCamp`), most
  violating even the existing dash-not-underscore rule. Nearly all are concluded events
  that were never archived.
- **Load-bearing conventions are undocumented.** The `.{lang}` suffix for translated
  lecture editions (`lecture-python-programming.zh-cn`) is central to the active
  internationalisation program yet written down nowhere; the same is true of the
  general dot-suffix grammar (`.notebooks`, `.public`).
- **Pending rename proposals need a framework.** The open proposals to standardize
  lecture repository names ([meta#333](https://github.com/QuantEcon/meta/issues/333),
  [meta#334](https://github.com/QuantEcon/meta/issues/334)) are instances of a naming
  policy that does not yet exist; deciding the policy first makes those (and future)
  renames routine instead of one-off debates.

The repository namespace is org-wide infrastructure, exactly parallel to the label
namespace (QEP-2): every future repository is created against it, and it changes how
the whole team works. That is the QEP bar. The team manual documents *how* to apply
the conventions (anatomies, worked examples, a decision guide); this QEP records *what
is decided*, so the manual has an authority to cite.

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

4. Dots are **reserved** for variant suffixes. Type prefixes always use a dash: the
   dotted type forms in use today (`project.{name}`, `audit.{yyyy-mm}.{topic}`,
   `benchmark.{topic}`) are grandfathered, and new members of those families use the
   dash form (`project-{name}`, `audit-{yyyy-mm}-{topic}`, `benchmark-{topic}`).
5. **Name tokens pass the reversal test**: choose tokens so the name reads as natural
   English when expanded — attributive singulars inside compounds
   (`compliance-lecture-style` → "lecture-style compliance", like *house style* or
   *user guide*), standalone plurals for whole-domain tokens (`status-translations`).
   This settles singular/plural choices mechanically.

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
**decides** (plans, records why), `workspace-*` **operates** (humans executing across a
repo family), `status-*` **measures** (machines reporting observed facts), `reporter-*`
**narrates** (machines writing periodic digests), `task-*` **executes** (machines doing
recurring chores), `compliance-*` **assesses** (a standing rubric-adjudicated record).
The first two are human-authored; the rest are machine-written. Three of the six
publish observations and are separated by contract and epistemic mode: `status-*`
publishes machine-measured state under a data contract; `reporter-*` publishes
narrative digests, read-only and contract-free; `compliance-*` maintains an
adjudicated ledger against a named standard.

| Prefix | Meaning | Visibility | Lifecycle |
|---|---|---|---|
| `project-{name}` | planning and decision home for an initiative or program: roadmap, decision register, research, reports; no production code (may carry a minimal command bench — see boundary rules) | private | goal-scoped — lives and dies with its goal (initiatives end; programs run long) |
| `workspace-{collection}` | cross-repo operating bench for a repo family: manifest + runner, humans executing across the set; never vendors content | private | fleet-scoped — persists as long as the family, and outlives every project that passes through it |
| `status-{domain}` | machine-updated dashboard of facts about a domain: collector + versioned data + Pages site | public (typically) | domain-scoped — outlives any project |
| `reporter-{name}` | read-only automation that observes org or web state and writes reports, digests or dashboard-adjacent narrative; needs read scopes (plus issue/PR comment) only | either | ongoing |
| `task-{name}` | automation with write access to org resources, executing recurring org chores (backups, archival sweeps); the machinery that does a chore, not a task tracker — work tracking stays in GitHub Projects | either | ongoing |
| `compliance-{domain}` | standing record of a domain's conformance with a named standard: rubric + runbook, findings and scores re-measured in place per pass; versioned history seeded from each absorbed audit | public (typically) | standard-scoped — durable while the standard is enforced |
| `action-{name}` | reusable GitHub Action consumed by other repos via `uses:` | public | ongoing |

Boundary rules worth recording at the standard level:

- **`status-*` holds the numbers; `project-*` holds the narrative.** A dashboard may
  incubate as hand-maintained tables (typically inside a project repo); once numbers a
  machine could collect are being collected automatically on a cadence — wherever they
  incubated — they graduate to a `status-*` repo named for the *domain it measures*,
  not the project that created it. Evidence graduates; judgment does not (see the
  `compliance-*` rule below).
- **A `project-*` repo is organized around a goal; a `workspace-*` repo is organized
  around a fleet.** Remove the goal and a project repo is pointless even though its
  member repos remain; remove the family and a workspace is pointless even if every
  current initiative is still running. Lifecycle follows from this rather than
  defining it. The overlap is legal, with a boundary rule: a project may carry a
  minimal command bench (manifest + runner) for the repos it is changing — for a
  long-running program that arrangement can be durable, not merely transitional, since
  locality of decisions, bench and clones under one root is a feature — but the bench
  graduates to a `workspace-*` once it is shared across initiatives or grows beyond
  minimal to serve routine fleet operations. A family is workspace-ready when
  membership is stable, the repos are structurally homogeneous, coordination tasks
  recur mechanically, and development happens upstream in the member repos.
- **The automation types split on the read/write boundary, not the trigger.**
  `reporter-*` observes and narrates with read scopes; `task-*` acts with write access
  to org resources. Both are typically scheduled and either may be event-driven — the
  durable, governance-relevant property is the effect, and it makes the org's
  automation estate triage-able for security review directly from the repository list.
- **`status-*` reports what machines observe; `compliance-*` records what a rubric
  adjudicates.** Shared anatomy (collector + versioned data + Pages site) does not
  decide the type; the epistemic mode does. Litmus tests: a script with no prompt
  could produce the number → `status-`; publication requires reviewing findings →
  `compliance-`; the repo recommends anything → `compliance-` (status has no
  opinions). Containment is asymmetric: a compliance ledger may embed
  machine-collected facts as evidence, but adjudicated numbers never appear on a
  status dashboard. Both may exist for one domain: the ledger keeps its mechanical
  evidence inside until that plane has consumers of its own — at which point the
  *evidence* (never the judgment) graduates to `status-{domain}`.
- **The audit is the event; the compliance repo is the ledger.** A one-off examination
  publishes as `audit-{yyyy-mm}-{topic}` and freezes — an audit stays an audit even
  when it recurs. When examinations acquire a cadence, an owner and a runbook, the
  standing record is a `compliance-*` repo assembled from one or more audits; absorbed
  audit repos are archived (content and Pages stay public and citable), never renamed.
  Routine passes post to the ledger directly; dated audit repos remain available as
  citable freezes of a specific pass.

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
  General, …): `QuantEcon.py`, `QuantEcon.jl`, `GameTheory.jl`, `sphinx-tojupyter`,
  `quantecon-book-theme`, `textstrata`. This is a forward rule for new packages, not
  merely grandfathering: install commands, badges and citations depend on the repo and
  registry names agreeing. (`action-*` is the same principle for the Actions
  marketplace, where the `uses:` path is the identity; internal unpublished tooling is
  `tool-*`, §2.)
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
  GitHub's automatic redirects make renames cheap for links and clones, but CI,
  submodules, Pages URLs, and hard-coded paths still need checking, so renames ride on
  active maintenance rather than a campaign. The open lecture-rename proposals
  ([meta#333](https://github.com/QuantEcon/meta/issues/333),
  [meta#334](https://github.com/QuantEcon/meta/issues/334)) proceed as the first
  instances of this policy.
- **Renames fix names; they never transmute types.** A repository that has outgrown
  its type is not renamed into the new type: it is *succeeded* by a new repository of
  the right type and archived — the same shape as "concluded events are archived, not
  renamed", stated generally.
- **Rename and succession proposals are adjudicated against the published record.** A
  proposal states the facts its target row's lifecycle turns on (cadence, series,
  consumers), and the registry adjudicates them against what is published — in-flight
  work is cited as in-flight, not as state. A repo *planning* a series is not yet a
  repo *having* one.
- **Concluded events are archived, not renamed.** Past-event repositories are made
  read-only via GitHub archiving (content stays public and citable); an annual sweep
  archives the previous cycle's concluded events. Legacy names are grandfathered at
  archival — an archived repo is never renamed.
- **Unmaintained legacy repositories** keep their names until archived.

## Alternatives considered

- **One `event-` prefix instead of `workshop-`/`course-`/`conference-`.** A single
  prefix is simpler, but the three-way split matches how the team already speaks and
  names (`conference-cef2026`, `2026-tom-course`, `dse_workshop`), and the reader of a
  repo list gets more signal at no extra grammar cost. Rejected in favour of the split.
- **A prefix for software libraries** (e.g. `pkg-*`). Rejected: package names are
  load-bearing in registries, install commands and citations; a repo/registry name
  mismatch is a permanent tax for zero disambiguation gain — the ecosystem suffixes
  (`.py`, `.jl`) already mark these repos clearly. §3 states the accepted rule (the
  ecosystem name, unprefixed), and `tool-*` covers internal unpublished tooling so the
  published/unpublished boundary is decidable.
- **A `workflow-*` type, and registering `reports-*`** (both in use today). Rejected:
  `workflow-` names the mechanism rather than the role — every repository has
  `.github/workflows/`, so "contains workflows" distinguishes nothing and pollutes org
  search — and registering `reports-*` would legitimize a single-member family. Both
  incumbents rename into the effect-named `reporter-*`/`task-*` pair (Rollout §4).
  For that pair, agent nouns colliding with the org's own domain vocabulary were
  rejected outright (`operator-`, `agent-`, `actor-`): mathematical and economic
  vocabulary is off-limits for type prefixes — the mirror image of §3, where registry
  names are load-bearing *outside* the org. `routine-`, `automation-`, `bot-`,
  `scheduled-`/`cron-` and `job-` fell to narrower objections (cadence-implying,
  off-pattern, interactivity-connoting, trigger-naming, Actions-jargon). Full record:
  [discussion](https://github.com/QuantEcon/qeps/pull/7#issuecomment-4980556272).
- **Removing `workspace-*` and folding fleet benches into `project-*`** (proposed
  during the field-test window, on the reading that both live placement decisions run
  against the draft resolved into `project-*` and that the registry should trail
  reality by one repository rather than lead it). Reversed before acceptance on a
  point of fact: the family is not empty. `workspace-lectures` — private, standing
  since January 2025 under the name `lectures` and renamed in July 2026, carrying the
  manifest, the runner and the clone root for the lecture family — serves several
  concurrent initiatives at once and outlives each of them, which is precisely the
  "shared across initiatives, serving routine fleet operations" condition the
  `project-*` boundary rule names. Folding it into
  `project-*` would also have collided with §5: a rename into a different type is
  forbidden there, and succeeding-and-archiving a live bench is not a sane outcome for
  a naming standard. The type is therefore retained, with the goal-vs-fleet test as
  its boundary rule.
- **Renaming the `workspace-*` prefix**, on the objection that it names the *place*
  while the other five operational types name the actor's effect. Rejected, and the
  asymmetry is recorded as deliberate rather than tolerated: the five machine-written
  types are named for effects because machines have no location, while a fleet bench
  is the one operational repo humans work *in* rather than a process that runs — a
  place is the accurate thing to name it after. Candidates considered on the way:
  `maintenance-` (the strongest — effect-named and passing every filter, but no
  better than the incumbent at saying what the repo *is*), `ops-` (abbreviations are
  off-pattern, and operations research is domain vocabulary), `fleet-` (names the
  object, and makes the boundary rule tautological — a `fleet-` repo organized around
  a fleet), `bench-` (collides with the registered `benchmark-{topic}`, itself domain
  vocabulary), `estate-` (names the object; estates are domain vocabulary), the agent
  nouns `steward-`/`curator-`/`keeper-` (in this registry agent nouns are the machine
  types, so a human-operated bench would misfile as automation), the verb forms
  `maintain-`/`operate-` (every registered prefix is a noun), and the place synonyms
  `garage-`/`depot-`/`yard-`/`hub-` (the incumbent's framing with less clarity;
  `hub-` also collides with `dashboard`'s curated-hub role). One cost is accepted
  knowingly: `workspace-` and `workshop-` differ by two characters and share a
  registry, so the pair needs care in the manual's worked examples.
- **Folding conformance records into `status-*`, or de-dating `audit-*` into a living
  series.** Rejected: `status-*`'s promise is *re-run the collector, get the same
  number*, and rubric-adjudicated scores behind that prefix would launder opinion as
  fact; while an audit is an event even when it recurs — financial audits recur
  annually and stay audits. The living thing is the ledger: `compliance-*`.
  ([discussion](https://github.com/QuantEcon/qeps/pull/7#issuecomment-5421261197))
- **Keeping the dotted type forms** (`audit.{yyyy-mm}.{topic}`, `benchmark.{topic}`)
  **for new repos.** Rejected: dots are the variant-suffix marker, and reserving them
  keeps names machine-parseable (split on first dash → candidate type, validated
  against the registry; split on first dot → variant; §3-exempt names such as
  `sphinx-tojupyter` do not parse this way and are not meant to — the registry, not
  the grammar, is authoritative). Existing dotted names are grandfathered; the
  families are small and rarely minted, so the switch costs nothing.
- **A bulk rename campaign.** Rejected: ~150 repositories, most of them concluded
  events or dormant research, with CI and submodule breakage risk for near-zero reader
  benefit. Archival delivers most of the cleanup value; redirects make the remaining
  opportunistic renames cheap.
- **Leaving the standard in the team manual only.** Rejected: the manual is private
  and describes *how*; the namespace decision needs a public, durable, versioned record
  with a decision rule — the same reasoning that made the label set QEP-2. The manual
  page stays as the operational guide and cites this QEP.
- **Doing nothing.** The namespace keeps drifting one repo at a time; the ~55-repo
  event family shows where that ends.

## Rollout

1. **On acceptance**, update the team manual's repository-conventions page to cite
   QEP-3 as the naming authority, align its "other prefixes" table with the dash forms
   and the current registry (`reporter-`, `task-`, `compliance-`, `tool-`), and add a
   pointer from the operational program homes (e.g. `project-style-guide`) back to
   this registry, so namespace decisions are not re-made locally.
2. **Lecture renames** proceed under the open proposals
   ([meta#333](https://github.com/QuantEcon/meta/issues/333),
   [meta#334](https://github.com/QuantEcon/meta/issues/334)); `continuous_time_mcs` — a
   live lecture series outside the `lecture-` prefix — is added to that batch as a
   candidate, as are the two translated editions whose base names do not parse
   (`lecture-intro.zh-cn` → `lecture-python-intro.zh-cn`; `lecture-python.zh-cn`
   follows meta#334's resolution of its source), cheapest sequenced ahead of the
   translation-sync wiring
   ([action-translation#74](https://github.com/QuantEcon/action-translation/issues/74)).
3. **Event archival sweep**: generate the list of concluded teaching-event
   repositories and archive them in one pass. The first pass rides on the open
   inventory in [meta#267](https://github.com/QuantEcon/meta/issues/267), whose
   candidate list is already dominated by concluded workshops, but its criterion is
   *inactive for two years* rather than *the event concluded* — under this QEP the
   event's conclusion is the trigger, so that issue's scope widens on acceptance.
   Thereafter an annual sweep — itself a `task-*` candidate.
4. **Automation renames** proceed under §5's opportunistic policy:
   `reports-activity` → `reporter-activity` and `workflow-backups` → `task-backups`
   (both actively maintained, so the rename rides on maintenance as §5 requires).
5. **First succession instance**: `compliance-lecture-style` is assembled from
   `audit.2026-05.style-guide` and its in-flight 2026-08 pass; the audit repo is then
   archived with its Pages site and posted issue links intact (decided in
   [audit.2026-05.style-guide#2](https://github.com/QuantEcon/audit.2026-05.style-guide/issues/2),
   tracked in
   [audit.2026-05.style-guide#7](https://github.com/QuantEcon/audit.2026-05.style-guide/issues/7))
   — the first instance of §5's "renames never transmute types".
6. **Future families** (`research-*`, `paper-*` are visible in the long tail) are
   added to the registry by amending this QEP in place (version bump per QEP-1), not
   by new QEPs.
