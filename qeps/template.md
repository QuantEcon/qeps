---
qep: N
title: <Title in Title Case>
author: "@your-handle"
status: Draft
type: standard | process | informational
created: YYYY-MM-DD
discussion: <link to the QEP discussion issue or thread>
---

<!-- Number unpadded, e.g. 7 — the filename zero-pads it to four digits: qeps/qep-0007-short-slug.md -->
<!-- Writing: rules first; every rule keeps its reason in a clause; say each thing
     once; a QEP is the source of truth for a guideline, not a rollout or a project;
     no length limit. There is no
     Adoption section: what binds goes in the Proposal, and rollout goes in a tracker
     issue. See QEP-1 (Writing a QEP, Rollout). -->
<!-- Omit `version`: CI stamps `version: 0` and a sibling `version-hash` field at
     the merge that records the QEP's outcome, and re-stamps the hash on every later
     merge. The first substantive amendment bumps `version` to 1 and adds a Version
     row to the table below. See QEP-1 (Versioning). -->

# QEP-N: <Title>

|              |                                      |
| ------------ | ------------------------------------ |
| **QEP**      | N                                    |
| **Title**    | \<Title>                             |
| **Author**   | @your-handle                         |
| **Status**   | Draft                                |
| **Type**     | standard / process / informational   |
| **Created**  | YYYY-MM-DD                           |
| **Discussion** | \<issue link>                      |

## Summary

Three to four sentences: what is being decided, in plain language.

## Motivation

What problem does this solve, and why now? What goes wrong if we do nothing?

## Proposal

The actual decision being asked for. Be specific and concrete — this is the part
that becomes binding once the QEP is Accepted, so it includes what conforming requires
and any rule for how existing things migrate.

## Alternatives considered

Optional. Only an option someone could reasonably propose again, with the reason that
decided against it, where that reason is not already stated beside a rule. Omit the
section if there is none.
