---
qep: 5
title: Code of AI Use
author: "@mmcky"
status: Draft
type: standard
created: 2026-08-14
discussion: https://github.com/QuantEcon/qeps/issues/12
---

# QEP-5: Code of AI Use

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **QEP**        | 5                                                                |
| **Title**      | Code of AI Use                                                   |
| **Author**     | @mmcky                                                           |
| **Status**     | Draft                                                            |
| **Type**       | standard                                                         |
| **Created**    | 2026-08-14                                                       |
| **Discussion** | [QuantEcon/qeps#12](https://github.com/QuantEcon/qeps/issues/12) |

## Summary

This QEP adopts a **Code of AI Use** for QuantEcon: AI-assisted contributions
are welcome, a human must be in the loop — choosing the task, reading the
result, submitting it, and answering review on it — and meaningful AI
involvement must be disclosed with a machine-readable marker. It is policy, not
infrastructure: the norms bind every contributor from acceptance, and the volume
problem they sit alongside is handled with GitHub's own native controls rather
than with anything we build. What a repository does build is visibility: the
Code is put in front of contributors and the tools they run, through the three
channels set out under *Adoption*. The problem it answers is **cost**, not
safety.
Maintainer review attention is the scarce resource here, and a submission nobody
has read before asking us to read it is an *extractive contribution* — one that
costs more to review than it returns to the project. A contributor registry and
a pull-request gate were drafted and are deliberately **not** part of this
decision; if the native controls prove insufficient, that is a later amendment
or a separate QEP.

## Motivation

An audit of the 18 open pull requests on `QuantEcon.py` (2026-08-14) found that
**11–12 involve AI authorship, and most carry no disclosure**. Eight have
explicit machine-readable attribution — bot accounts, Copilot co-author
trailers, maintainer pull requests with Claude trailers, and one exemplary
disclosed-and-human-reviewed submission. Three more carry strong agent
fingerprints with nothing declared, including two competing agent-written fixes
for the same issue filed on the same day by different first-time authors, and
one whose description presents a test run that stopped at 47% when the agent's
session ended as if it were validation.

The pattern read as issue-crawling automation rather than individual
experimentation — first-time authors converging on freshly filed issues within
days, echoing our issue text verbatim, twice colliding on the same one — and a
contributor has since confirmed it. Asked whether AI was involved, the author of
a lint cleanup merged on 2026-09-09
([QuantEcon.py#923](https://github.com/QuantEcon/QuantEcon.py/pull/923))
disclosed within the hour that an autonomous agent on a cron schedule had read
the issue, written the patch, run the validation, and drafted the description.
The change was correct and merged; but it carried no marker, since the runtime
emits no AI trailer and nobody added one, and nothing told a reviewer whether
anyone would answer review. The costs are already concrete: duplicated review
effort, CI minutes spent on unverifiable claims, and review comments written to
authors who may never read them. Review attention is the binding constraint on
this project, and the volume rises with agent capability.

GitHub's native controls address **volume, not norms**. A repository can
[restrict pull requests][pr-access] to collaborators or turn them off entirely
(February 2026); an organisation can cap how many concurrent open pull requests
a user without write access may have ([August 2026][pr-limits]); and
[interaction limits][limits] throttle everything at once for up to six months.
Between them these can hold back a single runaway account without any custom
infrastructure, and that is the right first move. What none of them supplies is
a statement of what we expect from an AI-assisted contribution, or any basis for
asking a contributor to put one right. That is what this QEP provides.

[limits]: https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-repository
[pr-access]: https://github.blog/changelog/2026-02-13-new-repository-settings-for-configuring-pull-request-access/
[pr-limits]: https://github.blog/changelog/2026-08-06-set-pull-request-limits-at-the-organization-level/

## Proposal

### 1. The Code of AI Use

AI-assisted contributions are welcome at QuantEcon; our maintainers use these
tools daily and in the open. In exchange, every contributor accepts six norms.

**In brief.** The block below is the Code's copyable form. It is what a
repository's contributor files and agent instructions carry, verbatim, and it is
normative: a change to it is a substantive amendment of this QEP. Where it and
the full norms that follow differ, the full norms govern.

<!-- qep-appendix: code-in-brief -->
> [!IMPORTANT]
> **QuantEcon's Code of AI Use**
> ([QEP-5](https://github.com/QuantEcon/qeps/blob/main/qeps/qep-0005-code-of-ai-use.md)).
> AI-assisted contributions are welcome. In exchange:
>
> 1. **A human is in the loop.** Choose the task, read the result before asking
>    anyone else to, submit it under your own account, and answer review on it
>    yourself.
> 2. **Disclose.** If AI tools meaningfully contributed to the code, tests, or
>    text, tick the disclosure box and add `Assisted-by: <tool>` to the commit
>    message or the pull-request description.
> 3. **Own it.** Be able to explain the change and answer review on it: read
>    every line, or read the tests that would fail if it were wrong.
> 4. **Verify before you claim.** Say tests pass, coverage rose, or benchmarks
>    improved only if you ran them to completion.
> 5. **Don't crawl, duplicate, or farm.** No automation that crawls our issue
>    tracker; check for an existing pull request before starting; never
>    mass-submit; and do not use AI tools on issues labelled `good first issue`.
> 6. **Put it right.** If a maintainer points at a lapse, amend the pull
>    request, or carry the point into your next one.
>
> This covers anything you ask a maintainer to read: pull requests, issues,
> review comments, and proposals.
<!-- /qep-appendix -->

**In full.**

1. **A human is in the loop.** A human chooses the task, reads the result before
   asking anyone else to, submits it under their own account, and answers review
   on it. Where a tool pipeline produces the change, the human operating it is
   the contributor and owns what it files. Delegating work to an agent is fine.
   A pipeline that files and vanishes is not, and neither is an agent that acts
   in our repositories — opening, commenting, reviewing — without a person
   approving what it does. Whether a human was at the keyboard when the pull
   request opened does not matter; whether one owns it and is present for review
   does.
2. **Disclose.** If AI tools meaningfully contributed to the code, tests, or
   text of a pull request, say so — tick the disclosure box in the pull-request
   template and add one machine-readable trailer naming the tool,
   `Assisted-by: <tool>`, to the commit message or the pull-request description.
   Add it yourself, or have your tool add it — repositories put the Code in
   front of agents for exactly that reason — but check that it is there: the
   trailer is your responsibility, not the tool's. A `Co-Authored-By:` trailer
   that a tool emits on its own (Claude Code and Copilot do) also serves as the
   marker, but an in-house or third-party pipeline emits nothing, so for those
   the trailer exists only if its operator writes it or instructs it. The disclosure is a **marker,
   not a narrative**.
3. **Own it.** You are the author: you can explain what the change does, you
   answer review yourself — not by passing a reviewer's comments to an agent —
   and you carry the result. Reading every line is the default way to earn that.
   **In code, tests can stand in for it, narrowly:** where a change is covered by
   tests that would fail if the change were wrong, the tests do the verifying,
   and line-by-line reading of the implementation is not expected. The burden
   moves rather than disappears — the tests are then what you must have read and
   be able to explain. The substitution stops where no test can fail: a deletion,
   a refactor that preserves behaviour, or a change the issue asked you to judge
   site by site is verified by reading it, or not at all. Prose, mathematics, and
   exposition have no substitute either, because no test tells you an argument is
   wrong. Submitting output nobody has vouched for shifts your work onto
   volunteer maintainers.
4. **Verify before you claim.** Only state that tests pass, coverage rose, or
   benchmarks improved if you ran them to completion. Partial runs are fine to
   submit, described as what they are.
5. **Don't crawl, duplicate, or farm.** Do not run automation that crawls our
   issue tracker for work. Check for an existing open pull request before
   starting on an issue, and don't mass-submit generated pull requests across
   repositories to build a contribution record. Issues labelled
   [`good first issue`](qep-0002-standard-github-labels.md) are reserved for
   people learning the codebase by hand: **do not use AI tools to fix them**,
   whether you are a newcomer or not. The label is the fence — a maintainer who
   wants any issue kept for hands-on learning labels it so.
6. **Put it right.** We assume good faith and expect the occasional lapse. If
   something here is missed, a maintainer will say so and point at the fix —
   please amend the pull request, or, where it has already merged, carry the
   point into your next one. Repeated or deliberate lapses may lead to
   *Enforcement* (see below).

These norms exist so that AI tools raise the quality of QuantEcon rather than
the cost of maintaining it. They bind **every** contributor, maintainers
included, and they bind from acceptance — like the Code of Conduct, this is
project policy rather than a contract only signatories are held to. They cover
anything a contributor asks a maintainer to read: pull requests first, but also
issues, review comments, and proposals — an AI-drafted bug report nobody has
checked costs the same attention as an AI-drafted patch.

**Organisation-operated automation is not an external contribution.** QuantEcon
runs its own scheduled maintenance — dependency bots, link checkers, build and
warning sweeps, and maintenance agents that open pull requests across
repositories. That is QuantEcon acting on its own repositories, not contributing
to them, and norm 1 does not prohibit it. The accountability rule is applied
rather than waived: such automation has a **named maintainer who owns its output
and answers for it**, it is **declared** — recorded in a public register of the
organisation's automation, not self-asserted in a pull-request description — and
it carries [QEP-2](qep-0002-standard-github-labels.md)'s `automated` label so its
output stays distinguishable from human triage at a glance. Disclosure (norm 2)
is satisfied structurally by that label and the bot account rather than by a
trailer; norms 3 and 4 bind the operating maintainer exactly as they would for
work submitted by hand. Automation meeting none of those conditions is an
unattended agent, whoever built it.

### 2. Enforcement

The first response to any lapse is a **rectification comment**: a maintainer
points at the Code and asks the contributor to amend the pull request.

A lapse does not decide the merits. Where the work is correct and in scope, a
maintainer may merge it and still record the lapse — a comment stating what the
Code expects next time. That comment is the rectification step for a pull
request that has already merged, and it counts toward *repeated* if the lapse
recurs. Closing correct work on process alone costs the project the work and the
contributor's goodwill, and is not the default.

Beyond that, maintainers use judgement. The responses available, roughly in
order, are closing the pull request without further review and, at the far end,
GitHub's own organisation block, which can be set to expire on its own rather
than run indefinitely. Blocking is blunt by design — it also stops the person
filing issues and commenting — so it is the step to be slowest to take.

The point is to keep the review queue worth reading, not to punish. Every step
short of the last is undone by the contributor simply fixing the problem.

### 3. What this is not

- **Not a ban on AI-assisted contributions.** QuantEcon maintainers use Claude
  and Copilot openly, including delegated agent pull requests. A blanket ban
  would cover our own workflow.
- **Not a CLA.** The Code covers conduct and disclosure only — no copyright
  assignment, no licence grant, and no Developer Certificate of Origin line.
- **Not a contributor registry or a pull-request gate.** Both were drafted and
  set aside. The norms above bind whether or not anyone attests to them, so a
  registry would notify rather than bind; and a gate holds a newcomer's
  *first* contribution behind a registration step, which is the worst possible
  moment to introduce friction. A comment that asks and holds nothing is a
  different thing, and *Adoption* calls for one. Should a gate prove necessary
  later, it is an amendment to
  this QEP or a QEP of its own, covering the maintenance and procedures a
  registry needs — and two constraints from the design work carry over to it:
  whatever records a contributor's standing must be **public and auditable**, so
  that removing someone is a reviewable act rather than a private one, and no
  mechanism may **check out or execute pull-request code** while holding
  repository write permissions.

## Alternatives considered

- **Do nothing.** Volume rises with agent capability, and review attention is
  precisely what this project is short of. The audit is a snapshot of a trend,
  not a one-off.
- **Adopt LLVM's [AI Tool Use Policy][llvm] as written.** The closest prior art,
  and this Code borrows from it: the binding test (a human in the loop, not a
  human at the keyboard), the hand-added `Assisted-by:` trailer, the
  `good first issue` reservation, and the name *extractive contribution* for the
  cost the whole policy exists to control. Not adopted wholesale because LLVM
  bans any agent that acts in its repositories without per-action human
  approval, which would cover the scheduled maintenance automation and delegated
  agent pull requests QuantEcon runs itself. The organisation-automation
  paragraph above is where the two policies part.
- **Decline AI-generated contributions on provenance grounds**, as
  [QEMU][qemu] does under its Developer Certificate of Origin, or ban the tools
  outright as Gentoo has. Defensible positions that would cover our own
  workflow. There is also evidence a ban would not reach its target: a 2026
  study of coding agents working in open-source repositories found they never
  refused to contribute to a repository that bans AI, under any condition
  tested ([Yang, He, and Zhou][agents-study]).
- **A contributor registry with a pull-request gate.** A public whitelist of
  logins who have attested to the Code, plus an action holding pull requests
  from unregistered external authors until they register. Drafted in full and
  set aside for now. Against it: the norms bind regardless of attestation, so
  the registry notifies rather than binds; the friction lands on a newcomer's
  first contribution; and it is standing infrastructure running with repository
  write permissions. The native controls cost nothing and address the
  single-account case immediately. Revisit on evidence, not on this audit.
- **Detecting agents rather than asking.** Any mechanism keyed on recognising
  agent output — fingerprints in the description, style in the diff — is weak
  and getting weaker. In the one case tested, the diff carried no signal at all:
  the issue enumerated every site, so a human working from the list produces the
  same patch, and only the prose gave it away. Against that, a single neutral
  question on the thread produced full, voluntary disclosure within the hour.
  The Code therefore rests on maintainers reading pull requests and asking, and
  on a disclosure path the contributor can see, not on identifying agents. The
  same [study][agents-study] found that agents almost never fetch a
  repository's contribution rules on their own, and do disclose once the rule
  is put in front of them — which is why *Adoption* puts the Code in the file
  agents read, not only where people look.
- **Restricting pull requests to collaborators**, or turning them off entirely
  ([available since February 2026][pr-access]). Native and free, but binary:
  there is no tier between "anyone" and "write access", so it closes the
  community pipeline — GSoC participants, students, one-off domain experts —
  that produces some of our best contributions.
- **Interaction limits.** Native, but temporary (≤6 months), manually renewed,
  and all-or-nothing — they silence the bug reports and questions we want from
  the same people.
- **A structured `AI-Usage:` narrative on every pull request** — a free-text line
  describing what the tool did and what the human verified, following the one
  disclosed submission in the audit. Rejected as cost without signal: a reviewer
  cannot verify the claim, norms 3 and 4 already bind the contributor to
  vouching for the work and to not overstating what was run, and a mandatory
  prose field in every description degrades into boilerplate that reads like
  disclosure while carrying nothing. A greppable marker serves the audit; the
  norms do the rest. Reversible by amendment if reviewers find the marker alone
  leaves them guessing.

[agents-study]: https://arxiv.org/abs/2607.26819
[llvm]: https://llvm.org/docs/AIToolPolicy.html
[qemu]: https://www.qemu.org/docs/master/devel/code-provenance.html

## Adoption

Acceptance fixes the Code of AI Use as QuantEcon policy. It binds from that
point, like the Code of Conduct — without anyone signing anything, and without
anything being built.

Two obligations follow for a repository adopting it.

**The disclosure path must be visible where contributions are made — to
contributors and to the tools they run.** No single place reaches everyone. A
pull-request template reaches a person opening a pull request in the web
interface and nobody else; an agent working from a checkout reads the
repository's agent-instruction file and nothing else; a pipeline that opens
pull requests through the API sees neither. A repository adopting the Code
therefore provides three things.

- **A disclosure checkbox pair in the pull-request template**, in this form,
  where the second box is an ownership attestation (norm 3) and not only a
  disclosure:

  > - [ ] I did not use generative AI tools when creating this pull request.
  > - [ ] I used generative AI tools when creating this pull request, and a
  >       human has checked the work and is responsible for the code and the
  >       description above.

  Alongside it, `CONTRIBUTING.md` documents the `Assisted-by:` trailer and the
  tool-emitted `Co-Authored-By:` form it also accepts, and the structured issue
  templates link to this policy — the same text several agents echoed back to
  us verbatim.
- **The Code in brief in the file agents read from a checkout** (`AGENTS.md`,
  by current convention), verbatim from the block above, so that the tool adds
  the trailer rather than the contributor remembering to.
- **A neutral ask on pull requests the template did not reach.** A comment on
  each pull request from outside the organisation, posted once, that links to
  this Code and asks the author to paste the checkbox pair into their
  description and tick one. It reaches a pull request however it was opened,
  and it is the ask that produced full disclosure within the hour in the one
  case tested. It holds nothing, decides nothing, skips the organisation's own
  automation, and never checks out or executes the pull request's code.

A norm nobody encounters is not a norm.

**The `good first issue` label is applied deliberately.** Under norm 5 it now
reserves an issue for hands-on work as well as advertising it, so it goes only
on issues that meet [QEP-2](qep-0002-standard-github-labels.md)'s criteria for
it, and a maintainer who wants an audit or tech-debt issue kept for learning
labels it rather than assuming the reservation.

The Code is applied by maintainers reading pull requests. The only automation
it asks for is the comment above, which asks and never decides; enforcement
stays human. It assumes GitHub's native volume controls — org-level
[pull-request limits][pr-limits] in particular — are already in use. Those need
no QEP to enable, tune, or turn off, and this Code stands whether or not they
are.

## Amendments to QEP-2

Norm 5 gives `good first issue` a meaning that
[QEP-2](qep-0002-standard-github-labels.md)'s label table does not carry. At
acceptance the edit below is applied to QEP-2 as a substantive amendment — its
first, so its `version` moves to 1 and a **Version** row is added to its header
table. The yml appendix is unchanged: the label's name, colour, and description
do not move.

In the label table, the **When to use** cell of the `good first issue` row
changes from

> Only when genuinely self-contained with clear acceptance criteria

to

> Only when genuinely self-contained with clear acceptance criteria. Under
> [QEP-5](qep-0005-code-of-ai-use.md) the label also reserves the issue for
> hands-on work — AI tools are not to be used on it — so apply it deliberately

## Disclosure

This QEP was drafted with AI assistance, under the norms it sets out. Claude,
via Claude Code, produced text under the author's direction; the author read,
revised, and owns every line, and answers review on it.

`Assisted-by: Claude Code`
