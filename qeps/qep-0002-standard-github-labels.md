---
qep: 2
title: Standard GitHub Label Set and Labelling Policy
author: "@mmcky"
status: Draft
type: Standard
created: 2026-06-17
discussion: https://github.com/QuantEcon/meta/issues/324
---

# QEP-2: Standard GitHub Label Set and Labelling Policy

|              |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| **QEP**      | 2                                                                  |
| **Title**    | Standard GitHub Label Set and Labelling Policy                    |
| **Author**   | @mmcky                                                             |
| **Status**   | Draft                                                              |
| **Type**     | Standard                                                           |
| **Created**  | 2026-06-17                                                         |
| **Discussion** | [QuantEcon/meta#324](https://github.com/QuantEcon/meta/issues/324) |

## Summary

This QEP defines a single standard set of GitHub labels for QuantEcon
repositories, the meaning of each label, and the policy for how labels are
applied. It standardises label **names, colours, and descriptions** so they
mean the same thing everywhere, and it commits to **one behavioural change**:
the pull-request lifecycle (`in-work` / `ready` / `review`) moves off labels
and onto native GitHub features (Draft PRs, "Ready for review", review
requests). The set is defined as a universal **core** plus a small **lecture
extension**, applied additively so existing issue and PR history is preserved.

## Motivation

QuantEcon's repositories have drifted into inconsistent, overlapping label
vocabularies. The same idea appears under different names (`improve` /
`content` / `teaching` vs `enhancement`; `linkchecker` vs a link-checker
label), priority is expressed three different ways, and bot-generated noise is
hard to tell from human triage. This is the fourth attempt to unify them, and
the cost of *not* settling it has grown beyond tidiness:

- **Triage is ambiguous.** A contributor cannot tell from the label list what
  "kind" of work an issue is, or whether it has been triaged at all.
- **Automation reads labels and the names don't match.** The org activity
  reports and the quantecon.org/news drafts key off labels to rank and surface
  work; while wiring these up we found they were boosting on names that **do
  not exist anywhere** (`priority: high`, `feature`, `chore`, `docs`) while the
  real labels (`high-priority`, `enhancement`, `documentation`) went unread. A
  standard set gives the reporting a stable contract.
- **Cross-repo work has no shared shape.** Editorial sign-off, newcomer
  discovery, and "do not merge yet" all need to mean the same thing across
  every lecture repo.

A standard set is a cross-repository, team-wide decision, which is exactly what
a [QEP](qep-0001-purpose-and-process.md) is for.

## Proposal

### The label set

Labels are grouped by purpose. **Colour carries meaning where it helps:**
priority is a heat scale (hot red → cool green), the automation/CI family
shares a quiet grey ("a machine made this"), and type/community keep
conventional GitHub colours. A label with no profile is **core** — meaningful
on any repository. Two labels form a **lecture extension** applied only to
lecture repos.

**Type — what kind of work is this? (one per issue, set at triage)**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `bug` | 🟥 `#d73a4a` | Something is wrong or broken in a lecture or build | The content is *incorrect*: wrong maths, erroring code, broken rendering |
| `enhancement` | 🟦 `#a2eeef` | Improvement to existing material | Better exposition, a new exercise, improved figures |
| `documentation` | 🟫 `#b08968` | Repo docs and contributor meta (not lecture content) | READMEs, CONTRIBUTING — *about the repo*; lecture content is never `documentation` |
| `infrastructure` | 🟦 `#006b75` | Substantial CI / build / deploy / tooling / automation work | Engineering a teammate should know shipped. Use *instead of* `maintenance` |
| `maintenance` | 🟨 `#fbca04` | Routine housekeeping: style, formatting, env & dependency upkeep | Invisible churn a reader never sees; "rendered lectures look identical after" |
| `question` | 🟪 `#d876e3` | Someone needs an answer or clarification | Terminal state: *answered*. Swap for a work type once it becomes agreed work |
| `discuss` | 💗 `#f904a0` | Open-ended team deliberation or a decision to be made | No single right answer. Reuses meta's existing `discuss` colour |

**Priority — a heat scale (unlabelled = normal priority)**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `high-priority` | 🟧 `#d93f0b` | Address soon | Published content visibly broken; build blockers. Label only the outliers |
| `low-priority` | 🟩 `#c2e0c6` | Nice to have, no time pressure | Agreed work that's fine to sit; "someday" ideas |

There is deliberately **no `medium-priority`** — the unlabelled default *is* the
middle of the scale.

**Community (GitHub-canonical names — spaces are deliberate, see Alternatives)**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `good first issue` | 🟪 `#7057ff` | Self-contained and friendly to newcomers | Only when genuinely self-contained with clear acceptance criteria |
| `help wanted` | 🟩 `#008672` | Maintainers would welcome outside help | Including domain (econ/math) expertise — say what's needed in a comment |

**Workflow**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `do-not-merge` | 🟥 `#b60205` | Approved-looking but must not be merged yet | A *voluntary* hold on a mergeable PR: pins, experiments, cross-repo timing |

**Automation — applied by bots, not humans (quiet grey)**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `automated` | ⬜ `#ededed` | Opened by a bot or scheduled workflow | Every bot issue carries this **plus exactly one** diagnostic below |
| `broken-links` | ⬜ `#dddddd` | Link checker found dead links | Applied by the link-checker action |
| `build-failure` | ⬜ `#cccccc` | Notebook execution, build, or warnings failure | Applied by build / warnings checks |
| `dependencies` | ⬜ `#bdbdbd` | Dependency or environment update (pip, conda, actions) | The single Dependabot label (replaces `github_actions` / `conda`) |

**Meta — closing outcomes**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `duplicate` | ⬜ `#cfd3d7` | Already tracked elsewhere | On close; link the survivor |
| `wontfix` | ⬜ `#ffffff` | Decided not to act | On close, with one sentence why |

**Lecture extension — lecture repos only**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `new-lecture` | 🟦 `#0537E9` | A new lecture (the marquee outcome) | Brand-new lecture — proposed, in progress, or shipped. Use *instead of* `enhancement` |
| `editor` | 🟩 `#0e8a16` | Requires editor review — final sign-off stage | Apply at handoff *after* team review; editor's queue = `org:QuantEcon label:editor`. Remove on sign-off |

This is **18 core labels + 2 lecture labels = 20**. The org-level default set
for new repositories is the **core 18**.

### Labelling policy

The labels only help if they are applied consistently. The rules are
deliberately few:

- **Unlabelled means "needs triage, normal priority."** Nothing *must* be
  labelled to exist. Note that **"no labels at all" and "no priority label" are
  different states**: a `bug` with no priority label has been triaged and is
  normal priority, whereas a completely unlabelled issue still needs triage.
- **Exactly one Type label per issue,** chosen at triage. The Type labels are
  mutually exclusive on purpose so the boundary stays clean — `new-lecture`
  *instead of* `enhancement`, `infrastructure` *instead of* `maintenance`.
- **Priority labels mark only the outliers.** Most work sits at the unlabelled
  default; reach for `high-priority` / `low-priority` only when an item is
  genuinely off-centre.
- **`question` vs `discuss`.** `question` seeks a single answer and is done when
  answered; `discuss` is open-ended deliberation with no single right answer.
  **A `discuss` thread should not drift open indefinitely** — once it reaches a
  conclusion, summarise the decision and close, spawn a concrete follow-up
  issue, or escalate to a QEP if it crosses repos or changes team workflow.
- **Automation labels are bot-applied.** A bot-opened issue carries `automated`
  plus exactly one diagnostic (`broken-links`, `build-failure`, or
  `dependencies`); humans do not hand-apply these.
- **`do-not-merge` is a voluntary hold,** distinct from being *blocked*: see the
  status-label change below.

### The one behavioural change: retire status labels

Pull-request lifecycle state moves entirely onto **native GitHub features** and
off labels:

| Old label | Replaced by |
|---|---|
| `in-work` | a **Draft** pull request |
| `ready` | clicking **"Ready for review"** |
| `review` | a **review request** |
| `blocked` / `on-hold` | native **issue dependencies** ("Blocked by #N") for issues; a Draft PR with a "Blocked by #N" note for PRs |

Only **`do-not-merge`** survives as a workflow label, for the genuine case of a
PR that *looks* mergeable (even approved) but must be held.

### What we deliberately don't label

`medium-priority` → no label (unlabelled is the middle) · project / grouping
labels (`reading-group-*`) → **Milestones** · per-tool diagnostic labels
(`colab`, …) → `build-failure` · PR lifecycle → native GitHub, as above.

### Scope

- **Lecture repos get all 20** (core 18 + the lecture extension).
- **Software / tooling repos get the core 18,** which is also the **org-level
  default** for new repositories.
- **Not touched:** `meta` (keeps its own `project` / `education` labels),
  translation forks (`translate:*`), and `*.notebooks` build repos.
- **The sync is additive.** It *guarantees* the standard set on a repo and
  renames known variants in place, but it does **not** blanket-prune bespoke
  local labels that some repos legitimately rely on (`jax-conversion`, `colab`,
  `site-refresh`, `reading-group-*`). Renaming in place (e.g.
  `linkchecker` → `broken-links`) preserves every existing issue and PR tag.

## Alternatives considered

- **Fold `infrastructure` into `maintenance` (one Type label, not two).** The
  simpler option is a single "work a reader never sees" bucket. We keep them
  **separate** because the team treats them differently: `infrastructure` is
  substantial engineering a teammate wants to know shipped (a CI migration, a
  build-system change, new automation), whereas `maintenance` is routine,
  invisible churn (style, env bumps). The activity reports already surface them
  differently — folding them together sinks "we re-architected CI across the
  lecture repos" into the same bucket as "bumped a pin." *(This is the one item
  still open at draft — see the PR description.)*
