# QuantEcon Enhancement Proposals (QEPs)

QEPs are short, durable documents that record decisions affecting **more than one
QuantEcon repository**, or that **change how the team works** — label conventions,
editorial policy, tooling standards, licensing, and similar cross-cutting choices.

They give QuantEcon one place to find *what* was decided, *when*, and *why*, with a
consistent shape and a clear decision rule. Everyday, single-repo work does **not**
need a QEP.

📖 **Rendered index:** https://quantecon.github.io/qeps

## Index

| QEP | Title | Status |
|-----|-------|--------|
| [QEP-1](qeps/qep-0001-purpose-and-process.md) | QEP Purpose and Process | Accepted |

## Proposing a QEP

1. **Float the idea.** Open a [QEP discussion issue](../../issues/new/choose) to
   socialise it and confirm it needs a QEP.
2. **Draft it.** Copy [`qeps/template.md`](qeps/template.md) to
   `qeps/qep-XXXX-short-slug.md`, fill it in with **Status: Draft**, and open a PR.
3. **Set a deadline.** Announce the PR and give a comment window (1–2 weeks).
4. **Decide.** At the deadline the Core Maintainers decide by lazy consensus; the
   QEP is merged recording the outcome (Accepted / Rejected / Withdrawn).

The process itself is defined in **QEP-1**.

## Background

The QEP process was proposed and discussed in
[QuantEcon/meta#325](https://github.com/QuantEcon/meta/issues/325).
