// Post-merge: stamp the merged short hash into each changed QEP's
// `version: N  # <hash>` comment, and sync the README Type/Version columns from
// each QEP's frontmatter. Run by .github/workflows/stamp-version.yml on push to
// main. Idempotent: writes nothing when everything is already current.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import {
  README,
  formatRow,
  parseQep,
  qepFiles,
  readIndex,
  versionCell,
} from './qeps.mjs';

const sha = execSync('git rev-parse --short HEAD').toString().trim();

// Files touched by the tip commit (QEP PRs are squash-merged => one commit).
const changed = new Set(
  execSync('git diff-tree --no-commit-id --name-only -r HEAD')
    .toString()
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean),
);

let dirty = false;

// 1. Stamp the hash into any changed v1+ QEP whose comment isn't already this SHA.
for (const path of qepFiles()) {
  if (!changed.has(path)) continue;
  const { version, hash } = parseQep(path);
  if (version === undefined) continue; // v0 — no version line to stamp
  if (hash === sha) continue; // already current
  const text = readFileSync(path, 'utf8');
  const stamped = text.replace(/^(version:[ \t]*\d+)[ \t]*(#.*)?$/m, `$1  # ${sha}`);
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
