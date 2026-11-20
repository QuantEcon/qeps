---
qep: 4
title: Automation Registry and Label Coordination
author: "@mmcky"
status: Withdrawn
type: standard
version: 0
version-hash: 506d7df  # stamped by CI; do not edit
created: 2026-07-23
discussion: https://github.com/QuantEcon/qeps/pull/8
related: [2]
---

# QEP-4: Automation Registry and Label Coordination

|              |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| **QEP**      | 4                                                                  |
| **Title**    | Automation Registry and Label Coordination                         |
| **Author**   | @mmcky                                                             |
| **Status**   | Withdrawn                                                          |
| **Type**     | standard                                                           |
| **Created**  | 2026-07-23                                                         |
| **Discussion** | [QuantEcon/qeps#8](https://github.com/QuantEcon/qeps/pull/8) — the full draft and its review |
| **Related**  | [QEP-2](qep-0002-standard-github-labels.md) — where the problem this QEP addressed is now handled |

## Summary

This QEP proposed a registry of QuantEcon's automations and a policy for the labels
they use to coordinate: a durable origin label for each automation, and an optional
namespace of task labels that the automation would own.

It was withdrawn on 2026-11-17, before a decision. A registry puts instances in a
standard, so every new automation, rename or change of maintainer would have been an
amendment. [QEP-2](qep-0002-standard-github-labels.md) handles the problem without one:
an automation states its source in text, and a label it manages for its own operation
takes one family colour that tooling leaves alone (see *Labels an automation manages*).
