// Post-merge: stamp the merged short hash into each changed QEP's `version-hash`
// field, and sync the README Type/Version columns from each QEP's frontmatter.
// Run by .github/workflows/stamp-version.yml on push to main. Idempotent: writes
// nothing when everything is already current.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import {
  FRONTMATTER,
  README,
  formatRow,
  parseQep,
  qepFiles,
  readIndex,
  versionCell,
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

// 2. Sync the README Type/Version columns from frontmatter.
const meta = new Map(
  qepFiles()
    .map((p) => parseQep(p))
    .filter((q) => q.qep !== undefined)
    .map((q) => [q.qep, q]),
);
const idx = readIndex();
const out = [...idx.lines];
for (const row of idx.rows) {
  const q = meta.get(row.qep);
  if (!q) continue;
  const cells = [...row.cells];
  if (idx.cols.type !== -1 && q.type !== undefined) cells[idx.cols.type] = q.type;
  if (idx.cols.version !== -1) cells[idx.cols.version] = versionCell(q.version);
  if (cells.join('|') !== row.cells.join('|')) {
    out[row.index] = formatRow(cells);
    console.log(`README: synced QEP-${row.qep} row`);
  }
}
const readme = out.join('\n');
if (readme !== readFileSync(README, 'utf8')) {
  writeFileSync(README, readme);
  dirty = true;
}

console.log(dirty ? 'changes written' : 'nothing to stamp or sync');
