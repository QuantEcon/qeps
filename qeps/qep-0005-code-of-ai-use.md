---
qep: 5
title: Code of AI Use
author: "@mmcky"
status: Accepted
type: standard
version: 1
created: 2026-08-14
discussion: https://github.com/QuantEcon/qeps/issues/12
---

# QEP-5: Code of AI Use

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **QEP**        | 5                                                                |
| **Title**      | Code of AI Use                                                   |
| **Author**     | @mmcky                                                           |
| **Status**     | Accepted                                                         |
| **Type**       | standard                                                         |
| **Version**    | 1                                                                |
| **Created**    | 2026-08-14                                                       |
| **Discussion** | [QuantEcon/qeps#12](https://github.com/QuantEcon/qeps/issues/12) |

## Summary

QuantEcon adopts a **Code of AI Use**. AI-assisted contributions are welcome; a human
must be in the loop, choosing the task, reading the result, submitting it and answering
review; and every pull request states its AI involvement in one machine-readable line.
The Code is policy, not infrastructure: it binds every contributor from acceptance, and
volume is handled with GitHub's native controls. The problem it answers is **cost**, not
safety. A contributor registry and a pull-request gate are deliberately not part of this
decision.

## Motivation

Maintainer review attention is the scarce resource. A submission nobody has read before
asking us to read it is an *extractive contribution*: it costs more to review than it
returns to the project.

An audit of the 18 open pull requests on `QuantEcon.py` (2026-08-14) found that
**11–12 involve AI authorship, and most carry no disclosure**. Eight have explicit
machine-readable attribution: bot accounts, Copilot co-author trailers, maintainer pull
requests with Claude trailers, and one disclosed-and-human-reviewed submission. Three
more carry strong agent fingerprints with nothing declared, including two competing
agent-written fixes for the same issue filed on the same day by different first-time
authors, and one whose description presents a test run that stopped at 47% when the
agent's session ended as if it were validation.

The pattern read as issue-crawling automation, not individual experimentation:
first-time authors converging on freshly filed issues within days, echoing our issue
text verbatim, and twice colliding on the same one. A contributor has since confirmed
it. Asked whether AI was involved, the author of a lint cleanup merged on 2026-09-09
([QuantEcon.py#923](https://github.com/QuantEcon/QuantEcon.py/pull/923)) disclosed
within the hour that an autonomous agent on a cron schedule had read the issue, written
the patch, run the validation and drafted the description. The change was correct and
merged, but it carried no marker, since the runtime emits no AI trailer and nobody added
one, and nothing told a reviewer whether anyone would answer review. The costs are
concrete: duplicated review effort, CI minutes spent on unverifiable claims, and review
comments written to authors who may never read them. The volume rises with agent
capability.

GitHub's native controls address **volume, not norms**. A repository can
[restrict pull requests][pr-access] to collaborators or turn them off entirely
(February 2026); an organisation can cap how many concurrent open pull requests a user
without write access may have ([August 2026][pr-limits]); and
[interaction limits][limits] throttle everything at once for up to six months. Between
them these can hold back a single runaway account without custom infrastructure, and
that is the right first move. None of them states what we expect of an AI-assisted
contribution or gives a basis for asking a contributor to put one right. That is what
this QEP provides.

[limits]: https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-repository
[pr-access]: https://github.blog/changelog/2026-02-13-new-repository-settings-for-configuring-pull-request-access/
[pr-limits]: https://github.blog/changelog/2026-08-06-set-pull-request-limits-at-the-organization-level/

## Proposal

### The Code of AI Use

**In brief.** The block below is the Code's copyable form. A repository's contributor
files and agent instructions carry it verbatim. It is normative: a change to it is a
substantive amendment. Where it and the full norms differ, the full norms govern.

<!-- qep-appendix: code-in-brief -->
> [!IMPORTANT]
> **QuantEcon's Code of AI Use**
> ([QEP-5](https://github.com/QuantEcon/qeps/blob/main/qeps/qep-0005-code-of-ai-use.md)).
> AI-assisted contributions are welcome. In exchange:
>
> 1. **A human is in the loop.** Choose the task, read the result before asking
>    anyone else to, submit it under your own account, and answer review on it
>    yourself.
> 2. **Disclose.** Put one line in the pull-request description or a commit
>    message: `Assisted-by: <tool> (<model>)` where AI tools meaningfully
>    contributed to the code, tests, or text, or `Assisted-by: none` where they
>    did not.
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

1. **A human is in the loop.** A human chooses the task, reads the result before asking
   anyone else to, submits it under their own account, and answers review on it. Where a
   tool pipeline produces the change, the human operating it is the contributor and owns
   what it files. Delegating work to an agent is fine. A pipeline that files and
   vanishes is not, and neither is an agent that acts in our repositories (opening,
   commenting, reviewing) without a person approving what it does. What matters is
   whether a human owns the pull request and is present for review, not whether one was
   at the keyboard when it opened.
2. **Disclose.** Every pull request carries a machine-readable `Assisted-by:` line, in
   its description or a commit message. Where AI tools meaningfully contributed to the
   code, tests or text, it names them, harness first and model in parentheses, one line
   per tool: `Assisted-by: Claude Code (Claude Fable 5.1)`. Where they did not:
   `Assisted-by: none`. The explicit negative exists because silence is ambiguous —
   forgotten, or unassisted — and a reviewer should not have to guess which. Add the
   line yourself or have your tool add it, but check that it is there: the line is your
   responsibility, not the tool's. A `Co-Authored-By:` trailer that a tool emits on its
   own (Claude Code and Copilot do) also serves as the marker; an in-house or
   third-party pipeline emits nothing, so there the line exists only if its operator
   writes it or instructs the pipeline to. The disclosure is a marker, not a narrative:
   it names what was used, not what it did.
3. **Own it.** You are the author: you can explain what the change does, you answer
   review yourself (not by passing a reviewer's comments to an agent), and you carry the
   result. Reading every line is the default. In code, tests can stand in for it,
   narrowly: where tests would fail if the change were wrong, the tests do the verifying
   and line-by-line reading of the implementation is not expected. The burden moves
   rather than disappears: the tests are then what you must have read and be able to
   explain. That stops where no test can fail: a deletion, a behaviour-preserving
   refactor, or a change the issue asked you to judge site by site is verified by
   reading it, or not at all. Prose, mathematics and exposition have no substitute for
   reading, because no test tells you an argument is wrong. Submitting output nobody has
   vouched for shifts your work onto volunteer maintainers.
4. **Verify before you claim.** State that tests pass, coverage rose or benchmarks
   improved only if you ran them to completion. A partial run may be submitted,
   described as what it is.
5. **Don't crawl, duplicate, or farm.** Do not run automation that crawls our issue
   tracker for work. Check for an existing open pull request before starting on an
   issue. Do not mass-submit generated pull requests across repositories to build a
   contribution record. Issues labelled
   [`good first issue`](qep-0002-standard-github-labels.md) are reserved for people
   learning the codebase by hand: do not use AI tools to fix them, newcomer or not. The
   label is the fence: a maintainer who wants any issue kept for hands-on learning
   labels it so.
6. **Put it right.** We assume good faith and expect the occasional lapse. If something
   is missed, a maintainer will say so; amend the pull request, or, where it has merged,
   carry the point into your next one. Repeated or deliberate lapses may lead to
   *Enforcement*.

The norms bind **every** contributor, maintainers included, from acceptance: like the
Code of Conduct, this is project policy, not a contract only signatories are held to.
They cover anything a contributor asks a maintainer to read — pull requests first, but
also issues, review comments and proposals — because an AI-drafted bug report nobody
has checked costs the same attention as an AI-drafted patch.

**Organisation-operated automation is not an external contribution.** QuantEcon's own
scheduled maintenance (dependency bots, link checkers, build sweeps, maintenance agents)
is QuantEcon acting on its own repositories, not contributing to them, and norm 1 does
not prohibit it. The accountability rule is applied, not waived, through two
conditions:

- **It has a named maintainer** who owns its output and answers for it.
- **It is declared.** Its output carries the `automated` label and the
  `Automated-by: owner/repo` line that [QEP-2](qep-0002-standard-github-labels.md)
  requires, naming a repository the organisation operates. The output then stays
  distinguishable from human triage at a glance, and a reader can find who answers for
  it.

That label and line satisfy disclosure in place of the `Assisted-by:` line. Norms 3 and
4 bind the operating maintainer exactly as they would for work submitted by hand.
Automation that meets neither condition is an unattended agent, whoever built it.

### Visibility

A norm nobody encounters is not a norm. Each repository puts the Code where
contributions are made, for contributors and for the tools they run. No single place
reaches everyone: a pull-request template reaches a person using the web interface, an
agent working from a checkout reads only the repository's agent-instruction file, and a
pipeline that opens pull requests through the API sees neither. A repository therefore
provides three things:

- **The disclosure line in its pull-request template:** an empty `Assisted-by:` line
  for the author to complete.
- **The Code in brief in its agent-instruction file,** verbatim, so that the tool adds
  the line instead of the contributor having to remember.
- **A comment that asks,** on a pull request from outside the organisation that arrives
  without the line: for the line, and for confirmation that a human chose the task,
  read the result and will answer review.

That comment is the only automation the Code calls for. It asks and never decides: it
holds nothing, and it never checks out or executes the pull request's code. Enforcement
stays human.

### Enforcement

The first response to any lapse is a **rectification comment**: a maintainer points at
the Code and asks the contributor to amend the pull request.

A lapse does not decide the merits. Where the work is correct and in scope, a maintainer
may merge it and still record the lapse in a comment stating what the Code expects next
time; that comment is the rectification step for a merged pull request and counts toward
*repeated* if the lapse recurs. Closing correct work on process alone costs the project
the work and the contributor's goodwill, and is not the default.

Beyond that, maintainers use judgement. The responses, roughly in order, are closing the
pull request without further review and, last, GitHub's organisation block, which can be
set to expire on its own rather than run indefinitely. Blocking is blunt by design: it
also stops the person filing issues and commenting, so it is the step to be slowest to
take.

The point is to keep the review queue worth reading, not to punish. Every step short of
the last is undone by the contributor fixing the problem.

### What this is not

- **Not a ban on AI-assisted contributions.** Maintainers use Claude and Copilot openly,
  including delegated agent pull requests; a blanket ban would cover our own workflow.
- **Not a CLA.** The Code covers conduct and disclosure only: no copyright assignment,
  licence grant or Developer Certificate of Origin line.
- **Not a contributor registry or a pull-request gate.** Both were drafted and set
  aside (see *Alternatives considered*). A comment that asks and holds nothing is a
  different thing, and *Visibility* calls for one. If a gate proves necessary it is an
  amendment to this QEP or a new one, covering the maintenance and procedures a registry
  needs, and two constraints carry over: whatever records a contributor's standing must
  be **public and auditable**, so that removing someone is a reviewable act and not a
  private one, and no
  mechanism may **check out or execute pull-request code** while holding repository
  write permissions.

## Alternatives considered

- **Adopt LLVM's [AI Tool Use Policy][llvm] as written.** The closest prior art, and
  this Code borrows from it: the binding test (a human in the loop, not a human at the
  keyboard), the hand-added `Assisted-by:` trailer (extended here with the model and an
  explicit `none`), the `good first issue` reservation, and the name *extractive
  contribution* for the cost the whole policy exists to control. Not adopted wholesale
  because LLVM bans any agent that acts in its repositories without per-action human
  approval, which would cover the scheduled maintenance automation and delegated agent
  pull requests QuantEcon runs itself. The organisation-automation paragraph above is
  where the two policies part.
- **Decline AI-generated contributions on provenance grounds,** as [QEMU][qemu] does
  under its Developer Certificate of Origin, or ban the tools outright as Gentoo has.
  Defensible positions that would cover our own workflow. There is also evidence a ban
  would not reach its target: a 2026 study of coding agents in open-source repositories
  found they never refused to contribute to a repository that bans AI, under any
  condition tested ([Yang, He, and Zhou][agents-study]).
- **A contributor registry with a pull-request gate.** A public whitelist of logins who
  have attested to the Code, plus an action holding pull requests from unregistered
  external authors until they register. Drafted in full and set aside for now. Against
  it: the norms bind regardless of attestation, so the registry notifies rather than
  binds; the friction lands on a newcomer's first contribution, the worst moment for
  it; and it is standing infrastructure running with repository write permissions. The
  native controls cost nothing and address the single-account case immediately. Revisit
  on evidence, not on this audit.
- **Detecting agents rather than asking.** Any mechanism keyed on recognising agent
  output — fingerprints in the description, style in the diff — is weak and getting
  weaker. In the one case tested, the diff carried no signal at all: the issue
  enumerated every site, so a human working from the list produces the same patch, and
  only the prose gave it away. Against that, a single neutral question produced full,
  voluntary disclosure within the hour. The Code therefore rests on maintainers reading
  pull requests and asking, and on a disclosure path the contributor can see. The same
  [study][agents-study] found that agents almost never fetch a repository's
  contribution rules on their own, and do disclose once the rule is put in front of
  them, which is why *Visibility* puts the Code in the file agents read, not only where
  people look.
- **Relying on GitHub's native controls alone:** restricting pull requests to
  collaborators ([available since February 2026][pr-access]), or interaction limits.
  Both are native and free, and both are all-or-nothing. Restricting pull requests has
  no tier between "anyone" and "write access", so it closes the community pipeline —
  GSoC participants, students, one-off domain experts — that produces some of our best
  contributions. Interaction limits are temporary (at most six months), manually
  renewed, and silence the bug reports and questions we want from the same people.
- **A structured `AI-Usage:` narrative on every pull request** — a free-text line
  describing what the tool did and what the human verified. Rejected as cost without
  signal: a reviewer cannot verify the claim, norms 3 and 4 already bind the
  contributor to vouching for the work and to not overstating what was run, and a
  mandatory prose field degrades into boilerplate that reads like disclosure while
  carrying nothing. A greppable marker serves the audit; the norms do the rest.
  Reversible by amendment if reviewers find the marker alone leaves them guessing.

Full discussion: [QuantEcon/qeps#12](https://github.com/QuantEcon/qeps/issues/12).

[agents-study]: https://arxiv.org/abs/2607.26819
[llvm]: https://llvm.org/docs/AIToolPolicy.html
[qemu]: https://www.qemu.org/docs/master/devel/code-provenance.html

## Disclosure

This QEP was drafted with AI assistance, under the norms it sets out. The author read,
revised and owns every line, and answers review on it.

`Assisted-by: Claude Code (Claude Fable 5.1)`
