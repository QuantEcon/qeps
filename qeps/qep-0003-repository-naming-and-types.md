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
each, an **exemption** for published software packages and forks (which keep their
ecosystem names), a new convention for the organization's largest unnamed family
(**teaching events**), and a **migration and archival policy** (new repositories must
comply; existing ones are renamed opportunistically or simply archived). The team
manual's repository-conventions page remains the operational how-to and follows this
QEP.

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
   dashes, not underscores; no capitals.
2. **A dash prefix encodes the repository's type**: `{type}-{name}` (e.g.
   `lecture-dp`, `status-translations`, `action-translation`).
3. **A dot suffix encodes a variant or companion of the same content**:
   `{repo}.{variant}`. Established variants:

   | Suffix | Meaning | Example |
   |---|---|---|
   | `.notebooks` | notebook companion of a lecture series | `lecture-dp.notebooks` |
   | `.{lang}` | translated edition (lowercase IETF tag) | `lecture-python-programming.zh-cn`, `.fa` |
   | `.public` / `.private` | visibility twin of an existing repo | `notebook-gallery.private` |
   | `.docker` | container-build companion | `lecture-python.docker` |
   | `.myst` | build-system variant (legacy; being retired via [meta#334](https://github.com/QuantEcon/meta/issues/334)) | `lecture-julia.myst` |

4. Dots are **reserved** for variant suffixes. Type prefixes always use a dash: the
   dotted type forms in use today (`project.{name}`, `audit.{yyyy-mm}.{topic}`,
   `benchmark.{topic}`) are grandfathered, and new members of those families use the
   dash form (`project-{name}`, `audit-{yyyy-mm}-{topic}`, `benchmark-{topic}`).

### 2. Type registry

The normative registry of type prefixes. Detailed anatomies, worked examples and the
decision guide live in the team manual (private) and follow this table.

**Content**

| Prefix | Meaning | Visibility | Lifecycle |
|---|---|---|---|
| `lecture-{topic}` | official lecture series (+ `.notebooks`, `.{lang}` variants) | public | living |
| `book-{name}` | textbook project (+ `.public` companion) | private | living |
| `quantecon-book-{name}` | companion software package for a book | public | living |

**Programs and operations** — the four operational types map onto verbs: `project-*`
**decides** (plans, records why), `workspace-*` **operates** (humans executing across a
repo family), `workflow-*` **automates** (machines acting on a schedule), `status-*`
**measures** (machines reporting resulting state).

| Prefix | Meaning | Visibility | Lifecycle |
|---|---|---|---|
| `project-{name}` | planning and decision home for an initiative or program: roadmap, decision register, research, reports; no production code | private | goal-scoped — lives and dies with its goal (initiatives end; programs run long) |
| `workspace-{collection}` | cross-repo operating bench for a repo family: manifest + runner; never vendors content | private | fleet-scoped — persists as long as the family |
| `status-{domain}` | machine-updated dashboard of facts about a domain: collector + versioned data + Pages site | public (typically) | domain-scoped — outlives any project |
| `workflow-{name}` | scheduled automation that acts for the org (e.g. backups) | either | ongoing |
| `action-{name}` | reusable GitHub Action consumed by other repos via `uses:` | public | ongoing |

Two boundary rules worth recording at the standard level:

- **`status-*` holds the numbers; `project-*` holds the narrative.** A dashboard may
  incubate as hand-maintained tables inside a project repo; once its numbers are
  collected automatically on a cadence it graduates to a `status-*` repo named for the
  *domain it measures*, not the project that created it.
- **A `project-*` repo is organized around a goal; a `workspace-*` repo is organized
  around a fleet.** A project may carry a minimal command bench for the repos it is
  changing; a bench shared across initiatives belongs in a `workspace-*`.

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
| `test-{name}` | disposable test double / CI target for tooling | either | archive when the pilot ends |
| `template-{name}` | template repository | public | living |
| `contractor-{name}` | payment artifacts for an individual RA/contractor | private | per engagement |
| `audit-{yyyy-mm}-{topic}` | dated point-in-time audit | public (typically) | frozen once published |
| `benchmark-{topic}` | benchmark dataset / evaluation harness | public | living |

### 3. Exemptions — names that are load-bearing elsewhere

- **Published software packages** keep the name they are published under
  (`QuantEcon.py`, `QuantEcon.jl`, `GameTheory.jl`, `sphinx-tojupyter`,
  `quantecon-book-theme`): the repository name must match the registry/distribution
  name, because install commands, badges and citations depend on it.
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
  submodules, and hard-coded paths still need checking, so renames ride on active
  maintenance rather than a campaign. The open lecture-rename proposals
  ([meta#333](https://github.com/QuantEcon/meta/issues/333),
  [meta#334](https://github.com/QuantEcon/meta/issues/334)) proceed as the first
  instances of this policy.
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
  (`.py`, `.jl`) already mark these repos clearly.
- **Keeping the dotted type forms** (`audit.{yyyy-mm}.{topic}`, `benchmark.{topic}`)
  **for new repos.** Rejected: dots are the variant-suffix marker, and reserving them
  keeps names machine-parseable (split on first dash → type; split on dot → variant).
  Existing dotted names are grandfathered; the families are small and rarely minted, so
  the switch costs nothing.
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
   QEP-3 as the naming authority and align its "other prefixes" table with the dash
   forms (`audit-`, `benchmark-`).
2. **Lecture renames** proceed under the open proposals
   ([meta#333](https://github.com/QuantEcon/meta/issues/333),
   [meta#334](https://github.com/QuantEcon/meta/issues/334)); `continuous_time_mcs` — a
   live lecture series outside the `lecture-` prefix — is added to that batch as a
   candidate.
3. **Event archival sweep**: generate the list of concluded teaching-event
   repositories and archive them in one pass (proposed and tracked in `meta`);
   thereafter an annual sweep.
4. **Future families** (`research-*`, `paper-*`, `tool-*` are visible in the long tail)
   are added to the registry by amending this QEP in place (version bump per QEP-1),
   not by new QEPs.
