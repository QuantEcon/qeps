// Post-merge: stamp `version: 0` and an anchor hash into any QEP that has left
// Draft and carries no `version` (QEP-1 v3 — stamp from v0), stamp the merged
// short hash into each changed QEP's `version-hash` field, and sync the README
// index from each QEP's frontmatter.
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

// A manual run (workflow_dispatch) may start from the bot's own stamp commit;
// its files are not a merge's, so nothing is re-stamped to that SHA.
if (/\[skip-stamp\]/.test(execSync('git log -1 --format=%s HEAD').toString())) {
  console.log('note: HEAD is a stamp commit; only backfilling unversioned QEPs');
  changed.clear();
}

let dirty = false;

// The most recent commit that touched a file, ignoring the bot's own stamp
// commits: the anchor for a QEP that left Draft before stamping from v0 existed.
// For a QEP merged by this push that is HEAD itself.
function lastTouch(path) {
  return execSync(`git log -1 --format=%h --invert-grep --grep='\\[skip-stamp\\]' -- "${path}"`)
    .toString()
    .trim();
}

// 1. Stamp `version`/`version-hash`. Two cases:
//    - a QEP past Draft with no `version` gets `version: 0` and the hash of the
//      last commit that touched it (this push's SHA when it merged just now, a
//      historical anchor when it is being backfilled) — QEP-1 v3, stamp from v0;
//    - a changed, versioned QEP whose `version-hash` isn't this SHA is re-stamped.
//    A Draft is never stamped: `version` arrives with the merge that records the
//    outcome, and a Draft on main is a state the lifecycle does not admit.
const SIGNPOST = '# stamped by CI; do not edit';
for (const path of qepFiles()) {
  const { status, version, hash } = parseQep(path);
  if (status === 'Draft') continue;
  const text = readFileSync(path, 'utf8');
  // Edit only the frontmatter block (anchored at the file start) — the body may
  // carry a literal version:/version-hash: YAML example that must not be touched.
  const head = text.match(FRONTMATTER)[0];
  let newHead;
  if (version === undefined) {
    const anchor = changed.has(path) ? sha : lastTouch(path);
    const lines = `version: 0\nversion-hash: ${anchor}  ${SIGNPOST}`;
    // Insert after `type:` (the field order QEP-1 uses), else after `status:`.
    newHead = /^type:.*$/m.test(head)
      ? head.replace(/^(type:.*)$/m, `$1\n${lines}`)
      : head.replace(/^(status:.*)$/m, `$1\n${lines}`);
  } else {
    if (!changed.has(path)) continue;
    if (hash === sha) continue; // already current
    const line = `version-hash: ${sha}  ${SIGNPOST}`;
    newHead = /^version-hash:.*$/m.test(head)
      ? head.replace(/^version-hash:.*$/m, line) // re-stamp: replace existing
      : head.replace(/^(version:[ \t]*\d+)[ \t]*$/m, `$1\n${line}`); // first stamp: insert
  }
  const stamped = newHead + text.slice(head.length);
  if (stamped !== text) {
    writeFileSync(path, stamped);
    dirty = true;
    const { version: v, hash: h } = parseQep(path);
    console.log(`stamped ${path} -> v${v} @ ${h}`);
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
