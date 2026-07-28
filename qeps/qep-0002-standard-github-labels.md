---
qep: 2
title: Standard GitHub Label Set and Labelling Policy
author: "@mmcky"
status: Draft
type: standard
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
| **Type**     | standard                                                           |
| **Created**  | 2026-06-17                                                         |
| **Discussion** | [QuantEcon/meta#324](https://github.com/QuantEcon/meta/issues/324) |

## Summary

This QEP defines a single standard set of GitHub labels for QuantEcon
repositories, the meaning of each label, and the policy for how labels are
applied. It standardises label **names, colours, and descriptions** so they
mean the same thing everywhere, and it commits to **one behavioural change**:
the status labels (`in-work` / `ready` / `review` / `blocked`) are retired in
favour of native GitHub features (Draft PRs, "Ready for review", review
requests, issue dependencies). The set is defined as a universal **core** plus two
small domain extensions: a **lecture extension** for lecture repos and a
one-label **software extension** for software / tooling repos.

## Motivation

QuantEcon's repositories have drifted into inconsistent, overlapping label
vocabularies: the same idea appears under different names (`improve` /
`content` / `teaching` vs `enhancement`), priority is expressed several
different ways, and bot-generated output is hard to tell from human triage.
One standard set, defined once for the whole organisation, fixes three
things:

- **Common meaning.** A label carries the same name, colour, and meaning in
  every repository — editorial sign-off, newcomer discovery, and "do not
  merge yet" read identically wherever they appear.
- **Triage.** A contributor can tell from the label list what kind of work an
  issue is and whether it has been triaged.
- **Automation.** The org activity reports and the quantecon.org/news drafts
  rank and surface work by label; a standard set gives them a stable contract
  of names to read.

## Proposal

### The label set

Labels are grouped by purpose. **Colour carries meaning where it helps:**
priority is a heat scale (hot red → cool green), grey marks **low-salience
state** — machine output or a closing outcome, rather than triage signal —
with the automation and meta families distinguished by text, not hue, and
type and community labels keep conventional GitHub colours. Every label is
**core** — meaningful on any repository — except the two that form the
**lecture extension**, applied only to lecture repos, and the one that forms
the **software extension**, applied only to software / tooling repos.

**Type — what kind of work is this? (one per issue, set at triage)**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `bug` | 🟥 `#d73a4a` | Something is wrong or broken | The content is *incorrect*: wrong maths, erroring code, broken rendering — in a lecture or a build |
| `enhancement` | 🟦 `#a2eeef` | Improvement to existing content or functionality | Better exposition, a new exercise, improved figures |
| `documentation` | 🟫 `#b08968` | Repo docs and contributor meta | READMEs, CONTRIBUTING — *about the repo*. Product content is never `documentation`, even where the product *is* docs (lectures, the manual): wrong content is `bug`, routine sweeps are `maintenance`, gaps and improvements are `enhancement` |
| `infrastructure` | 🟦 `#1d3c78` | Substantial CI / build / deploy / tooling / automation work, or behaviour-preserving restructuring | Engineering a teammate should know shipped — it would appear in a release note; includes restructuring that changes no behaviour (software repos sharpen this to `refactor`). Use *instead of* `maintenance` |
| `maintenance` | 🟨 `#fbca04` | Routine housekeeping: style, formatting, env & dependency upkeep | Invisible churn that would never appear in a release note ("rendered lectures look identical after") |
| `question` | 🟪 `#d876e3` | Someone needs an answer or clarification | Terminal state: *answered*. Swap for a work type once it becomes agreed work |
| `discuss` | 🟪 `#f904a0` | Open-ended team deliberation or a decision to be made | No single right answer. Reuses meta's existing `discuss` colour |

**Priority — a heat scale (unlabelled = normal priority)**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `high-priority` | 🟧 `#d93f0b` | Address soon | Published content visibly broken; build blockers. Label only the outliers |
| `low-priority` | 🟩 `#c2e0c6` | Nice to have, no time pressure | Agreed work that's fine to sit; "someday" ideas |

There is deliberately **no `medium-priority`** — the unlabelled default *is* the
middle of the scale.

**Cross-cutting — combine with any Type (like priority)**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `security` | 🟥 `#ee0701` | Security implications — needs a security-aware review bar | Credentials / tokens, supply-chain surface, workflow permissions. Applied *alongside* the Type label (e.g. `bug` + `security`); makes `org:QuantEcon label:security` a standing query |

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
| `automated` | ⬜ `#ededed` | Opened by a bot or scheduled workflow | Every bot issue or PR carries this, **plus at most one** diagnostic below |
| `broken-links` | ⬜ `#dddddd` | Link checker found dead links | Applied by the link-checker action |
| `build-failure` | ⬜ `#cccccc` | Execution, build, or warnings failure | Applied by scheduled build / warnings checks to the issues they open. A failing check on a PR needs no label — the red ✗ is the signal |
| `dependencies` | ⬜ `#bdbdbd` | Dependency or environment update (pip, conda, actions) | The single Dependabot label (replaces `github_actions` / `conda`) |

Automation labels take a grey in the band `#ededed`–`#bdbdbd`; a new automation
label takes the next value in the band not already used by *any* label — the
meta grey `duplicate` `#cfd3d7` also sits inside it.

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

**Software extension — software / tooling repos only**

| Label | Colour | Description | When to use |
|---|---|---|---|
| `refactor` | 🟦 `#2c5aa0` | Behaviour-preserving restructuring of product source | Extract a seam, consolidate duplication, introduce a choke point — code moves, behaviour doesn't. Use *instead of* `infrastructure`; the repo's own CI / build / tooling stays `infrastructure` |

This is **19 core labels + 2 lecture labels + 1 software label = 22**. The
org-level default set for new repositories is the **core 19**.

### Labelling policy

The labels only help if they are applied consistently. The rules are
deliberately few:

- **Unlabelled means "needs triage, normal priority."** Nothing *must* be
  labelled to exist. Note that **"no labels at all" and "no priority label" are
  different states**: a `bug` with no priority label has been triaged and is
  normal priority, whereas a completely unlabelled issue still needs triage.
- **Exactly one Type label per issue,** chosen at triage. The Type labels are
  mutually exclusive on purpose so the boundary stays clean — `new-lecture`
  *instead of* `enhancement`, `infrastructure` *instead of* `maintenance`,
  `refactor` *instead of* `infrastructure`.
  Cross-cutting labels (priority, `security`) sit *alongside* the Type label
  and do not count against this rule.
- **The `infrastructure` / `maintenance` boundary is effort, not subject.**
  Routine upkeep of CI is `maintenance` (an action version bump); substantial
  CI work is `infrastructure` (rewriting a deploy job) — the release-note test
  decides, not which files were touched. Substantial restructuring that changes
  no behaviour passes the same test: `infrastructure`, not `maintenance`, even
  in product source — sharpened to `refactor` on software repos.
- **A sub-issue parent is structure, not work.** An umbrella issue that groups
  work via native sub-issues is exempt from the one-Type rule, and unlabelled
  does not mean "needs triage" — the sub-issue relationship is the
  machine-checkable signal distinguishing a tracker from an untriaged issue.
  Discovery is native too: `has:sub-issue` in the advanced issue search, which
  works org-wide (tooling note: legacy REST search silently ignores the
  qualifier — programmatic discovery must use the advanced search type).
- **`security` is a cross-cutting modifier, not a Type.** Add it alongside the
  Type label when an issue has security implications (e.g. `bug` + `security` +
  `high-priority`) — it signals a different review bar and makes
  `org:QuantEcon label:security` work as a standing query.
- **Priority labels mark only the outliers.** Most work sits at the unlabelled
  default; reach for `high-priority` / `low-priority` only when an item is
  genuinely off-centre *for the repo* — a milestone doesn't re-centre the
  scale.
- **`question` vs `discuss`.** `question` seeks a single answer and is done when
  answered; `discuss` is open-ended deliberation with no single right answer.
  **A `discuss` thread should not drift open indefinitely** — once it reaches a
  conclusion, summarise the decision and close, spawn a concrete follow-up
  issue, or escalate to a QEP if it crosses repos or changes team workflow.
- **Automation labels are machine vocabulary.** Every bot-opened issue or PR
  carries `automated`, plus **at most one** diagnostic (`broken-links`,
  `build-failure`, `dependencies`) describing what the automation found —
  routine scheduled output diagnoses nothing and carries no diagnostic. Humans
  never hand-apply automation labels.
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

Dependencies are for **hard blocks only** — the UI renders one as a blocker,
which overstates "should ideally follow"; soft ordering belongs to sub-issue
order or the parent's body. A blocker that **is not an issue** — a pending
decision, a named person's availability — has no native representation: record
it as a **"Blocked by: …"** first line in the issue body, so a deliberately
parked issue reads as parked rather than neglected, and ages visibly.

Only **`do-not-merge`** survives as a workflow label, for the genuine case of a
PR that *looks* mergeable (even approved) but must be held.

### What we deliberately don't label

`medium-priority` → no label (unlabelled is the middle) · project / grouping
labels (a recurring program like `reading-group-*`, a one-shot campaign like a
tech-debt audit) → **Milestones** · umbrella / tracking issues →
native **sub-issues** (the parent carries no Type, see the policy above) ·
per-tool diagnostic labels (`colab`, …) → `build-failure` · `testing` →
`infrastructure` or `maintenance`
(test work is not its own Type) · PR lifecycle → native GitHub, as above.

### Scope

- **Lecture repos get 21** (core 19 + the lecture extension).
- **Software / tooling repos get 20** (core 19 + the software extension).
- **The org-level default for new repositories is the core 19.** `meta` takes
  the default, and may keep unique local labels (`project`, `education`) to
  triage its own kinds of work alongside the standard set.
- **Not touched:** translation forks (`translate:*`) and `*.notebooks` build
  repos.
- **Applying the set is additive; pruning is separate and deliberate.**
  `qe gh labels sync` *guarantees* the standard set on a repo and renames known
  variants in place (e.g. `linkchecker` → `broken-links`, `high priority` →
  `high-priority`, preserving every existing issue and PR tag), but it **never
  blanket-prunes** bespoke local labels that some repos legitimately rely on (`jax-conversion`, `colab`,
  `site-refresh`, `reading-group-*`). Removing non-standard labels is a
  **separate** `qe gh labels prune` step that reviews each one **one by one**,
  keeping the ones that still make sense locally.

### Machine-readable appendix

The normative schema ships with this QEP as a companion file,
[`qep-0002-labels.yml`](qep-0002-labels.yml), co-located so that the standard
and the file tooling consumes are versioned together: under
[QEP-1's versioning rule](qep-0001-purpose-and-process.md), a change to a
machine-readable appendix is a **substantive amendment** that bumps this QEP's
`version`, and `version-hash` (a commit hash) pins both files at once.

- **The yml is canonical for the machine-consumed fields** — name, colour,
  description, group, scope, and who applies it. The tables above are the human
  spec: rationale, colour semantics, and when-to-use guidance.
- **CI keeps the two in lockstep.** The `qep-checks` workflow fails any pull
  request where the tables and the yml disagree, so drift is a red ✗, not a
  judgement call.
- **The yml carries only the standard itself.** Rename maps for historical
  variants, retired-label handling, and pruning knowledge are operational
  concerns of the tool implementing this QEP (`qe gh labels sync` / `prune` in
  [`QuantEcon/cli`](https://github.com/QuantEcon/cli)), which reads the yml
  from this repository rather than carrying its own copy.

## Alternatives considered

- **Fold `infrastructure` into `maintenance` (one Type label, not two).** The
  simpler option is a single "work a reader never sees" bucket. We keep them
  **separate** because the team treats them differently: `infrastructure` is
  substantial engineering a teammate wants to know shipped (a CI migration, a
  build-system change, new automation), whereas `maintenance` is routine,
  invisible churn (style, env bumps). The activity reports already surface them
  differently — folding them together sinks "we re-architected CI across the
  lecture repos" into the same bucket as "bumped a pin."
- **Cover behaviour-preserving refactors with `enhancement`, or add `refactor`
  to the core.** Rejected: nothing user-visible changes, so `enhancement` would
  leak internal restructuring into reports that read it as user-facing
  improvement — and in the core, `refactor` is dead weight on lecture repos.
  Instead `infrastructure` owns behaviour-preserving restructuring (the
  release-note test judges effort, not subject), and software repos — where
  refactoring is a standing work-type, a quarter of a typical technical-debt
  milestone — sharpen it to the extension label `refactor`, mirroring
  `new-lecture` for lectures.
- **A closed bot vocabulary (`automated` + exactly one diagnostic).** Rejected:
  routine scheduled output diagnoses nothing, so a mandatory diagnostic forces
  a false `build-failure` and poisons it as a standing query — the quantifier
  is **at most one**. Labels automations use to *coordinate* (origin labels,
  task namespaces) evolve with their tooling and belong to a dedicated
  automation-registry QEP, not to enumeration here.
- **Make `security` a Type label, or leave it repo-local.** Rejected: security
  findings are orthogonal to Type — a pwn-request pattern recommended in a
  README reads as `documentation`/`bug`,
  root execution of external notebook code as `infrastructure` — so a
  Type-level `security` would either break the one-Type rule or force a wrong
  Type choice. Keeping it repo-local forfeits the org-wide standing query that
  is most of its value. It joins the priority labels as a **cross-cutting
  modifier** instead: exactly one Type label, plus optionally `security`.
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

## Adoption

Acceptance fixes the names, colours, descriptions, and policy above as the
QuantEcon standard. Applying the set to a repo is done with tooling that reads
the co-located [`qep-0002-labels.yml`](qep-0002-labels.yml) from this
repository (see *Machine-readable appendix*) — `qe gh labels sync` in
[`QuantEcon/cli`](https://github.com/QuantEcon/cli) — and is **additive**:
known variants are renamed in place so issue and PR history is preserved.
Removing non-standard labels is the separate, deliberate `qe gh labels prune` pass,
reviewed one label at a time. Adoption is **pilot-first**: validate on a single
lecture repo before widening to the remaining lecture repos and then the
software / tooling repos. The org-level default label set for new repositories
is the core 19 (a manual settings change — there is no public API for org
defaults).

The sequenced execution checklist — the CLI integration, the pilot target,
widening order, org defaults, closing the earlier unification attempts
(meta#178, meta#290) — belongs in a **tracking issue** (a sub-issue parent,
per the labelling policy above), not in this document, so completing,
reordering, or dropping a step never requires amending the standard.