- **Add a `blocked` label.** Rejected in favour of native GitHub **issue
  dependencies** (generally available since Aug 2025), which record *what
  blocks what* rather than just *that* something is blocked, and avoid a second
  red label clashing with `do-not-merge`. PRs use a Draft + "Blocked by #N"
  note.
- **Hyphenate `good first issue` / `help wanted` for consistency.** Rejected:
  the spaced names are load-bearing. GitHub's algorithm uses the exact spaced
  label `good first issue` to populate a repo's **Contribute page** and surface
  approachable issues; hyphenating would lose newcomer discovery for no
  functional gain. The hyphenated `good-first-issue` is a repo *topic*, a
  different namespace. Every label QuantEcon *owns* stays hyphenated; these two
  belong to GitHub.
- **Keep status labels (`in-work` / `ready` / `review`).** Rejected: native
  Draft / Ready-for-review / review-request state already expresses PR
  lifecycle, keeps it in sync automatically, and removes labels that were
  routinely stale. Retiring them has no impact on the activity reports, which
  never read them.
- **Recolour `documentation` to stay in the blue family.** Rejected: blue is
  reserved for "new content to publish" (`enhancement`, `new-lecture`);
  `documentation` is a tier-2, about-the-repo concern, so it moves to tan
  `#b08968` to read as distinct at a glance.

## Rollout

1. **Accept this QEP** to fix the names, colours, descriptions, and policy as
   the QuantEcon standard.
2. **Record the schema** as the single source of truth in
   [`QuantEcon/cli`](https://github.com/QuantEcon/cli)
   (`src/qe_cli/data/labels.yml`), with the per-label rationale and the
   labelling policy mirrored in the labels guide.
3. **Apply it with `qe gh labels sync`** — additively, renaming known variants
   in place so issue and PR history is preserved.
4. **First-wave repos.** Confirmed: `lecture-python-intro`,
   `lecture-python-programming`, `lecture-python.myst`,
   `lecture-python-advanced.myst`, `lecture-dp`, `lecture-jax`. Candidates
   added in the same wave: `lecture-julia.myst`, `lecture-datascience.myst`,
   `lecture-stats`, `continuous_time_mcs`, `lecture-wasm`.
5. **Set the org-level default labels** for new repositories to the core 18
   (a manual settings change — there is no public API for org defaults).
6. **Point contributors at the guide** so triage follows the policy above, and
   close the earlier unification attempts (#178, #290) against this outcome.
