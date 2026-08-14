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
are welcome, a human must submit and own them, and meaningful AI involvement
must be disclosed with a machine-readable marker. It is policy, not
infrastructure — the norms bind every contributor from acceptance, and the
volume problem they sit alongside is handled with GitHub's own native controls
rather than with anything we build. This answers a **cost** problem rather than
a safety one: maintainer review attention is the scarce resource here, and an
unattended submission spends it with nobody on the other end. A contributor
registry and a pull-request gate were drafted and are deliberately **not** part
of this decision; if the native controls prove insufficient, that is a later
amendment or a separate QEP.

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

The pattern reads as issue-crawling automation rather than individual
experimentation: first-time authors converging on freshly filed structured
issues within days, echoing our issue text verbatim, and in two cases colliding
on the same issue. The costs are already concrete — duplicated review effort, CI
minutes spent on unverifiable claims, and no way to tell which pull-request
author will still be present to answer review comments. Review attention is the
binding constraint on this project, and the volume rises with agent capability.

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
tools daily and in the open. In exchange, every contributor accepts six norms:

1. **A human submits.** Unattended agents and automated pipelines must not open
   pull requests or crawl our issue tracker for work. A human chooses the task,
   reviews the result, and submits it under their own account. Where a tool
   pipeline generates the change, the human operating it is the contributor and
   owns what it files — which is also how organisation-operated automation
   qualifies (below).
2. **Disclose.** If AI tools meaningfully contributed to the code, tests, or
   text of a pull request, say so — tick the disclosure box in the pull-request
   template and leave one machine-readable trailer naming the tool, such as
   `Co-Authored-By: <tool>`, which Claude Code and Copilot already emit
   automatically. The disclosure is a **marker, not a narrative**.
3. **Own it.** You are the author: you can explain what the change does, you
   answer review yourself — not an agent — and you carry the result. Reading
   every line is the default way to earn that. **In code, tests can stand in for
   it:** where a change is covered by tests that genuinely exercise the changed
   behaviour, the tests do the verifying, and line-by-line reading of the
   implementation is not expected. The burden moves rather than disappears — the
   tests are then what you must have read and be able to explain. Prose,
   mathematics, and exposition have no such substitute, because no test tells you
   an argument is wrong. Submitting output nobody has vouched for shifts your
   work onto volunteer maintainers.
4. **Verify before you claim.** Only state that tests pass, coverage rose, or
   benchmarks improved if you ran them to completion. Partial runs are fine to
   submit, described as what they are.
5. **Don't duplicate or farm.** Check for an existing open pull request before
   starting on an issue, and don't mass-submit generated pull requests across
   repositories to build a contribution record. The idea behind issues labelled as
   `good first issue` is they are good candidates for humans to learn the codebase.
6. **Put it right.** We assume good faith and expect the occasional violation.
   If something here is missed, a maintainer will say so and point at the fix —
   please amend the pull request. Repeated or deliberate lapses may lead to
   *Enforcement* (see below).

These norms exist so that AI tools raise the quality of QuantEcon rather than
the cost of maintaining it. They bind **every** contributor, maintainers
included, and they bind from acceptance — like the Code of Conduct, this is
project policy rather than a contract only signatories are held to.

**Organisation-operated automation is not an external contribution.** QuantEcon
runs its own scheduled maintenance — dependency bots, link checkers, build and
warning sweeps, and maintenance agents that open pull requests across
repositories. That is QuantEcon acting on its own repositories, not contributing
to them, and norm 1 does not prohibit it. The accountability rule is applied
rather than waived: such automation has a **named maintainer who owns its output
and answers for it**, it is **declared** — recorded somewhere public, not
self-asserted in a pull-request description — and it carries
[QEP-2](qep-0002-standard-github-labels.md)'s `automated` label so its output
stays distinguishable from human triage at a glance. Disclosure (norm 2) is
satisfied structurally by that label and the bot account rather than by a
trailer; norms 3 and 4 bind the operating maintainer exactly as they would for
work submitted by hand. Automation meeting none of those conditions is an
unattended agent, whoever built it.

### 2. Enforcement

The first response to any lapse is a **rectification comment**: a maintainer
points at the Code and asks the contributor to amend the PR.

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
  registry would notify rather than bind; and a gate puts a bot comment on a
  newcomer's *first* contribution, which is the worst possible moment to
  introduce friction. Should one prove necessary later, it is an amendment to
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
- **A contributor registry with a pull-request gate.** A public whitelist of
  logins who have attested to the Code, plus an action holding pull requests
  from unregistered external authors until they register. Drafted in full and
  set aside for now. Against it: the norms bind regardless of attestation, so
  the registry notifies rather than binds; the friction lands on a newcomer's
  first contribution; and it is standing infrastructure running with repository
  write permissions. The native controls cost nothing and address the
  single-account case immediately. Revisit on evidence, not on this audit.
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

## Adoption

Acceptance fixes the Code of AI Use as QuantEcon policy. It binds from that
point, like the Code of Conduct — without anyone signing anything, and without
anything being built.

One obligation follows for a repository adopting it: **the disclosure path must
be visible where contributions are made.** That means a disclosure checkbox in
the pull-request template, the trailer convention documented in
`CONTRIBUTING.md`, and a link to this policy from the structured issue templates
that agents are already consuming — the same text several of them echoed back to
us verbatim. A norm nobody encounters is not a norm.

The Code is applied by maintainers reading pull requests. It adds no automation
of its own, and it assumes GitHub's native volume controls — org-level
[pull-request limits][pr-limits] in particular — are already in use. Those need
no QEP to enable, tune, or turn off, and this Code stands whether or not they
are.
