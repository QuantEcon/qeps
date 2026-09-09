// Post-merge: stamp the merged short hash into each changed QEP's `version-hash`
// field, and sync the README Type/Version columns from each QEP's frontmatter.
// Run by .github/workflows/stamp-version.yml on push to main. Idempotent: writes
// nothing when everything is already current.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import {
  FRONTMATTER,
  README,
  parseQep,
  qepFiles,
  readIndex,
  renderIndex,
} from './qeps.mjs';

const sha = execSync('git rev-parse --short HEAD').toString().trim();

// Files changed by the push tip. QEP PRs should be squash-merged (one parent),
// but `git diff-tree -r HEAD` prints nothing for a merge commit — so if a PR is
// merged as a merge commit, stamping would silently no-op. Diffing against the
// first parent works for both squash and merge commits.
const parents = execSync('git rev-list --parents -n 1 HEAD')
  .toString()
  .trim()
  .split(/\s+/)
  .slice(1);
if (parents.length > 1) {
  console.log(`note: HEAD has ${parents.length} parents (merge commit); diffing against the first parent`);
}
const changed = new Set(
  execSync(
    parents.length
      ? 'git diff --name-only HEAD^1 HEAD'
      : 'git diff-tree --no-commit-id --name-only -r HEAD', // root commit has no parent
  )
    .toString()
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean),
);

let dirty = false;

// 1. Stamp the hash into any changed v1+ QEP whose `version-hash` isn't this SHA.
const SIGNPOST = '# stamped by CI; do not edit';
for (const path of qepFiles()) {
  if (!changed.has(path)) continue;
  const { version, hash } = parseQep(path);
  if (version === undefined) continue; // v0 — no version to stamp
  if (hash === sha) continue; // already current
  const text = readFileSync(path, 'utf8');
  const line = `version-hash: ${sha}  ${SIGNPOST}`;
  // Edit only the frontmatter block (anchored at the file start) — the body may
  // carry a literal version:/version-hash: YAML example that must not be touched.
  const head = text.match(FRONTMATTER)[0];
  const newHead = /^version-hash:.*$/m.test(head)
    ? head.replace(/^version-hash:.*$/m, line) // re-stamp: replace existing
    : head.replace(/^(version:[ \t]*\d+)[ \t]*$/m, `$1\n${line}`); // first stamp: insert
  const stamped = newHead + text.slice(head.length);
  if (stamped !== text) {
    writeFileSync(path, stamped);
    dirty = true;
    console.log(`stamped ${path} -> ${sha}`);
  }
}

// 2. Regenerate the README index from frontmatter.
// The index is DERIVED, not hand-maintained: every column comes from a QEP's
// own frontmatter and the rows are ordered by number. This is what lets a PR
// omit its own row entirely, so two QEP PRs can no longer collide on one line
// of one table — the add/add conflict class that made #18 unmergeable against
// QEP-3's row. check.mjs warns when a PR's index is stale; it never fails on it.
const idx = readIndex();
const out = renderIndex(
  idx,
  qepFiles().map((p) => parseQep(p)),
);
if (out.join('\n') !== idx.lines.join('\n')) {
  console.log('README: index regenerated from frontmatter');
}
const readme = out.join('\n');
if (readme !== readFileSync(README, 'utf8')) {
  writeFileSync(README, readme);
  dirty = true;
}

console.log(dirty ? 'changes written' : 'nothing to stamp or sync');
