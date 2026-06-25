# Review — PR #5: QEP-1 v1, version-defined living standards

**PR:** https://github.com/QuantEcon/qeps/pull/5
**Branch:** `qep-1-versioned-living-standards` → `main`
**Design issue:** [#4](https://github.com/QuantEcon/qeps/issues/4)
**Reviewed:** 2026-06-25
**Status of this doc:** working notes for a follow-up session (untracked; delete or `.gitignore` when done)

---

## Verdict

Strong, well-conceived PR. The design is **faithful to the converged design in #4** — no new status word, living-ness carried on `version`, `type` repurposed as a content taxonomy, git-as-changelog, squash-merge model. The prose is high quality and internally consistent, and the frontmatter-scoping in the second commit (anchoring all `version`/`version-hash` parsing to the frontmatter block so a YAML example in a QEP *body* is never mistaken for the real field) is correct and tested. `check.mjs` passes locally and on CI.

There are a few real issues — one a **silent failure this very PR can trigger on merge**. Address **#1, #2, #7** before merging; the rest is low-priority polish.

### Priority order

1. **#1** — make stamping robust to non-squash merges *or* enable squash-only before merge (silent failure otherwise).
2. **#2** — close the version-deletion gap in `check.mjs` (Copilot's comment; valid).
3. **#7** — reconcile QEP-1's rendering claims with the configured theme.
4. Optional polish: **#3, #4, #5, #6, #8**.
5. Prose/process: **#9, #10**.

---

## Correctness / CI

### 1. [High] Stamping silently no-ops on a non-squash merge — and squash-only isn't enabled yet

`stamp.mjs` derives its changed-file set from `git diff-tree --no-commit-id --name-only -r HEAD` ([.github/scripts/stamp.mjs:20-21](.github/scripts/stamp.mjs#L20-L21)). Confirmed by reproduction: for a **two-parent merge commit this prints nothing** (git suppresses merge diffs without `-m`/`--cc`); for a squash commit it lists files correctly. So the stamp step depends entirely on squash-merge — but enabling squash-only is the PR's own "one manual step," which *cannot* be applied by this PR. If QEP-1 (or any QEP PR before the setting lands) is merged as a merge commit, `changed` is empty, **no `version-hash` is stamped, and there is no error** — the bootstrap example silently fails to produce the artifact it demonstrates.

**Fix (do both):**
- Apply the squash-only repo setting *before* this merges (Settings → General → Pull Requests).
- Harden `stamp.mjs` to detect a multi-parent `HEAD` and either diff against the first parent (`git diff --name-only HEAD^1 HEAD`) or fail loudly rather than no-op.

- [ ] Addressed

### 2. [Medium] A versioned QEP can silently drop back to v0 (Copilot comment — valid)

`check.mjs` skips the base comparison entirely when `version` is absent: `if (version === undefined) continue;` ([.github/scripts/check.mjs:32](.github/scripts/check.mjs#L32)). A v1+ QEP that deletes its `version:` field passes CI, breaking the "once versioned, stays versioned" guarantee and desyncing the README.

**Fix:** when the current `version` is undefined, still read `baseVersion(path)` and error if the base had a version. Sketch:

```js
for (const path of qepFiles()) {
  const { version } = parseQep(path);
  const prev = baseVersion(path);
  if (version === undefined) {
    if (prev !== undefined)
      errors.push(`${path}: version ${prev} was removed; once versioned a QEP stays versioned`);
    continue;
  }
  if (prev === undefined) {
    if (version !== 1) errors.push(`${path}: introduces version ${version}; a first version must be 1`);
  } else if (version !== prev && version !== prev + 1) {
    errors.push(`${path}: version ${prev} -> ${version} must stay equal (editorial) or increment by one (substantive)`);
  }
}
```

(There's a `copilot-review` skill available to formally reply to and resolve Copilot's inline comment once fixed.)

- [ ] Addressed

### 3. [Low] No enum validation of `type` / `status`

CI checks README↔frontmatter *parity* but never that `type ∈ {standard, process, informational}` or that `status` is a known value. `type: standardd` passes as long as the README matches the typo. Cheap hardening if wanted.

- [ ] Addressed / [ ] Won't fix

### 4. [Low] In-document header table is not parity-checked

CI enforces README↔frontmatter parity, but the in-document header table (`| **Version** | 1 |`, `| **Type** | … |`) is hand-maintained and unchecked. For a document now meant to be amended frequently, that duplicated Type/Status/Version is exactly where drift will accumulate. [AGENTS.md:60-63](AGENTS.md#L60-L63) tells authors to bump it "in both the frontmatter and the header table," but nothing verifies it. Consider checking it, or at least flag it as the known manual-sync point.

- [ ] Addressed / [ ] Won't fix

### 5. [Low] A brand-new QEP can be born at v1

The "first version must be 1" branch ([.github/scripts/check.mjs:34-36](.github/scripts/check.mjs#L34-L36)) accepts a *new* file introduced at `version: 1`, contradicting "a new QEP is unversioned (v0)." Easy to tighten so new files must be v0.

- [ ] Addressed / [ ] Won't fix

### 6. [Nit] Minor robustness

- `stamp.mjs`'s README-sync loop is effectively redundant given `check.mjs` already enforces parity pre-merge — fine as defense-in-depth, just not load-bearing.
- The final `git push` in [.github/workflows/stamp-version.yml](.github/workflows/stamp-version.yml) relies on checkout leaving you on `main`; `git push origin HEAD:main` is more explicit.

- [ ] Addressed / [ ] Won't fix

---

## Consistency

### 7. [Medium] QEP-1 describes site rendering the repo doesn't currently produce

[myst.yml:14](myst.yml#L14) sets `template: book-theme`, not the QuantEcon theme. But [qeps/qep-0001-purpose-and-process.md:186-203](qeps/qep-0001-purpose-and-process.md#L186-L203) asserts, in present tense, "the QuantEcon theme's git-history control shows *Last changed*…" and "a coloured `type` pill always, and a `version` pill once a QEP reaches v1." The history dropdown is a QuantEcon-theme feature (cited as the still-open `quantecon-theme.mystmd#83`), and the pills are theme-specific — under `book-theme` none of this renders. The README *columns* claim is accurate (repo-controlled); the *pills/dropdown* claims are not yet true.

**Fix:** either switch the theme, or soften to contingent language ("once the QuantEcon theme is adopted…").

- [ ] Addressed

### 8. [Low] en-dash footgun

`versionCell` emits U+2013 EN DASH `–` for a v0 row ([.github/scripts/qeps.mjs:70](.github/scripts/qeps.mjs#L70)). The committed docs use that exact codepoint consistently (good), but a future author who hand-types an ASCII hyphen `-` in a new QEP's Version cell hits a confusing parity failure *pre*-merge — and `stamp.mjs` only fixes it *post*-merge, so it blocks the PR. Either make the character copy-pasteable in the template/AGENTS, or relax the v0 check to accept `-`/`–`/empty.

- [ ] Addressed / [ ] Won't fix

---

## Process & prose

### 9. Draft status & @jstac's feedback

The PR is OPEN but flagged as "supposed to be in DRAFT." @jstac approved the principle while calling the "What this does" section "word salad" — he wants a crisp sequence of rules, "like an algorithm / proof." That applies to the PR body, but the QEP's *Versioning*/*Amending* sections are also dense and could be tightened into the same rule-first shape. Convert to draft until the language pass + automation fixes land.

- [ ] Addressed

### 10. Two commits, squash model

The PR has two commits; the model is "one amendment = one commit," true only if squash-merged — which loops back to **#1**. Make sure this one is squashed.

- [ ] Addressed

---

## What was verified during review

- Read all 9 changed files, the three CI scripts, both new workflows, and the existing `deploy.yml`.
- Cross-checked the implementation against the agreed design in issue #4 (faithful).
- Ran `check.mjs` locally against `main` — passes.
- Reproduced `git diff-tree` behaviour on squash vs. true merge commits (basis for #1).
- Confirmed dash codepoints: `versionCell` and the committed docs both use U+2013 (basis for #8).
- Confirmed `myst.yml` uses `book-theme`, not the QuantEcon theme (basis for #7).
- Reviewed the Copilot bot's one inline comment — valid (#2).
